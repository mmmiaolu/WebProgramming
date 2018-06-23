/*
Name：Miao Lu
Project: todoMVC
*/
"use strict";

//number of all items
var totalSum = 0;
//number of done items
var doneSum = 0;
//filter
var filter = "all";

window.onload = function () {
  // init model
  model.init(function(){});
  // Binding touchstart event of addBtn
  $('addBtn').addEventListener('touchstart', addTodo, false);
  // Binding touchstart event of delBtn
  $('delBtn').addEventListener('touchstart', delTodo, false);
  // Binding touchstart event of doneBtn
  $('doneBtn').addEventListener('touchstart', changeDone, false);
  // Binding touchstart event of doingBtn
  $('doingBtn').addEventListener('touchstart', changeDoing, false);
  // Binding touchstart event of selAllBtn
  $('selAllBtn').addEventListener('touchstart', selAll, false);
  // Binding the filter radio onchange
  var shows = document.getElementsByName("showForm");
  for (var j = 0; j < shows.length; j++) {
      shows[j].onchange = showChange;
  }
  shows[0].checked = true;
  update();
}

function $(id) {
  return document.getElementById(id);
}

/*function updateTotal(offset) {
  totalSum += offset;
}

function updateDone(offset) {
  doneSum += offset;
}*/

// select all items
function selAll() {
  var list = $('list');
  var nodes = list.childNodes;
  for(var i=0;nodes[i]!=null;i++){
    nodes[i].lastChild.checked = true;
  }
}

// add a new item
function addTodo() {
  var todo = $('todo');
  var text = todo.value;
  // content is empty
  if (text == '') {
    console.warn('text is empty');
    return;
  }
  // push a new item into model
  model.data.items.push({
    text: text,
    completed: false
  })
  update();
  todo.value = '';
}

// delete an item
function delTodo(){
  var list = $('list');
  var nodes = list.childNodes;
  for(var i=0,j=0;nodes[i]!=null;i++){
    // if the item is selected
    if(nodes[i].lastChild.checked == true){
      // delete the item in model
      model.data.items.splice(j, 1);
    }
    else{
      j++;
    }
  }
  update();
}

// change the state of item to 'done'
function changeDone(){
  var list = $('list');
  var nodes = list.childNodes;
  for(var i=0;nodes[i]!=null;i++){
    // if the item is selected and it isn't done
    if(nodes[i].lastChild.checked == true && nodes[i].className != 'done'){
      // change the state in model
      model.data.items[i].completed = true;
    }
  }
  update();
}

// change the state of item to 'doing'
function changeDoing(){
  var list = $('list');
  var nodes = list.childNodes;
  for(var i=0;nodes[i]!=null;i++){
    // if the item is selected and it isn't doing
    if(nodes[i].lastChild.checked == true && nodes[i].className != 'doing'){
      // change the state in model
      model.data.items[i].completed = false;
    }
  }
  update();
}

// update the list
function update(){
  // flush model
  model.flush();
  var data = model.data;
  var list = $('list');
  // clear list
  list.innerHTML = '';
  // number of done items
  var doneNum = 0;

  for (var i = 0; i < data.items.length; i++){
    var item = data.items[i];
    // create a node for an item
    var node = document.createElement('div');
    node.innerHTML = item.text;
    // set class for the node
    if(item.completed){
      node.setAttribute('class','done');
      doneNum++;
    }
    else{
      node.setAttribute('class','doing');
    }
    node.className += ' ' + 'item';
    // create a checkbox for an node
    var checkbox = document.createElement('input');
    checkbox.setAttribute('type','checkbox');
    checkbox.className += ' ' + 'box';
    // append checkbox to node
    node.appendChild(checkbox);
    // append node to list according to the filter
    switch (filter) {
      case "all":{
        list.appendChild(node);
        break;
      }
      case "doing":{
        if(!item.completed){
          list.appendChild(node);
        }
        break;
      }
      case "done":{
        if(item.completed){
          list.appendChild(node);
        }
        break;
      }
    }
  }
  // update the sum of items according to the filter
  switch (filter) {
    case "all":{
      totalSum = data.items.length;
      $('count').textContent = totalSum + ' items left';
      break;
    }
    case "doing":{
      var doingSum = data.items.length - doneNum;
      $('count').textContent = doingSum + ' items left';
      break;
    }
    case "done":{
      doneSum = doneNum;
      $('count').textContent = doneSum + ' items left';
      break;
    }
  }
}

// change the filter
function showChange(){
  var radios = document.getElementsByName("showForm");
  var filterValue;
  // judge which radio is checked
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
        filterValue = radios[i].value;
        break;
    }
  }
  // change the filter
  filter = filterValue;
  update();
}

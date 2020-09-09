'use strict';
const hornArray = [];
const sortOptions = ['sortAlphaTitle', 'sortHornNum']

$.ajax('./data/page-1.json', {method: 'GET', dataType: 'JSON'})
  .then(hornInfo => {
    hornInfo.forEach(horn => {
      new HornObject(horn);
    })
    dropdownRender();
    sortHornNum();
    hornyObjectRender();

  })



function HornObject (object){
  this.pathway = object.image_url;
  this.title = object.title;
  this.description = object.description;
  this.keyword = object.keyword;
  this.horns = object.horns;
  hornArray.push(this);
}

HornObject.prototype.render = function(){
  const myTemplate = $('#photo-template').html();
  let html = Mustache.render(myTemplate, this);
  return html;
}

function hornyObjectRender(){
  hornArray.forEach(critter =>{
    $('#gallery').append(critter.render())
  })
}

function dropdownRender (){
  let temporaryArray = [];
  hornArray.forEach(value => {
    if (!temporaryArray.includes(value.keyword)){
      temporaryArray.push(value.keyword);
    }
  })
  for(let i=0; i<temporaryArray.length; i++){
    const $newDropdownItem = $(`<option></option>`);
    $newDropdownItem.attr('value',temporaryArray[i]);
    $newDropdownItem.text(temporaryArray[i]);
    $('#dropdown').append($newDropdownItem);
  }
}

$('#dropdown').on('change', filterChange);

function filterChange() {
  console.log(this.value);
  $('section').hide();
  console.log('true');
  $(`.${this.value}`).show();
}

// sort functions

$('#sortby').on('change', sortChange);
function sortAlphaTitle(){
  hornArray.sort((a,b) => {
    a = a.title.toLowerCase();
    b = b.title.toLowerCase();
    if(a > b){
      return 1;
    } else if (a < b){
      return -1;
    } else {
      return 0;
    }
  })
}
function sortHornNum(){
  hornArray.sort((a, b) => {
    a= a.horns;
    b= b.horns;
    return b - a;
  })}
function sortChange(){
  console.log(this.value);

  sortOptions.forEach(sort =>{
    if(this.value === sort){
      return eval(`${sort}()`);
    }
  })
  $('#gallery').empty();
  hornyObjectRender();
}

console.log(hornArray);

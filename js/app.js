'use strict';
const hornArray = [];

$.ajax('./data/page-1.json', {method: 'GET', dataType: 'JSON'})
  .then(hornInfo => {
    hornInfo.forEach(horn => {
      new HornObject(horn);
    })
    dropdownRender();
    sortAlphaTitle();
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
  $(`section[class = ${this.value}]`).show();
}

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
    };
  })
}

$('#sortby').on('change', sortChange);

function sortChange(){
  console.log(this.value);
  $('section').hide();
  console.log('true');
  $(`section[class = ${this.value}]`).show();
}

console.log(hornArray)



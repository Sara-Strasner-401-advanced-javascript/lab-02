'use strict';
const hornArray = [];

$.ajax('./data/page-1.json', {method: 'GET', dataType: 'JSON'})
  .then(hornInfo => {
    hornInfo.forEach(horn => {
      new HornObject(horn).render();
    })
    dropdownRender();
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
  const $newHornSection = $(`<section class=${this.keyword}>${myTemplate}</section>`);
  $newHornSection.find('h2').text(this.title);
  $newHornSection.find('p').text(this.description);
  $newHornSection.find('img').attr('src',this.pathway);
  $newHornSection.find('a').attr('href',this.pathway);
  $('main').append($newHornSection);
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
    $('select').append($newDropdownItem);
  }
}

$('select').on('change', handleChange);

function handleChange() {
  console.log(this.value);
  $('section').hide();
  hornArray.forEach (object => {
    if (event.target.value === object.keyword){
      console.log('true');
      $(`section[class = ${object.keyword}]`).show();
    }
  })
}


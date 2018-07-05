//bling.js
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
Node.prototype.on = window.on = function (name, fn) {
  this.addEventListener(name, fn);
};
NodeList.prototype.__proto__ = Array.prototype; // eslint-disable-line
NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
  this.forEach((elem) => {
    elem.on(name, fn);
  });
};

//1)SHOW/HIDE 'OTHER' FIELD
//hide the other field  and show it if other option is selected
const otherJobInput = $('input#other-title');
otherJobInput.style.display = 'none';

function showOtherField(e){
  console.log();
  if (e.target.value === 'other') {
    otherJobInput.style.display = 'block';
  } else {
    otherJobInput.style.display = 'none';
  }
}

$('#title').on('change', showOtherField);

//2) T-SHIRT SECTION
  //hide the color options by setting the innerHTML until a selection is made in the DESIGN select menu
  //then show the appropriate shirts
  const colorMenu = $('select#color');
  const chooseOption = `<option value="choosedesign">&larr; Choose a design!</option>`;
  colorMenu.innerHTML = chooseOption;

  function createShirtOptions(e){
    if(e.target.value === "js puns"){
      console.log('puns');
    } else if (e.target.value === "heart js") {
      console.log('heart');
    } else {
      colorMenu.innerHTML = chooseOption;
    }
  }

  $('select#design').on('change', createShirtOptions);



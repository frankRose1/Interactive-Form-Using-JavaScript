// based on https://gist.github.com/paulirish/12fb951a8b893a454b32
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



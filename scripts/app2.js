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
////////////////////////////////////////

$('input#name').focus(); //focus on the first input on page load

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

  function jsPunsOptions(){
    const punsOptions = `
      <option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>
      <option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option>
      <option value="gold">Gold (JS Puns shirt only)</option>
      `;
      colorMenu.innerHTML = punsOptions;
  }

  function heartJsOptions(){
    const heartOptions = `
      <option value="tomato">Tomato (I &#9829; JS shirt only)</option>
      <option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option>
      <option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>
    `;
    colorMenu.innerHTML = heartOptions;
  }

  function createShirtOptions(e){
    if(e.target.value === "js puns"){
      jsPunsOptions();
    } else if (e.target.value === "heart js") {
      heartJsOptions();
    } else {
      colorMenu.innerHTML = chooseOption;
    }
  }

  $('select#design').on('change', createShirtOptions);


  // PAYMENT SECTION
    //default to the credit card option
    //show the apprpriate div if the related option is selected cc, bitcoin, paypal
    const creditCardDiv = $('div#credit-card');
    const paypalDiv = $('div#paypal');
    const bitcoinDiv = $('div#bitcoin');
    paypalDiv.style.display = 'none';
    bitcoinDiv.style.display = 'none';

    function togglePaymentDivs(show, hide1, hide2){
      show.style.display = 'block';
      hide1.style.display = 'none';
      hide2.style.display = 'none';
    }
    
    function showPaymentFields(e){
      if (e.target.value === 'credit card') {
        togglePaymentDivs(creditCardDiv, paypalDiv, bitcoinDiv);
      } else if (e.target.value === 'bitcoin') {
        togglePaymentDivs(bitcoinDiv, paypalDiv, creditCardDiv);
      } else if (e.target.value === 'paypal') {
        togglePaymentDivs(paypalDiv, bitcoinDiv, creditCardDiv);
      } else {
        console.log('show an alert div!');
      }
    }

  $('select#payment').on('change', showPaymentFields);



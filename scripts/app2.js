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
      <option value="cornflowerblue">Cornflower Blue</option>
      <option value="darkslategrey">Dark Slate Grey</option>
      <option value="gold">Gold</option>
      `;
      colorMenu.innerHTML = punsOptions;
  }

  function heartJsOptions(){
    const heartOptions = `
      <option value="tomato">Tomato</option>
      <option value="steelblue">Steel Blue</option>
      <option value="dimgrey">Dim Grey</option>
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


  //5)ACTIVITIES SECTION
    //if conflicting events are selected then the other checkboxes need to be disabled!
    //also want to show the total at the bottom of the fieldset
  const activitesCheckboxes = $$('.activity-cb');
  const jsFrameworksCB = $('input[name="js-frameworks"]');
  const jsLibrariesCB = $('input[name="js-libs"]');
  const expressCB = $('input[name="express"]');
  const nodeCB = $('input[name="node"]');

  function activitesHandler(){
      //frameworks and express conflict
      if (this === jsFrameworksCB && this.checked) {
        expressCB.disabled = true;
        expressCB.parentElement.classList.add('disabled');
      } else if (this === jsFrameworksCB && !this.checked) {
        expressCB.disabled = false;
        expressCB.parentElement.classList.remove('disabled');
      } else if (this === expressCB && this.checked) {
        jsFrameworksCB.disabled = true;
        jsFrameworksCB.parentElement.classList.add('disabled');
      } else if (this === expressCB && !this.checked) {
        jsFrameworksCB.disabled = false;
        jsFrameworksCB.parentElement.classList.remove('disabled');
      }
      //libraries and node  js conflict
      if (this === jsLibrariesCB && this.checked) {
        nodeCB.disabled = true;
        nodeCB.parentElement.classList.add('disabled');
      } else if (this === jsLibrariesCB && !this.checked) {
        nodeCB.disabled = false;
        nodeCB.parentElement.classList.remove('disabled');
      } else if (this === nodeCB && this.checked) {
        jsLibrariesCB.disabled = true;
        jsLibrariesCB.parentElement.classList.add('disabled');
      } else if (this === nodeCB && !this.checked) {
        jsLibrariesCB.disabled = false;
        jsLibrariesCB.parentElement.classList.remove('disabled');
      }
    }

 activitesCheckboxes.on('change', activitesHandler);

  //4) PAYMENT SECTION
    //default to the credit card option
    //show the apprpriate div if the related option is selected cc, bitcoin, paypal
    const creditCardDiv = $('div#credit-card');
    const paypalDiv = $('div#paypal');
    const bitcoinDiv = $('div#bitcoin');
    const alertUserDiv = $('div.alert-user');
    $('option[value="credit card"]').selected = true; //make credit card the default option

    function togglePaymentDivs(show, hide1, hide2, hide3){
      show.style.display = 'block';
      hide1.style.display = 'none';
      hide2.style.display = 'none';
      hide3.style.display = 'none';
    }

    togglePaymentDivs(creditCardDiv, paypalDiv, bitcoinDiv, alertUserDiv); //show the credit card by default

    function showPaymentFields(e){
      if (e.target.value === 'credit card') {
        togglePaymentDivs(creditCardDiv, paypalDiv, bitcoinDiv, alertUserDiv);
      } else if (e.target.value === 'bitcoin') {
        togglePaymentDivs(bitcoinDiv, paypalDiv, creditCardDiv, alertUserDiv);
      } else if (e.target.value === 'paypal') {
        togglePaymentDivs(paypalDiv, bitcoinDiv, creditCardDiv, alertUserDiv);
      } else {
        togglePaymentDivs(alertUserDiv, bitcoinDiv, creditCardDiv, paypalDiv);
      }
    }

  $('select#payment').on('change', showPaymentFields);



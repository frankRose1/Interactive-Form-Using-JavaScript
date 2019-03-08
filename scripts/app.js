// START BLING.JS
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
// END BLING.JS

const emailRegex = /^[^@]+@[^@]+\.[a-z]+$/;
const nameRegex = /^[a-zA-Z\s]+$/;
const cvvRegex = /^\d{3}$/;
const zipRegex = /^\d{5}$/;
const ccRegex = /^\d{13,16}$/
$('#name').focus();

/**
 * Job Role Section - show/hide input if 'other' option is selected
 */
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
// ===============================================================//


/**
 * T-shirt section - hide color opions until selection is made in the design select menu
 */
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
// ===============================================================//


/**
 * Activities section - if conflicting events are selected then the other checkboxes need to be disabled
 */
const activitesCheckboxes = $$('.activity-cb');
const totalPriceDiv = document.createElement('div');
let totalPrice = 0;
totalPriceDiv.innerHTML = `Your total price: <span class="money-green">$${totalPrice}.00</span>`;
$('fieldset.activities').appendChild(totalPriceDiv);

function activitesHandler() {
  //frameworks and express conflict
  if(this.parentElement.textContent.includes('Tuesday 9am-12pm')){
    activitesCheckboxes.forEach(cb => {
      if(cb.parentElement.textContent.includes('Tuesday 9am-12pm') && cb !== this && this.checked){
        cb.disabled = true;
        cb.parentElement.classList.add('disabled');
      } else if (cb.parentElement.textContent.includes('Tuesday 9am-12pm') && cb !== this && !this.checked) {
        cb.disabled = false;
        cb.parentElement.classList.remove('disabled');
      }
    });
  }
  //libraries and node  js conflict
  if(this.parentElement.textContent.includes('Tuesday 1pm-4pm')){
    activitesCheckboxes.forEach(cb => {
      if(cb.parentElement.textContent.includes('Tuesday 1pm-4pm') && cb !== this && this.checked){
        cb.disabled = true;
        cb.parentElement.classList.add('disabled');
      } else if(cb.parentElement.textContent.includes('Tuesday 1pm-4pm') && cb !== this && !this.checked) {
        cb.disabled = false;
        cb.parentElement.classList.remove('disabled');
      }
    });
  }    
}

//main conferernce is $200 everything else is $100
function sumActivities(){
  //if checked add
  if (this.name !== 'all' && this.checked) {
    totalPrice += 100;
  } else if (this.name === 'all' && this.checked) {
    totalPrice += 200;
  }
  //if unchecked subtract
  if (this.name !== 'all' && !this.checked) {
    totalPrice -= 100;
  } else if (this.name === 'all' && !this.checked) {
    totalPrice -= 200;
  }

  if (totalPrice < 0) {
    totalPrice = 0;
  }
  totalPriceDiv.innerHTML = `Your total price: <span class="money-green">$${totalPrice}.00</span>`;
}

activitesCheckboxes.on('change', activitesHandler);
activitesCheckboxes.on('change', sumActivities);
// ===============================================================//



/**
 * Payment Section
 *  show the appropriate payment option(credit, bitcoin, or paypal) depending on what option is selected
 *  default to credit card
 */
const creditCardDiv = $('div#credit-card');
const paypalDiv = $('div#paypal');
const bitcoinDiv = $('div#bitcoin');
const alertUserDiv = $('div.alert-user');
$('option[value="credit card"]').selected = true;

function togglePaymentDivs(show, hide1, hide2, hide3){
  show.style.display = 'block';
  hide1.style.display = 'none';
  hide2.style.display = 'none';
  hide3.style.display = 'none';
}

togglePaymentDivs(creditCardDiv, paypalDiv, bitcoinDiv, alertUserDiv); //show the credit card div by default

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
// ===============================================================//


/**
 * Form Validation
 *  The following section will validate the form on submit
 */

function addInvalidText(element, message){
  element.classList.add('invalid-text');
  element.textContent = message;
}

function removeInvalidText(element, message){
  element.classList.remove('invalid-text');
  element.textContent = message;
}

function highlightInvalidInput(input, labelTarget, message){
  input.focus();
  const inputLabel = $(`label[for=${labelTarget}]`)
  input.classList.add('invalid');
  inputLabel.classList.add('invalid-text')
  inputLabel.textContent = message;
}

function removeInvalidHighlighter(input, labelTarget, message){
  const inputLabel = $(`label[for=${labelTarget}]`);
  input.classList.remove('invalid');
  inputLabel.classList.remove('invalid-text');
  inputLabel.textContent = message;
}

function validateName(e){
  const nameInput = $('input#name');
  if (!nameRegex.test(nameInput.value)) {
    e.preventDefault();
    highlightInvalidInput(nameInput, 'name', 'Please enter your name, no numbers or special characters!');
  } else {
    removeInvalidHighlighter(nameInput, 'name', 'Name:');
  }
}

function validateEmail(e){
  const emailInput = $('#mail');
  if (!emailRegex.test(emailInput.value)) {
    e.preventDefault();
    highlightInvalidInput(emailInput, 'mail', 'Please enter a valid email address');
  } else {
    removeInvalidHighlighter(emailInput, 'mail', 'Email:');
  }
}

//have a counter that ticks down each time an activity box is unchecked
    //if counter hits zero then we know all boxes are unchecked and we must alert user
function checkActivities(e){
  const activitiesLegend = $('fieldset.activities legend');
  let cbCounter = activitesCheckboxes.length;

  activitesCheckboxes.forEach(cb => {
    if(!cb.checked){
      cbCounter--;
    }
  });
  if (cbCounter === 0) {
    e.preventDefault();
    addInvalidText(activitiesLegend, 'Please choose at least one activity!');
  } else if (cbCounter > 0) {
    removeInvalidText(activitiesLegend, 'Register for Activities');
  }
}

function isPaymentSelected(e){
  const paymentLegend = $('fieldset.payment-info legend');
  if ($('option[value="select_method"]').selected) {
    e.preventDefault();
    addInvalidText(paymentLegend, 'Please choose a payment method!');
  } else {
    removeInvalidText(paymentLegend, 'Payment Info');
  }
}

const ccOption = $('option[value="credit card"]');

function validateCreditCard(e) {
  const ccInput = $('#cc-num');
  if (ccOption.selected) {
    if (!ccRegex.test(ccInput.value)) {
      e.preventDefault();
      highlightInvalidInput(ccInput, 'cc-num', 'Enter a 13-16 digit card number');
    } else {
      removeInvalidHighlighter(ccInput, 'cc-num', 'Card Number:');
    }
  }
}

function validateZipCode(e){
  const zipCodeInput = $('#zip');
  if (ccOption.selected) {
    if (!zipRegex.test(zipCodeInput.value)) {
      e.preventDefault();
      highlightInvalidInput(zipCodeInput, 'zip', 'Enter a 5 digit zip code');
    } else {
      removeInvalidHighlighter(zipCodeInput, 'zip', 'Zip Code:');
    }
  }
}

function validateCVV(e){
  const cvvInput = $('#cvv');
  if (ccOption.selected) {
    if(!cvvRegex.test(cvvInput.value)){
      e.preventDefault();
      highlightInvalidInput(cvvInput, 'cvv', 'Enter a 3 digit cvv');
    } else {
      removeInvalidHighlighter(cvvInput, 'cvv', 'CVV:');
    }
  } 
}

function validateForm(e){
  validateName(e);
  validateEmail(e);
  checkActivities(e);
  isPaymentSelected(e);
  validateCreditCard(e);
  validateZipCode(e);
  validateCVV(e);
  console.log(e)
}

$('form').addEventListener('submit', validateForm);
// ===============================================================//


/**
 * Realtime Validation
    shows a tooltip if a field is invalid, updates as user provides input
 */
function showOrHideTip(show, element){
  if (show){
    element.style.display = 'inherit';
  } else {
    element.style.display = 'none'
  }
}

function showOrRemoveHighlight(show, element){
  if(show){
    element.classList.add('invalid');
  } else {
    element.classList.remove('invalid');
  }
}

function isValidName(name){
  return nameRegex.test(name)
}

function isValidEmail(email){
  return emailRegex.test(email)
}

function isValidCvv(cvv){
  return cvvRegex.test(cvv)
}

function isValidZip(zip){
  return zipRegex.test(zip);
}

function isValidCC(ccNum){
  return ccRegex.test(ccNum)
}

function createEventListener(validator){
  return e => {
    const text = e.target.value;
    const valid = validator(text);
    const alertUser = text !== '' && !valid;
    const tooltip = e.target.nextElementSibling;
    showOrRemoveHighlight(alertUser, e.target)
    showOrHideTip(alertUser, tooltip);
  }
}

$('#mail').addEventListener('input', createEventListener(isValidEmail))
$('#name').addEventListener('input', createEventListener(isValidName))
$('#cvv').addEventListener('input', createEventListener(isValidCvv))
$('#zip').addEventListener('input', createEventListener(isValidZip))
$('#cc-num').addEventListener('input', createEventListener(isValidCC))
// ===============================================================//


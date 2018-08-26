//////START BLING.JS
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
//////END BLING.JS

$('input#name').focus();

//1)JOB ROLE SECTION --> show/hide 'other' field
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

//2) T-SHIRT SECTION --> hide color opions until selection is made in the design select menu
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

  //3)ACTIVITIES SECTION --> if conflicting events are selected then the other checkboxes need to be disabled
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

  //4) PAYMENT SECTION --> show the appropriate div if the related option is selected cc, bitcoin, paypal
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

//5) FORM VALIDATION
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

//name input should only be letters and spaces, and cant be blank
function checkName(e){
  const nameInput = $('input#name');
  if (nameInput.value.trim().length === 0 || !(/^[a-zA-Z\s]*$/).test(nameInput.value)) {
    e.preventDefault();
    highlightInvalidInput(nameInput, 'name', 'Please enter your name, no numbers or symbols!');
  } else {
    removeInvalidHighlighter(nameInput, 'name', 'Name:');
  }
}

  //email cant be blank and must be a properly formatted email
  function checkEmail(e){
    const emailInput = $('#mail');
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim().length === 0 || !emailRegEx.test(emailInput.value)) {
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
    addInvalidText(activitiesLegend, 'Please choose atleast one activity!');
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
//between 13 and 16 digits numbers only
function validateCreditCard(e) {
  const ccInput = $('#cc-num');
  if (ccOption.selected) {
    if (isNaN(ccInput.value) || ccInput.value.trim().length < 13 || ccInput.value.trim().length > 16) {
      e.preventDefault();
      highlightInvalidInput(ccInput, 'cc-num', 'Please enter a 13-16 digit card number');
    } else {
      removeInvalidHighlighter(ccInput, 'cc-num', 'Card Number:');
    }
  }
}

//five digits numbers only
function validateZipCode(e){
  const zipCodeInput = $('#zip');
  if (ccOption.selected) {
    if (isNaN(zipCodeInput.value) || zipCodeInput.value.trim().length !== 5) {
      e.preventDefault();
      highlightInvalidInput(zipCodeInput, 'zip', 'Enter a 5 digit zip code');
    } else {
      removeInvalidHighlighter(zipCodeInput, 'zip', 'Zip Code:');
    }
  }
}

//three digits numbers only
function validateCVV(e){
  const cvvInput = $('#cvv');
  if (ccOption.selected) {
    if(isNaN(cvvInput.value) || cvvInput.value.trim().length !== 3){
      e.preventDefault();
      highlightInvalidInput(cvvInput, 'cvv', 'Enter a 3 digit cvv');
    } else {
      removeInvalidHighlighter(cvvInput, 'cvv', 'CVV:');
    }
  } 
}

function validateForm(e){
  checkName(e);
  checkEmail(e);
  checkActivities(e);
  isPaymentSelected(e);
  validateCreditCard(e);
  validateZipCode(e);
  validateCVV(e);
}

$('form').on('submit', validateForm);


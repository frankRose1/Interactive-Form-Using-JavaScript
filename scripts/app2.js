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

  //3)ACTIVITIES SECTION
    //if conflicting events are selected then the other checkboxes need to be disabled! and calculate total Price
  const activitesCheckboxes = $$('.activity-cb');
  const totalPriceDiv = document.createElement('div');
  let totalPrice = 0;
  totalPriceDiv.textContent = `Your total price: $${totalPrice}.00`;
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
    //if checkbox is checked add
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
    totalPriceDiv.textContent = `Your total price: $${totalPrice}.00`;
  }

 activitesCheckboxes.on('change', activitesHandler);
 activitesCheckboxes.on('change', sumActivities);

  //4) PAYMENT SECTION
    //default to the credit card option
    //show the appropriate div if the related option is selected cc, bitcoin, paypal
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

//5) form submission validation
    //email cant be blank and must be a proper email
    //atleast one activity must be selected
    //a payment method must be selected
      //if they choose credit card
        //inputs can only be numbers
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
function checkName(){
  const nameInput = $('input#name');
  if (nameInput.value.length === 0 || !(/^[a-zA-Z\s]*$/).test(nameInput.value)) {
    highlightInvalidInput(nameInput, 'name', 'Please enter your name, no numbers or symbols!');
  } else {
    removeInvalidHighlighter(nameInput, 'name', 'Name:');
  }
}

//have a counter that ticks down each time an activity box is unchecked
    //if counter hits zero then we know all boxes are unchecked and we must alert user
function checkActivities(){
  const activitiesLegend = $('fieldset.activities legend');
  let cbCounter = activitesCheckboxes.length;

  activitesCheckboxes.forEach(cb => {
    if(!cb.checked){
      cbCounter--;
    }
  });
  if (cbCounter === 0) {
    activitiesLegend.classList.add('invalid-text');
    activitiesLegend.textContent = 'Please choose atleast one activity!';
  } else if (cbCounter > 0) {
    activitiesLegend.classList.remove('invalid-text');
    activitiesLegend.textContent = 'Register for Activities';
  }
}

function validateForm(e){
  e.preventDefault();
  checkName();
  checkActivities();
}
$('form').on('submit', validateForm);


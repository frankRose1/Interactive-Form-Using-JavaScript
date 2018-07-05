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
    //name cant be blank
    //email cant be blank and must be a proper email
    //atleast one activity must be selected
    //a payment method must be selected
      //if they choose credit card
        //inputs can only be numbers
function checkName(){
  const nameField = $('input#name');
  if (nameField.value.length === 0) {
    nameField.focus();
    alert('give us your name!');
  }
}

function validateForm(e){
  e.preventDefault();
  checkName();
}
$('form').on('submit', validateForm);


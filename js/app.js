const form = document.querySelector('form');
const fieldSet1 = document.querySelectorAll('fieldset')[0];
const nameInput = document.getElementById('name');
const jobRole = document.getElementById('title');
const jobOptions = jobRole.children;
//t-shirt section
const shirtDesign = document.getElementById('design');
const shirtColor = document.getElementById('color');


// When the page loads, give focus to the first text field
window.addEventListener('load', () => {
  nameInput.focus({preventScroll: false});
});


//                                                         JOB ROLE SECTION
// STEP 2 -> ”Job Role” section of the form:
// A text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
// Give the field an id of “other-title,” and add the placeholder text of "Your Job Role" to the field.
jobRole.addEventListener('change', (e) => {
  //create the text field
  const otherLabel = document.createElement('label');
  otherLabel.htmlFor = 'other-title';
  const otherInput = document.createElement('input');
  otherInput.type = 'text';
  otherInput.id = 'other-title';
  otherInput.placeholder = 'Your Job Role';
  otherLabel.appendChild(otherInput);
  //if user selects 'other' from the dropdown, append the textfield to the end of the fieldset
    if (e.target.value === "other") {
      fieldSet1.appendChild(otherLabel);
    }
});

//                                                         T-SHIRT SECTION
//t-shirt color options
const cornFlowerBlue = document.querySelector('option[value ="cornflowerblue"]');
const darkSlateGrey = document.querySelector('option[value ="darkslategrey"]');
const gold = document.querySelector('option[value ="gold"]');

const tomato = document.querySelector('option[value ="tomato"]');
const steelBlue = document.querySelector('option[value ="steelblue"]');
const dimGrey = document.querySelector('option[value ="dimgrey"]');
function removeColorOptions() {
  shirtColor.removeChild(cornFlowerBlue);
  shirtColor.removeChild(darkSlateGrey);
  shirtColor.removeChild(gold);
  shirtColor.removeChild(tomato);
  shirtColor.removeChild(steelBlue);
  shirtColor.removeChild(dimGrey);
}
removeColorOptions();

// If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
// If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
shirtDesign.addEventListener('change', (e) => {
   if (e.target.value == 'js puns') {
     shirtColor.appendChild(cornFlowerBlue);
     shirtColor.appendChild(darkSlateGrey);
     shirtColor.appendChild(gold);
     //remove other shirt colors if active
     shirtColor.removeChild(tomato);
     shirtColor.removeChild(steelBlue);
     shirtColor.removeChild(dimGrey);
   } else if (e.target.value == 'heart js') {
     shirtColor.appendChild(tomato);
     shirtColor.appendChild(steelBlue);
     shirtColor.appendChild(dimGrey);
      //remove other shirt colors if active
     shirtColor.removeChild(cornFlowerBlue);
     shirtColor.removeChild(darkSlateGrey);
     shirtColor.removeChild(gold);
   } else {
     removeColorOptions();
   }
 });



//                                                         ACTIVITIES SECTION

const activitiesFieldSet = document.querySelector('.activities');
const activitiesCheckbox = document.querySelectorAll('.activities input[type="checkbox"]');
  //individual checkbox activities
const jsFrameworks = activitiesCheckbox[1];
const jsLibs = activitiesCheckbox[2];
const express = activitiesCheckbox[3];
const node = activitiesCheckbox[4];
const buildTools = activitiesCheckbox[5];
const npm = activitiesCheckbox[6];
const activitiesLabel = document.querySelector('.activities label');
const totalCostDiv = document.createElement('div');
let totalCost = 0;

activitiesFieldSet.addEventListener('change', (e) => {
  // use .substr to target the cost at the end of each string inside the otherLabel
  //accumulate the cost in a variable as the user clicks on various avtivites
  //then add the total to the totalCostDiv that has been created
 if (e.target.tagName === 'INPUT') {
   const accumulatedCost = parseInt(e.target.parentNode.textContent.substr(-3));
   if (e.target.checked) {
     totalCost += accumulatedCost;
   } else {
     totalCost -= accumulatedCost;
   }
   totalCostDiv.textContent = `Your total cost is: $${totalCost}`;
   activitiesFieldSet.appendChild(totalCostDiv);
 }

  //specific checkboxes must be disabled if their scheduled time conflicts
  // with another activity
  if (jsFrameworks.checked) {
    express.disabled = true;
  } else {
    express.disabled = false;
  }
  if (express.checked) {
    jsFrameworks.disabled = true;
  } else {
    jsFrameworks.disabled = false;
  }
  if (jsLibs.checked) {
    node.disabled = true;
  } else {
    node.disabled = false;
  }
  if (node.checked) {
    jsLibs.disabled = true;
  } else {
    jsLibs.disabled = false;
  }
});

//                                    PAYMENT INFO section
// Display payment sections based on the payment option chosen in the select menu
const paymentOptions = document.getElementById('payment');
const creditCardInfo = document.getElementById('credit-card');
const creditCardOption = document.querySelector('#payment option[value="credit card"]');
const paypalInfo = document.querySelectorAll('div p')[0];
const bitCoinInfo = document.querySelectorAll('div p')[1];

creditCardOption.selected = 'selected';//set credit card as the default payment option
//hide the paypal and bitcoin sections by default
paypalInfo.style.display = 'none';
bitCoinInfo.style.display = 'none';
// show/hide payment section based on what user selects from the payment options dropdown menu
paymentOptions.addEventListener('change', (e) => {
  if (e.target.value === 'paypal' ) {
    paypalInfo.style.display = 'block';
    creditCardInfo.style.display = 'none';
    bitCoinInfo.style.display = 'none';
  } else if (e.target.value === 'bitcoin') {
    bitCoinInfo.style.display = 'block';
    creditCardInfo.style.display = 'none';
    paypalInfo.style.display = 'none';
  } else if ((e.target.value === 'credit card')) {
    creditCardInfo.style.display = 'block';
    bitCoinInfo.style.display = 'none';
    paypalInfo.style.display = 'none';
  } else {
    creditCardInfo.style.display = 'none';
    bitCoinInfo.style.display = 'none';
    paypalInfo.style.display = 'none';
  }
});



// Form validation:
// If any of the following validation errors exist, prevent the user from submitting the form:

// Name field can't be blank

// Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example.

// Must select at least one checkbox under the "Register for Activities" section of the form.

form.addEventListener('submit', (e) => {
      e.preventDefault();
  //validate name section, name field cant be blank
  const nameLabel = document.querySelector('label[for="name"]');
  let usersName = nameInput.value;
  if (usersName === '') {
    nameInput.focus();
    nameInput.classList.add('invalid');
    nameLabel.classList.add('invalid-text');
    nameLabel.textContent = "Please enter your full name";
  } else {
    nameInput.classList.remove('invalid');
    nameLabel.classList.remove('invalid-text');
    nameLabel.textContent = "Name:";
  }

  //validate email
  const emailInput = document.getElementById('mail');
  let userEmail = document.getElementById('mail').value; //gets user email input
  let atPosition = userEmail.indexOf('@'); //gets position of @ symbol
  let dotPosition = userEmail.lastIndexOf('.'); //gets position of .symbol
  const emailLabel = document.querySelector('label[for="mail"]');
  //checks to see if the @ symbol is not the first character of the Email
  //and the dot is atleast one character after the @ sign
  if (atPosition < 1 || (dotPosition - atPosition < 2 || userEmail.value === '') ) {
    emailLabel.focus();
    emailInput.classList.add('invalid');
    emailLabel.classList.add('invalid-text');
    emailLabel.textContent = "Please enter a valid email (e.g. johndoe@gmail.com)";
  } else {
      emailInput.classList.remove('invalid');
      emailLabel.classList.remove('invalid-text');
      emailLabel.textContent = "Email:";
  }
  //register for activites section
  //atleast one checkbox must be selected
  // for (let i = 0; i < activitiesCheckbox.length; i++) {
  //   if (activitiesCheckbox[i].checked === false) {
  //       activitiesFieldSet.focus();
  //   }
  // }

  // If the selected payment option is "Credit Card," make sure the user has supplied a credit card number,
  const submitButton = document.querySelector('button[type="submit"]');
  const ccNumber = document.getElementById('cc-num');
  const ccNumLabel = document.querySelector('label[for="cc-num"]');
  const zipCode = document.getElementById('zip');
  const zipcodeLabel = document.querySelector('label[for="zip"]');
  const cvvNumber = document.getElementById('cvv');
  const cvvLabel = document.querySelector('label[for="cvv"]');

  if (creditCardOption.selected) {

    //check to make sure credit card field isn't blank, is proper length, and is only numbers
    if(ccNumber.value === '' || isNaN(ccNumber.value) === true || ccNumber.value.length > 16 || ccNumber.value.length < 13) {
        ccNumber.focus();
        ccNumber.classList.add('invalid');
        ccNumLabel.classList.add('invalid-text');
        ccNumLabel.innerText = 'Please enter a 13-16 digit card number';
    } else {
      ccNumber.classList.remove('invalid');
      ccNumLabel.classList.remove('invalid-text');
      ccNumLabel.innerText = 'Card Number:';
    }
     //check to make sure zip code is not left blank, is 5 digits, and is only numbers
     if(zipCode.value === '' || isNaN(zipCode.value) === true || zipCode.value.length !== 5) {
         zipCode.focus();
         zipCode.classList.add('invalid');
         zipcodeLabel.classList.add('invalid-text');
         zipcodeLabel.innerText = 'Enter a 5 digit zip code';
     } else {
       zipCode.classList.remove('invalid');
       zipcodeLabel.classList.remove('invalid-text');
       zipcodeLabel.innerText = 'Zip Code:';
     }
    //check to make sure cvv is not left blank, is 3 digits, and is only numbers
     if(cvvNumber.value === '' || isNaN(cvvNumber.value) === true || cvvNumber.value.length !== 3) {
         cvvNumber.focus();
         cvvNumber.classList.add('invalid');
         cvvLabel.classList.add('invalid-text');
         cvvLabel.innerText = 'Enter a 3 digit cvv';
     } else {
       cvvNumber.classList.remove('invalid');
       cvvLabel.classList.remove('invalid-text');
       cvvLabel.innerText = 'CVV:';
     }
  } //end of "if credit card was selected"
});

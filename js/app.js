const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const jobRole = document.getElementById('title');
const otherJobField = document.getElementById('other-title');
otherJobField.style.display = 'none';
//T-SHIRT VARIABLES
const shirtColors = document.querySelectorAll('#color option');
const shirtDesign = document.getElementById('design');
const shirtColorMenu = document.getElementById('color');
const informUser = createColors('default', 'Select a T-shirt theme');
const cornFlowerBlue = createColors('cornflowerblue', 'Cornflower Blue');
const darkSlateGrey = createColors('darkslategrey', 'Dark Slate Grey');
const gold = createColors('gold', 'Gold');
const tomato = createColors('tomato', 'Tomato');
const steelBlue = createColors('steelblue', 'Steel Blue');
const dimGrey = createColors('dimgrey', 'Dim Grey');

// When the page loads, give focus to the first text field
window.addEventListener('load', () => {
  nameInput.focus({preventScroll: false});
});

//                                                         JOB ROLE SECTION
// A text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
jobRole.addEventListener('change', (e) => {
    if (e.target.value === "other") {
     otherJobField.style.display = 'block';
    } else {
    otherJobField.style.display = 'none';
    }
});
//                                                         T-SHIRT SECTION
//create t-shirt color variables
function createColors(value, innerText) {
  const shirtColor = document.createElement('option');
  shirtColor.value = value;
  shirtColor.innerText = innerText;
  return shirtColor;
}
//hide all of the color options to start
shirtColors.forEach(color => {
  shirtColorMenu.removeChild(color);
});
//inform the user to choose a theme
shirtColorMenu.appendChild(informUser);
informUser.setAttribute('selected', true);
// If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
// If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
shirtDesign.addEventListener('change', (e) => {
    const shirtColorMenu = document.getElementById('color');
    const shirtColors = document.querySelectorAll('#color option');

    shirtColors.forEach(color => {
      shirtColorMenu.removeChild(color);
    });

      if (e.target.value === "js puns") {
       shirtColorMenu.appendChild(cornFlowerBlue);
       shirtColorMenu.appendChild(darkSlateGrey);
       shirtColorMenu.appendChild(gold);
    } else if (e.target.value === "heart js") {
       shirtColorMenu.appendChild(tomato);
       shirtColorMenu.appendChild(steelBlue);
       shirtColorMenu.appendChild(dimGrey);
    } else{
       shirtColorMenu.appendChild(informUser);
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
 if (e.target.type === 'checkbox') {
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
 //if a checkbox is disabled target the parent node and alter the text color to reflect event conflict
  for(let i = 0; i < activitiesCheckbox.length; i++) {
    if(activitiesCheckbox[i].disabled === true) {
      activitiesCheckbox[i].parentNode.style.color = "#C0C0C0";
    } else if (activitiesCheckbox[i].disabled === false) {
      activitiesCheckbox[i].parentNode.style.color = "#000";
    }
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
  //validate name section, name field cant be blank
  const nameLabel = document.querySelector('label[for="name"]');
  let usersName = nameInput.value;
  if (usersName === '') {
    e.preventDefault();
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
  const userEmail = document.getElementById('mail').value; //gets user email input
  const emailLabel = document.querySelector('label[for="mail"]');
  const pattern = /^(\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+[,;]?[ ]?)+$/;
  let evaluator = true;
  //tests user input against the reg-expression variable(pattern)
   if (pattern.test(userEmail) === true) {
      evaluator = true;
   } else {
     evaluator = false;
   }

  if (evaluator === false || userEmail === '' ) {
    e.preventDefault();
    emailLabel.focus();
    emailInput.classList.add('invalid');
    emailLabel.classList.add('invalid-text');
    emailLabel.textContent = "Please enter a valid email (e.g. johndoe@gmail.com)";
  } else {
      emailInput.classList.remove('invalid');
      emailLabel.classList.remove('invalid-text');
      emailLabel.textContent = "Email:";
  }

const activitiesLegend = document.querySelector('.activities legend');
 let activityTracker = 7; // there are 7 activities total
 //loop over the activity checkboxes
 //reduce the activityTracker by 1 for each unchecked input
 //if the tracker hits 0 alert the user to sign up for activity
  for (let i = 0; i < activitiesCheckbox.length; i++) {
    if (activitiesCheckbox[i].checked === false) {
        activityTracker -= 1;
    }
  }
  if (activityTracker === 0) {
    e.preventDefault();
    activitiesLegend.classList.add('invalid-text');
    activitiesLegend.textContent = "Please choose at least one activity!";
  } else {
    activitiesLegend.classList.remove('invalid-text');
    activitiesLegend.textContent = "Register for Activities";
  }

  // If the selected payment option is "Credit Card," make sure the user has supplied a credit card number,
  const submitButton = document.querySelector('button[type="submit"]');
  const ccNumber = document.getElementById('cc-num');
  const ccNumLabel = document.querySelector('label[for="cc-num"]');
  const zipCode = document.getElementById('zip');
  const zipcodeLabel = document.querySelector('label[for="zip"]');
  const cvvNumber = document.getElementById('cvv');
  const cvvLabel = document.querySelector('label[for="cvv"]');
  const selectOption = document.querySelector('option[value="select_method"]');
  const paymentLabel = document.querySelector('label[for="payment"]');
  //alert user if no payment method was selected
  if(selectOption.selected) {
    e.preventDefault();
    paymentLabel.classList.add('invalid-text');
    paymentLabel.textContent = "Please choose a payment method!";
  } else {
    paymentLabel.classList.remove('invalid-text');
    paymentLabel.textContent = "I'm going to pay with:";
  }

  if (creditCardOption.selected) {
    //check to make sure credit card field isn't blank, is proper length, and is only numbers
    if(ccNumber.value === '' || isNaN(ccNumber.value) === true || ccNumber.value.length > 16 || ccNumber.value.length < 13) {
      e.preventDefault();
        ccNumber.focus();
        ccNumber.classList.add('invalid');
        ccNumLabel.classList.add('invalid-text');
        ccNumLabel.innerText = 'Please enter a 13-16 digit card number';
    } else {
      ccNumber.classList.remove('invalid');
      ccNumLabel.classList.remove('invalid-text');
      ccNumLabel.innerText = 'Card Number:';
    }//end of ccnumber validation
     //check to make sure zip code is not left blank, is 5 digits, and is only numbers
     if(zipCode.value === '' || isNaN(zipCode.value) === true || zipCode.value.length !== 5) {
         e.preventDefault();
         zipCode.focus();
         zipCode.classList.add('invalid');
         zipcodeLabel.classList.add('sm-invalid-text');
         zipcodeLabel.innerText = 'Enter a 5 digit zip code';
     } else {
       zipCode.classList.remove('invalid');
       zipcodeLabel.classList.remove('sm-invalid-text');
       zipcodeLabel.innerText = 'Zip Code:';
     }//end of zip validation
    //check to make sure cvv is not left blank, is 3 digits, and is only numbers
     if(cvvNumber.value === '' || isNaN(cvvNumber.value) === true || cvvNumber.value.length !== 3) {
         e.preventDefault();
         cvvNumber.focus();
         cvvNumber.classList.add('invalid');
         cvvLabel.classList.add('invalid-text');
         cvvLabel.innerText = 'Enter a 3 digit cvv';
     } else {
       cvvNumber.classList.remove('invalid');
       cvvLabel.classList.remove('invalid-text');
       cvvLabel.innerText = 'CVV:';
     }//end of cvv validation
  } //end of "if credit card was selected"
});

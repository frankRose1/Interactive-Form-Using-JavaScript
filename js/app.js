const fieldSet1 = document.querySelectorAll('fieldset')[0];
const nameInput = document.getElementById('name');
const jobRole = document.getElementById('title');
const jobOptions = jobRole.children;
//t-shirt section
const shirtDesign = document.getElementById('design');
const shirtColor = document.getElementById('color');

//                                                         FOCUS SECTION

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
    } else if (e.target.value !== "other") {
      fieldSet1.removeChild(otherLabel);
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
  }
});

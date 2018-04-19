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
// STEP 4 ->
 // ”Register for Activities” section of the form:
 // Some events are at the same time as others. If the user selects a workshop, don't allow selection of a workshop at the same date and time -- you should
 //  disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.
 // When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.
 // As a user selects activities, a running total should display below the list of checkboxes. For example, if the user selects
 // "Main Conference", then Total: $200 should appear. If they add 1 workshop, the total should change to Total: $300.
const activitiesFieldSet = document.querySelector('.activities');
const activitiesCheckbox = document.querySelectorAll('.activities input[type="checkbox"]');
const activitiesLabel = document.querySelector('.activities label');
const totalCostDiv = document.createElement('div');
let totalCost = 0;

activitiesFieldSet.addEventListener('change', (e) => {
 if (e.target.tagName === 'INPUT') {
   // Get the cost of this activity
   const accumulatedCost = parseInt(e.target.parentNode.textContent.substr(-3));

   if (e.target.checked) {
     // If the checkbox is checked, add the dollar amount to a running total
     totalCost += accumulatedCost;
   } else {
     // If the checkbox is UNchecked, subtract the dollar amount
     totalCost -= accumulatedCost;
   }

   // Update grandTotal with the dollar amount
   totalCostDiv.textContent = `Your total cost is: $${totalCost}`;
   activitiesFieldSet.appendChild(totalCostDiv);
 }
});

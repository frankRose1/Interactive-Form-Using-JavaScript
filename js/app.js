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

     shirtColor.removeChild(tomato);
     shirtColor.removeChild(steelBlue);
     shirtColor.removeChild(dimGrey);
   }
   if (e.target.value == 'heart js') {
     shirtColor.appendChild(tomato);
     shirtColor.appendChild(steelBlue);
     shirtColor.appendChild(dimGrey);

     shirtColor.removeChild(cornFlowerBlue);
     shirtColor.removeChild(darkSlateGrey);
     shirtColor.removeChild(gold);
   }
 });

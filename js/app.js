const fieldSet1 = document.querySelectorAll('fieldset')[0];
const nameInput = document.getElementById('name');
const jobRole = document.getElementById('title');
const jobOptions = jobRole.children;


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

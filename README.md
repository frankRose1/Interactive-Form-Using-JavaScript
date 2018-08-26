# Interactive Form With Javascript
In this project I use JavaScript to create an interactive form including some client-side validation. Certain parts of the form come to life as the user interacts with it and error messages are shown if the form is submitted with invalid fields. See "App Features" for more info. Also as aprt of the project requirments this app was built with un-obtrusive JavaScript. I refactored this code a month or so after I first created it and I feel that the refactored version is much more concise and easier to read. The original code is in ```scripts/original_app.js``` if you wish to compare the difference.

## App Features

### Form Interaction
* Job Role Section - if a user selects "other" a text field is shown to collect more information, and hidden if the user selects a different option
* T-Shirt Section - each t-shirt design's color options are only shown when the correct corresponding design is clicked, and hidden otherwise
* Register For Activities Section:
    1. If an event with a conflicting time is selected, the other event's checkbox will be disabled and the text greyed out to convey the time conflict
    2. As the user checks/unchecks events, a total cost is updated dynamically and shown at the bottom of the div
* Payment Section: 
    1. When a user selects a payment option from the select menu, a corresponding div is show (e.g. selecting "credit card" will show a div with credit card inputs)
    2. If no payment option is selected, a warning will display notifying the user

### Form Validation
The form will not be submitted and error messages shown if the following criteria arn't met:

* Name Input - must not be blank and can only be letters
* Email Input - must not be blank and be a properly formatted email
* Activites Section - atleast one activity must be selected
* One of the payment options must be selected
* Credit card inputs:
    * CC number must be numbers only and be **between** 13 and 16 digits
    * Zip code must be numbers only and be equal to 5 digits
    * CVV must be numbers only and be equal to 3 digits

## Built With
* HTML
* CSS
* JavaScript

## Author
Frank Rosendorf
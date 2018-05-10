"use strict";

document.addEventListener("DOMContentLoaded", function() {
  // Get the submit button to detect click event
  var submitButton = document.getElementById("submit_button");
  var formInputs = document.querySelectorAll("input");
  var email = document.getElementById("email");
  var age = document.getElementById("age");
  var dob = document.getElementById("dob");
  var phoneNumber = document.getElementById("phoneNumber");
  var address = document.getElementById("address");
  var countrySelect = document.getElementById("country");

  var isFormValid = false;
  var errorMessage = "";

  // Populate Country List
  var request = new XMLHttpRequest();
  request.open("GET", "./countries.json", false);
  request.send(null);
  var countries = JSON.parse(request.responseText);
  countries.forEach(country => {
    var el = document.createElement("option");
    el.textContent = country.name;
    el.value = country.code;
    countrySelect.appendChild(el);
  });

  // Calculate Age First Time
  if (parseInt(dob.value)) {
    age.value = `${new Date().getFullYear() -
      new Date(dob.value).getFullYear()} years old`;
  }
  // Calculate Age
  dob.addEventListener("input", function() {
    if (parseInt(dob.value)) {
      age.value = `${new Date().getFullYear() -
        new Date(dob.value).getFullYear()} years old`;
    }
  });

  submitButton.addEventListener("click", function() {
    for (var item of formInputs) {
      // Simply check the valid states of inputs
      if (item.checkValidity()) {
        isFormValid = true;
      } else {
        isFormValid = false;
        errorMessage += `- ${item.id} is invalid \n\n`;
      }
    }

    if (address.checkValidity()) {
      isFormValid = true;
    } else {
      isFormValid = false;
      errorMessage += `Address invalid`;
    }

    // Check if email is correct.
    if (!email.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      isFormValid = false;
      errorMessage += "- Email is incorrect \n\n";
    }

    // Check if telephone number is valid.
    if (!phoneNumber.value.match(/^[0-9]+$/)) {
      //TODO: Can take it even further by pattern matching the digits.
      isFormValid = false;
      errorMessage += "- Phone Number is not a number \n\n";
    }

    if (phoneNumber.value.length !== 10) {
      isFormValid = false;
      errorMessage += "- PhoneNumber should be exactly 10 digits long \n\n";
    }

    if (!isFormValid) {
      alert(
        "Errors were found in form. Please correct them before submitting. \n\n" +
          errorMessage
      );
    } else {
      alert("Form Submission Successful!");
    }
    errorMessage = "";
  });
});

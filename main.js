const form = document.getElementById("testForm");
const emailInput = document.getElementById("email");
const countryInput = document.getElementById("country");
const zipInput = document.getElementById("zip");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const errorField = document.querySelector(".error");
const constraints = {
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
  zip: {
    Switzerland: [
      "^(CH-)?\\d{4}$",
      "Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950",
    ],
    France: [
      "^(F-)?\\d{5}$",
      "France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012",
    ],
    Germany: [
      "^(D-)?\\d{5}$",
      "Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345",
    ],
    Netherlands: [
      "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
      "Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
    ],
  },
  password: [
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
    "Your Password must contain 8 characters at minimum, with at least one uppercase letter, one lowercase letter, one number and one special character",
  ],
};

const handleInput = (() => {
  ///// checks that the user entered a valid email address
  ///
  const handleEmail = () => {
    const emailConstraint = new RegExp(constraints.email, "");
    if (emailConstraint.test(emailInput.value)) {
      emailInput.setCustomValidity("");
      emailInput.style.border = "2px solid lime";
    } else {
      emailInput.setCustomValidity(
        "Please enter a valid email address! For example: myname@gmail.com"
      );
      emailInput.reportValidity();
      emailInput.style.border = "2px solid red";
    }
  };
  /////// checks the zip codes based on the selected country
  ////
  const handleZip = () => {
    const country = countryInput.value;
    const zipChecker = new RegExp(constraints.zip[country][0], "");
    if (zipChecker.test(zipInput.value)) {
      zipInput.setCustomValidity("");
      zipInput.style.border = "2px solid lime";
    } else {
      zipInput.setCustomValidity(constraints.zip[country][1]);
      zipInput.reportValidity();
      zipInput.style.border = "2px solid red";
    }
  };

  ////// checks if the user has entered a pwd with 8 characters at minimum, and at least one uppercase letter, one lowercase letter, one number and one special character
  ///
  const handlePwdStr = () => {
    const passwordChecker = new RegExp(constraints.password[0]);
    if (passwordChecker.test(passwordInput.value)) {
      console.log(passwordChecker.test(passwordInput.value));
      passwordInput.style.border = "2px solid lime";
      passwordInput.setCustomValidity("");
    } else {
      passwordInput.setCustomValidity(constraints.password[1]);
      passwordInput.style.border = "2px solid red";
      passwordInput.reportValidity();
    }
  };
  /// checks if both the passwords match
  const handleConfirmPwd = () => {
    if (passwordInput.value === confirmPasswordInput.value) {
      confirmPasswordInput.style.border = "2px solid lime";
      confirmPasswordInput.setCustomValidity("");
    } else {
      confirmPasswordInput.style.border = "2px solid red";
      confirmPasswordInput.setCustomValidity(
        "Please Enter Matching Passwords!"
      );
      confirmPasswordInput.reportValidity();
    }
  };
  const isValid = () => {
    // Add your custom validation logic here
    const emailConstraint = new RegExp(constraints.email, "");
    const zipChecker = new RegExp(constraints.zip[countryInput.value][0], "");
    const passwordChecker = new RegExp(constraints.password[0]);

    const isEmailValid = emailConstraint.test(emailInput.value);
    const isZipValid = zipChecker.test(zipInput.value);
    const isPasswordValid = passwordChecker.test(passwordInput.value);
    const doPasswordsMatch = passwordInput.value === confirmPasswordInput.value;

    // Update this condition based on your requirements
    if (isEmailValid && isZipValid && isPasswordValid && doPasswordsMatch) {
      return true; // All conditions are met, the form is valid
    } else {
      return false; // One or more conditions are not met, the form is invalid
    }
  };

  return {
    handleEmail,
    handleZip,
    handlePwdStr,
    handleConfirmPwd,
    isValid,
  };
})();
emailInput.addEventListener("input", handleInput.handleEmail);
zipInput.addEventListener("input", handleInput.handleZip);
passwordInput.addEventListener("input", handleInput.handlePwdStr);
confirmPasswordInput.addEventListener("input", handleInput.handleConfirmPwd);
form.addEventListener("submit", (e) => {
  if (!handleInput.isValid()) {
    e.preventDefault();
    errorField.textContent = "Please verify your input";
    errorField.style.setProperty("display", "block", "important");
  } else {
    e.preventDefault();
    errorField.style.display = "block";
    errorField.textContent = "Form Submitted";
    errorField.style.border = "2px solid green";
    errorField.style.setProperty("display", "block", "important");
  }
});
console.log({
  form,
  emailInput,
  countryInput,
  zipInput,
  passwordInput,
  confirmPasswordInput,
  constraints,
  errorField,
});
console.log(constraints.password[0]);

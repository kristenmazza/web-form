const form = document.querySelector("form");
const email = document.getElementById("email");
const emailError = document.querySelector("#email + span.error");
const firstName = document.getElementById("fn");
const firstNameError = document.querySelector("#fn + span.error");
const lastName = document.getElementById("ln");
const lastNameError = document.querySelector("#ln + span.error");
const country = document.getElementById("country");
const countryError = document.querySelector("#country + span.error");
const zip = document.getElementById("zip");
const zipError = document.querySelector("#zip + span.error");
const zipRegExp = /^\d{5}(-\d{4})?(?!-)$/;
const password = document.getElementById("pw");
const passwordError = document.querySelector("#pw + span.error");
const pwRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
const password2 = document.getElementById("pw2");
const password2Error = document.querySelector("#pw2 + span.error");

function showHighFive() {
  const highFive = document.querySelector(".high-five");
  highFive.style.display = "block";
}

email.addEventListener("input", (e) => {
  if (email.validity.valid) {
    emailError.textContent = "";
    emailError.className = "error";
  } else {
    showError(email);
  }
});

firstName.addEventListener("input", (e) => {
  if (firstName.validity.valid) {
    firstNameError.textContent = "";
    firstNameError.className = "error";
  } else {
    showError(firstName);
  }
});

lastName.addEventListener("input", (e) => {
  if (lastName.validity.valid) {
    lastNameError.textContent = "";
    lastNameError.className = "error";
  } else {
    showError(lastName);
  }
});

country.addEventListener("input", (e) => {
  if (country.validity.valid) {
    countryError.textContent = "";
    countryError.className = "error";
  } else {
    showError(country);
  }
});

zip.addEventListener("input", (e) => {
  const isValid = zipRegExp.test(zip.value);
  if (isValid) {
    zipError.textContent = "";
    zipError.className = "error";
  } else {
    showError(zip);
  }
});

password.addEventListener("input", (e) => {
  const isValid = pwRegExp.test(password.value);
  if (isValid) {
    passwordError.textContent = "";
    passwordError.className = "error";
  } else {
    showError(password);
  }

  if (password2.value !== "") {
    if (password.value !== password2.value) {
      showPasswordMatchError();
    }
  }
});

password2.addEventListener("input", (e) => {
  if (password2.validity.valid) {
    password2Error.textContent = "";
    password2Error.className = "error";
  } else {
    showError(password2);
  }

  if (password.value !== password2.value) {
    showPasswordMatchError();
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!email.validity.valid) {
    showError(email);
  }

  if (!firstName.validity.valid) {
    showError(firstName);
  }

  if (!lastName.validity.valid) {
    showError(lastName);
  }

  if (!country.validity.valid) {
    showError(country);
  }

  if (!zip.validity.valid) {
    showError(zip);
  }

  if (!password.validity.valid) {
    showError(password);
  }

  if (!password2.validity.valid) {
    showError(password2);
  }

  if (password2.value !== password.value) {
    showPasswordMatchError();
  }

  if (form.checkValidity() && password2.value === password.value) {
    showHighFive();
  }
});

const errorMessages = {
  email: {
    valueMissing: "Enter an email address",
    typeMismatch: "Entered value needs to be an email address",
  },
  fn: {
    valueMissing: "Enter your first name",
  },
  ln: {
    valueMissing: "Enter your last name",
  },
  country: {
    valueMissing: "Enter your country",
  },
  zip: {
    invalid: "Enter a valid 5-digit zip code",
    valueMissing: "Enter your zip code",
  },
  pw: {
    valueMissing: "Enter a password",
    invalid:
      "Must be 6-20 characters with at least 1 number, 1 uppercase letter, & 1 lowercase letter",
  },
  pw2: {
    valueMissing: "Confirm your password",
    noMatch: "Passwords do not match",
  },
};

const errorFields = {
  email: emailError,
  fn: firstNameError,
  ln: lastNameError,
  country: countryError,
  zip: zipError,
  pw: passwordError,
  pw2: password2Error,
};

function showError(type) {
  const fieldId = type.getAttribute("id");
  const errors = errorMessages[fieldId];
  const errorField = errorFields[fieldId];
  if (type.validity.valueMissing) {
    errorField.textContent = errors.valueMissing;
  } else if (type.validity.typeMismatch) {
    errorField.textContent = errors.typeMismatch;
  } else if (fieldId === "zip" || fieldId === "pw") {
    errorField.textContent = errors.invalid;
  } else if (fieldId === "pw2") {
    errorField.textContent = errors.invalid;
  }
  errorField.className = "error active";
}

function showPasswordMatchError() {
  password2Error.textContent = errorMessages.pw2.noMatch;
  password2Error.className = "error active";
}

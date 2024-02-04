function isValid(formElement, inputElement, validationSettings) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings)
  } else {
    hideInputError(formElement, inputElement, validationSettings)
  }
}

function showInputError(formElement, inputElement, errorMessage, validationSettings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSettings.errorClass);
}

function hideInputError(formElement, inputElement, validationSettings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationSettings.inputErrorClass);
  errorElement.classList.remove(validationSettings.errorClass);
  errorElement.textContent = '';
}

function setEventListeners(formElement, validationSettings) {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationSettings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInput(formElement, inputElement, validationSettings);
      toggleButtonState(inputList, buttonElement, validationSettings);
    });
  });
}

function enableValidation(validationSettings) {
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationSettings);
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

function toggleButtonState(inputList, buttonElement, validationSettings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationSettings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationSettings.inactiveButtonClass);
  }
};

function checkInput(formElement, inputElement, validationSettings) {
  if (validationSettings.inputsToValidate.includes(inputElement.id)) {
    if (!validationSettings.inputRegex.test(inputElement.value)) {
      inputElement.setAttribute('data-error-message', validationSettings.customErrorMessage);
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity('')
      inputElement.removeAttribute('data-error-message');
    }
  }

  isValid(formElement, inputElement, validationSettings);
}

function clearValidation(formElement, validationSettings) {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector))
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector)

  inputList.forEach((inputElement) => {
    inputElement.setCustomValidity('');
    inputElement.removeAttribute('data-error-message');
    hideInputError(formElement, inputElement, validationSettings);
  })

  buttonElement.classList.add(validationSettings.inactiveButtonClass)
  buttonElement.disabled = true;
}

export { clearValidation, enableValidation };


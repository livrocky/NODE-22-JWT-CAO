// eslint-disable-next-line import/no-mutable-exports
export let errorsArr = [];

// export function clearErrors() {
//   // errorsArr = [];
//   clearErrorsArr();
//   errorMsg.forEach((htmlElement) => {
//     // eslint-disable-next-line no-param-reassign
//     htmlElement.textContent = '';
//     htmlElement.previousElementSibling.classList.remove('invalid-input');
//   });
// }

export function clearErrorsArr() {
  errorsArr = [];
}

function addError(message, field) {
  errorsArr.push({
    message,
    field,
  });
}

function checkRequired(value, field) {
  if (value === '') {
    addError('this field is required', field);
    return true;
  }
  return false;
}

function checkMinLength(value, minLength, field) {
  if (value.length <= minLength) {
    addError(`length must be greater than ${minLength}`, field);
  }
}

// rules ['required', 'minLength-4', 'minLength-5', 'maxLength-10', 'email']
export function checkInput(valueToCheck, field, rulesArr) {
  // eslint-disable-next-line no-restricted-syntax
  for (const rule of rulesArr) {
    // rule === required
    if (rule === 'required') {
      if (checkRequired(valueToCheck, field)) {
        return;
      }
    }
    // // rule === positive
    // if (rule === 'positive') {
    //   if (valueToCheck < 0) {
    //     addError('must be positive', field);
    //     return;
    //   }
    // }

    // rule === minLength-X
    if (rule.split('-')[0] === 'minLength') {
      const min = rule.split('-')[1];
      checkMinLength(valueToCheck, min, field);
    }

    // rule === maxLength-X
    if (rule.split('-')[0] === 'maxLength') {
      const max = rule.split('-')[1];
      if (valueToCheck.length >= max) {
        addError(`Too long. Length must be less than or equal ${max}`, field);
      }
    }
    // rule === email
    // rule = . after @
    if (rule === 'email') {
      console.log('tikrinam email');
      const etaFound = valueToCheck.split('@');
      if (etaFound.length !== 2) {
        addError(`Please check your e-mail`, field);
        return;
      }
      const dotFound = etaFound[1].includes('.');
      if (dotFound === false) {
        addError(`Please check your e-mail`, field);
      }
    }
  }
}

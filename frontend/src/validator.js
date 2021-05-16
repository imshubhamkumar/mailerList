const validator = require("validator");

const validateMailForm = payload => {
  const errors = {};
  const errorsList = [];
  let message = "";
  let isFormValid = true;

  if (!payload ||
    typeof payload.subject !== "string" ||
    payload.subject.trim().length === 0
  ) {
    isFormValid = false;
    errors.subject = "Please write the subject of the email.";
    errorsList.push("Please write the subject of the email.")
  }

  if (
    !payload ||
    typeof payload.message !== "string" ||
    payload.message.trim().length === 0
  ) {
    isFormValid = false;
    errors.message = "Please write the message of the email.";
    errorsList.push("Please write the message of the email.")
  }

  if (!isFormValid) {
    message = "Check the form for errors.";
  }

  return {
    success: isFormValid,
    message,
    errors,
    errorsList
  };

  };


const validateSubscribeForm = payload => {
    const errors = {};
    const errorsList = [];
    let message = "";
    let isFormValid = true;
  
    if (
      !payload ||
      typeof payload.fullName !== "string" ||
      payload.fullName.trim().length === 0
    ) {
      isFormValid = false;
      errors.subject = "Please provide a Full name.";
      errorsList.push("Please provide a Full Name.")
    }
  
    if (
      !payload ||
      typeof payload.email !== "string" ||
      !validator.isEmail(payload.email)
    ) {
      isFormValid = false;
      errors.email = "Please write the email.";
      errorsList.push("Please write the email.")
    }

    if (!isFormValid) {
      message = "Check the form for errors.";
    }
  
    return {
      success: isFormValid,
      message,
      errors,
      errorsList
    };
  
    };
  
  module.exports = {
    validateMailForm: validateMailForm,
    validateSubscribeForm: validateSubscribeForm
  };
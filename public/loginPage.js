"use strict"

const userForm = new UserForm();

function checkResponse(response, method) {
  if (response.success) {
    location.reload();
  } else {
    userForm[method](response.error);
  }
}

userForm.loginFormCallback = (data) => {
  ApiConnector.login(data, response => {
    checkResponse(response, 'setLoginErrorMessage');
  });
};

userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, response => {
    checkResponse(response, 'setRegisterErrorMessage');
  });
};

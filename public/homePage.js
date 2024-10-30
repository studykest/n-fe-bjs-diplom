"use strict"

const logoutButton = new LogoutButton();

function checkResponse(response) {
  if (response.success === true) {
    location.reload();
  } else {
    response.error;
  }
}

logoutButton.action = () => {
  ApiConnector.logout(checkResponse);
};

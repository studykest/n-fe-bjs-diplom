"use strict"

const logoutButton = new LogoutButton();

function checkResponse(response) {
  if (response.success) {
    location.reload();
  } else {
    response.error;
  }
}

logoutButton.action = () => {
  ApiConnector.logout(checkResponse);
};

ApiConnector.current(response => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  } else {
    response.error;
  }
});

"use strict"
// Выход из личного кабинета
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

// Получение информации о пользователе
ApiConnector.current(response => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  } else {
    response.error;
  }
});

// Получение текущих курсов валюты
const ratesBoard = new RatesBoard();

function showRatesBoard() {
  ApiConnector.getStocks(response => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    } else {
      response.error;
    }
  });
}

setInterval(showRatesBoard, 1000);

// Операции с деньгами
const moneyManager = new MoneyManager();

function checkResponseMoneyManager(response, message) {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
    moneyManager.setMessage(response.success, message);
  } else {
    moneyManager.setMessage(response.success, response.error);
  }
}

moneyManager.addMoneyCallback = (data) => {
  let message = `Счёт пополнен: ${data.amount} ${data.currency}`;
  ApiConnector.addMoney(data, response => checkResponseMoneyManager(response, message));
};

moneyManager.conversionMoneyCallback = (data) => {
  let message = `Конвертация валюты: ${data.fromAmount} ${data.fromCurrency} в ${data.targetCurrency}`;
  ApiConnector.convertMoney(data, response => checkResponseMoneyManager(response, message));
};

moneyManager.sendMoneyCallback = (data) => {
  let message = `Перевод валюты: ${data.amount} ${data.currency}`;
  ApiConnector.transferMoney(data, response => checkResponseMoneyManager(response, message));
};

// Работа с избранным
const favoritesWidget = new FavoritesWidget();

function checkResponseFavoritesWidget(response) {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  } else {
    response.error;
  }
}

ApiConnector.getFavorites(checkResponseFavoritesWidget);

favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, checkResponseFavoritesWidget);
  favoritesWidget.setMessage(data.id, 'Добавлен новый пользователь');
}

favoritesWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, checkResponseFavoritesWidget);
  favoritesWidget.setMessage(data.id, 'Удалён пользователь');
}

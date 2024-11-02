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
  let message = `Счёт пополнен на сумму: ${data.amount} ${data.currency}`;
  ApiConnector.addMoney(data, response => checkResponseMoneyManager(response, message));
};

moneyManager.conversionMoneyCallback = (data) => {
  let message = `Конвертация валют прошла успешно: ${data.fromAmount} ${data.fromCurrency} в ${data.targetCurrency}`;
  ApiConnector.convertMoney(data, response => checkResponseMoneyManager(response, message));
};

moneyManager.sendMoneyCallback = (data) => {
  let message = `Перевод валют прошла успешно: ${data.amount} ${data.currency}`;
  ApiConnector.transferMoney(data, response => checkResponseMoneyManager(response, message));
};

﻿(function () {
  'use strict';

  var passengersDropdown = document.getElementById('PassengersCount'),
      travellerClassRadioButtons = document.getElementsByName('TravellerClass'),
      priceDisplay = document.getElementsByClassName('currency')[0],
      priceInput = document.getElementById('PriceInput'),
      currencySymbol = moneyToFloat(priceDisplay.innerHTML).symbol,
      originalPrice = moneyToFloat(priceDisplay.innerHTML).value,
      BUSINESS_CLASS_COEF = 1.50,
      isBusinessClass = false,
      radioButtonsArray;

  passengersDropdown.addEventListener('change', function (el) {
    if (isBusinessClass) {
      priceDisplay.innerHTML = currencySymbol + ' ' + parseFloat(parseFloat(originalPrice)
                                     * parseInt(passengersDropdown.value)
                                     * BUSINESS_CLASS_COEF).toFixed(2);
    } else {
      priceDisplay.innerHTML = currencySymbol + ' ' + parseFloat(parseFloat(originalPrice)
                                     * parseInt(passengersDropdown.value)).toFixed(2);
    }
  });

  radioButtonsArray = [].slice.call(travellerClassRadioButtons);
  radioButtonsArray.forEach(function (el, index) {
    el.onchange = function () {
      isBusinessClass = !isBusinessClass;
      priceDisplay.innerHTML = currencySymbol + ' ' + parseFloat(parseFloat(originalPrice)
                                  * parseFloat(passengersDropdown.value)).toFixed(2);

      if (isBusinessClass) {
        priceDisplay.innerHTML = currencySymbol + ' ' + parseFloat(parseFloat(originalPrice)
                                * parseFloat(passengersDropdown.value) * BUSINESS_CLASS_COEF).toFixed(2);
      }
    }
  });

  function moneyToFloat(money) {
    if (typeof money !== 'string') {
      throw new Error('Money should be string');
    }

    var currencySymbol = money[0];
    var value = money.substr(2, money.length - 1);

    return {
      symbol: currencySymbol,
      value: value
    };
  }
}());
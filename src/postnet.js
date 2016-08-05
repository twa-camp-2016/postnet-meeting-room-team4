'use strict';
let _ = require('lodash');
const allCodes = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];

function _isAllNumbers(array) {
    return _.every(array, n => '0' <= n && n <= '9');
}

function checkZipcode(inputZip) {
    let zipArray = _.split(inputZip, '');
    let length = inputZip.length;

    if (_isAllNumbers(zipArray) && [5, 9].includes(length)) return true;
    if (length === 10 && _.indexOf(zipArray, '-') === 5) {
        let tenArray = zipArray.filter(x=> x !== '-');
        return (_isAllNumbers(tenArray) && tenArray.length === 9);
    }
    return false;
}

function addCD(inputZip) {
    let sum = _(inputZip).split('').filter(x=> x !== '-').map(x=> _.parseInt(x)).sum();
    let cd = _.range(10).find(n => (sum + n) % 10 === 0);
    return inputZip + cd;
}

function exchangeZipcode(addedCDCode) {
    let code = [...addedCDCode].filter(x=> x !== '-').map(y=> allCodes[_.parseInt(y)]);
    return '|' + code.join('') + '|';
}

function zipcodeToBarcode(inputZip) {
    return checkZipcode(inputZip) ? exchangeZipcode(addCD(inputZip)) : 'error!!!';
}

function checkBarcode(inputBar) {
    let barArray = _.split(inputBar, '');
    let symbolCount = _(barArray).filter(x=> x !== '|' && x !== ':').size();
    let dividedCode = _.chain(barArray).slice(1, barArray.length - 1).chunk(5).value();

    if (_.head(barArray) !== '|' && _.last(barArray) !== '|') return false;
    if (symbolCount !== 0) return false;
    if (![32, 52].includes(barArray.length)) return false;
    return _.every(dividedCode, element=> _.filter(element, x=> x === '|').length === 2 && _.filter(element, x=> x === ':').length === 3);
}

function exchangeBarcode(inputBar) {
    let barArray = _.split(inputBar, '');
    let dividedCode = _.chain(barArray).slice(1, barArray.length - 1).chunk(5).value();

    return _(dividedCode).map(x=> _.indexOf(allCodes, x.join(''))).join('');
}

function checkCD(exchangedBarcode) {
    let sum = _(exchangedBarcode).split('').map(x=> _.parseInt(x)).sum();
    return sum % 10 === 0;
}

function getZipcode(exchangedBarcode) {
    return exchangedBarcode.slice(0, exchangedBarcode.length - 1);
}

function barcodeToZipcode(inputBar) {
    if (checkBarcode(inputBar)) {
        let exchangedBarcode = exchangeBarcode(inputBar);
        return checkCD(exchangedBarcode) ? getZipcode(exchangedBarcode) : 'error!!!';
    }
    return 'error!!!';
}

module.exports = {
    checkZipcode: checkZipcode,
    addCD: addCD,
    exchangeZipcode: exchangeZipcode,
    zipcodeToBarcode: zipcodeToBarcode,
    checkBarcode: checkBarcode,
    exchangeBarcode: exchangeBarcode,
    checkCD: checkCD,
    getZipcode: getZipcode,
    barcodeToZipcode: barcodeToZipcode
};
'use strict';
let _ = require('lodash');

function checkZipcode(inputZip) {
    let zipArray = _.split(inputZip, '');
    let length = inputZip.length;
    if ([5, 9, 10].includes(length)) {
        let symbolLength = _(zipArray)
            .map(element=> {
                if (_.isNaN(Number(element))) {
                    return element;
                }
            })
            .filter(x=> x !== undefined)
            .size();
        if (symbolLength === 0 && length !== 10) {
            return true;
        }
        if (symbolLength === 1) {
            //return _.indexOf(zipArray, '-') === 5 && length === 10 ? true : false;
            return !!(_.indexOf(zipArray, '-') === 5 && length === 10);
        }
        return false;
    }
    return false;
}

function addCD(inputZip) {
    let sum = _(inputZip).split('').filter(x=> x !== '-').map(x=> _.parseInt(x)).sum();
    let cd = (10 - sum % 10) === 10 ? 0 : 10 - sum % 10;
    return inputZip + cd;
}

function exchangeZipcode(addedCDCode) {
    let table = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    let code = _.chain(addedCDCode).split('').filter(x=> x !== '-').map(element=> {
        let index = _.parseInt(element);
        let code = '';
        code += table[index];
        return code;
    }).value();

    return '|' + code.join('') + '|';
}

function zipcodeToBarcode(inputZip) {
    let checkedZip = checkZipcode(inputZip);
    if (checkedZip === true) {
        let addedCDCode = addCD(inputZip);
        return exchangeZipcode(addedCDCode);
    } else {
        return 'error!!!'
    }
}

function checkBarcode(inputBar) {
    let barArray = _.split(inputBar, '');

    if (_.head(barArray) !== '|' && _.last(barArray) !== '|') return false;

    let symbolCount = _(barArray).filter(x=> x !== '|' && x !== ':').size();
    if (symbolCount !== 0) return false;

    if (barArray.length !== 32 && barArray.length !== 52) return false;
    let dividedCode = _.chain(barArray).slice(1, barArray.length - 1).chunk(5).value();

    return _.every(dividedCode, element=> _.filter(element, x=> x === '|').length === 2 && _.filter(element, x=> x === ':').length === 3);
}

function exchangeBarcode(inputBar) {
    let table = [
        {number: 1, code: ':::||'},
        {number: 2, code: '::|:|'},
        {number: 3, code: '::||:'},
        {number: 4, code: ':|::|'},
        {number: 5, code: ':|:|:'},
        {number: 6, code: ':||::'},
        {number: 7, code: '|:::|'},
        {number: 8, code: '|::|:'},
        {number: 9, code: '|:|::'},
        {number: 0, code: '||:::'}
    ];
    let barArray = _.split(inputBar, '');
    let dividedCode = _.chain(barArray).slice(1, barArray.length - 1).chunk(5).value();
    let barNumber = _.map(dividedCode, code=> {
        let a = _.find(table, x=> x.code === code.join(''));
        return a.number;
    });
    return barNumber.join('');
}

function checkCD(exchangedBarcode) {
    let sum = _(exchangedBarcode).split('').slice(0, exchangedBarcode.length - 1).map(x=> _.parseInt(x)).sum();
    let lastElement = _(exchangedBarcode).split('').last();

    return (sum + _.parseInt(lastElement)) % 10 === 0;
}

function getZipcode(exchangedBarcode) {
    return _(exchangedBarcode).split('').slice(0, exchangedBarcode.length - 1).join('');
}

function barcodeToZipcode(inputBar) {
    let checkedBar = checkBarcode(inputBar);
    if (checkedBar === true) {
        let exchangedBarcode = exchangeBarcode(inputBar);
        let checkedCD = checkCD(exchangedBarcode);
        if (checkedCD === true) {
            return getZipcode(exchangedBarcode);
        } else {
            return 'error!!!';
        }
    } else {
        return 'error!!!';
    }
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
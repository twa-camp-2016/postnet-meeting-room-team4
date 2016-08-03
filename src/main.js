"use strict";
let _ = require('lodash');
function checkZipCode(inputs) {
    let length = inputs.length;
    let array = _.chain(inputs).split(('')).map(x=>parseInt(x)).value();
    let containNaN = _.some(array, (x)=>_.isNaN(x));
    let arrayOfTen = _.split(inputs, (''));
    let newArray = _.filter(arrayOfTen, (x, index)=>index !== 5).map(x=>parseInt(x));
    let containsNaN = _.some(newArray, (x)=>_.isNaN(x));
    let arrays = _.filter(arrayOfTen, (x, index)=>index === 5);
    let isTrue = arrays[0] === '-';
    if (length === 5 && containNaN === false) return true;
    if (length === 9 && containNaN === false) return true;
    if (length === 10 && containsNaN === false && isTrue) return true;
    return false;
}

function getZipCheckCode(inputs) {
    let length = inputs.length;
    let checkedCode = checkZipCode(inputs);

    if (checkedCode && [5, 9, 10].includes(length)) {
        let filteredArray = _.chain(inputs)
            .split('')
            .filter(x=>x !== '-')
            .map(x=>parseInt(x))
            .value();
        let codeSum = _.sum(filteredArray);
        let checkCode = 10 - codeSum % 10;
        checkCode === 10 ? filteredArray.push(0) : filteredArray.push(checkCode);
        console.log(filteredArray.join(''));
        return filteredArray.join('');
    }
}
function _getBarcodeByNo(array, no) {
    return array.find((element) => element.no === no);
}
function barCodeItems() {
    return [{no: 1, barcode: ':::||'},
        {no: 2, barcode: '::|:|'},
        {no: 3, barcode: '::||:'},
        {no: 4, barcode: ':|::|'},
        {no: 5, barcode: ':|:|:'},
        {no: 6, barcode: ':||::'},
        {no: 7, barcode: '|:::|'},
        {no: 8, barcode: '|::|:'},
        {no: 9, barcode: '|:|::'},
        {no: 0, barcode: '||:::'}
    ]

}
function shiftZipCode(containCheckCode, codeItems) {
    let result = ['|'];
    let checkCodeArray = _.chain(containCheckCode)
        .split('')
        .map(x=>parseInt(x))
        .value();
    for (let code of checkCodeArray) {
        let found = _getBarcodeByNo(codeItems, code);
        if (found) {
            result.push(found.barcode);
        }
    }
    result.push('|');
    let barCode = result.join('');
    return barCode;
}

function checkBarCode(inputs) {
    let rightStartAndEnd = _.startsWith(inputs, '|') && _.endsWith(inputs, '|');
    let length = inputs.length;
    let a = _.split(inputs, (''));
    _.pullAt(a, 0, length - 1);
    let result = _.chain(a)
        .chunk(5)
        .value();
    let isCorrect = _.every(result, x=>_.filter(x, e=>e === '|').length === 2 && _.filter(x, e=>e === ':').length === 3);
    let q = (a.length / 5 === 6 || a.length / 5 === 10) && a.length % 5 === 0 && rightStartAndEnd && isCorrect ? true : false;
    return q;
}

function _getBarcodeByBarCode(array, barcode) {
    return array.find((element) => element.barcode === barcode);
}

function shiftBarCode(inputs, codeItems) {
    let result = [];
    let length = inputs.length;
    let barCodeArray = _.split(inputs, (''));
    _.pullAt(barCodeArray, 0, length - 1);
    let correctInput = checkBarCode(inputs);
    if (correctInput) {
        let stringArray = _.chain(barCodeArray)
            .chunk(5)
            .map(x=>x.join(''))
            .value();

        for (let string of stringArray) {
            let found = _getBarcodeByBarCode(codeItems, string);
            if (found) {
                result.push(found.no);
            }
        }
        return result.join('');
    }

}

function inspectCheckCode(shiftedCode) {
    let codeSum = _.chain(shiftedCode)
        .split('')
        .map(x=>parseInt(x))
        .sum();
    let result = codeSum % 10 === 0 ? true : false;
    return result;

}

function removeCheckCode(shiftedCode) {
    let length = shiftedCode.length;
    let isCorrectCD = inspectCheckCode(shiftedCode);
    if (isCorrectCD) {
        let result = shiftedCode.substring(0, length - 1);
        return result;
    }

}

function jsMain(inputs) {
    let codeItems = barCodeItems();
    let shiftedCode = shiftBarCode(inputs, codeItems);
    let result = removeCheckCode(shiftedCode);
    return result;
}
function mainJs(inputs) {
    let containCheckCode = getZipCheckCode(inputs);
    let codeItems = barCodeItems();
    let result = shiftZipCode(containCheckCode, codeItems);
    return result;
}

module.exports = {
    checkZipCode: checkZipCode,
    getZipCheckCode: getZipCheckCode,
    barCodeItems: barCodeItems,
    shiftZipCode: shiftZipCode,
    mainJs: mainJs,
    checkBarCode: checkBarCode,
    shiftBarCode: shiftBarCode,
    inspectCheckCode: inspectCheckCode,
    removeCheckCode: removeCheckCode,
    jsMain: jsMain
}
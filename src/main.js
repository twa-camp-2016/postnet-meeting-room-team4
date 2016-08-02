"use strict";
let _ = require('lodash');
function checkZipCode(inputs) {
    let length = inputs.length;
    let array = _.split(inputs, ('')).map(x=>parseInt(x));
    let isNumber = _.some(array, (x)=>_.isNaN(x));
    let tenArr = _.split(inputs, (''));
    let newArr = _.filter(tenArr, (x, index)=>index !== 5).map(x=>parseInt(x));
    let isNumbers = _.some(newArr, (x)=>_.isNaN(x));
    let arrays = _.filter(tenArr, (x, index)=>index === 5);
    let isTrue = arrays[0] === '-';
    if (length === 5 && isNumber === false) {
        return true;
    }
    if (length === 9 && isNumber === false) {
        return true;
    }
    if (length === 10 && isNumbers === false && isTrue) {
        return true;
    }
    return false;
}

function getZipCheckCode(inputs) {
    let length = inputs.length;
    let isCorrectCode = checkZipCode(inputs);
    if ((isCorrectCode && length === 5) || (isCorrectCode && length === 9)) {
        let codeArray = _.chain(inputs)
            .split('')
            .map(x=>parseInt(x))
            .value();
        let codeSum = _.sum(codeArray);
        let checkCode = 10 - codeSum % 10;
        if (checkCode === 10) {
            codeArray.push(0);
        } else {
            codeArray.push(checkCode);
        }
        return codeArray.join('');
    }
    if (isCorrectCode && length === 10) {
        let codeArr = _.chain(inputs)
            .split('')
            .filter((x, index)=>index !== 5)
            .map(x=>parseInt(x))
            .value();
        let codeSums = _.sum(codeArr);
        let checkCD = 10 - codeSums % 10;
        if (checkCD === 10) {
            codeArr.push(0);
        } else {
            codeArr.push(checkCD);
        }
        return codeArr.join('');
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


module.exports = {
    checkZipCode: checkZipCode,
    getZipCheckCode: getZipCheckCode,
    barCodeItems: barCodeItems,
    shiftZipCode: shiftZipCode
}
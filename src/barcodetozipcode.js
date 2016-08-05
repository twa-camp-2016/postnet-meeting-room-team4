'use strict';
let _ = require('lodash');
const allCodes = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:',
    ':||::', '|:::|', '|::|:', '|:|::'];
function judgeBarcode(barcode) {
    let Array = barcode.slice(1, barcode.length - 1).split('').map(n=> {
        return n === "|" ? 1 : 0;
    });
    let barcodeArray1 = _(Array).chunk(5).map(n=>_.sum(n) === 2);
    let correctNumber = [30, 50].includes(Array.length);
    if (correctNumber === true && barcodeArray1 && barcode.startsWith('|')&& barcode.endsWith('|'))return true;
    return false;
}
function getZipCode(allCodes, barcode) {
    let barcodes = _.chain(barcode).slice(1, barcode.length - 1)
        .chunk(5)
        .map(n=>n.join(''))
        .value();
    let zipCodeArray = barcodes.map(code=>allCodes.indexOf(code));
    return zipCodeArray;
}
function judgeCheckCode(zipCode) {
    let sum = _.sum(zipCode);
    return sum % 10 === 0 ? true : false;
}
function buildZipCodeString(zipCode) {
    zipCode.pop();
    let zipCodeString = zipCode.join('');
    return zipCodeString;
}
function printZipCode(barcode) {
    let correctBarcode = judgeBarcode(barcode);
    if (correctBarcode === true) {
        let zipCode = getZipCode(allCodes, barcode);
        let correctCheckCode = judgeCheckCode(zipCode);
        if (correctCheckCode === true) {
            return buildZipCodeString(zipCode);
        } else {
            return '请输入有效值!';
        }
    } else {
        return '请输入有效值!'
    }
}
module.exports = {
    judgeBarcode,
    getZipCode,
    judgeCheckCode,
    buildZipCodeString,
    printZipCode
}

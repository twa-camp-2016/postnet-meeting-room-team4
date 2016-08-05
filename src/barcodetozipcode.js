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
    return (correctNumber && barcodeArray1 && barcode.startsWith('|') && barcode.endsWith('|'));
}
function getZipCode(allCodes, barcode) {
    let barcodes = _.chain(barcode).slice(1, barcode.length - 1)
        .chunk(5)
        .map(n=>n.join(''))
        .value();
    return barcodes.map(code=>allCodes.indexOf(code));
}
function judgeCheckCode(zipCode) {
    let sum = _.sum(zipCode);
    return sum % 10 === 0;
}
function buildZipCodeString(zipCode) {
    zipCode.pop();
    return zipCode.join('');
}
function printZipCode(barcode) {
    if (judgeBarcode(barcode)) {
        let zipCode = getZipCode(allCodes, barcode);
        if (judgeCheckCode(zipCode)) {
            return buildZipCodeString(zipCode);
        }
    }
    return '请输入有效值!'
}
module.exports = {
    judgeBarcode,
    getZipCode,
    judgeCheckCode,
    buildZipCodeString,
    printZipCode
};

'use strict';
let _ = require('lodash');
const allCodes = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:',
    ':||::', '|:::|', '|::|:', '|:|::'];
function judgeZipCode(zipCode) {
    return (/^\d{5}(-?\d{4})?$/.test(zipCode));
}
function calculateCheckCode(zipCode) {
    let total = _(zipCode)
        .split('')
        .filter(n=>n !== '-')
        .map(n=>parseInt(n))
        .sum();
    let result = _(zipCode)
        .split('')
        .filter(n=>n !== '-')
        .map(n=>parseInt(n))
        .value();
    let cd = _.range(10).find(n=>(total + n) % 10 === 0);
    result.push(cd);
    return result;
}
function buildBarcodes(allCodes, zipCodeArray) {
    return zipCodeArray.map(n=>allCodes[n]);
}
function buildBarcodeString(barcodes) {
    return '|' + barcodes.join('') + '|';
}
function printBarcode(zipCode) {
    if (judgeZipCode(zipCode)) {
        let zipCodeWithCd = calculateCheckCode(zipCode);
        let barcodeArray = buildBarcodes(allCodes, zipCodeWithCd);
        return buildBarcodeString(barcodeArray);
    }
    return 'invalid zipCode!';
}
module.exports = {
    judgeZipCode,
    calculateCheckCode,
    buildBarcodes,
    buildBarcodeString,
    printBarcode
};

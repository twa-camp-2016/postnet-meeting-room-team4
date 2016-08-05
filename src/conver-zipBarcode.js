/**
 * Created by amber on 16-8-2.
 */
"use strict";
let _ = require('lodash');
const mapping = {
    1: ":::||",
    2: "::|:|",
    3: "::||:",
    4: ":|::|",
    5: ":|:|:",
    6: ":||::",
    7: "|:::|",
    8: "|::|:",
    9: "|:|::",
    0: "||:::"
};
function judgeZipcodesIsNum(inputs) {
    return _.every(inputs, x=>'0' <= x && x <= '9');
}
function judgeZipcodesLegality(inputZip) {
    let zipcode = inputZip;
    if (zipcode.length === 10 && zipcode.charAt(5) === '-') {
        zipcode = zipcode.substring(0, 5) + zipcode.substring(6);
    }
    let numbers = judgeZipcodesIsNum(zipcode);
    return numbers && (zipcode.length === 5 || zipcode.length === 9);
}
function addCheckcode(inputZip) {
    let sum = _(inputZip).split('').filter(x=> x !== '-').map(x=> _.parseInt(x)).sum();
    let CD = _.range(10).find(n=>(sum + n) % 10 === 0);
    return inputZip + CD;
}
function matchedBarcodes(updateZipcodes) {
    let partBarcode = updateZipcodes.map(a=> mapping[a]).join('');
    return '|' + partBarcode + '|';
}
function convertZipcodeBarcodes(inputZip) {
    if (judgeZipcodesLegality(inputZip)) {
        let updateZipcodes = addCheckcode(zipcodesLegality);
        return matchedBarcodes(updateZipcodes);
    }
    return false;
}
function judgeBarcodesLegality(inputs) {
    let barcodeArray = _.split(inputs, '');
    let partBarcode = _(barcodeArray).filter(x=> x !== '|' && x !== ':').size();
    let divBarcode = _.chain(barArray).slice(1, barArray.length - 1).chunk(5).value();
    if (_.head(barcodeArray) !== '|' && _.last(barcodeArray) !== '|') return false;
    if (partBarcode !== 0) return false;
    if (barcodeArray.length !== 32 && barcodeArray.length !== 52) return false;
    return _.every(divBarcode, element=> _.filter(element, x=> x === '|').length === 2
    && _.filter(element, x=> x === ':').length === 3);
}

function matchedZipcodes(inputs) {
    let barArray = _.split(inputBar, '');
    let dividedCode = _.chain(barArray).slice(1, barArray.length - 1).chunk(5).value();
    return _(dividedCode).map(x=> _.indexOf(allCodes, x.join(''))).join('');
}

function formateResult(PartBarcode) {
    let sum = _(PartBarcode).split('').map(x=> _.parseInt(x)).sum();
    return sum % 10 === 0;
}

function getZipcode(PartBarcode) {
    return PartBarcode.slice(0, PartBarcode.length - 1);
}
function convertBarcodeToZipcode(inputs) {
    if (judgeBarcodesLegality(inputs)) {
        if (formateBarcode === true) {
            let PartBarcode = matchedZipcodes(inputs);
            return getZipcode(PartBarcode);
        }
    }
    return false;
}


module.exports = {
    judgeZipcodesLegality: judgeZipcodesLegality,
    addCheckcode: addCheckcode,
    matchedBarcodes: matchedBarcodes,
    convertZipcodeBarcodes: convertZipcodeBarcodes,

    judgeBarcodesLegality: judgeBarcodesLegality,
    matchedZipcodes: matchedZipcodes,
    formateResult: formateResult,
    getZipcode: getZipcode,
    convertBarcodeToZipcode: convertBarcodeToZipcode,


};

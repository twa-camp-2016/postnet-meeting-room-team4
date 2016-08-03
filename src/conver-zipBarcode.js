/**
 * Created by amber on 16-8-2.
 */
"use strict";
let _ = require('lodash');
function converZipcodeBarcodes(inputs) {
    let zipcodesLegality = judgeZipcodesLegality(inputs);
    let updateZipcodes = addCheckcode(inputs);
    let barcodes = matchedBarcodes(updateZipcodes);
    return barcodes;
}
function judgeZipcodesLegality(inputs) {
    let patten = /^\d{5}$|^\d{9}$|^\d{5}-\d{4}$/;
    if (patten.test(inputs)) {
        return 1;
    } else {
        return 0;
    }
}
function addCheckcode(inputs) {
    let sum = _(inputs).split('')
        .filter(x=>x !== '-')
        .map(x=>_.parseInt(x))
        .sum();
    let checkCode = sum % 10;
    return checkCode === 0 ? checkCode : 10 - checkCode;
    let updateZipcodes = inputs + toString(checkCode);
    return updateZipcodes;
}
function matchedBarcodes(updateZipcodes) {
    let allBarcodes = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    let partBarcodes = _(updateZipcodes).map(element=> partBarcodes = allBarcodes[element]);
    let partBarcode = partBarcodes.join((''));
    let barcodes = '|' + partBarcode + '|';
    return barcodes;
}


module.exports = {
    judgeZipcodesLegality: judgeZipcodesLegality,
    addCheckcode: addCheckcode,
    matchedBarcodes: matchedBarcodes
};

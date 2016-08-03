/**
 * Created by amber on 16-8-2.
 */
"use strict";
let _ = require('lodash');
function converZipcodeBarcodes(inputs) {
    let zipcodesLegality = judgeZipcodesLegality(inputs);
    let updateZipcodes = addCheckcode(zipcodesLegality);
    let barcodes = matchedBarcodes(updateZipcodes, zipcodesLegalitys);
    return barcodes;
}

function judgeZipcodesLegality(inputs) {

    let patten = /^\d{5}$|^\d{9}$|^\d{5}$+^\d{4}$/;
    if (patten.test(inputs)) {
        return 1;
    } else {
        return 0;
    }
}
function addCheckcode(zipcodesLegality) {
    let zipcodesLegalitys = zipcodesLegality.split('-');
    let zipcodesLegalityandElementSum = _(zipcodesLegalitys).map(element=>element
        .parseFloat(zipcodesLegality))
        .sum();
    let checkCode = zipcodesLegalityandElementSum % 10;
    return checkCode === 0 ? checkCode : 10 - checkCode;
    let updateZipcodes = zipcodesLegalitys + checkCode;
    // return updateZipcodes;

}
function matchedBarcodes(updateZipcodes, zipcodesLegalitys) {
    let allBarcodes = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    let barcodeParts = '|';
    let barcodes = zipcodesLegalitys.map(element=> {
        return zipcodesLegalitys = allBarcodes[zipcodesLegalitys];
    })
        .join((''));
    barcodes += allBarcodes[updateZipcodes] + '|';
    return barcodes;
}




module.exports = {
    judgeZipcodesLegality: judgeZipcodesLegality,
    addCheckcode:addCheckcode,
    matchedBarcodes:matchedBarcodes
};

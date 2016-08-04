'use strict';
let _ = require('lodash');
// let zipCode = '98215'
// function judge(zipCode) {
//     return (/^\d{5}(-?\d{4})?$/.test(zipCode));
// }
// function calculateCheckCode(zipCode) {
//     let sumWithoutCheckCode = _(zipCode)
//         .split('')
//         .filter(n=>n !== '-')
//         .map(n=>parseInt(n))
//         .sum();
//     let zipCodeWithOutCheckCode = _(zipCode)
//         .split('')
//         .filter(n=>n !== '-')
//         .map(n=>parseInt(n))
//         .value();
//     let checkCode = 10 - sumWithoutCheckCode % 10;
//     let CD = checkCode === 10 ? 0 : checkCode;
//     zipCodeWithOutCheckCode.push(CD);
//     return zipCodeWithOutCheckCode;
// }
// function loadAllCodes() {
//     return ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:',
//         ':||::', '|:::|', '|::|:', '|:|::'];
// }
// function buildBarcodes(allCodes, hasCheckCode) {
//     return hasCheckCode.map(n=>n = allCodes[n]);
// }
// function buildBarcodeString(barcodes) {
//     barcodes.unshift('|');
//     barcodes.push('|');
//     return barcodes.join('');
// }
// function print(zipCode) {
//     let correctCode = judge(zipCode);
//     if (correctCode === true) {
//         let hasCheckCode = calculateCheckCode(zipCode);
//         let allCodes = loadAllCodes();
//         let barcodes = buildBarcodes(allCodes, hasCheckCode);
//         let barcodeString = buildBarcodeString(barcodes);
//         return barcodeString;
//     } else {
//         return 'please enter the correct zip code!';
//     }
// }
// module.exports = {
//     judge,
//     calculateCheckCode,
//     loadAllCodes,
//     buildBarcodes,
//     buildBarcodeString,
//     print
// };
let barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
function judgeBarcode(barcode) {
    let Array = barcode.slice(1, barcode.length - 1).split('').map(n=> {
        return n === "|" ? 1 : 0;
    });
    let barcodeArray1 = _.chunk(Array, 5).map(n=>_.sum(n) === 2);
    let correctNumber = [30, 50].includes(Array.length);
    if (correctNumber === true && barcodeArray1) {
        return true;
    } else {
        return false;
    }
}
function loadAllCodes() {
    return ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:',
        ':||::', '|:::|', '|::|:', '|:|::'];
}
function buildZipCode(allCodes, barcode) {
    let barcodes = _.chain(barcode).slice(1, barcode.length - 1)
        .chunk(5)
        .map(n=>n.join(''))
        .value();
    let zipCode = barcodes.map(code=>allCodes.indexOf(code));
    return zipCode;
}
function judgeCheckCode(zipCode) {
    let CD = zipCode.pop();
    let sumWithoutCheckCode = _.sum(zipCode);
    let result = 10 - sumWithoutCheckCode % 10;
    let checkCode = result === 10 ? 0 : result;
    return checkCode === CD ? true : false;
}
function buildZipCodeString(zipCode) {
    let zipCodeString = zipCode.join('');
    return zipCodeString;
}
function print(barcode) {
    let correctBarcode = judgeBarcode(barcode);
    if (correctBarcode === true) {
        let allCodes = loadAllCodes();
        let zipCode = buildZipCode(allCodes, barcode);
        let correctCheckCode = judgeCheckCode(zipCode);
        if (correctCheckCode === true) {
            return buildZipCodeString(zipCode);
        } else {
            return '校验码错误请重新输入!';
        }
    } else {
        return '请输入有效值!'
    }
}
module.exports = {
    judgeBarcode,
    loadAllCodes,
    buildZipCode,
    judgeCheckCode,
    buildZipCodeString,
    print
}
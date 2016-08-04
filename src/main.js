let _ = require('lodash');

//zipcode change to barcode
function containOnlyDigits(inputZipcode) {
    return _.every(inputZipcode, n=>n >= '0' && n <= '9');
}
function checkZipcode(inputZipcode) {
    let finalZipcode = inputZipcode;
    if (finalZipcode.length === 10 && finalZipcode.charAt(5) === '-') {
        finalZipcode = finalZipcode.substring(0, 5) + finalZipcode.substring(6, finalZipcode.length);
    }
    let isNumber = containOnlyDigits(finalZipcode);
    let legalZipcode = isNumber && [5, 9].includes(finalZipcode.length);
    return legalZipcode ? true : false;
}
function getFormattedZipcode(inputZipcode) {
    return [...inputZipcode].filter(n=>n !== '-').map(x=>parseInt(x));
}
function convertToBarcode(formattedZipcode) {
    let legalZipcode = checkZipcode(inputZipcode);
    let allBarcode = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    if (legalZipcode) {
        let zipSum = _(formattedZipcode).sum();
        let CD = (10 - (zipSum % 10)) === 10 ? 0 : (10 - (zipSum % 10));
        formattedZipcode.push(CD);
        let barcode = _(formattedZipcode).map((element)=> {
            return allBarcode[element];
        }).value();
        return '|' + barcode.join('') + '|';
    } else {
        return 'inputBarcode false!';
    }
}
function convertZipcodeToBarcode(inputZipcode) {
    let formattedZipcode = getFormattedZipcode(inputZipcode);
    console.log(formattedZipcode);
    let barcode = convertToBarcode(formattedZipcode);
    console.log(barcode);
    return barcode;
}

//barcode change to zipcode
function checkBarcode(inputBarcode) {
    let illegalElement = inputBarcode.search(/[^|:]/g);
    if (illegalElement === -1) {
        let legalBarcode = [32, 52].includes(inputBarcode.length) && _.startsWith(inputBarcode, '|') && _.endsWith(inputBarcode, '|');
        return legalBarcode ? true : false;
    }
    return false;
}
function getFormattedBarcode(inputBarcode) {
    let barcode = inputBarcode.slice(1, inputBarcode.length - 1);
    return _(barcode).chunk(5).map(element =>element.join('')).value();
}
function convertToZipcode(formattedBarcode) {
    let legalBarcode = checkBarcode(inputBarcode);
    let allBarcode = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    if (legalBarcode) {
        let zipcode = _(formattedBarcode).map(element=> {
            return _.indexOf(allBarcode, element);
        }).value();
        let legalCD = _(zipcode).sum() % 10 === 0;
        zipcode.pop();
        return legalCD ? zipcode.join('') : 0;
    }
}
function convertBarcodeToZipcode(inputBarcode) {
    let formattedBarcode = getFormattedBarcode(inputBarcode);
    return convertToZipcode(formattedBarcode);
}
let inputZipcode = '52357';
let inputBarcode = '|:::||:||::::||:|::|::|::||::|:|';

convertZipcodeToBarcode(inputZipcode);
convertBarcodeToZipcode(inputBarcode);
module.exports = {
    checkZipcode,
    getFormattedZipcode,
    convertToBarcode,
    convertZipcodeToBarcode,
    checkBarcode,
    getFormattedBarcode,
    convertToZipcode,
    convertBarcodeToZipcode
};
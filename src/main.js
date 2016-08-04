let _ = require('lodash');

//zipcode change to barcode
function getFormattedZipcode(inputZipcode) {
    return inputZipcode.split('');
}
function checkZipcodeLength(formattedZipcode) {
    let zipcodeLength = [5, 9, 10].includes(formattedZipcode.length);
    return zipcodeLength ? true : false;
}
function checkLegalMarkCount(formattedZipcode) {
    let legalMarkCount = _(formattedZipcode).filter(x=>x === '-').value();
    if ([5, 9].includes(formattedZipcode.length) && legalMarkCount.length === 0) {
        return true;
    }
    if (legalMarkCount.length === 1) {
        return true;
    }
    return false;

}
function checkLegalMarkPosition(formattedZipcode) {
    let legalMarkPosition = _.indexOf(formattedZipcode, '-');
    if ([5, 9].includes(formattedZipcode.length) && legalMarkPosition === -1) {
        return true;
    }
    return legalMarkPosition === 5 ? true : false;
}
function checkIllegalMark(inputZipcode) {
    let illegalMark = inputZipcode.search(/[^\d-]/g);
    return illegalMark === -1 ? true : false;
}

function convertToBarcode(formattedZipcode) {

    let zipcodeLength = checkZipcodeLength(formattedZipcode);
    let legalMarkCount = checkLegalMarkCount(formattedZipcode);
    let legalMarkPosition = checkLegalMarkPosition(formattedZipcode);
    let exceptIllegalMark = checkIllegalMark(inputZipcode);

    let legalZipcode = zipcodeLength && legalMarkCount && legalMarkPosition && exceptIllegalMark;
    let allBarcode = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    if (legalZipcode) {
        let zipcode = _(formattedZipcode).filter(x=>x !== '-').map(x=>parseInt(x)).value();
        let zipSum = _(zipcode).sum();
        let CD = (10 - (zipSum % 10)) === 10 ? 0 : (10 - (zipSum % 10));
        zipcode.push(CD);
        let barcode = _(zipcode).map((element)=> {
            return allBarcode[element];
        }).value();
        barcode.unshift('|');
        barcode.push('|');
        return barcode.join('');
    } else {
        return 'inputBarcode false!';
    }
}
function convertZipcodeToBarcode(inputZipcode) {
    let formattedZipcode = getFormattedZipcode(inputZipcode);
    let barcode = convertToBarcode(formattedZipcode);
    return barcode;
}

//barcode change to zipcode
function checkBarcodeLength(inputBarcode) {
    let barcodeLength=[32,52].includes(inputBarcode.length);
    return barcodeLength?true:false;
}
function checkFrame(inputBarcode) {
    let firstSymbol=inputBarcode.charAt(0);
    let lastSymbol=inputBarcode.charAt(inputBarcode.length-1);
    let legalInput=firstSymbol==='|'&&lastSymbol==='|';
    return legalInput?true:false;
}
function checkBarcodeIllegalMark(inputBarcode) {
    let illegalElement=inputBarcode.search(/[^|:]/g);
    return illegalElement===-1?true:false;
}
function getFormattedBarcode(inputBarcode) {
    let barcode=inputBarcode.slice(1,inputBarcode.length-1);
    let barcodeArray=_(barcode).chunk(5).value();
    return _(barcodeArray).map(element =>element.join('')).value();
}

function convertToZipcode(formattedBarcode) {
    let barcodeLength=checkBarcodeLength(inputBarcode);
    let frame=checkFrame(inputBarcode);
    let exceptIllegalMark=checkBarcodeIllegalMark(inputBarcode);

    let legalBarcode=barcodeLength&&frame&&exceptIllegalMark;
    let allBarcode = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    if (legalBarcode) {
        let zipcode=_(formattedBarcode).map(element=>{
            return _.indexOf(allBarcode,element);
        }).value();
        let legalCD=_(zipcode).sum()%10===0;
        zipcode.pop();
        return legalCD?zipcode.join(''):0;
    }
}
function convertBarcodeToZipcode(inputBarcode) {
    let formattedBarcode=getFormattedBarcode(inputBarcode);
    let zipcode=convertToZipcode(formattedBarcode);
    return zipcode;
}

let inputZipcode='16384';
let inputBarcode='|:::||:||::::||:|::|::|::||::|:|';

convertZipcodeToBarcode(inputZipcode);
convertBarcodeToZipcode(inputBarcode);
module.exports = {
    getFormattedZipcode,
    checkZipcodeLength,
    checkLegalMarkCount,
    checkLegalMarkPosition,
    checkIllegalMark,
    convertToBarcode,
    convertZipcodeToBarcode,
    checkBarcodeLength,
    checkFrame,
    checkBarcodeIllegalMark,
    getFormattedBarcode,
    convertToZipcode,
    convertBarcodeToZipcode
};
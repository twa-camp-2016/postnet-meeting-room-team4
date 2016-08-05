"use strict";
let _ = require('lodash');
function containOnlyFigures(array) {
    return _.every(array, x=>x <= '9' && x >= '0');
}
function checkZipCode(inputs) {
    let finalCode = inputs;
    if (finalCode.charAt(5) === '-') {
        finalCode = inputs.substring(0, 5) + inputs.substring(6);
    }
    return [5, 9].includes(finalCode.length) && containOnlyFigures(finalCode);
}
function formatCode(inputs) {
    return [...inputs].filter(x=>x !== '-').map(x=>parseInt(x));
}
function getZipCheckCode(formattedCode) {
    let codeSum = _.sum(formattedCode);
    return _.range(0, 10).find(x=>(codeSum + x) % 10 === 0);
}
function barCodeItems() {
    return [{no: 0, barcode: '||:::'},
        {no: 1, barcode: ':::||'},
        {no: 2, barcode: '::|:|'},
        {no: 3, barcode: '::||:'},
        {no: 4, barcode: ':|::|'},
        {no: 5, barcode: ':|:|:'},
        {no: 6, barcode: ':||::'},
        {no: 7, barcode: '|:::|'},
        {no: 8, barcode: '|::|:'},
        {no: 9, barcode: '|:|::'}
    ];
}
function shiftZipCode(formattedCode, codeItems) {
    let result = ['|'];
    let items = _.map(formattedCode, x=>codeItems[x].barcode).join('');
    result.push(items);
    result.push('|');
    return result.join('');
}
function chunkCode(inputs) {
    let codeArray = _.split(inputs, (''));
    _.pullAt(codeArray, 0, inputs.length - 1);
    return _(codeArray).chunk(5)
        .map(x=>x.join(''))
        .value();
}
function checkBarCode(inputs) {
    let rightStartAndEnd = _.startsWith(inputs, '|') && _.endsWith(inputs, '|');
    let codeArray = inputs.split('');
    _.pullAt(codeArray, 0, inputs.length - 1);
    let result = chunkCode(inputs);
    let isCorrect = _.every(result, x=>_.filter(x, e=>e === '|').length === 2 && _.filter(x, e=>e === ':').length === 3);
    return [6, 10].includes(codeArray.length / 5) && codeArray.length % 5 === 0 && rightStartAndEnd && isCorrect;
}
function shiftBarCode(inputs, codeItems) {
    let stringArray = chunkCode(inputs);
    return _.map(stringArray, x=> {
        let item = _.find(codeItems, y=>y.barcode === x);
        return item.no;
    });
}
function inspectCheckCode(shiftedCode) {
    let codeSum = _.sum(shiftedCode);
    return codeSum % 10 === 0;

}
function barCode2zipCode(inputs) {
    if (checkBarCode(inputs)) {
        let codeItems = barCodeItems();
        let shiftedCode = shiftBarCode(inputs, codeItems);
        if (inspectCheckCode(shiftedCode)) {
            return shiftedCode.join('').substring(0, shiftedCode.length - 1);
        }
    }
    return 'Invalid barcode';
}
function zipCode2barCode(inputs) {
    if (checkZipCode(inputs)) {
        let formattedCode = formatCode(inputs);
        let checkCode = getZipCheckCode(formattedCode);
        formattedCode.push(checkCode);
        let codeItems = barCodeItems();
        return shiftZipCode(formattedCode, codeItems);

    }
    return 'Invalid zipcode';
}
module.exports = {
    checkZipCode: checkZipCode,
    formatCode: formatCode,
    getZipCheckCode: getZipCheckCode,
    barCodeItems: barCodeItems,
    shiftZipCode: shiftZipCode,
    zipCode2barCode: zipCode2barCode,
    checkBarCode: checkBarCode,
    shiftBarCode: shiftBarCode,
    inspectCheckCode: inspectCheckCode,
    barCode2zipCode: barCode2zipCode
}
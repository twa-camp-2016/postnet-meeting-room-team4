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
const item= {
            0: '||:::',
            1: ':::||',
            2: '::|:|',
            3: '::||:',
            4: ':|::|',
            5: ':|:|:',
            6: ':||::',
            7: '|:::|',
            8: '|::|:',
            9: '|:|::'
        };

function shiftZipCode(formattedCode) {
    let items = _.map(formattedCode, x=>item[x]).join('');
    return '|'+items+'|';
}
function chunkCode(inputs) {
    let input=inputs.substring(1,inputs.length-1);
   return  _(input).split((''))
        .chunk(5)
        .map(x=>x.join(''))
        .value();
}
function checkBarCode(inputs) {
    let rightStartAndEnd = _.startsWith(inputs, '|') && _.endsWith(inputs, '|');
    let length=inputs.substring(1,inputs.length-1).length;
    let result = chunkCode(inputs);
    let isCorrect = _.every(result, x=>_.filter(x, e=>e === '|').length === 2 && _.filter(x, e=>e === ':').length === 3);
    return [6, 10].includes(length / 5) && length % 5 === 0 && rightStartAndEnd && isCorrect;
}
function shiftBarCode(inputs) {
    let stringArray = chunkCode(inputs);
    return _.map(stringArray, x=> {
        return  parseInt(_.findKey(item, y=>y===x));
    });
}
function inspectCheckCode(shiftedCode) {
    let codeSum = _.sum(shiftedCode);
    return codeSum % 10 === 0;

}
function barCode2zipCode(inputs) {
    if (checkBarCode(inputs)) {
        let shiftedCode = shiftBarCode(inputs);
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
        return shiftZipCode(formattedCode);

    }
    return 'Invalid zipcode';
}
module.exports = {
    checkZipCode: checkZipCode,
    formatCode: formatCode,
    getZipCheckCode: getZipCheckCode,
    shiftZipCode: shiftZipCode,
    zipCode2barCode: zipCode2barCode,
    checkBarCode: checkBarCode,
    shiftBarCode: shiftBarCode,
    inspectCheckCode: inspectCheckCode,
    barCode2zipCode: barCode2zipCode
}

let {judgeBarcode,
    getZipCode,
    judgeCheckCode,
    buildZipCodeString,
    printZipCode} = require('../src/barcodetozipcode');
const allCodes = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:',
    ':||::', '|:::|', '|::|:', '|:|::'];
describe('judge the barcode', function () {
    it('should judge the barcode,and everything is right', function () {
        let barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
        let result = judgeBarcode(barcode);
        let expected = true;
        expect(result).toEqual(expected);
    });
    it('should judge the barcode,but the count is wrong', function () {
        let barcode = '|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
        let result = judgeBarcode(barcode);
        let expected = false;
        expect(result).toEqual(expected);
    });
    it('should judge the barcode,but the symbol count is wrong', function () {
        let barcode = '|A|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
        let result = judgeBarcode(barcode);
        let expected = false;
        expect(result).toEqual(expected);
    });
    it('should judge the barcode,but last |', function () {
        let barcode = ':|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
        let result = judgeBarcode(barcode);
        let expected = false;
        expect(result).toEqual(expected);
    });
    it('should judge the barcode,but the symbols do not include || and :::', function () {
        let barcode = ':||:|:|:|:||::::|:|::||::|::||::|:|::||::|::|||:|:|';
        let result = judgeBarcode(barcode);
        let expected = false;
        expect(result).toEqual(expected);
    });
});
describe('get formatted barcodes', function () {
    it('should build zip code,and the check code is right', function () {
        let barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
        let zipCode = getZipCode(allCodes, barcode);
        let expected = [4, 5, 0, 5, 6, 1, 2, 3, 4, 0];
        expect(zipCode).toEqual(expected);
    });
    it('should build zip code,and the check code is wrong', function () {
        let barcode = '|:::||::|:|::||::|::|:|:|:||:::|';
        let zipCode = getZipCode(allCodes, barcode);
        let expected = [1, 2, 3, 4, 5, 0];
        expect(zipCode).toEqual(expected);
    });
});
describe('judge check code', function () {
    it('should judge the zip code ,and check code is wrong', function () {
        let zipCode = [1, 2, 3, 4, 5, 0];
        let result = judgeCheckCode(zipCode);
        let expected = false;
        expect(result).toEqual(expected);
    });
    it('should judge the zip code ,and check code is right', function () {
        let zipCode = [1, 2, 3, 4, 5, 5];
        let result = judgeCheckCode(zipCode);
        let expected = true;
        expect(result).toEqual(expected);
    });
});
describe('build zip code string', function () {
    it('should build zip code string', function () {
        let zipCode = [1, 2, 3, 4, 5, 6];
        let zipCodeString = buildZipCodeString(zipCode);
        let expected = '12345';
        expect(zipCodeString).toEqual(expected);
    });
    it('should build zip code string', function () {
        let zipCode = [3, 1, 2, 4, 2];
        let zipCodeString = buildZipCodeString(zipCode);
        let expected = '3124';
        expect(zipCodeString).toEqual(expected);
    });
});
describe('print zip code', function () {
    it('should print zip code', function () {
        let barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
        let zipCodeString = printZipCode(barcode);
        let expected = '450561234';
        expect(zipCodeString).toEqual(expected);
    });
    it('should print zip code,and check code is wrong', function () {
        let barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|:|:|:|';
        let zipCodeString = printZipCode(barcode);
        let expected = '请输入有效值!';
        expect(zipCodeString).toEqual(expected);
    });
    it('should print zip code,and please enter a valid value ', function () {
        let barcode = '|:|::|:|:|:|:::||::|:|::||::|::|:|:|:|';
        let zipCodeString = printZipCode(barcode);
        let expected = '请输入有效值!';
        expect(zipCodeString).toEqual(expected);
    });
});
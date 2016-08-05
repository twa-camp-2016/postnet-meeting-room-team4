
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
        expect(judgeBarcode(barcode)).toBeTruthy();
    });
    it('should judge the barcode,but the count is wrong', function () {
        let barcode = '|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
        let result = judgeBarcode(barcode);
        expect(result).toBeFalsy();
    });
    it('should judge the barcode,but the symbol count is wrong', function () {
        let barcode = '|A|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
        expect(judgeBarcode(barcode)).toBeFalsy();
    });
    it('should judge the barcode,but last |', function () {
        let barcode = ':|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
        expect(judgeBarcode(barcode)).toBeFalsy();
    });
    it('should judge the barcode,but the symbols do not include || and :::', function () {
        let barcode = ':||:|:|:|:||::::|:|::||::|::||::|:|::||::|::|||:|:|';
        expect(judgeBarcode(barcode)).toBeFalsy();
    });
});
describe('get formatted barcodes', function () {
    it('should build zip code,and the check code is right', function () {
        let barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
        let expected = [4, 5, 0, 5, 6, 1, 2, 3, 4, 0];
        expect(getZipCode(allCodes, barcode)).toEqual(expected);
    });
    it('should build zip code,and the check code is wrong', function () {
        let barcode = '|:::||::|:|::||::|::|:|:|:||:::|';
        expect(getZipCode(allCodes, barcode)).toEqual([1, 2, 3, 4, 5, 0]);
    });
});
describe('judge check code', function () {
    it('should judge the zip code ,and check code is wrong', function () {
        expect(judgeCheckCode([1, 2, 3, 4, 5, 0])).toBeFalsy();
    });
    it('should judge the zip code ,and check code is right', function () {
        expect(judgeCheckCode([1, 2, 3, 4, 5, 5])).toBeTruthy();
    });
});
describe('build zip code string', function () {
    it('should build zip code string', function () {
        expect(buildZipCodeString([1, 2, 3, 4, 5, 6])).toEqual('12345');
    });
    it('should build zip code string', function () {
        expect(buildZipCodeString([3, 1, 2, 4, 2])).toEqual('3124');
    });
});
describe('print zip code', function () {
    it('should print zip code', function () {
        let barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
        expect(printZipCode(barcode)).toEqual('450561234');
    });
    it('should print zip code,and check code is wrong', function () {
        let barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|:|:|:|';
        expect(printZipCode(barcode)).toEqual('请输入有效值!');
    });
    it('should print zip code,and please enter a valid value ', function () {
        let barcode = '|:|::|:|:|:|:::||::|:|::||::|::|:|:|:|';
        expect(printZipCode(barcode)).toEqual('请输入有效值!');
    });
});
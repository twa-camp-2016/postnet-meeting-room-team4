let {
    judgeZipCode,
    calculateCheckCode,
    buildBarcodes,
    buildBarcodeString,
    printBarcode
} = require('../src/main');
const allCodes = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:',
    ':||::', '|:::|', '|::|:', '|:|::'];
describe('judge the zip code', function () {
    it('should judge the zip code with four number', function () {
        let zipCode = '9821';
        let result = judgeZipCode(zipCode);
        let expected = false;
        expect(result).toEqual(expected);
    });
    it('should judge the zip code with five number', function () {
        let zipCode = '98235';
        let result = judgeZipCode(zipCode);
        let expected = true;
        expect(result).toEqual(expected);
    });
    it('should judge the zip code with six number', function () {
        let zipCode = '834234';
        let result = judgeZipCode(zipCode);
        let expected = false;
        expect(result).toEqual(expected);
    });
    it('should judge the zip code with eight number', function () {
        let zipCode = '83423478';
        let result = judgeZipCode(zipCode);
        let expected = false;
        expect(result).toEqual(expected);
    });
    it('should judge the zip code with nine number', function () {
        let zipCode = '834234783';
        let result = judgeZipCode(zipCode);
        let expected = true;
        expect(result).toEqual(expected);
    });
    it('should judge the zip code with ten number', function () {
        let zipCode = '8342347801';
        let result = judgeZipCode(zipCode);
        let expected = false;
        expect(result).toEqual(expected);
    });
    it('should judge the zip code with eleven number', function () {
        let zipCode = '83423478013';
        let result = judgeZipCode(zipCode);
        let expected = false;
        expect(result).toEqual(expected);
    });
    it('should judge the zip code with the wrong position of line', function () {
        let zipCode = '83-4234789';
        let result = judgeZipCode(zipCode);
        let expected = false;
        expect(result).toEqual(expected);
    });
    it('should judge the zip code with the correct line position', function () {
        let zipCode = '83423-4789';
        let result = judgeZipCode(zipCode);
        let expected = true;
        expect(result).toEqual(expected);
    });
    it('should judge the zip code with other symbol #', function () {
        let zipCode = '83#4234789';
        let result = judgeZipCode(zipCode);
        let expected = false;
        expect(result).toEqual(expected);
    });
    it('should judge the zip code with other symbol *', function () {
        let zipCode = '83423*4789';
        let result = judgeZipCode(zipCode);
        let expected = false;
        expect(result).toEqual(expected);
    });
    it('should judge the zip code with other symbol *,but have correct position', function () {
        let zipCode = '83423#4789';
        let result = judgeZipCode(zipCode);
        let expected = false;
        expect(result).toEqual(expected);
    });
    it('should judge the zip code with letter,but the number is correct(5)', function () {
        let zipCode = '8ab89';
        let result = judgeZipCode(zipCode);
        let expected = false;
        expect(result).toEqual(expected);
    });
    it('should judge the zip code with letter,but the number is correct(9) ', function () {
        let zipCode = '8abbcbc89';
        let result = judgeZipCode(zipCode);
        let expected = false;
        expect(result).toEqual(expected);
    });
    it('should judge the zip code with letter,but the number is correct(10)', function () {
        let zipCode = '8bac4-7891';
        let result = judgeZipCode(zipCode);
        let expected = false;
        expect(result).toEqual(expected);
    });
    it('should judge the zip code with two(-)', function () {
        let zipCode = '83-423-4789';
        let result = judgeZipCode(zipCode);
        let expected = false;
        expect(result).toEqual(expected);
    });
});
describe('should calculate the checkcode', function () {
    it('calculate the check code without -', function () {
        let zipCode = '12345';
        let zipCodeArray = calculateCheckCode(zipCode);
        let expected = [1, 2, 3, 4, 5, 5];
        expect(zipCodeArray).toEqual(expected);
    });
    it('calculate the check code with -', function () {
        let zipCode = '12345-3241';
        let zipCodeArray = calculateCheckCode(zipCode);
        let expected = [1, 2, 3, 4, 5, 3, 2, 4, 1, 5];
        expect(zipCodeArray).toEqual(expected);
    });
    it('calculate the check code with - and check code is equal to 0', function () {
        let zipCode = '45056-1234';
        let zipCodeArray = calculateCheckCode(zipCode);
        let expected = [4, 5, 0, 5, 6, 1, 2, 3, 4, 0];
        expect(zipCodeArray).toEqual(expected);
    });
});
describe('should build barcodes', function () {
    it('build barcodes', function () {
        let zipCodeArray = [1, 2, 3, 4, 5, 5];
        let barcodes = buildBarcodes(allCodes, zipCodeArray);
        let expected = [':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':|:|:'];
        expect(barcodes).toEqual(expected);
    });
});
describe('build barcode string', function () {
    it('should build barcode stirng', function () {
        let barcodes = [':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':|:|:'];
        let barcodeString = buildBarcodeString(barcodes);
        let expected = '|:::||::|:|::||::|::|:|:|::|:|:|'
        expect(barcodeString).toEqual(expected);
    });
});
describe('print', function () {
    it('print', function () {
        let zipCode = '45056-1234';
        let barcodeString = printBarcode(zipCode);
        let expected = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
        expect(barcodeString).toEqual(expected);
    });
});
let {judgeBarcode,
    getZipCode,
    judgeCheckCode,
    buildZipCodeString,
    printZipCode} = require('../src/main');
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
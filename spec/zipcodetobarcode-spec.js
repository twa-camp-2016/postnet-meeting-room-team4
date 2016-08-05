let {
    judgeZipCode,
    calculateCheckCode,
    buildBarcodes,
    buildBarcodeString,
    printBarcode
} = require('../src/zipcodetobarcode');
const allCodes = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:',
    ':||::', '|:::|', '|::|:', '|:|::'];
describe('judge the zip code', function () {
    it('should judge the zip code with four number', function () {
        expect(judgeZipCode('9821')).toBeFalsy();
    });
    it('should judge the zip code with five number', function () {
        expect(judgeZipCode('98235')).toBeTruthy();
    });
    it('should judge the zip code with six number', function () {
        expect(judgeZipCode('834234')).toBeFalsy();
    });
    it('should judge the zip code with eight number', function () {
        expect(judgeZipCode('83423478')).toBeFalsy();
    });
    it('should judge the zip code with nine number', function () {
        expect(judgeZipCode('834234783')).toBeTruthy();
    });
    it('should judge the zip code with ten number', function () {
        expect(judgeZipCode('8342347801')).toBeFalsy();
    });
    it('should judge the zip code with eleven number', function () {
        expect(judgeZipCode('83423478013')).toBeFalsy();
    });
    it('should judge the zip code with the wrong position of line', function () {
        expect(judgeZipCode('83-4234789')).toBeFalsy();
    });
    it('should judge the zip code with the correct line position', function () {
        expect(judgeZipCode('83423-4789')).toBeTruthy();
    });
    it('should judge the zip code with other symbol #', function () {
        expect(judgeZipCode('83#4234789')).toBeFalsy();
    });
    it('should judge the zip code with other symbol *', function () {
        expect(judgeZipCode('83423*4789')).toBeFalsy();
    });
    it('should judge the zip code with other symbol *,but have correct position', function () {
        expect(judgeZipCode('83423#4789')).toBeFalsy();
    });
    it('should judge the zip code with letter,but the number is correct(5)', function () {
        expect(judgeZipCode('8ab89')).toBeFalsy();
    });
    it('should judge the zip code with letter,but the number is correct(9) ', function () {
        expect(judgeZipCode('8abbcbc89')).toBeFalsy();
    });
    it('should judge the zip code with letter,but the number is correct(10)', function () {
        expect(judgeZipCode('8bac4-7891')).toBeFalsy();
    });
    it('should judge the zip code with two(-)', function () {
        expect(judgeZipCode('83-423-4789')).toBeFalsy();
    });
});
describe('should calculate the checkcode', function () {
    it('calculate the check code without -', function () {
        let zipCode = '12345';
        expect(calculateCheckCode(zipCode)).toEqual([1, 2, 3, 4, 5, 5]);
    });
    it('calculate the check code with -', function () {
        let zipCode = '12345-3241';
        let expected = [1, 2, 3, 4, 5, 3, 2, 4, 1, 5];
        expect(calculateCheckCode(zipCode)).toEqual(expected);
    });
    it('calculate the check code with - and check code is equal to 0', function () {
        let zipCode = '45056-1234';
        let expected = [4, 5, 0, 5, 6, 1, 2, 3, 4, 0];
        expect(calculateCheckCode(zipCode)).toEqual(expected);
    });
});
describe('should build barcodes', function () {
    it('build barcodes', function () {
        let zipCodeArray = [1, 2, 3, 4, 5, 5];
        let expected = [':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':|:|:'];
        expect(buildBarcodes(allCodes, zipCodeArray)).toEqual(expected);
    });
});
describe('build barcode string', function () {
    it('should build barcode stirng', function () {
        let barcodes = [':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':|:|:'];
        let expected = '|:::||::|:|::||::|::|:|:|::|:|:|'
        expect(buildBarcodeString(barcodes)).toEqual(expected);
    });
});
describe('print', function () {
    it('should print', function () {
        let zipCode = '45056-1234';
        let expected = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
        expect(printBarcode(zipCode)).toEqual(expected);
    });
});

// let {judge, calculateCheckCode, loadAllCodes, buildBarcodes, buildBarcodeString, print} = require('../src/main');
// describe(' judge the zip code', function () {
//     it('should judge the zip code with four number', function () {
//         let zipCode = '9821';
//         let result = judge(zipCode);
//         let expected = false;
//         expect(result).toEqual(expected);
//     });
//     it('should judge the zip code with five number', function () {
//         let zipCode = '98235';
//         let result = judge(zipCode);
//         let expected = true;
//         expect(result).toEqual(expected);
//     });
//     it('should judge the zip code with six number', function () {
//         let zipCode = '834234';
//         let result = judge(zipCode);
//         let expected = false;
//         expect(result).toEqual(expected);
//     });
//     it('should judge the zip code with eight number', function () {
//         let zipCode = '83423478';
//         let result = judge(zipCode);
//         let expected = false;
//         expect(result).toEqual(expected);
//     });
//     it('should judge the zip code with nine number', function () {
//         let zipCode = '834234783';
//         let result = judge(zipCode);
//         let expected = true;
//         expect(result).toEqual(expected);
//     });
//     it('should judge the zip code with ten number', function () {
//         let zipCode = '8342347801';
//         let result = judge(zipCode);
//         let expected = false;
//         expect(result).toEqual(expected);
//     });
//     it('should judge the zip code with the wrong position of line', function () {
//         let zipCode = '83-4234789';
//         let result = judge(zipCode);
//         let expected = false;
//         expect(result).toEqual(expected);
//     });
//     it('should judge the zip code with the correct line position', function () {
//         let zipCode = '83423-4789';
//         let result = judge(zipCode);
//         let expected = true;
//         expect(result).toEqual(expected);
//     });
//     it('should judge the zip code with other symbol #', function () {
//         let zipCode = '83#4234789';
//         let result = judge(zipCode);
//         let expected = false;
//         expect(result).toEqual(expected);
//     });
//     it('should judge the zip code with other symbol *', function () {
//         let zipCode = '83423*4789';
//         let result = judge(zipCode);
//         let expected = false;
//         expect(result).toEqual(expected);
//     });
//     it('should judge the zip code with other symbol *,but have correct position', function () {
//         let zipCode = '83423#4789';
//         let result = judge(zipCode);
//         let expected = false;
//         expect(result).toEqual(expected);
//     });
//     it('should judge the zip code with letter,but the number is correct(5)', function () {
//         let zipCode = '8ab89';
//         let result = judge(zipCode);
//         let expected = false;
//         expect(result).toEqual(expected);
//     });
//     it('should judge the zip code with letter,but the number is correct(9) ', function () {
//         let zipCode = '8abbcbc89';
//         let result = judge(zipCode);
//         let expected = false;
//         expect(result).toEqual(expected);
//     });
//     it('should judge the zip code with letter,but the number is correct(10)', function () {
//         let zipCode = '8bac4-7891';
//         let result = judge(zipCode);
//         let expected = false;
//         expect(result).toEqual(expected);
//     });
//     it('should judge the zip code with two(-)', function () {
//         let zipCode = '83-423-4789';
//         let result = judge(zipCode);
//         let expected = false;
//         expect(result).toEqual(expected);
//     });
// });
// describe('calculate the checkcode', function () {
//     it('should calculate the check code without -', function () {
//         let zipCode = '12345';
//         let hasCheckCode = calculateCheckCode(zipCode);
//         let expected = [1, 2, 3, 4, 5, 5];
//         expect(hasCheckCode).toEqual(expected);
//     });
//     it('should calculate the check code with -', function () {
//         let zipCode = '12345-3241';
//         let hasCheckCode = calculateCheckCode(zipCode);
//         let expected = [1, 2, 3, 4, 5, 3, 2, 4, 1, 5];
//         expect(hasCheckCode).toEqual(expected);
//     });
//     it('should calculate the check code with - and check code is equal to 0', function () {
//         let zipCode = '45056-1234';
//         let hasCheckCode = calculateCheckCode(zipCode);
//         let expected = [4, 5, 0, 5, 6, 1, 2, 3, 4, 0];
//         expect(hasCheckCode).toEqual(expected);
//     });
// });
// describe(' build barcodes', function () {
//     it('should build barcodes', function () {
//         let hasCheckCode = [1, 2, 3, 4, 5, 5];
//         let allCodes = loadAllCodes();
//         let barcodes = buildBarcodes(allCodes, hasCheckCode);
//         let expected = [':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':|:|:'];
//         expect(barcodes).toEqual(expected);
//     });
// });
// describe(' build barcode string', function () {
//     it('should build barcode stirng', function () {
//         let barcodes = [':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':|:|:'];
//         let barcodeString = buildBarcodeString(barcodes);
//         let expected = '|:::||::|:|::||::|::|:|:|::|:|:|';
//         expect(barcodeString).toEqual(expected);
//     });
// });
// describe('print', function () {
//     it('should print the string', function () {
//         let zipCode = '45056-1234';
//         let barcodeString = print(zipCode);
//         let expected = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
//         expect(barcodeString).toEqual(expected);
//     });
//     it('should print the result', function () {
//         let zipCode = '4504-32';
//         let barcodeString = print(zipCode);
//         let expected = 'please enter the correct zip code!';
//         expect(barcodeString).toEqual(expected);
//     });
// });
let {judgeBarcode, loadAllCodes, buildZipCode,judgeCheckCode,buildZipCodeString,print} = require('../src/main');

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
        let allCodes = loadAllCodes();
        let zipCode = buildZipCode(allCodes, barcode);
        let expected = [4, 5, 0, 5, 6, 1, 2, 3, 4, 0];
        expect(zipCode).toEqual(expected);
    });
    it('should build zip code,and the check code is wrong', function () {
        let barcode = '|:::||::|:|::||::|::|:|:|:||:::|';
        let allCodes = loadAllCodes();
        let zipCode = buildZipCode(allCodes, barcode);
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
    it('should judge the zip code ,and check code is right',function () {
        let zipCode = [1, 2, 3, 4, 5, 5];
        let result = judgeCheckCode(zipCode);
        let expected = true;
        expect(result).toEqual(expected);
    });
});
describe('build zip code string',function () {
    it('should build zip code string',function () {
        let zipCode = [1,2,3,4,5,6];
        let zipCodeString = buildZipCodeString(zipCode);
        let expected = '123456';
        expect(zipCodeString).toEqual(expected);
    });
    it('should build zip code string',function () {
        let zipCode = [3,1,2,4,2];
        let zipCodeString = buildZipCodeString(zipCode);
        let expected = '31242';
        expect(zipCodeString).toEqual(expected);
    });
});
describe('print zip code',function () {
    it('should print zip code',function () {
        let barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
        let zipCodeString = print(barcode);
        let expected = '450561234';
        expect(zipCodeString).toEqual(expected);
    });
    it('should print zip code,and check code is wrong',function () {
        let barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|:|:|:|';
        let zipCodeString = print(barcode);
        let expected = '校验码错误请重新输入!';
        expect(zipCodeString).toEqual(expected);
    });
    it('should print zip code,and please enter a valid value ',function () {
        let barcode = '|:|::|:|:|:|:::||::|:|::||::|::|:|:|:|';
        let zipCodeString = print(barcode);
        let expected = '请输入有效值!';
        expect(zipCodeString).toEqual(expected);
    });
});
/**
 * Created by amber on 16-8-2.
 */
'use strict';
let {
    judgeZipcodesLegality, addCheckcode, matchedBarcodes, convertZipcodeBarcodes,
    judgeBarcodesLegality, matchedZipcodes, formateResult, getZipcode, convertBarcodeToZipcode
} =require("../src/conver-zipBarcode.js");

describe('judgeZipcodesLegality', function () {
    describe('judgeLength', function () {
        it('should be 5', function () {
            expect(judgeZipcodesLegality('12345')).toBeTruthy();
        });
        it('should be 9', function () {
            expect(judgeZipcodesLegality('123456789')).toBeTruthy();
        });
        it('should be 10', function () {
            expect(judgeZipcodesLegality('12345-6789')).toBeTruthy();
        });

        it('should be 4', function () {
            expect(judgeZipcodesLegality('1234')).toBeFalsy();
        });
        it('should be 6', function () {
            expect(judgeZipcodesLegality('123456')).toBeFalsy();
        });
        it('should be 8', function () {
            expect(judgeZipcodesLegality('12345678')).toBeFalsy();
        });
        it('should be 11', function () {
            expect(judgeZipcodesLegality('12345678901')).toBeFalsy();
        });
    });

    describe('judge location of ' - '', function () {
        it('should be 5', function () {
            expect(judgeZipcodesLegality('1234-5678')).toBeFalsy();
        });
        it('should be 7', function () {
            expect(judgeZipcodesLegality('123456-789')).toBeFalsy();
        });
        it('should be 6', function () {
            expect(judgeZipcodesLegality('12345-6789')).toBeTruthy();
        });
    });

    describe('judge counts of ' - '', function () {
        it('should be 1', function () {
            expect(judgeZipcodesLegality('12-345')).toBeFalsy();
        });
        it('should be 2', function () {
            expect(judgeZipcodesLegality('12-3-')).toBeFalsy();
        });
        it('should be 0', function () {
            expect(judgeZipcodesLegality('1234567891')).toBeFalsy();
        });
    });

    describe('judge otherSpecial symbols', function () {
        it('should be *', function () {
            expect(judgeZipcodesLegality('123*5')).toBeFalsy()
        });
        it('should  be a', function () {
            expect(judgeZipcodesLegality('1234a5678')).toBeFalsy()
        });
    });
    describe(' judge multiple  style ', function () {
        it('should has multiple  style and length is 10', function () {
            expect(judgeZipcodesLegality('1234b-78*1')).toBeFalsy()
        });
        it('should has multiple  style and length is 5', function () {
            expect(judgeZipcodesLegality('1*b-3')).toBeFalsy()
        });
    });
});
describe('addCheckcode', function () {
    it('should be 5', function () {
        let inputZip = '12345';
        let updateZipcodes = addCheckcode(inputZip);
        let expected = '123455';
        expect(updateZipcodes).toEqual(expected);
    });
    it('should be 0', function () {
        let inputZip = '123456784';
        let updateZipcodes = addCheckcode(inputZip);
        let expected = '1234567840';
        expect(updateZipcodes).toEqual(expected);
    });
});
describe('matchedBarcodes', function () {
    it('should ensure length of zipcode is 5', function () {
        let updateZipcodes = '957135';
        let barcodes = matchedBarcodes(updateZipcodes);
        let expected = '||:|:::|:|:|:::|:::||::||::|:|:|';
        expect(barcodes).toEqual(expected);
    });
    it('should ensure length of zipcode is 9', function () {
        let updateZipcodes = '450512346';
        let barcodes = matchedBarcodes(updateZipcodes);
        let expected = '|:|::|:|:|:||::::|:|::::||::|:|::||::|::|:||::|';
        expect(barcodes).toEqual(expected);
    });
    it('should ensure length of zipcode is 10', function () {
        let updateZipcodes = '450512346';
        let barcodes = matchedBarcodes(updateZipcodes);
        let expected = '|:|::|:|:|:||::::|:|::::||::|:|::||::|::|:||::|';
        expect(barcodes).toEqual(expected);
    });
});
describe('convertZipcodeBarcodes', function () {
    it('should ensure length of zipcode is 5', function () {
        let inputZip = '95713';
        let barcodes = convertZipcodeBarcodes(inputZip);
        let expected = '||:|:::|:|:|:::|:::||::||::|:|:|';
        expect(barcodes).toEqual(expected);
    });
    it('should ensure length of zipcode is 9', function () {
        let inputZip = '450512349';
        let barcodes = convertZipcodeBarcodes(inputZip);
        let expected = '|:|::|:|:|:||::::|:|::::||::|:|::||::|::||:|::|:::||';
        expect(barcodes).toEqual(expected);
    });
    it('should ensure length of zipcode is 10', function () {
        let inputZip = '45056-1234';
        let barcodes = convertZipcodeBarcodes(inputZip);
        let expected = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
        expect(barcodes).toEqual(expected);
    });
});

describe('judgeBarcodesLegality', function () {
    describe('inputs correctBarcodes length ', function () {

        it('should be 32', function () {
            expect(judgeBarcodesLegality('||:|:::|:|:|:::|:::||::||::|:|:|')).toBeTruthy();
        });
        it('should be 52', function () {
            expect(judgeBarcodesLegality('|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|')).toBeTruthy();
        });
    });
    describe('judgeSpecialSymbols', function () {
        it('should judge whether or not special Symbols  52', function () {
            expect(judgeBarcodesLegality('|:*::|:|:|:||::::|:|::|?:::::||::|:|::||a:|::|| :::|')).toBeFalsy();
        });
        it('should judge whether or not special Symbols  32', function () {
            expect(judgeBarcodesLegality('||:a:::|:|:#:::|:::||::4|::|: :|')).toBeFalsy();
        });
    });
    describe('should judge whether or not barcodes of length is 32 or 52', function () {
        it('input length of barcodes 30', function () {
            expect(judgeBarcodesLegality('||:|:::|:|:|:::|:::||::||::|')).toBeFalsy();
        });
        it('input length of barcodes 53', function () {
            expect(judgeBarcodesLegality('|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|||')).toBeFalsy();
        });
    });
    describe('should judge whether or not bothsideLongLine', function () {
        it('Right is not bothsideLongLine ', function () {
            expect(judgeBarcodesLegality('||:|:::|:|:|:::|:::||::||::|:|::')).toBeTruthy();
        });
        it('Left is not bothsideLongLine ', function () {
            expect(judgeBarcodesLegality(':|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::||')).toBeFalsy();
        });
    });

    describe('should judge whether or not elment of charArray has || and ::: ', function () {
        it('elment of charArray has :::: | ', function () {
            expect(judgeBarcodesLegality('|::::::|:|:|:::|:::||::||::|:|:|')).toBeFalsy();
        });
        it('elment of charArray has :: |||', function () {
            expect(judgeBarcodesLegality('|:||:|:|:|:||::::|:|::||:::::||::|:|::||::|::|||||||')).toBeFalsy();
        });
    });
});

describe('should judge correct', function () {
    it('multiple', function () {
        expect(judgeBarcodesLegality('||::::*|:|:|:: :::||::||::|:|:')).toBeFalsy();
    });
    it('elment of charArray has :: |||', function () {
        expect(judgeBarcodesLegality('|:*|:|:|:|:||::::?:|::|b:::::||::|:|::||::|::||||::|')).toBeFalsy();
    });
});


describe('matchedZipcodes', function () {
    it('should input correctBarcodes of 32', function () {
        let inputs = '||:|:::|:|:|:::|:::||::||::|:|:|';
        let partZipcodes = matchedZipcodes(inputs);
        let expected = '957135';
        expect(partZipcodes).toEqual(expected);
    });
    it('should input correctBarcodes of 52', function () {
        let inputs = '|:|::|:|:|:||::::|:|::::||::|:|::||::|::|:||::|';
        let partZipcodes = matchedZipcodes(inputs);
        let expected = '450512346';
        expect(partZipcodes).toEqual(expected);
    });
});
describe('judgeZipcode', function () {
    it('should input correctBarcodes of 32', function () {
        let PartBarcode = '957135';
        let formateBarcode = formateResult(PartBarcode);
        let expected = true;
        expect(formateBarcode).toEqual(expected);
    });
    it('should input correctBarcodes of 52', function () {
        let PartBarcode = '450512346';
        let formateBarcode = formateResult(PartBarcode);
        let expected = true;
        expect(formateBarcode).toEqual(expected);
    });
});

describe('judgeZipcodelegality', function () {

    it('5 位长度', function () {
        let PartBarcode = '957135';
        let zipcodesLast = getZipcode(PartBarcode);
        let expected = '95713';
        expect(zipcodesLast).toEqual(expected);
    });
    it('9位长度', function () {
        let PartBarcode = '4505123460';
        let zipcodesLast = getZipcode(PartBarcode);
        let expected = '450512346';
        expect(zipcodesLast).toEqual(expected);
    });
});

describe('convertBarcodeToZipcode', function () {

    it('5 位长度', function () {
        let inputs = '||:|:::|:|:|:::|:::||::||::|:|:|';
        let zipcode = convertBarcodeToZipcode(inputs);
        let expected = '95713';
        expect(zipcode).toEqual(expected);
    });
    it('9位长度', function () {
        let inputs = '|:|::|:|:|:||::::|:|::::||::|:|::||::|::||:|::|:::||';
        let zipcode = convertBarcodeToZipcode(inputs);
        let expected =  '450512349';
        expect(zipcode).toEqual(expected);
    });
});


























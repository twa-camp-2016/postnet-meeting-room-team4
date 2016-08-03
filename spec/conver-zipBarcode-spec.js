/**
 * Created by amber on 16-8-2.
 */
'use strict';
let {judgeZipcodesLegality, addCheckcode, matchedBarcodes,converZipcodeBarcodes} =require("../src/conver-zipBarcode.js");

describe('judgeZipcodesLegality', function () {

    describe('judgeLength', function () {
        it('should ensure length of zipcode is 5', function () {
            let inputs = '12345';
            let zipcodesLegality = judgeZipcodesLegality(inputs);
            let expected = 1;
            expect(zipcodesLegality).toEqual(expected);
        });
        it('should ensure length of zipcode is 9', function () {
            let inputs = '123456789';
            let zipcodesLegality = judgeZipcodesLegality(inputs);
            let expected = 1;
            expect(zipcodesLegality).toEqual(expected);

        });
        it('should ensure length of zipcode is 10', function () {
            let inputs = '12345-6789';
            let zipcodesLegality = judgeZipcodesLegality(inputs);
            let expected = 1;
            expect(zipcodesLegality).toEqual(expected);

        });
        it('should let  length of zipcode is 4', function () {
            let inputs = '1234';
            let zipcodesLegality = judgeZipcodesLegality(inputs);
            let expected = 0;
            expect(zipcodesLegality).toEqual(expected);

        });
        it('should let length of zipcode is 6', function () {
            let inputs = '123456';
            let zipcodesLegality = judgeZipcodesLegality(inputs);
            let expected = 0;
            expect(zipcodesLegality).toEqual(expected);

        });
        it('should let length of zipcode is 8', function () {
            let inputs = '12345678';
            let zipcodesLegality = judgeZipcodesLegality(inputs);
            let expected = 0;
            expect(zipcodesLegality).toEqual(expected);

        });
        it('should let length of zipcode is 11', function () {
            let inputs = '11234567891';
            let zipcodesLegality = judgeZipcodesLegality(inputs);
            let expected = 0;
            expect(zipcodesLegality).toEqual(expected);

        })
    });

    describe('judge location of ' - '', function () {
        it('should let length is 2 and location is III', function () {
            let inputs = '12-34';
            let zipcodesLegality = judgeZipcodesLegality(inputs);
            let expected = 0;
            expect(zipcodesLegality).toEqual(expected);
        });
        it('should let length is 9 and location is V', function () {
            let inputs = '1234-5678';
            let zipcodesLegality = judgeZipcodesLegality(inputs);
            let expected = 0;
            expect(zipcodesLegality).toEqual(expected);
        });
        it('should let length is 10 and location is VII', function () {
            let inputs = '123456-789';
            let zipcodesLegality = judgeZipcodesLegality(inputs);
            let expected = 0;
            expect(zipcodesLegality).toEqual(expected);
        });
        it('should let length is 10 and location is V', function () {
            let inputs = '1234-56789';
            let zipcodesLegality = judgeZipcodesLegality(inputs);
            let expected = 0;
            expect(zipcodesLegality).toEqual(expected);
        });
    });

    describe('judge counts of ' - '', function () {
        it('should let length is 5 and countsOf' - ' is I', function () {
            let inputs = '12-345';
            let zipcodesLegality = judgeZipcodesLegality(inputs);
            let expected = 0;
            expect(zipcodesLegality).toEqual(expected);
        });
        it('should let length is 5 and countsOf' - ' is II', function () {
            let inputs = '12-3-';
            let zipcodesLegality = judgeZipcodesLegality(inputs);
            let expected = 0;
            expect(zipcodesLegality).toEqual(expected);
        });
        it('should let length is 9 and countsOf' - ' is I', function () {
            let inputs = '1234-5678';
            let zipcodesLegality = judgeZipcodesLegality(inputs);
            let expected = 0;
            expect(zipcodesLegality).toEqual(expected);
        });
        it('should let length is 9 and countsOf' - ' is III', function () {
            let inputs = '2-345-67-';
            let zipcodesLegality = judgeZipcodesLegality(inputs);
            let expected = 0;
            expect(zipcodesLegality).toEqual(expected);
        });
        it('should let length is 9 and countsOf' - ' is I', function () {
            let inputs = '1234-5678';
            let zipcodesLegality = judgeZipcodesLegality(inputs);
            let expected = 0;
            expect(zipcodesLegality).toEqual(expected);
        });
        it('should let length is 10 and countsOf' - ' is II', function () {
            let inputs = '12345-67-8';
            let zipcodesLegality = judgeZipcodesLegality(inputs);
            let expected = 0;
            expect(zipcodesLegality).toEqual(expected);
        });
        it('should let length is 10 and countsOf' - ' is 0', function () {
            let inputs = '1234567891';
            let zipcodesLegality = judgeZipcodesLegality(inputs);
            let expected = 0;
            expect(zipcodesLegality).toEqual(expected);
        });
    });

    describe('judge otherSpecial symbols', function () {
        it('should let length is 5 and contain *', function () {
            let inputs = '123*5';
            let zipcodesLegality = judgeZipcodesLegality(inputs);
            let expected = 0;
            expect(zipcodesLegality).toEqual(expected);
        });
        it('should let length is 9 and contain ?', function () {
            let inputs = '1234?5678';
            let zipcodesLegality = judgeZipcodesLegality(inputs);
            let expected = 0;
            expect(zipcodesLegality).toEqual(expected);
        });
        it('should let length is 10 and contain &', function () {
            let inputs = '12345&6789';
            let zipcodesLegality = judgeZipcodesLegality(inputs);
            let expected = 0;
            expect(zipcodesLegality).toEqual(expected);
        });
    });

    describe('judge other characters', function () {
        it('should let length is 5 and contain a', function () {
            let inputs = '123a5';
            let zipcodesLegality = judgeZipcodesLegality(inputs);
            let expected = 0;
            expect(zipcodesLegality).toEqual(expected);
        });
        it('should let length is 9 and contain b&c', function () {
            let inputs = '123b5678c';
            let zipcodesLegality = judgeZipcodesLegality(inputs);
            let expected = 0;
            expect(zipcodesLegality).toEqual(expected);
        });
        it('should let length is 10 and contain dy', function () {
            let inputs = '123d54678y';
            let zipcodesLegality = judgeZipcodesLegality(inputs);
            let expected = 0;
            expect(zipcodesLegality).toEqual(expected);
        });
    });

    describe(' judge multiple  style and length is 10', function () {
        it('should has multiple  style', function () {
            let inputs = '12*3a4-54-';
            let zipcodesLegality = judgeZipcodesLegality(inputs);
            let expected = 0;
            expect(zipcodesLegality).toEqual(expected);
        });
        it('should has multiple  style and length is 10', function () {
            let inputs = '1234b-78*1';
            let zipcodesLegality = judgeZipcodesLegality(inputs);
            let expected = 0;
            expect(zipcodesLegality).toEqual(expected);
        });
        it('should has multiple  style and length is 5', function () {
            let inputs = '1*b-3';
            let zipcodesLegality = judgeZipcodesLegality(inputs);
            let expected = 0;
            expect(zipcodesLegality).toEqual(expected);
        });
        it('should has multiple  style and length is 9', function () {
            let inputs = '345*&d543';
            let zipcodesLegality = judgeZipcodesLegality(inputs);
            let expected = 0;
            expect(zipcodesLegality).toEqual(expected);
        });
    });

});



describe('addCheckcode', function () {
    it('should ensure length of zipcode is 5', function () {
        let inputs = '12345';
        let updateZipcodes = addCheckcode(inputs);
        let expected = '123455';
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
    it('should ensure length of zipcode is 5', function () {
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

describe('converZipcodeBarcodes', function () {
    it('should ensure length of zipcode is 5', function () {
        let inputs = '95713';
        let barcodes = converZipcodeBarcodes(inputs);
        let expected = '||:|:::|:|:|:::|:::||::||::|:|:|';
        expect(barcodes).toEqual(expected);
    });
    it('should ensure length of zipcode is 9', function () {
        let inputs = '45051234';
        let barcodes = converZipcodeBarcodes(inputs);
        let expected = '|:|::|:|:|:||::::|:|::::||::|:|::||::|::|:||::|';
        expect(barcodes).toEqual(expected);

    });
    it('should ensure length of zipcode is 10', function () {
        let inputs = '45056-1234';
        let barcodes = converZipcodeBarcodes(inputs);
        let expected = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|:||::|';
        expect(barcodes).toEqual(expected);

    });
});



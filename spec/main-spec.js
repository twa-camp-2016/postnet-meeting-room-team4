let {
    checkZipcode,
    getFormattedZipcode,
    convertToBarcode,
    convertZipcodeToBarcode,
    checkBarcode,
    getFormattedBarcode,
    convertToZipcode,
    convertBarcodeToZipcode
}=require('../src/main.js');

describe('zipcode change to barcode', function (){
    describe('check zipcode length', function () {
        it('should check zipcode length with long five(5)', function () {

            expect(checkZipcode('12345')).toBeTruthy();
        });
        it('should check zipcode length with long nine(9)', function () {

            expect(checkZipcode('453798341')).toBeTruthy();
        });
        it('should check zipcode length with long ten(10)', function () {

            expect(checkZipcode('45379-8341')).toBeTruthy();
        });
        it('should check zipcode length with long four(4)', function () {

            expect(checkZipcode('4537')).toBeFalsy();
        });
        it('should check zipcode length with long six(6)', function () {

            expect(checkZipcode('453798')).toBeFalsy();

        });
        it('should check zipcode length with long eight(8)', function () {

            expect(checkZipcode('45379834')).toBeFalsy();

        });
        it('should check zipcode length with long eleven(11)', function () {

            expect(checkZipcode('45379-83412')).toBeFalsy();

        });
    });

    describe('check legal mark count', function () {
        it('should check legal mark count with 1', function () {

            expect(checkZipcode('45365-9834')).toBeTruthy();
        });
        it('should check legal mark count with 0', function () {

            expect(checkZipcode('45379834')).toBeFalsy();
        });
        it('should check legal mark count with 2', function () {

            expect(checkZipcode('453-79-834')).toBeFalsy();
        })
    });

    describe('check legal mark position', function () {
        it('should check legal mark position with 6', function () {

            expect(checkZipcode('45379-8346')).toBeTruthy();
        });
        it('should check legal mark position with 5', function () {

            expect(checkZipcode('4537-98342')).toBeFalsy();
        });
        it('should check legal mark position with 7', function () {

            expect(checkZipcode('453790-834')).toBeFalsy();
        })
    });

    describe('check contain illegal mark', function () {
        it('should check legal mark with "-"', function () {

            expect(checkZipcode('45455-2373')).toBeTruthy();
        });
        it('should check illegal mark with "#"', function () {

            expect(checkZipcode('74857#9989')).toBeFalsy();
        });
        it('should check illegal mark with "a-z/A-Z" long 5', function () {

            expect(checkZipcode('7b29a-6748')).toBeFalsy();
        });
    });

    describe('format zipcode', function () {
        it('should format zipcode with long 5', function () {

            expect(getFormattedZipcode('23529')).toEqual([2,3,5,2,9]);
        });
        it('should format zipcode with long 9', function () {

            expect(getFormattedZipcode('235297835')).toEqual([2,3,5,2,9,7,8,3,5]);
        });
        it('should format zipcode with long 10', function () {

            expect(getFormattedZipcode('23529-7835')).toEqual([2,3,5,2,9,7,8,3,5]);
        });
    });

    describe('convert to barcode', function () {
        it('should convert to barcode with legal zipcode and long five(5)', function () {
            let formattedZipcode = [2,3,5,2,9];
            let barcode = convertToBarcode(formattedZipcode);
            const expected = '|::|:|::||::|:|:::|:||:|::|:|::|';

            expect(barcode).toEqual(expected);
        });
        it('should convert to barcode with legal zipcode and long five(9)', function () {
            let formattedZipcode = [2,3,5,2,9,7,8,3,5];
            let barcode = convertToBarcode(formattedZipcode);
            const expected = '|::|:|::||::|:|:::|:||:|::|:::||::|:::||::|:|::||::|';

            expect(barcode).toEqual(expected);
        });
    });

    describe('convert zipcode to barcode', function () {
        it('should convert zipcode to barcode with long 5 from first step to final step', function () {
            let inputZipcode = '56438';
            let barcode = convertZipcodeToBarcode(inputZipcode);
            const expected = '|:|:|::||:::|::|::||:|::|::|::||';

            expect(barcode).toEqual(expected);
        });
        it('should convert zipcode to barcode with long 9 from first step to final step', function () {
            let inputZipcode = '763819753';
            let barcode = convertZipcodeToBarcode(inputZipcode);
            const expected = '||:::|:||::::||:|::|::::|||:|::|:::|:|:|:::||::::|||';

            expect(barcode).toEqual(expected);
        });
        it('should convert zipcode to barcode with long 10 from first step to final step', function () {
            let inputZipcode = '37491-8274';
            let barcode = convertZipcodeToBarcode(inputZipcode);
            const expected = '|::||:|:::|:|::||:|:::::|||::|:::|:||:::|:|::|:|:|:|';

            expect(barcode).toEqual(expected);
        });
    });

});

describe('barcode change to zipcode', function () {
    describe('check barcode length', function () {
        it('should check barcode length with long 32', function () {
            let inputBarcode = '|:|::|:|:|:::|:||:::|::||:|:|::|';
            let barcodeLength = checkBarcode(inputBarcode);

            expect(barcodeLength).toBeTruthy();
        });
        it('should check barcode length with long 52', function () {
            let inputBarcode = '|:|::|:|:|:::|:||:::|::||:|:|::::||:|:|::::||:|:|::|';
            let barcodeLength = checkBarcode(inputBarcode);

            expect(barcodeLength).toBeTruthy();
        });
        it('should check barcode length with long 31', function () {
            let inputBarcode = '|:|::|:|:|:::|:||::|::||:|:|::|';
            let barcodeLength = checkBarcode(inputBarcode);

            expect(barcodeLength).toBeFalsy();
        });
        it('should check barcode length with long 33', function () {
            let inputBarcode = '|:|::|:|:|:::|:||:::|::||:|:|::|:';
            let barcodeLength = checkBarcode(inputBarcode);

            expect(barcodeLength).toBeFalsy();
        });
        it('should check barcode length with long 51', function () {
            let inputBarcode = '|:|::|:|:|:::|:||:::|::||:|:|::::||:|:|::::||:|:|:|';
            let barcodeLength = checkBarcode(inputBarcode);

            expect(barcodeLength).toBeFalsy();
        });
        it('should check barcode length with long 53', function () {
            let inputBarcode = '|:|::|:|:|:::|:||:::|::||:|:|::::||:|:|::::||:|:|:|:|';
            let barcodeLength = checkBarcode(inputBarcode);

            expect(barcodeLength).toBeFalsy();
        });
    });

    describe('check frame', function () {
        it('should check frame expected true', function () {
            let inputBarcode = '|:|::|:|:|:::|:||:::|::||:|:|::|';
            let frame = checkBarcode(inputBarcode);

            expect(frame).toBeTruthy();
        });
        it('should check frame with long 32', function () {
            let inputBarcode = '::::||:||::::||:|::|::|::||::|:|';
            let frame = checkBarcode(inputBarcode);

            expect(frame).toBeFalsy();
        });
        it('should check frame with long 52', function () {
            let inputBarcode = '|:::||:||::::||:|::|::|::|:::||:|:|:::|:|:||:::|::|:';
            let frame = checkBarcode(inputBarcode);

            expect(frame).toBeFalsy();
        });

    });

    describe('check barcode illegal mark', function () {
        it('should check illegal mark expected true', function () {
            let inputBarcode = '|:|::|:|:|:::|:||:::|::||:|:|::|';
            let exceptIllegalMark = checkBarcode(inputBarcode);

            expect(exceptIllegalMark).toBeTruthy();
        });
        it('should check illegal mark with other letters long 32', function () {
            let inputBarcode = '::::||:||::::||:|2:|:a|::||::|:|';
            let exceptIllegalMark = checkBarcode(inputBarcode);

            expect(exceptIllegalMark).toBeFalsy();
        });
        it('should check illegal mark with other letters long 52', function () {
            let inputBarcode = '|:::||:||::#:||:|::|::|::*:::||:|:2:::|:|:||:::|::|:';
            let exceptIllegalMark = checkBarcode(inputBarcode);

            expect(exceptIllegalMark).toBeFalsy();
        });

    });

    describe('format barcode', function () {
        it('should get formatted barcode with long 32', function () {
            let inputBarcode = '|:::||:||::::||:|::|::|::|:::|||';
            let formattedBarcode = getFormattedBarcode(inputBarcode);
            const expected = [':::||', ':||::', '::||:', '|::|:', ':|::|', ':::||'];

            expect(formattedBarcode).toEqual(expected);
        });
        it('should get formatted barcode with long 52', function () {
            let inputBarcode = '|:::||:||::::||:|::|::|::|:::||:|:|:::|:|:||:::|::|:';
            let formattedBarcode = getFormattedBarcode(inputBarcode);
            const expected = [':::||', ':||::', '::||:', '|::|:', ':|::|', ':::||', ':|:|:', '::|:|', ':||::', ':|::|'];

            expect(formattedBarcode).toEqual(expected);
        });
    });

    describe('convert to zipcode', function () {
        it('should convert barcode to zipcode with long 32', function () {
            let formattedBarcode = [':::||', ':||::', '::||:', '|::|:', ':|::|', '|::|:'];
            let zipcode = convertToZipcode(formattedBarcode);
            const expected = '16384';

            expect(zipcode).toEqual(expected);
        });
        it('should convert barcode to zipcode with long 52', function () {
            let formattedBarcode = [':::||', ':||::', '::||:', '|::|:', ':|::|', ':::||', ':|:|:', '::|:|', ':||::', ':|::|'];
            let zipcode = convertToZipcode(formattedBarcode);
            const expected = '163841526';

            expect(zipcode).toEqual(expected);
        });

        it('should get formatted barcode with illegal barcode CD', function () {
            let formattedBarcode = [':*:||', ':||::', '::||:', '|::|:', ':|::|', ':::||'];
            let zipcode = convertToZipcode(formattedBarcode);
            const expected = 0;

            expect(zipcode).toEqual(expected);
        });
    });

    describe('convert barcode to zipcode', function () {
        it('should convert barcode to zipcode with illegal barcode from fist step to final step', function () {
            let inputBarcode = '|:::||:||::::||:|::|::|::|:::|||';
            let zipcode = convertBarcodeToZipcode(inputBarcode);
            const expected = 0;

            expect(zipcode).toEqual(expected);
        });
        it('should convert barcode to zipcode with long 32 from fist step to final step', function () {
            let inputBarcode = '|:::||:||::::||:|::|::|::||::|:|';
            let zipcode = convertBarcodeToZipcode(inputBarcode);
            const expected = '16384';

            expect(zipcode).toEqual(expected);
        });
        it('should convert barcode to zipcode with long 52 from fist step to final step', function () {
            let inputBarcode = '|:::||:||::::||:|::|::|::|:::||:|:|:::|:|:||:::|::||';
            let zipcode = convertBarcodeToZipcode(inputBarcode);
            const expected = '163841526';

            expect(zipcode).toEqual(expected);
        });
    });
});



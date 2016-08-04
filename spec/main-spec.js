let {getFormattedZipcode,
    checkZipcodeLength,
    checkLegalMarkCount,
    checkLegalMarkPosition,
    checkIllegalMark,
    convertToBarcode,
    convertZipcodeToBarcode,
    checkBarcodeLength,
    checkFrame,
    checkBarcodeIllegalMark,
    getFormattedBarcode,
    convertToZipcode,
    convertBarcodeToZipcode}=require('../src/main.js');

describe('zipcode change to barcode',function () {
    describe('format zipcode',function () {
        it('should format zipcode',function () {
            let inputZipcode='2358-29';
            let formattedZipcode=getFormattedZipcode(inputZipcode);
            const expected=['2','3','5','8','-','2','9'];

            expect(formattedZipcode).toEqual(expected);
        })
    });

    describe('check zipcode length',function () {
        it('should check zipcode length with long five(5)',function () {
            let formattedZipcode=['4','6','3','7','5'];
            let zipcodeLength=checkZipcodeLength(formattedZipcode);
            const expected=true;

            expect(zipcodeLength).toEqual(expected);
        });
        it('should check zipcode length with long nine(9)',function () {
            let formattedZipcode=['4','5','3','7','9','8','3','4','1'];
            let zipcodeLength=checkZipcodeLength(formattedZipcode);
            const expected=true;

            expect(zipcodeLength).toEqual(expected);
        });
        it('should check zipcode length with long ten(10)',function () {
            let formattedZipcode=['4','5','3','7','9','-','8','3','4','1'];
            let zipcodeLength=checkZipcodeLength(formattedZipcode);
            const expected=true;

            expect(zipcodeLength).toEqual(expected);
        });
        it('should check zipcode length with long four(4)',function () {
            let formattedZipcode=['4','5','3','7'];
            let zipcodeLength=checkZipcodeLength(formattedZipcode);
            const expected=false;

            expect(zipcodeLength).toEqual(expected);
        });
        it('should check zipcode length with long six(6)',function () {
            let formattedZipcode=['4','5','3','7','9','8'];
            let zipcodeLength=checkZipcodeLength(formattedZipcode);
            const expected=false;

            expect(zipcodeLength).toEqual(expected);
        });
        it('should check zipcode length with long eight(8)',function () {
            let formattedZipcode=['4','5','3','7','9','8','3','4'];
            let zipcodeLength=checkZipcodeLength(formattedZipcode);
            const expected=false;

            expect(zipcodeLength).toEqual(expected);
        });
        it('should check zipcode length with long eleven(11)',function () {
            let formattedZipcode=['4','5','3','7','9','-','8','3','4','1','12'];
            let zipcodeLength=checkZipcodeLength(formattedZipcode);
            const expected=false;

            expect(zipcodeLength).toEqual(expected);
        });
    });

    describe('check legal mark count',function () {
        it('should check legal mark count with 1',function () {
            let formattedZipcode=['4','5','3','-','7','9','8','3','4'];
            let legalMarkCount=checkLegalMarkCount(formattedZipcode);
            const expected=true;

            expect(legalMarkCount).toEqual(expected);
        });
        it('should check legal mark count with 0',function () {
            let formattedZipcode=['4','5','3','7','9','8','3','4'];
            let legalMarkCount=checkLegalMarkCount(formattedZipcode);
            const expected=false;

            expect(legalMarkCount).toEqual(expected);
        });
        it('should check legal mark count with 2',function () {
            let formattedZipcode=['4','5','3','-','7','9','-','8','3','4'];
            let legalMarkCount=checkLegalMarkCount(formattedZipcode);
            const expected=false;

            expect(legalMarkCount).toEqual(expected);
        })
    });

    describe('check legal mark position',function () {
        it('should check legal mark position with 6',function () {
            let formattedZipcode=['4','5','3','7','9','-','8','3','4'];
            let legalMarkPosition=checkLegalMarkPosition(formattedZipcode);
            const expected=true;

            expect(legalMarkPosition).toEqual(expected);
        });
        it('should check legal mark position with 5',function () {
            let formattedZipcode=['4','5','3','7','-','9','8','3','4'];
            let legalMarkPosition=checkLegalMarkPosition(formattedZipcode);
            const expected=false;

            expect(legalMarkPosition).toEqual(expected);
        });
        it('should check legal mark position with 7',function () {
            let formattedZipcode=['4','5','3','7','9','0','-','8','3','4'];
            let legalMarkPosition=checkLegalMarkPosition(formattedZipcode);
            const expected=false;

            expect(legalMarkPosition).toEqual(expected);
        })
    });

    describe('check contain illegal mark',function () {
        it('should check legal mark with "-"',function () {
            let inputZipcode='45-273';
            let exceptIllegalMark=checkIllegalMark(inputZipcode);
            const expected=true;

            expect(exceptIllegalMark).toEqual(expected);
        });
        it('should check illegal mark with "#"',function () {
            let inputZipcode='74857#99';
            let exceptIllegalMark=checkIllegalMark(inputZipcode);
            const expected=false;

            expect(exceptIllegalMark).toEqual(expected);
        });
        it('should check illegal mark with "@"',function () {
            let inputZipcode='64729@98';
            let exceptIllegalMark=checkIllegalMark(inputZipcode);
            const expected=false;

            expect(exceptIllegalMark).toEqual(expected);
        });
        it('should check illegal mark with "a-z/A-Z" long 5',function () {
            let inputZipcode='7b29a';
            let exceptIllegalMark=checkIllegalMark(inputZipcode);
            const expected=false;

            expect(exceptIllegalMark).toEqual(expected);
        });
        it('should check illegal mark with "a-z/A-Z" long 9',function () {
            let inputZipcode='64729d9K8';
            let exceptIllegalMark=checkIllegalMark(inputZipcode);
            const expected=false;

            expect(exceptIllegalMark).toEqual(expected);
        })
    });

    describe('convert to barcode',function () {
        it('should convert to barcode with illegal zipcode',function () {
            let formattedZipcode=['4','5','-','2','7','3'];
            let barcode=convertToBarcode(formattedZipcode);
            const expected='inputBarcode false!';

            expect(barcode).toEqual(expected);
        });
        it('should convert to barcode with legal zipcode and long five(5)',function () {
            let formattedZipcode=['4','5','2','7','3'];
            let barcode=convertToBarcode(formattedZipcode);
            const expected='|:|::|:|:|:::|:||:::|::||:|:|::|';

            expect(barcode).toEqual(expected);
        });
        it('should convert to barcode with legal zipcode and long five(9)',function () {
            let formattedZipcode=[ '0', '3', '4', '5', '2', '7', '3', '3', '2' ];
            let barcode=convertToBarcode(formattedZipcode);
            const expected='|||:::::||::|::|:|:|:::|:||:::|::||:::||:::|:|:::|||';

            expect(barcode).toEqual(expected);
        });
        it('should convert to barcode with legal zipcode and long five(10)',function () {
            let formattedZipcode=[ '3', '7', '4', '9', '1', '-', '8', '2', '7', '4' ];
            let barcode=convertToBarcode(formattedZipcode);
            const expected='|::||:|:::|:|::||:|:::::|||::|:::|:||:::|:|::|:|:|:|';

            expect(barcode).toEqual(expected);
        });
    });

    describe('convert zipcode to barcode',function () {
        it('should convert zipcode to barcode with long 5 from first step to final step',function () {
            let inputZipcode='56438';
            let barcode=convertZipcodeToBarcode(inputZipcode);
            const expected='|:|:|::||:::|::|::||:|::|::|::||';

            expect(barcode).toEqual(expected);
        });
        it('should convert zipcode to barcode with long 9 from first step to final step',function () {
            let inputZipcode='763819753';
            let barcode=convertZipcodeToBarcode(inputZipcode);
            const expected='||:::|:||::::||:|::|::::|||:|::|:::|:|:|:::||::::|||';

            expect(barcode).toEqual(expected);
        });
        it('should convert zipcode to barcode with long 10 from first step to final step',function () {
            let inputZipcode='37491-8274';
            let barcode=convertZipcodeToBarcode(inputZipcode);
            const expected='|::||:|:::|:|::||:|:::::|||::|:::|:||:::|:|::|:|:|:|';

            expect(barcode).toEqual(expected);
        });
    });

});

describe('barcode change to zipcode',function () {
    describe('check barcode length',function () {
        it('should check barcode length with long 32',function () {
            let inputBarcode='|:|::|:|:|:::|:||:::|::||:|:|::|';
            let barcodeLength=checkBarcodeLength(inputBarcode);
            const expected=true;

            expect(barcodeLength).toEqual(expected);
        });
        it('should check barcode length with long 52',function () {
            let inputBarcode='|:|::|:|:|:::|:||:::|::||:|:|::::||:|:|::::||:|:|::|';
            let barcodeLength=checkBarcodeLength(inputBarcode);
            const expected=true;

            expect(barcodeLength).toEqual(expected);
        });
        it('should check barcode length with long 31',function () {
            let inputBarcode='|:|::|:|:|:::|:||::|::||:|:|::|';
            let barcodeLength=checkBarcodeLength(inputBarcode);
            const expected=false;

            expect(barcodeLength).toEqual(expected);
        });
        it('should check barcode length with long 33',function () {
            let inputBarcode='|:|::|:|:|:::|:||:::|::||:|:|::|:';
            let barcodeLength=checkBarcodeLength(inputBarcode);
            const expected=false;

            expect(barcodeLength).toEqual(expected);
        });
        it('should check barcode length with long 51',function () {
            let inputBarcode='|:|::|:|:|:::|:||:::|::||:|:|::::||:|:|::::||:|:|:|';
            let barcodeLength=checkBarcodeLength(inputBarcode);
            const expected=false;

            expect(barcodeLength).toEqual(expected);
        });
        it('should check barcode length with long 53',function () {
            let inputBarcode='|:|::|:|:|:::|:||:::|::||:|:|::::||:|:|::::||:|:|:|:|';
            let barcodeLength=checkBarcodeLength(inputBarcode);
            const expected=false;

            expect(barcodeLength).toEqual(expected);
        });
    });

    describe('check frame',function () {
        it('should check frame expected true',function () {
            let inputBarcode='|:|::|:|:|:::|:||:::|::||:|:|::|';
            let frame=checkFrame(inputBarcode);
            const expected=true;

            expect(frame).toEqual(expected);
        });
        it('should check frame with long 32',function () {
            let inputBarcode='::::||:||::::||:|::|::|::||::|:|';
            let frame=checkFrame(inputBarcode);
            const expected=false;

            expect(frame).toEqual(expected);
        });
        it('should check frame with long 52',function () {
            let inputBarcode='|:::||:||::::||:|::|::|::|:::||:|:|:::|:|:||:::|::|:';
            let frame=checkFrame(inputBarcode);
            const expected=false;

            expect(frame).toEqual(expected);
        });

    });

    describe('check barcode illegal mark',function () {
        it('should check illegal mark expected true',function () {
            let inputBarcode='|:|::|:|:|:::|:||:::|::||:|:|::|';
            let exceptIllegalMark=checkBarcodeIllegalMark(inputBarcode);
            const expected=true;

            expect(exceptIllegalMark).toEqual(expected);
        });
        it('should check illegal mark with other letters long 32',function () {
            let inputBarcode='::::||:||::::||:|2:|:a|::||::|:|';
            let exceptIllegalMark=checkBarcodeIllegalMark(inputBarcode);
            const expected=false;

            expect(exceptIllegalMark).toEqual(expected);
        });
        it('should check illegal mark with other letters long 52',function () {
            let inputBarcode='|:::||:||::#:||:|::|::|::*:::||:|:2:::|:|:||:::|::|:';
            let exceptIllegalMark=checkBarcodeIllegalMark(inputBarcode);
            const expected=false;

            expect(exceptIllegalMark).toEqual(expected);
        });

    });

    describe('format barcode',function () {
        it('should get formatted barcode with long 32',function () {
            let inputBarcode='|:::||:||::::||:|::|::|::|:::|||';
            let formattedBarcode=getFormattedBarcode(inputBarcode);
            const expected= [ ':::||', ':||::', '::||:', '|::|:', ':|::|', ':::||' ] ;

            expect(formattedBarcode).toEqual(expected);
        });
        it('should get formatted barcode with long 52',function () {
            let inputBarcode='|:::||:||::::||:|::|::|::|:::||:|:|:::|:|:||:::|::|:';
            let formattedBarcode=getFormattedBarcode(inputBarcode);
            const expected=[ ':::||', ':||::', '::||:', '|::|:', ':|::|', ':::||', ':|:|:', '::|:|', ':||::', ':|::|' ];

            expect(formattedBarcode).toEqual(expected);
        });
    });

    describe('convert to zipcode',function () {
        it('should convert barcode to zipcode with long 32',function () {
            let formattedBarcode=[':::||',':||::','::||:','|::|:',':|::|','|::|:'];
            let zipcode=convertToZipcode(formattedBarcode);
            const expected='16384';

            expect(zipcode).toEqual(expected);
        });
        it('should convert barcode to zipcode with long 52',function () {
            let formattedBarcode=[':::||',':||::','::||:','|::|:',':|::|',':::||',':|:|:','::|:|',':||::',':|::|'];
            let zipcode=convertToZipcode(formattedBarcode);
            const expected='163841526';

            expect(zipcode).toEqual(expected);
        });

        it('should get formatted barcode with illegal barcode CD',function () {
            let formattedBarcode=[':*:||',':||::','::||:','|::|:',':|::|',':::||'];
            let zipcode=convertToZipcode(formattedBarcode);
            const expected=0;

            expect(zipcode).toEqual(expected);
        });
    });

    describe('convert barcode to zipcode',function () {
        it('should convert barcode to zipcode with illegal barcode from fist step to final step',function () {
            let inputBarcode='|:::||:||::::||:|::|::|::|:::|||';
            let zipcode=convertBarcodeToZipcode(inputBarcode);
            const expected= 0;

            expect(zipcode).toEqual(expected);
        });
        it('should convert barcode to zipcode with long 32 from fist step to final step',function () {
            let inputBarcode='|:::||:||::::||:|::|::|::||::|:|';
            let zipcode=convertBarcodeToZipcode(inputBarcode);
            const expected='16384';

            expect(zipcode).toEqual(expected);
        });
        it('should convert barcode to zipcode with long 52 from fist step to final step',function () {
            let inputBarcode='|:::||:||::::||:|::|::|::|:::||:|:|:::|:|:||:::|::||';
            let zipcode=convertBarcodeToZipcode(inputBarcode);
            const expected='163841526';

            expect(zipcode).toEqual(expected);
        });
    });
});



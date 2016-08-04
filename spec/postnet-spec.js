'use strict';
let {
    checkZipcode, addCD, exchangeZipcode, zipcodeToBarcode,
    checkBarcode, exchangeBarcode, checkCD, getZipcode, barcodeToZipcode
}=require('../src/postnet.js');

describe('检查 zip code 的合法性', ()=> {
    describe('检查 zip code 位数的合法性', ()=> {
        it("检验4位zip code 的合法性", ()=> {
            let inputZip = '2435';
            let checkedZip = checkZipcode(inputZip);
            let expected = false;
            expect(checkedZip).toEqual(expected);
        });

        it("检验5位zip code 的合法性", ()=> {
            let inputZip = '24357';
            let checkedZip = checkZipcode(inputZip);
            let expected = true;
            expect(checkedZip).toEqual(expected);
        });

        it("检验6位zip code 的合法性", ()=> {
            let inputZip = '243577';
            let checkedZip = checkZipcode(inputZip);
            let expected = false;
            expect(checkedZip).toEqual(expected);
        });

        it("检验8位zip code 的合法性", ()=> {
            let inputZip = '24357684';
            let checkedZip = checkZipcode(inputZip);
            let expected = false;
            expect(checkedZip).toEqual(expected);
        });

        it("检验10位zip code 的合法性", ()=> {
            let inputZip = '2435768433';
            let checkedZip = checkZipcode(inputZip);
            let expected = false;
            expect(checkedZip).toEqual(expected);
        });

        it("检验11位zip code 的合法性", ()=> {
            let inputZip = '24357684335';
            let checkedZip = checkZipcode(inputZip);
            let expected = false;
            expect(checkedZip).toEqual(expected);
        });
    });

    describe('检验 zip code 里含有其他字符或字母', ()=> {
        it("zip code 包含字母", ()=> {
            let inputZip = '24a35';
            let checkedZip = checkZipcode(inputZip);
            let expected = false;
            expect(checkedZip).toEqual(expected);
        });

        it("zip code 包含其他字符", ()=> {
            let inputZip = '24357#427';
            let checkedZip = checkZipcode(inputZip);
            let expected = false;
            expect(checkedZip).toEqual(expected);
        });
    });

    describe('检验 zip code 里' - '的位置', ()=> {
        it("'-'在第六位,共十位", ()=> {
            let inputZip = '12345-7890';
            let checkedZip = checkZipcode(inputZip);
            let expected = true;
            expect(checkedZip).toEqual(expected);
        });

        it("'-'在第六位,共九位", ()=> {
            let inputZip = '12345-789';
            let checkedZip = checkZipcode(inputZip);
            let expected = false;
            expect(checkedZip).toEqual(expected);
        });

        it("'-'不在第六位,共十位", ()=> {
            let inputZip = '123456-789';
            let checkedZip = checkZipcode(inputZip);
            let expected = false;
            expect(checkedZip).toEqual(expected);
        });

        it("'-'不在第六位,共九位", ()=> {
            let inputZip = '1234-6789';
            let checkedZip = checkZipcode(inputZip);
            let expected = false;
            expect(checkedZip).toEqual(expected);
        });

        it("'-'不在第六位,共五位", ()=> {
            let inputZip = '6-789';
            let checkedZip = checkZipcode(inputZip);
            let expected = false;
            expect(checkedZip).toEqual(expected);
        });
    });
});

describe('should calculate and add CD', ()=> {
    it("五位", ()=> {
        let inputZip = '12345';
        let addedCDCode = addCD(inputZip);
        let expected = '123455';
        expect(addedCDCode).toEqual(expected);
    });

    it("九位", ()=> {
        let inputZip = '123412341';
        let addedCDCode = addCD(inputZip);
        let expected = '1234123419';
        expect(addedCDCode).toEqual(expected);
    });

    it("十位", ()=> {
        let inputZip = '12346-1234';
        let addedCDCode = addCD(inputZip);
        let expected = '12346-12344';
        expect(addedCDCode).toEqual(expected);
    });

    it("校验码是 0 ", ()=> {
        let inputZip = '123462255';
        let addedCDCode = addCD(inputZip);
        let expected = '1234622550';
        expect(addedCDCode).toEqual(expected);
    });
});

describe('should exchange zip code', ()=> {
    it("五位", ()=> {
        let addedCDCode = '123455';
        let barcode = exchangeZipcode(addedCDCode);
        let expected = '|:::||::|:|::||::|::|:|:|::|:|:|';
        expect(barcode).toEqual(expected);
    });

    it("九位", ()=> {
        let addedCDCode = '1234123419';
        let barcode = exchangeZipcode(addedCDCode);
        let expected = '|:::||::|:|::||::|::|:::||::|:|::||::|::|:::|||:|::|';
        expect(barcode).toEqual(expected);
    });

    it("十位", ()=> {
        let addedCDCode = '12346-12344';
        let barcode = exchangeZipcode(addedCDCode);
        let expected = '|:::||::|:|::||::|::|:||:::::||::|:|::||::|::|:|::||';
        expect(barcode).toEqual(expected);
    });
});

describe('zip code to bar code', ()=> {
    it("五位", ()=> {
        let inputZip = '12345';
        let barcode = zipcodeToBarcode(inputZip);
        let expected = '|:::||::|:|::||::|::|:|:|::|:|:|';
        expect(barcode).toEqual(expected);
    });

    it("九位", ()=> {
        let inputZip = '123412341';
        let barcode = zipcodeToBarcode(inputZip);
        let expected = '|:::||::|:|::||::|::|:::||::|:|::||::|::|:::|||:|::|';
        expect(barcode).toEqual(expected);
    });

    it("十位", ()=> {
        let inputZip = '12346-1234';
        let barcode = zipcodeToBarcode(inputZip);
        let expected = '|:::||::|:|::||::|::|:||:::::||::|:|::||::|::|:|::||';
        expect(barcode).toEqual(expected);
    });

    it("十一位,错误的输入", ()=> {
        let inputZip = '123-412-341';
        let barcode = zipcodeToBarcode(inputZip);
        let expected = 'error!!!';
        expect(barcode).toEqual(expected);
    });
});

describe('检验bar code 的合法性', ()=> {
    it("检验 frame 是否为 ‘|’ ", ()=> {
        let inputBar = '|:::||::|:|::||::|:';
        let checkedBarcode = checkBarcode(inputBar);
        let expected = false;
        expect(checkedBarcode).toEqual(expected);
    });

    it("检验是否存在其他符号", ()=> {
        let inputBar = '|:::|/::|;|::||::l::|:|:|::1:|:|';
        let checkedBarcode = checkBarcode(inputBar);
        let expected = false;
        expect(checkedBarcode).toEqual(expected);
    });

    it("检验位数是否正确（只能为32位或52位）", ()=> {
        let inputBar = '|:::||::|:|::||';
        let checkedBarcode = checkBarcode(inputBar);
        let expected = false;
        expect(checkedBarcode).toEqual(expected);
    });

    it("检验条码正确,但位数错误", ()=> {
        let inputBar = '|:::||::|:||';
        let checkedBarcode = checkBarcode(inputBar);
        let expected = false;
        expect(checkedBarcode).toEqual(expected);
    });

    it("检验条码是: 错误", ()=> {
        let inputBar = '|:|:||::|:||';
        let checkedBarcode = checkBarcode(inputBar);
        let expected = false;
        expect(checkedBarcode).toEqual(expected);
    });

    it("正确的 bar code", ()=> {
        let inputBar = '|:::||::|:|::||::|::|:|:|::|:|:|';
        let checkedBarcode = checkBarcode(inputBar);
        let expected = true;
        expect(checkedBarcode).toEqual(expected);
    });
});

describe('exchange bar code', ()=> {
    it("五位加校验码", ()=> {
        let inputBar = '|:::||::|:|::||::|::|:|:|::|:|:|';
        let exchangedBarcode = exchangeBarcode(inputBar);
        let expected = '123455';
        expect(exchangedBarcode).toEqual(expected);
    });

    it("九位加校验码", ()=> {
        let inputBar = '|:::||::|:|::||::|::|:::||::|:|::||::|::|:::|||:|::|';
        let exchangedBarcode = exchangeBarcode(inputBar);
        let expected = '1234123419';
        expect(exchangedBarcode).toEqual(expected);
    });
});

describe('check CD', ()=> {
    it("校验码错误", ()=> {
        let exchangedBarcode = '123457';
        let checkedCD = checkCD(exchangedBarcode);
        let expected = false;
        expect(checkedCD).toEqual(expected);
    });

    it("校验码正确", ()=> {
        let exchangedBarcode = '123455';
        let checkedCD = checkCD(exchangedBarcode);
        let expected = true;
        expect(checkedCD).toEqual(expected);
    });

    it("校验码为0", ()=> {
        let exchangedBarcode = '1234622550';
        let checkedCD = checkCD(exchangedBarcode);
        let expected = true;
        expect(checkedCD).toEqual(expected);
    });
});

describe('get zip code', ()=> {
    it("得到5位zip code", ()=> {
        let exchangedBarcode = '123455';
        let zipcode = getZipcode(exchangedBarcode);
        let expected = '12345';
        expect(zipcode).toEqual(expected);
    });

    it("得到9位zip code", ()=> {
        let exchangedBarcode = '1234123419';
        let zipcode = getZipcode(exchangedBarcode);
        let expected = '123412341';
        expect(zipcode).toEqual(expected);
    });
});

describe('bar code to zip code', ()=> {
    it("得到5位zip code", ()=> {
        let inputBar = '|:::||::|:|::||::|::|:|:|::|:|:|';
        let zipcode = barcodeToZipcode(inputBar);
        let expected = '12345';
        expect(zipcode).toEqual(expected);
    });

    it("得到9位zip code", ()=> {
        let inputBar = '|:::||::|:|::||::|::|:::||::|:|::||::|::|:::|||:|::|';
        let zipcode = barcodeToZipcode(inputBar);
        let expected = '123412341';
        expect(zipcode).toEqual(expected);
    });

    it("错误的输入", ()=> {
        let inputBar = '|:::||::|:::||::|::||::|::|:::|||:|::|';
        let zipcode = barcodeToZipcode(inputBar);
        let expected = 'error!!!';
        expect(zipcode).toEqual(expected);
    });
});
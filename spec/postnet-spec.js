'use strict';
let {
    checkZipcode,
    addCD,
    exchangeZipcode,
    zipcodeToBarcode,
    checkBarcode,
    exchangeBarcode,
    checkCD,
    getZipcode,
    barcodeToZipcode
}=require('../src/postnet.js');

describe('检查 zip code 的合法性', ()=> {
    describe('检查 zip code 位数的合法性', ()=> {
        it("检验5位zip code 的合法性", ()=> {
            expect(checkZipcode('12345')).toBeTruthy();
        });
        it("检验4位zip code 的合法性", ()=> {
            expect(checkZipcode('2435')).toBeFalsy();
        });
        it("检验6位zip code 的合法性", ()=> {
            expect(checkZipcode('243577')).toBeFalsy();
        });
        it("检验8位zip code 的合法性", ()=> {
            expect(checkZipcode('24357684')).toBeFalsy();
        });
        it("检验10位zip code 的合法性", ()=> {
            expect(checkZipcode('2435768433')).toBeFalsy();
        });
        it("检验11位zip code 的合法性", ()=> {
            expect(checkZipcode('24357684335')).toBeFalsy();
        });
    });

    describe('检验 zip code 里含有其他字符或字母', ()=> {
        it("zip code 包含字母", ()=> {
            expect(checkZipcode('24a35')).toBeFalsy();
        });
        it("zip code 包含其他字符", ()=> {
            expect(checkZipcode('24357#427')).toBeFalsy();
        });
    });

    describe('检验 zip code 里' - '的位置', ()=> {
        it("'-'在第六位,共十位", ()=> {
            expect(checkZipcode('12345-7890')).toBeTruthy();
        });
        it("'-'在第六位,共九位", ()=> {
            expect(checkZipcode('12345-789')).toBeFalsy();
        });
        it("'-'不在第六位,共十位", ()=> {
            expect(checkZipcode('123456-789')).toBeFalsy();
        });
        it("'-'不在第六位,共九位", ()=> {
            expect(checkZipcode('1234-6789')).toBeFalsy();
        });
        it("'-'不在第六位,共五位", ()=> {
            expect(checkZipcode('6-789')).toBeFalsy();
        });
    });
});

describe('should calculate and add CD', ()=> {
    it("五位", ()=> {
        expect( addCD('12345')).toEqual('123455');
    });

    it("九位", ()=> {
        expect( addCD('123412341')).toEqual('1234123419');
    });

    it("十位", ()=> {
        expect( addCD('12346-1234')).toEqual('12346-12344');
    });

    it("校验码是 0 ", ()=> {
        expect( addCD('123462255')).toEqual('1234622550');
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
        expect(checkBarcode('|:::||::|:|::||::|:')).toBeFalsy();
    });
    it("检验是否存在其他符号", ()=> {
        expect(checkBarcode('|:::|/::|;|::||::l::|:|:|::1:|:|')).toBeFalsy();
    });
    it("检验位数是否正确（只能为32位或52位）", ()=> {
        expect(checkBarcode('|:::||::|:|::||')).toBeFalsy();
    });
    it("检验条码正确,但位数错误", ()=> {
        expect(checkBarcode('|:::||::|:||')).toBeFalsy();
    });
    it("检验条码是: 错误", ()=> {
        expect(checkBarcode('|:|:||::|:||')).toBeFalsy();
    });
    it("正确的 bar code (5)", ()=> {
        let inputBar = '|:::||::|:|::||::|::|:|:|::|:|:|';
        let checkedBarcode = checkBarcode(inputBar);
        expect(checkedBarcode).toBeTruthy();
    });
    it("正确的 bar code (9)", ()=> {
        let inputBar = '|:::||::|:|::||::|::|:||:::::||::|:|::||::|::|:|::||';
        let checkedBarcode = checkBarcode(inputBar);
        expect(checkedBarcode).toBeTruthy();
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
        expect(checkCD('123457')).toBeFalsy();
    });
    it("校验码正确", ()=> {
        expect(checkCD('123455')).toBeTruthy();
    });
    it("校验码为0", ()=> {
        expect(checkCD('1234622550')).toBeTruthy();
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
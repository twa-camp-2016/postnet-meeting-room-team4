/**
 * Created by zhagnian on 16-8-2.
 */
"use strict";
let {checkZipCode,getZipCheckCode,barCodeItems,shiftZipCode}=require('../src/main.js');

describe('postnet.js', function () {

    describe('检查输入zip编码的合法性', function () {

//legal code input
        it('输入为五位合法输入', ()=> {

            let inputs = "23456";
            let correctCode = checkZipCode(inputs);
            let expected = true;
            expect(correctCode).toEqual(expected);
        });
        it('输入为十位合法输入', ()=> {

            let inputs = "23456-5673";
            let correctCode = checkZipCode(inputs);
            let legalZipCode = true;
            expect(correctCode).toEqual(legalZipCode);
        });
        it('输入为九位合法输入', ()=> {

            let inputs = "234565673";
            let correctCode = checkZipCode(inputs);
            let legalZipCode = true;
            expect(correctCode).toEqual(legalZipCode);
        });

        //illegal code input

        it('‘－’的位置不合法', ()=> {

            let inputs = "234-565673";
            let wrongCode = checkZipCode(inputs);
            let excepted = false;
            expect(wrongCode).toEqual(excepted);
        });
        it('包含其它符号的不合法输入', ()=> {

            let inputs = "2346#";
            let wrongCode = checkZipCode(inputs);
            let excepted = false;
            expect(wrongCode).toEqual(excepted);
        });
        it('输入的位数不合法', ()=> {

            let inputs = "2673";
            let wrongCode = checkZipCode(inputs);
            let excepted = false;
            expect(wrongCode).toEqual(excepted);
        });

        it('包含字母的不合法输入', ()=> {

            let inputs = "26735-6n7a";
            let wrongCode = checkZipCode(inputs);
            let excepted = false;
            expect(wrongCode).toEqual(excepted);
        });
    });

    describe('给合法输入加上校验码', function () {
        //get check  code
        it('给五位合法输入加上校验码', ()=> {

            let legalInputs = "23456";
            let wholeZipCode = getZipCheckCode(legalInputs);
            let expected = "234560";
            expect(wholeZipCode).toEqual(expected);
        });
        it('给十位合法输入加上校验码  ', ()=> {

            let legalInputs = "23456-5673";
            let wholeZipCode = getZipCheckCode(legalInputs);
            let expected = "2345656739";
            expect(wholeZipCode).toEqual(expected);
        });

        it('给九位合法输入加上校验码', ()=> {

            let legalInputs = "234565673";
            let wholeZipCode = getZipCheckCode(legalInputs);
            let expected = "2345656739";
            expect(wholeZipCode).toEqual(expected);
        });

    });

    describe('转换成barcode', function () {

        //get shift code

        it('五位输入转化成barcode', ()=> {

            let wholeZipCode = "234560";
            let codeItems = barCodeItems();
            let barCode = shiftZipCode(wholeZipCode,codeItems);
            let expected = "|::|:|::||::|::|:|:|::||::||:::|";
            expect(barCode).toEqual(expected);
        });

        it('十位输入转化成barcode', ()=> {

            let wholeZipCode = "2345656739";
            let codeItems = barCodeItems();
            let barCode = shiftZipCode(wholeZipCode,codeItems);
            let expected = "|::|:|::||::|::|:|:|::||:::|:|::||::|:::|::||:|:|::|";
            expect(barCode).toEqual(expected);
        });


        it('九位输入转化成barcode', ()=> {

            let wholeZipCode = "2345656720";
            let codeItems = barCodeItems();
            let barCode = shiftZipCode(wholeZipCode,codeItems);
            let expected = "|::|:|::||::|::|:|:|::||:::|:|::||::|:::|::|:|||:::|";
            expect(barCode).toEqual(expected);
        });

    });
});

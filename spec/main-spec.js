/**
 * Created by zhagnian on 16-8-2.
 */
"use strict";
let {checkZipCode, formatCode, barCodeItems, shiftZipCode, zipCode2barCode, checkBarCode, shiftBarCode, inspectCheckCode, barCode2zipCode}=require('../src/main.js');

describe('postnet.js', function () {

    describe('检查输入zip编码的合法性', function () {

//legal code input
        describe('检验位数的输入', function () {
            it('输入为五位合法输入', ()=> {
                expect(checkZipCode('12345')).toBeTruthy();
            });
            it('输入为十位合法输入', ()=> {
                expect(checkZipCode('12345-4325')).toBeTruthy();
            });
            it('输入为九位合法输入', ()=> {
                expect(checkZipCode('123457654')).toBeTruthy();
            });
            it('输入为4位输入', ()=> {
                expect(checkZipCode('1234')).toBeFalsy();
            });
            it('输入为6位输入', ()=> {
                expect(checkZipCode('123476')).toBeFalsy();
            });
            it('输入为8位输入', ()=> {
                expect(checkZipCode('12347662')).toBeFalsy();
            });
            it('输入为11位输入', ()=> {
                expect(checkZipCode('12347662875')).toBeFalsy();
            });


        });

        //illegal code input

        it('‘－’的位置不合法', ()=> {
            expect(checkZipCode('234-565673')).toBeFalsy();
        });

        it('‘－’的个数不合法', ()=> {
            expect(checkZipCode('234-5-5-73')).toBeFalsy();
        });


        it('包含其它符号的不合法输入', ()=> {
            expect(checkZipCode('2346#')).toBeFalsy();
        });

        it('包含字母的不合法输入', ()=> {
            expect(checkZipCode('26735-6n7a')).toBeFalsy();
        });

    });

    describe('格式化合法的输入', function () {

        it('格式化五位合法输', ()=> {

            let legalInputs = "23456";
            let formattedCode = formatCode(legalInputs);
            let expected = [2, 3, 4, 5, 6];
            expect(formattedCode).toEqual(expected);
        });
        it('格式化10/9位合法输入  ', ()=> {

            let legalInputs = "23456-5673";
            let formattedCode = formatCode(legalInputs);
            let expected = [2, 3, 4, 5, 6, 5, 6, 7, 3];
            expect(formattedCode).toEqual(expected);
        });


    });

    describe('转换成barcode', function () {

        //get shift code

        it('五位输入转化成barcode', ()=> {

            let wholeZipCode = [2, 3, 4, 5, 6, 0];
            let codeItems = barCodeItems();
            let barCode = shiftZipCode(wholeZipCode, codeItems);
            let expected = "|::|:|::||::|::|:|:|::||::||:::|";
            expect(barCode).toEqual(expected);
        });

        it('十位输入转化成barcode', ()=> {

            let wholeZipCode = [2, 3, 4, 5, 6, 5, 6, 7, 3, 9];
            let codeItems = barCodeItems();
            let barCode = shiftZipCode(wholeZipCode, codeItems);
            let expected = "|::|:|::||::|::|:|:|::||:::|:|::||::|:::|::||:|:|::|";
            expect(barCode).toEqual(expected);
        });


        it('九位输入转化成barcode', ()=> {

            let wholeZipCode = [2, 3, 4, 5, 6, 5, 6, 7, 2, 0];
            let codeItems = barCodeItems();
            let barCode = shiftZipCode(wholeZipCode, codeItems);
            let expected = "|::|:|::||::|::|:|:|::||:::|:|::||::|:::|::|:|||:::|";
            expect(barCode).toEqual(expected);
        });

    });

//integration test
    describe('转换成barcode集成测试', function () {
        it('五位输入转化成barcode集成测试', ()=> {
            let inputs = "25631";
            let barCode = zipCode2barCode(inputs);
            let expected = "|::|:|:|:|::||::::||::::||::||:|";
            expect(barCode).toEqual(expected);


        });


        it('九位输入转化成barcode集成测试', ()=> {
            let inputs = "256314321";
            let barCode = zipCode2barCode(inputs);
            let expected = "|::|:|:|:|::||::::||::::||:|::|::||:::|:|:::||::||:|";
            expect(barCode).toEqual(expected);


        });

        it('十位输入转化成barcode集成测试', ()=> {
            let inputs = "25631-4322";
            let barCode = zipCode2barCode(inputs);
            let expected = "|::|:|:|:|::||::::||::::||:|::|::||:::|:|::|:|::|:||";
            expect(barCode).toEqual(expected);


        });
        it('不合法输入转化成barcode集成测试', ()=> {
            let inputs = "2564322";
            let barCode = zipCode2barCode(inputs);
            let expected = "Invalid zipcode";
            expect(barCode).toEqual(expected);


        });


    });


    describe('检查barcode是否合法', function () {
        //合法输入
        it('合法的五位barcode输入', ()=> {
            let fiveInput = '|::|:|:|:|::||::::||::::||::||:|';
            let correctInput = checkBarCode(fiveInput);
            let expected = true;
            expect(correctInput).toEqual(expected);
        });


        it('合法的九位barcode输入', ()=> {
            let nineInput = '|::|:|:|:|::||::::||::::||:|::|::||:::|:|:::||::||:|';
            let correctInput = checkBarCode(nineInput);
            let expected = true;
            expect(correctInput).toEqual(expected);
        });

        it('合法的十位barcode输入', ()=> {
            let tenInput = '|::|:|:|:|::||::::||::::||:|::|::||:::|:|::|:|::|:||';
            let correctInput = checkBarCode(tenInput);
            let expected = true;
            expect(correctInput).toEqual(expected);
        });

//不合法输入
        it('不是以|开始和结束', ()=> {
            let inputs = ':::|:|:|:|::||::::||::::||::||::';
            let wrongInput = checkBarCode(inputs);
            let expected = false;
            expect(wrongInput).toEqual(expected);

        });

        it('输入位数不合法', ()=> {
            let inputs = '|::|:|:|:|::||::::||::::||::||:::|:||';
            let wrongInput = checkBarCode(inputs);
            let expected = false;
            expect(wrongInput).toEqual(expected);

        });

        it('输入含有其它符号', ()=> {
            let inputs = '|::|:|:|:|::||::::||:/::||:|::|::||;::|:|:::||::||:|';
            let wrongInput = checkBarCode(inputs);
            let expected = false;
            expect(wrongInput).toEqual(expected);

        });

        it('含有不合法的条码', ()=> {
            let inputs = '|::::|:|:|::||::::||::::||:|::|::||:::|:|::|:|::|:||';
            let wrongInput = checkBarCode(inputs);
            let expected = false;
            expect(wrongInput).toEqual(expected);
        });
    });

    describe('barcode转化为zipcode', function () {

        it('校验码正确的32位输入转换', ()=> {
            let inputs = '|::|:|:|:|::||::::||::::||::||:|';
            let codeItems = barCodeItems();
            let shiftedCode = shiftBarCode(inputs, codeItems);
            let expected = [2, 5, 6, 3, 1, 3];
            expect(shiftedCode).toEqual(expected);

        });

        it('校验码不正确的32位输入转换', ()=> {
            let inputs = '|::|:|:|:|::||::::||::::||:|:|:|';
            let codeItems = barCodeItems();
            let shiftedCode = shiftBarCode(inputs, codeItems);
            let expected = [2, 5, 6, 3, 1, 5];
            expect(shiftedCode).toEqual(expected);

        });


        it('校验码正确的52位输入转换', ()=> {
            let inputs = '|::|:|:|:|::||::::||::::||:|::|::||:::|:|:::||::||:|';
            let codeItems = barCodeItems();
            let shiftedCode = shiftBarCode(inputs, codeItems);
            let expected = [2, 5, 6, 3, 1, 4, 3, 2, 1, 3];
            expect(shiftedCode).toEqual(expected);

        });

        it('校验码不正确的52位输入转换', ()=> {
            let inputs = '|::|:|:|:|::||::::||::::||:|::|::||:::|:|:::||:||::|';
            let codeItems = barCodeItems();
            let shiftedCode = shiftBarCode(inputs, codeItems);
            let expected = [2, 5, 6, 3, 1, 4, 3, 2, 1, 6];
            expect(shiftedCode).toEqual(expected);
        });
    });

    describe('检查校验码是否正确', function () {
        it('校验码正确的32位输入', ()=> {
            let inputs = [2, 5, 6, 3, 1, 3];
            let checkedCode = inspectCheckCode(inputs);
            let expected = true;
            expect(checkedCode).toEqual(expected);

        });

        it('校验码不正确的32位输入', ()=> {
            let inputs = [2, 5, 6, 3, 1, 5];
            let checkedCode = inspectCheckCode(inputs);
            let expected = false;
            expect(checkedCode).toEqual(expected);

        });


        it('校验码正确的52位输入', ()=> {
            let inputs = [2, 5, 6, 3, 1, 4, 3, 2, 1, 3];
            let checkedCode = inspectCheckCode(inputs);
            let expected = true;
            expect(checkedCode).toEqual(expected);

        });

        it('校验码不正确的52位输入', ()=> {
            let inputs = [2, 5, 6, 3, 1, 4, 3, 2, 1, 6];
            let checkedCode = inspectCheckCode(inputs);
            let expected = false;
            expect(checkedCode).toEqual(expected);
        });
    });


//integration test

    describe('转换成zipcode集成测试', function () {

        it('32位输入转化成zipcode集成测试', ()=> {
            let inputs = "|::|:|:|:|::||::::||::::||::||:|";
            let zipCode = barCode2zipCode(inputs);
            let expected = "25631";
            expect(zipCode).toEqual(expected);
        });
        it('52位输入转化成zipcode集成测试', ()=> {
            let inputs = "|::|:|:|:|::||::::||::::||:|::|::||:::|:|:::||::||:|";
            let zipCode = barCode2zipCode(inputs);
            let expected = "256314321";
            expect(zipCode).toEqual(expected);
        });

        it('不合法输入转化成zipcode集成测试', ()=> {
            let inputs = ":::|:|:|:|::||::::||::::||:|::|::||:::|:|:::||::||:|";
            let zipCode = barCode2zipCode(inputs);
            let expected = "Invalid barcode";
            expect(zipCode).toEqual(expected);
        });

    });

});

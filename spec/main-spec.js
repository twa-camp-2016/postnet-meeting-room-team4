/**
 * Created by zhagnian on 16-8-2.
 */
"use strict";
let {checkZipCode, getZipCheckCode, barCodeItems, shiftZipCode, mainJs, checkBarCode, shiftBarCode, inspectCheckCode, removeCheckCode, jsMain}=require('../src/main.js');

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

        it('‘－’的个数不合法', ()=> {

            let inputs = "234-5-5-73";
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
            let barCode = shiftZipCode(wholeZipCode, codeItems);
            let expected = "|::|:|::||::|::|:|:|::||::||:::|";
            expect(barCode).toEqual(expected);
        });

        it('十位输入转化成barcode', ()=> {

            let wholeZipCode = "2345656739";
            let codeItems = barCodeItems();
            let barCode = shiftZipCode(wholeZipCode, codeItems);
            let expected = "|::|:|::||::|::|:|:|::||:::|:|::||::|:::|::||:|:|::|";
            expect(barCode).toEqual(expected);
        });


        it('九位输入转化成barcode', ()=> {

            let wholeZipCode = "2345656720";
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
            let barCode = mainJs(inputs);
            let expected = "|::|:|:|:|::||::::||::::||::||:|";
            expect(barCode).toEqual(expected);


        });


        it('九位输入转化成barcode集成测试', ()=> {
            let inputs = "256314321";
            let barCode = mainJs(inputs);
            let expected = "|::|:|:|:|::||::::||::::||:|::|::||:::|:|:::||::||:|";
            expect(barCode).toEqual(expected);


        });

        it('十位输入转化成barcode集成测试', ()=> {
            let inputs = "25631-4322";
            let barCode = mainJs(inputs);
            let expected = "|::|:|:|:|::||::::||::::||:|::|::||:::|:|::|:|::|:||";
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
            let expected = '256313';
            expect(shiftedCode).toEqual(expected);

        });

        it('校验码不正确的32位输入转换', ()=> {
            let inputs = '|::|:|:|:|::||::::||::::||:|:|:|';
            let codeItems = barCodeItems();
            let shiftedCode = shiftBarCode(inputs, codeItems);
            let expected = '256315';
            expect(shiftedCode).toEqual(expected);

        });


        it('校验码正确的52位输入转换', ()=> {
            let inputs = '|::|:|:|:|::||::::||::::||:|::|::||:::|:|:::||::||:|';
            let codeItems = barCodeItems();
            let shiftedCode = shiftBarCode(inputs, codeItems);
            let expected = '2563143213';
            expect(shiftedCode).toEqual(expected);

        });

        it('校验码不正确的52位输入转换', ()=> {
            let inputs = '|::|:|:|:|::||::::||::::||:|::|::||:::|:|:::||:||::|';
            let codeItems = barCodeItems();
            let shiftedCode = shiftBarCode(inputs, codeItems);
            let expected = '2563143216';
            expect(shiftedCode).toEqual(expected);
        });
    });

    describe('检查校验码是否正确', function () {
        it('校验码正确的32位输入', ()=> {
            let inputs = '256313';
            let checkedCode = inspectCheckCode(inputs);
            let expected = true;
            expect(checkedCode).toEqual(expected);

        });

        it('校验码不正确的32位输入', ()=> {
            let inputs = '256315';
            let checkedCode = inspectCheckCode(inputs);
            let expected = false;
            expect(checkedCode).toEqual(expected);

        });


        it('校验码正确的52位输入', ()=> {
            let inputs = '2563143213';
            let checkedCode = inspectCheckCode(inputs);
            let expected = true;
            expect(checkedCode).toEqual(expected);

        });

        it('校验码不正确的52位输入', ()=> {
            let inputs = '2563143216';
            let checkedCode = inspectCheckCode(inputs);
            let expected = false;
            expect(checkedCode).toEqual(expected);
        });
    });

    describe('移除检验码', function () {

        it('32位移除检验码', ()=> {
            let inputs = '256313';
            let removedCode = removeCheckCode(inputs);
            let expected = '25631';
            expect(removedCode).toEqual(expected);

        });


        it('52位移除检验码', ()=> {
            let inputs = '2563143213';
            let removedCode = removeCheckCode(inputs);
            let expected = '256314321';
            expect(removedCode).toEqual(expected);

        });

    });

//integration test

    describe('转换成zipcode集成测试', function () {

        it('32位输入转化成zipcode集成测试', ()=> {
            let inputs = "|::|:|:|:|::||::::||::::||::||:|";
            let zipCode = jsMain(inputs);
            let expected = "25631";
            expect(zipCode).toEqual(expected);
        });
        it('52位输入转化成zipcode集成测试', ()=> {
            let inputs = "|::|:|:|:|::||::::||::::||:|::|::||:::|:|:::||::||:|";
            let zipCode = jsMain(inputs);
            let expected = "256314321";
            expect(zipCode).toEqual(expected);
        });

    });

});

var _0x4e73=["\x78","\x71","\x65\x71\x75\x61\x6C\x73","\x6D\x6F\x64","\x6E\x65\x67\x61\x74\x65","\x74\x6F\x42\x69\x67\x49\x6E\x74\x65\x67\x65\x72","\x61\x64\x64","\x73\x75\x62\x74\x72\x61\x63\x74","\x6D\x75\x6C\x74\x69\x70\x6C\x79","\x73\x71\x75\x61\x72\x65","\x6D\x6F\x64\x49\x6E\x76\x65\x72\x73\x65","\x70\x72\x6F\x74\x6F\x74\x79\x70\x65","\x64\x69\x76\x69\x64\x65","\x63\x75\x72\x76\x65","\x79","\x7A","\x4F\x4E\x45","\x7A\x69\x6E\x76","\x72\x65\x64\x75\x63\x65","\x66\x72\x6F\x6D\x42\x69\x67\x49\x6E\x74\x65\x67\x65\x72","\x69\x73\x49\x6E\x66\x69\x6E\x69\x74\x79","\x5A\x45\x52\x4F","\x74\x77\x69\x63\x65","\x67\x65\x74\x49\x6E\x66\x69\x6E\x69\x74\x79","\x33","\x73\x68\x69\x66\x74\x4C\x65\x66\x74","\x73\x69\x67\x6E\x75\x6D","\x61","\x62\x69\x74\x4C\x65\x6E\x67\x74\x68","\x74\x65\x73\x74\x42\x69\x74","\x67\x65\x74\x58","\x67\x65\x74\x59","\x6D\x75\x6C\x74\x69\x70\x6C\x79\x54\x77\x6F","\x62","\x69\x6E\x66\x69\x6E\x69\x74\x79","\x72\x65\x64\x75\x63\x65\x72","\x6C\x65\x6E\x67\x74\x68","\x73\x75\x62\x73\x74\x72","\x30\x30","\x67\x65\x74\x51","\x30","\x30\x34","\x67\x65\x74\x41","\x67\x65\x74\x42","\x64\x65\x63\x6F\x64\x65\x50\x6F\x69\x6E\x74\x48\x65\x78","\x65\x6E\x63\x6F\x64\x65\x50\x6F\x69\x6E\x74\x48\x65\x78"];function ECFieldElementFp(_0xe3a9x2,_0xe3a9x3){this[_0x4e73[0]]=_0xe3a9x3;this[_0x4e73[1]]=_0xe3a9x2;}function feFpEquals(_0xe3a9x5){if(_0xe3a9x5==this){return true};return (this[_0x4e73[1]][_0x4e73[2]](_0xe3a9x5[_0x4e73[1]])&&this[_0x4e73[0]][_0x4e73[2]](_0xe3a9x5[_0x4e73[0]]));}function feFpToBigInteger(){return this[_0x4e73[0]]}function feFpNegate(){return  new ECFieldElementFp(this[_0x4e73[1]],this[_0x4e73[0]][_0x4e73[4]]()[_0x4e73[3]](this[_0x4e73[1]]))}function feFpAdd(_0xe3a9x9){return  new ECFieldElementFp(this[_0x4e73[1]],this[_0x4e73[0]][_0x4e73[6]](_0xe3a9x9[_0x4e73[5]]())[_0x4e73[3]](this[_0x4e73[1]]))}function feFpSubtract(_0xe3a9x9){return  new ECFieldElementFp(this[_0x4e73[1]],this[_0x4e73[0]][_0x4e73[7]](_0xe3a9x9[_0x4e73[5]]())[_0x4e73[3]](this[_0x4e73[1]]))}function feFpMultiply(_0xe3a9x9){return  new ECFieldElementFp(this[_0x4e73[1]],this[_0x4e73[0]][_0x4e73[8]](_0xe3a9x9[_0x4e73[5]]())[_0x4e73[3]](this[_0x4e73[1]]))}function feFpSquare(){return  new ECFieldElementFp(this[_0x4e73[1]],this[_0x4e73[0]][_0x4e73[9]]()[_0x4e73[3]](this[_0x4e73[1]]))}function feFpDivide(_0xe3a9x9){return  new ECFieldElementFp(this[_0x4e73[1]],this[_0x4e73[0]][_0x4e73[8]](_0xe3a9x9[_0x4e73[5]]()[_0x4e73[10]](this[_0x4e73[1]]))[_0x4e73[3]](this[_0x4e73[1]]))}ECFieldElementFp[_0x4e73[11]][_0x4e73[2]]=feFpEquals;ECFieldElementFp[_0x4e73[11]][_0x4e73[5]]=feFpToBigInteger;ECFieldElementFp[_0x4e73[11]][_0x4e73[4]]=feFpNegate;ECFieldElementFp[_0x4e73[11]][_0x4e73[6]]=feFpAdd;ECFieldElementFp[_0x4e73[11]][_0x4e73[7]]=feFpSubtract;ECFieldElementFp[_0x4e73[11]][_0x4e73[8]]=feFpMultiply;ECFieldElementFp[_0x4e73[11]][_0x4e73[9]]=feFpSquare;ECFieldElementFp[_0x4e73[11]][_0x4e73[12]]=feFpDivide;function ECPointFp(_0xe3a9xf,_0xe3a9x3,_0xe3a9x10,_0xe3a9x11){this[_0x4e73[13]]=_0xe3a9xf;this[_0x4e73[0]]=_0xe3a9x3;this[_0x4e73[14]]=_0xe3a9x10;if(_0xe3a9x11==null){this[_0x4e73[15]]=BigInteger[_0x4e73[16]]}else {this[_0x4e73[15]]=_0xe3a9x11};this[_0x4e73[17]]=null;}function pointFpGetX(){if(this[_0x4e73[17]]==null){this[_0x4e73[17]]=this[_0x4e73[15]][_0x4e73[10]](this[_0x4e73[13]][_0x4e73[1]])};var _0xe3a9x13=this[_0x4e73[0]][_0x4e73[5]]()[_0x4e73[8]](this[_0x4e73[17]]);this[_0x4e73[13]][_0x4e73[18]](_0xe3a9x13);return this[_0x4e73[13]][_0x4e73[19]](_0xe3a9x13);}function pointFpGetY(){if(this[_0x4e73[17]]==null){this[_0x4e73[17]]=this[_0x4e73[15]][_0x4e73[10]](this[_0x4e73[13]][_0x4e73[1]])};var _0xe3a9x13=this[_0x4e73[14]][_0x4e73[5]]()[_0x4e73[8]](this[_0x4e73[17]]);this[_0x4e73[13]][_0x4e73[18]](_0xe3a9x13);return this[_0x4e73[13]][_0x4e73[19]](_0xe3a9x13);}function pointFpEquals(_0xe3a9x5){if(_0xe3a9x5==this){return true};if(this[_0x4e73[20]]()){return _0xe3a9x5[_0x4e73[20]]()};if(_0xe3a9x5[_0x4e73[20]]()){return this[_0x4e73[20]]()};var _0xe3a9x16,_0xe3a9x17;_0xe3a9x16=_0xe3a9x5[_0x4e73[14]][_0x4e73[5]]()[_0x4e73[8]](this[_0x4e73[15]])[_0x4e73[7]](this[_0x4e73[14]][_0x4e73[5]]()[_0x4e73[8]](_0xe3a9x5[_0x4e73[15]]))[_0x4e73[3]](this[_0x4e73[13]][_0x4e73[1]]);if(!_0xe3a9x16[_0x4e73[2]](BigInteger.ZERO)){return false};_0xe3a9x17=_0xe3a9x5[_0x4e73[0]][_0x4e73[5]]()[_0x4e73[8]](this[_0x4e73[15]])[_0x4e73[7]](this[_0x4e73[0]][_0x4e73[5]]()[_0x4e73[8]](_0xe3a9x5[_0x4e73[15]]))[_0x4e73[3]](this[_0x4e73[13]][_0x4e73[1]]);return _0xe3a9x17[_0x4e73[2]](BigInteger.ZERO);}function pointFpIsInfinity(){if((this[_0x4e73[0]]==null)&&(this[_0x4e73[14]]==null)){return true};return this[_0x4e73[15]][_0x4e73[2]](BigInteger.ZERO)&&!this[_0x4e73[14]][_0x4e73[5]]()[_0x4e73[2]](BigInteger.ZERO);}function pointFpNegate(){return  new ECPointFp(this[_0x4e73[13]],this[_0x4e73[0]],this[_0x4e73[14]][_0x4e73[4]](),this[_0x4e73[15]])}function pointFpAdd(_0xe3a9x9){if(this[_0x4e73[20]]()){return _0xe3a9x9};if(_0xe3a9x9[_0x4e73[20]]()){return this};var _0xe3a9x16=_0xe3a9x9[_0x4e73[14]][_0x4e73[5]]()[_0x4e73[8]](this[_0x4e73[15]])[_0x4e73[7]](this[_0x4e73[14]][_0x4e73[5]]()[_0x4e73[8]](_0xe3a9x9[_0x4e73[15]]))[_0x4e73[3]](this[_0x4e73[13]][_0x4e73[1]]);var _0xe3a9x17=_0xe3a9x9[_0x4e73[0]][_0x4e73[5]]()[_0x4e73[8]](this[_0x4e73[15]])[_0x4e73[7]](this[_0x4e73[0]][_0x4e73[5]]()[_0x4e73[8]](_0xe3a9x9[_0x4e73[15]]))[_0x4e73[3]](this[_0x4e73[13]][_0x4e73[1]]);if(BigInteger[_0x4e73[21]][_0x4e73[2]](_0xe3a9x17)){if(BigInteger[_0x4e73[21]][_0x4e73[2]](_0xe3a9x16)){return this[_0x4e73[22]]()};return this[_0x4e73[13]][_0x4e73[23]]();};var _0xe3a9x1b= new BigInteger(_0x4e73[24]);var _0xe3a9x1c=this[_0x4e73[0]][_0x4e73[5]]();var _0xe3a9x1d=this[_0x4e73[14]][_0x4e73[5]]();var _0xe3a9x1e=_0xe3a9x9[_0x4e73[0]][_0x4e73[5]]();var _0xe3a9x1f=_0xe3a9x9[_0x4e73[14]][_0x4e73[5]]();var _0xe3a9x20=_0xe3a9x17[_0x4e73[9]]();var _0xe3a9x21=_0xe3a9x20[_0x4e73[8]](_0xe3a9x17);var _0xe3a9x22=_0xe3a9x1c[_0x4e73[8]](_0xe3a9x20);var _0xe3a9x23=_0xe3a9x16[_0x4e73[9]]()[_0x4e73[8]](this[_0x4e73[15]]);var _0xe3a9x24=_0xe3a9x23[_0x4e73[7]](_0xe3a9x22[_0x4e73[25]](1))[_0x4e73[8]](_0xe3a9x9[_0x4e73[15]])[_0x4e73[7]](_0xe3a9x21)[_0x4e73[8]](_0xe3a9x17)[_0x4e73[3]](this[_0x4e73[13]][_0x4e73[1]]);var _0xe3a9x25=_0xe3a9x22[_0x4e73[8]](_0xe3a9x1b)[_0x4e73[8]](_0xe3a9x16)[_0x4e73[7]](_0xe3a9x1d[_0x4e73[8]](_0xe3a9x21))[_0x4e73[7]](_0xe3a9x23[_0x4e73[8]](_0xe3a9x16))[_0x4e73[8]](_0xe3a9x9[_0x4e73[15]])[_0x4e73[6]](_0xe3a9x16[_0x4e73[8]](_0xe3a9x21))[_0x4e73[3]](this[_0x4e73[13]][_0x4e73[1]]);var _0xe3a9x26=_0xe3a9x21[_0x4e73[8]](this[_0x4e73[15]])[_0x4e73[8]](_0xe3a9x9[_0x4e73[15]])[_0x4e73[3]](this[_0x4e73[13]][_0x4e73[1]]);return  new ECPointFp(this[_0x4e73[13]],this[_0x4e73[13]][_0x4e73[19]](_0xe3a9x24),this[_0x4e73[13]][_0x4e73[19]](_0xe3a9x25),_0xe3a9x26);}function pointFpTwice(){if(this[_0x4e73[20]]()){return this};if(this[_0x4e73[14]][_0x4e73[5]]()[_0x4e73[26]]()==0){return this[_0x4e73[13]][_0x4e73[23]]()};var _0xe3a9x1b= new BigInteger(_0x4e73[24]);var _0xe3a9x1c=this[_0x4e73[0]][_0x4e73[5]]();var _0xe3a9x1d=this[_0x4e73[14]][_0x4e73[5]]();var _0xe3a9x28=_0xe3a9x1d[_0x4e73[8]](this[_0x4e73[15]]);var _0xe3a9x29=_0xe3a9x28[_0x4e73[8]](_0xe3a9x1d)[_0x4e73[3]](this[_0x4e73[13]][_0x4e73[1]]);var _0xe3a9x2a=this[_0x4e73[13]][_0x4e73[27]][_0x4e73[5]]();var _0xe3a9x2b=_0xe3a9x1c[_0x4e73[9]]()[_0x4e73[8]](_0xe3a9x1b);if(!BigInteger[_0x4e73[21]][_0x4e73[2]](_0xe3a9x2a)){_0xe3a9x2b=_0xe3a9x2b[_0x4e73[6]](this[_0x4e73[15]][_0x4e73[9]]()[_0x4e73[8]](_0xe3a9x2a))};_0xe3a9x2b=_0xe3a9x2b[_0x4e73[3]](this[_0x4e73[13]][_0x4e73[1]]);var _0xe3a9x24=_0xe3a9x2b[_0x4e73[9]]()[_0x4e73[7]](_0xe3a9x1c[_0x4e73[25]](3)[_0x4e73[8]](_0xe3a9x29))[_0x4e73[25]](1)[_0x4e73[8]](_0xe3a9x28)[_0x4e73[3]](this[_0x4e73[13]][_0x4e73[1]]);var _0xe3a9x25=_0xe3a9x2b[_0x4e73[8]](_0xe3a9x1b)[_0x4e73[8]](_0xe3a9x1c)[_0x4e73[7]](_0xe3a9x29[_0x4e73[25]](1))[_0x4e73[25]](2)[_0x4e73[8]](_0xe3a9x29)[_0x4e73[7]](_0xe3a9x2b[_0x4e73[9]]()[_0x4e73[8]](_0xe3a9x2b))[_0x4e73[3]](this[_0x4e73[13]][_0x4e73[1]]);var _0xe3a9x26=_0xe3a9x28[_0x4e73[9]]()[_0x4e73[8]](_0xe3a9x28)[_0x4e73[25]](3)[_0x4e73[3]](this[_0x4e73[13]][_0x4e73[1]]);return  new ECPointFp(this[_0x4e73[13]],this[_0x4e73[13]][_0x4e73[19]](_0xe3a9x24),this[_0x4e73[13]][_0x4e73[19]](_0xe3a9x25),_0xe3a9x26);}function pointFpMultiply(_0xe3a9x2d){if(this[_0x4e73[20]]()){return this};if(_0xe3a9x2d[_0x4e73[26]]()==0){return this[_0x4e73[13]][_0x4e73[23]]()};var _0xe3a9x2e=_0xe3a9x2d;var _0xe3a9x2f=_0xe3a9x2e[_0x4e73[8]]( new BigInteger(_0x4e73[24]));var _0xe3a9x30=this[_0x4e73[4]]();var _0xe3a9x31=this;var _0xe3a9x32;for(_0xe3a9x32=_0xe3a9x2f[_0x4e73[28]]()-2;_0xe3a9x32>0;--_0xe3a9x32){_0xe3a9x31=_0xe3a9x31[_0x4e73[22]]();var _0xe3a9x33=_0xe3a9x2f[_0x4e73[29]](_0xe3a9x32);var _0xe3a9x34=_0xe3a9x2e[_0x4e73[29]](_0xe3a9x32);if(_0xe3a9x33!=_0xe3a9x34){_0xe3a9x31=_0xe3a9x31[_0x4e73[6]](_0xe3a9x33?this:_0xe3a9x30)};};return _0xe3a9x31;}function pointFpMultiplyTwo(_0xe3a9x36,_0xe3a9x3,_0xe3a9x2d){var _0xe3a9x32;if(_0xe3a9x36[_0x4e73[28]]()>_0xe3a9x2d[_0x4e73[28]]()){_0xe3a9x32=_0xe3a9x36[_0x4e73[28]]()-1}else {_0xe3a9x32=_0xe3a9x2d[_0x4e73[28]]()-1};var _0xe3a9x31=this[_0x4e73[13]][_0x4e73[23]]();var _0xe3a9x37=this[_0x4e73[6]](_0xe3a9x3);while(_0xe3a9x32>=0){_0xe3a9x31=_0xe3a9x31[_0x4e73[22]]();if(_0xe3a9x36[_0x4e73[29]](_0xe3a9x32)){if(_0xe3a9x2d[_0x4e73[29]](_0xe3a9x32)){_0xe3a9x31=_0xe3a9x31[_0x4e73[6]](_0xe3a9x37)}else {_0xe3a9x31=_0xe3a9x31[_0x4e73[6]](this)}}else {if(_0xe3a9x2d[_0x4e73[29]](_0xe3a9x32)){_0xe3a9x31=_0xe3a9x31[_0x4e73[6]](_0xe3a9x3)}};--_0xe3a9x32;};return _0xe3a9x31;}ECPointFp[_0x4e73[11]][_0x4e73[30]]=pointFpGetX;ECPointFp[_0x4e73[11]][_0x4e73[31]]=pointFpGetY;ECPointFp[_0x4e73[11]][_0x4e73[2]]=pointFpEquals;ECPointFp[_0x4e73[11]][_0x4e73[20]]=pointFpIsInfinity;ECPointFp[_0x4e73[11]][_0x4e73[4]]=pointFpNegate;ECPointFp[_0x4e73[11]][_0x4e73[6]]=pointFpAdd;ECPointFp[_0x4e73[11]][_0x4e73[22]]=pointFpTwice;ECPointFp[_0x4e73[11]][_0x4e73[8]]=pointFpMultiply;ECPointFp[_0x4e73[11]][_0x4e73[32]]=pointFpMultiplyTwo;function ECCurveFp(_0xe3a9x2,_0xe3a9x2a,_0xe3a9x9){this[_0x4e73[1]]=_0xe3a9x2;this[_0x4e73[27]]=this[_0x4e73[19]](_0xe3a9x2a);this[_0x4e73[33]]=this[_0x4e73[19]](_0xe3a9x9);this[_0x4e73[34]]= new ECPointFp(this,null,null);this[_0x4e73[35]]= new Barrett(this[_0x4e73[1]]);}function curveFpGetQ(){return this[_0x4e73[1]]}function curveFpGetA(){return this[_0x4e73[27]]}function curveFpGetB(){return this[_0x4e73[33]]}function curveFpEquals(_0xe3a9x5){if(_0xe3a9x5==this){return true};return (this[_0x4e73[1]][_0x4e73[2]](_0xe3a9x5[_0x4e73[1]])&&this[_0x4e73[27]][_0x4e73[2]](_0xe3a9x5[_0x4e73[27]])&&this[_0x4e73[33]][_0x4e73[2]](_0xe3a9x5[_0x4e73[33]]));}function curveFpGetInfinity(){return this[_0x4e73[34]]}function curveFpFromBigInteger(_0xe3a9x3){return  new ECFieldElementFp(this[_0x4e73[1]],_0xe3a9x3)}function curveReduce(_0xe3a9x3){this[_0x4e73[35]][_0x4e73[18]](_0xe3a9x3)}function curveFpDecodePointHex(_0xe3a9x41){switch(parseInt(_0xe3a9x41[_0x4e73[37]](0,2),16)){case 0:return this[_0x4e73[34]];;case 2:;case 3:return null;;case 4:;case 6:;case 7:var _0xe3a9x42=(_0xe3a9x41[_0x4e73[36]]-2)/2;var _0xe3a9x43=_0xe3a9x41[_0x4e73[37]](2,_0xe3a9x42);var _0xe3a9x44=_0xe3a9x41[_0x4e73[37]](_0xe3a9x42+2,_0xe3a9x42);return  new ECPointFp(this,this[_0x4e73[19]]( new BigInteger(_0xe3a9x43,16)),this[_0x4e73[19]]( new BigInteger(_0xe3a9x44,16)));;default:return null;;}}function curveFpEncodePointHex(_0xe3a9x46){if(_0xe3a9x46[_0x4e73[20]]()){return _0x4e73[38]};var _0xe3a9x43=_0xe3a9x46[_0x4e73[30]]()[_0x4e73[5]]().toString(16);var _0xe3a9x44=_0xe3a9x46[_0x4e73[31]]()[_0x4e73[5]]().toString(16);var _0xe3a9x47=this[_0x4e73[39]]().toString(16)[_0x4e73[36]];if((_0xe3a9x47%2)!=0){_0xe3a9x47++};while(_0xe3a9x43[_0x4e73[36]]<_0xe3a9x47){_0xe3a9x43=_0x4e73[40]+_0xe3a9x43};while(_0xe3a9x44[_0x4e73[36]]<_0xe3a9x47){_0xe3a9x44=_0x4e73[40]+_0xe3a9x44};return _0x4e73[41]+_0xe3a9x43+_0xe3a9x44;}ECCurveFp[_0x4e73[11]][_0x4e73[39]]=curveFpGetQ;ECCurveFp[_0x4e73[11]][_0x4e73[42]]=curveFpGetA;ECCurveFp[_0x4e73[11]][_0x4e73[43]]=curveFpGetB;ECCurveFp[_0x4e73[11]][_0x4e73[2]]=curveFpEquals;ECCurveFp[_0x4e73[11]][_0x4e73[23]]=curveFpGetInfinity;ECCurveFp[_0x4e73[11]][_0x4e73[19]]=curveFpFromBigInteger;ECCurveFp[_0x4e73[11]][_0x4e73[18]]=curveReduce;ECCurveFp[_0x4e73[11]][_0x4e73[44]]=curveFpDecodePointHex;ECCurveFp[_0x4e73[11]][_0x4e73[45]]=curveFpEncodePointHex;
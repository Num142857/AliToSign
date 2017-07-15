const querystring = require('querystring');
const crypto = require("crypto");
module.exports=function getSignatureParams(params) {
    StringToSign = "GET" + "&" + percentEncode("/") + "&" + percentEncode(uriSort(params))
    var Signture = getSignture(StringToSign);
    params.Signature = Signture;
    return params; //返回带签名的完整uri
}
    function percentEncode(str) { //百分比编码 uri
        var s = encodeURI(str);
        return s
            .replace(/ /g, "%20")
            .replace(/\//g, "%2F")
            .replace(/\+/g, "%20")
            .replace(/\*/g, "%2A")
            .replace(/\%7E/g, "~")
            .replace(/\=/g, "%3D")
            .replace(/\&/g, "%26")
            .replace(/\:/g, "%253A")
    }
 
    function getSignture(Signature) {  //计算HMAC
        return crypto
            .createHmac('sha1', "testsecret&") //你的secret
            .update(Signature)
            .digest()
            .toString('base64');
    }
    function uriSort(uri) { //uri参数排序
        var arr = querystring.stringify(uri).split("&");
        arr = arr.sort();
        var str = "";
        [].forEach.call(arr, function (s, i) {
            if (i == (arr.length - 1)) {
                str = str + s
            } else {
                str = str + s + "&"
            }
        });
        return str;
    }
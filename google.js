const axios = require("axios");


function core(source,target,content,callback){
  const url = "https://translate.google.cn";
  axios.get(url).then(response=>{
      const body = response.data;
      var reg = /tkk:\'([\d\.]+)\'/g;
      return  reg.exec(body)[1];
  }).catch(error=>{
      console.log(error)
  }).then(tkk=>{
      const tk = Ho(content,tkk);
      const url = "https://translate.google.cn/translate_a/single?client=webapp&sl="+source+"&tl="+target+"&hl="+source+"&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&source=bh&ssel=0&tsel=0&kc=1&tk="+tk+"&q="+encodeURIComponent(content);
      axios.get(url).then(response=>{
          callback(response.data)
      }).catch(error=>{
          console.log(error)
      })
  })


}
var Eo = function(a) {
  return function() {
      return a
  }
},
Fo = function(a, b) {
  for (var c = 0; c < b.length - 2; c += 3) {
      var d = b.charAt(c + 2);
      d = "a" <= d ? d.charCodeAt(0) - 87 : Number(d);
      d = "+" == b.charAt(c + 1) ? a >>> d : a << d;
      a = "+" == b.charAt(c) ? a + d & 4294967295 : a ^ d
  }
  return a
},
Ho = function(a,tkk) {
  b=tkk;
  var d = Eo(String.fromCharCode(116));
  c = Eo(String.fromCharCode(107));
  d = [d(), d()];
  d[1] = c();
  d = b.toString().split(".");
  b = Number(d[0]) || 0;
  for (var e = [], f = 0, g = 0; g < a.length; g++) {
      var k = a.charCodeAt(g);
      128 > k ? e[f++] = k : (2048 > k ? e[f++] = k >> 6 | 192 : (55296 == (k & 64512) && g + 1 < a.length && 56320 == (a.charCodeAt(g + 1) & 64512) ? (k = 65536 + ((k & 1023) << 10) + (a.charCodeAt(++g) & 1023),
      e[f++] = k >> 18 | 240,
      e[f++] = k >> 12 & 63 | 128) : e[f++] = k >> 12 | 224,
      e[f++] = k >> 6 & 63 | 128),
      e[f++] = k & 63 | 128)
  }
  a = b;
  for (f = 0; f < e.length; f++)
      a += e[f],
      a = Fo(a, "+-a^+6");
  a = Fo(a, "+-3^+b+-f");
  a ^= Number(d[1]) || 0;
  0 > a && (a = (a & 2147483647) + 2147483648);
  a %= 1E6;
  return a.toString() + "." + (a ^ b)
}

exports.core = core;
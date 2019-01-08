// var src = "para ;a falla se predujo un corte de fibre en la cuidadela de calvario en el trafo electrica";
// var info ='corte fibra fallo Electrico';
// var matchs=[/cort/g, /fib/g, /elect/g];

// function testinput(re, str) {
//   re=re.toLowerCase();
//   str=str.toLowerCase();
//   if (str.search(re) != -1) {
//     return re;
//   } else {
//     return matchs.map((reg_ex)=>{
//       console.log(reg_ex)
//       return src.match(reg_ex)
//     })
//   }
// }
// var prueba=info.split(" ").map((test)=>{
//   var matching= testinput(test, src)
//   if(matching) return matching
// }).filter((valid)=>{
//   return valid !== undefined;
// })
// console.log(prueba)

const url = 'http://192.168.1.15:3000/radioBases';
fetch(url).then((data) => console.log(data));

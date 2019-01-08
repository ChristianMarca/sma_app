// var src = "Para ;a falla se predujo un corte de fibre en la cuidadela de calvario en el trafo Electrica";
// src=src.toLocaleLowerCase();

// const tags={
//   corte:{
//     tags:[
//     "corte fibre",
//     "corte electrico",
//     "corte fortuito"
//    ],
//     Regex:[
//       /fib/g,
//       /elect/g,
//       /fort/g
//    ]
//   },
//   fallos:{
//     tags:[
//       "corte fibre",
//       "corte electrico",
//       "corte fortuito"
//     ],
//     Regex:[
//       /fib/g,
//       /elect/g,
//       /fort/g
//     ]
//   }
// }

// function mostrarPropiedades(objeto, nombreObjeto) {
//   var resultado = [];
//   for (var i in objeto) {
//     if (objeto.hasOwnProperty(i)) {
//         // resultado += nombreObjeto + "." + i + " = " + objeto[i] + "\n";
//         resultado.push(i);
//     }
//   }
//   return resultado;
// }
// console.log(mostrarPropiedades(tags, "tags") );
// src.split(" ").filter((item)=>{
//   var res=mostrarPropiedades(tags, "tags").map((itemMap)=>{
//     return itemMap === item;
//   })
//   console.log(res);
// })
// console.log(tags)

var texto = String.raw`Hola, llamaba para pedirte el -b-fav\-or- de que lleves los -b-niños- a la -b-e\-s\-c\-u\-e\-l\-a- hoy`,
	regex = /-b-([^-<\\]*(?:\\.[^-<\\]*)*)-/g,
	reemp = '<b>$1</b>',
	resultado = document.getElementById('resultado');

resultado.innerHTML = texto.replace(regex, reemp);

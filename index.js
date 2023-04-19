#!/usr/bin/env node

const { Command } = require('commander')
const program = new Command()

class Termino {
    constructor(coeficiente = 1, variable, exponente = 1) {
		this.coeficiente = coeficiente
		this.variable = variable
		this.exponente = exponente
    }
}

class Polinomio {
    constructor(terminos) {
		this.terminos = terminos
    }

  //   normalizar() {
		// // Normalizar el polinomio para mostrarlo
		// // Ej: sin normalizar: 1x^3 - 1x
		// // normalizado : x^3 - x
		// let pNormal = "node"
		// for (const termino of this.terminos) {
		// 	if (termino.coeficiente == 1 || termino.coeficiente == -1 && termino.variable != '') pNormal += `${termino.variable}`
		// 	if (termino.exponente != 1) pNormal += `${termino.exponente}`
		// 	if (termino.variable == '') pNormal += `${termino.coeficiente}`
		// 	if (termino.coeficiente != 1 || termino.coeficiente != -1) pNormal += ' '
		// }
		// return pNormal
  //   }
}

program
	.name('polinomios')
	.description('Programa para realizar operaciones con polinomios, **FASE BETA**')
	.version('0.0.8')

program.command('calc')
    .description('Calcula dos o mas polinomios')
    .argument('<string>', 'sumar | restar')
    .option('-a, --polinomio-a <string>', 'polinomio A')
    .option('-b, --polinomio-b <string>', 'polinomio B')
    .action((op, options) => {
	const pA = options.polinomioA
	const pB = options.polinomioB
	const operaciones = {
	    sumar: () => "Estas sumando",
	    restar: () => "Estas restando",
	    testear: () => {
			const terminos = pA.split(/(?=[-+])/)
			console.log('Terminos:', terminos)
			let terminosArr = []
			terminos.forEach((n) => {
				// /^(-?\d*\.?\d+(?=[a-z])|-\d*\.?\d+)?([a-z])?(\^(\d+))?$/i
		   		const matches = n.match(/^(-?\d*\.?\d+)?([a-z])?(\^(\d+))?$/i)
		    	if (matches) {
					const coef = parseFloat(matches[1] || 1)
					const variable = matches[2] || ""
					const expo = parseInt(matches[4] || 1)

					const termino = new Termino(coef, variable, expo)

					// Debug
					// console.log("1: ------------")
					// console.log(termino)
					// console.log("------------")
					terminosArr.push(termino)
					// console.log("2: -------------")
					// console.log(terminosArr)
					// console.log("-------------")

				} else if (n[0] == '+'){
					terminosArr.push(new Termino(parseInt(n.slice(1)), '', 1))
				} else if (n[0] == '-' && !n.match(/\dx/i)){
					const matches = n.match(/^(-?[a-z])(\^(\d+))?$/i)
					const coef = parseFloat(matches[2] || -1)
					const variable = matches[2] || ""
					const expo = parseInt(matches[4] || 1)

					const termino = new Termino(coef, variable, expo)

					// Debug
					// console.log("1: ------------")
					// console.log(termino)
					// console.log("------------")
					terminosArr.push(termino)
				}
		    })
		    const polinomio = new Polinomio(terminosArr)
			console.log(polinomio)
			// console.log("Normalizado:")
			// console.log(polinomio.normalizar())
	    }
	}
	if (operaciones[op.toLowerCase()]) {operaciones[op.toLowerCase()]()}
		else {console.log("No se puede realizar la operacion solicitada.")}
    })

program.parse()

// Creo que para que se puedan sumar mas polinomios, necesito que solo sea un parametro, y de ahi separarlo usando expresiones regulares

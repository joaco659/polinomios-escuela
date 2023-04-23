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
	.version('0.0.8c')

program
	.usage("[operacion] <polinomio> <polinomio>")
    .argument('<string>', 'sumar | restar ')
    .option('-a, --polinomio-a <string>', 'polinomio A')
    .option('-b, --polinomio-b <string>', 'polinomio B', '0x')
    .action((op, options) => {
	const pA = options.polinomioA
	const pB = options.polinomioB
	const operaciones = {
	    sumar: () => "Estas sumando",
	    restar: () => "Estas restando",
	    ordenar: () => "Ordenando..",
	    testear: () => {
			const terminos = pA.split(/(?=[-+])/)
			console.log('Terminos:', terminos)
			let terminosArr = []
			terminos.forEach((n) => {
				// /^(-?\d*\.?\d+(?=[a-z])|-\d*\.?\d+)?([a-z])?(\^(\d+))?$/i
		   		const matches = n.match(/^([-+]?\d*\.?\d+)?([a-z])?(\^(\d+))?$/i)
		    	if (matches) {
					const coef = parseFloat(matches[1] || 1)
					const variable = matches[2] || ""
					const expo = parseFloat(matches[4] || 1)

					const termino = new Termino(coef, variable, expo)

					// Debug
					// console.log("1: ------------")
					// console.log(termino)
					// console.log("------------")
					terminosArr.push(termino)
					// console.log("2: -------------")
					// console.log(terminosArr)
					// console.log("-------------")

				} 
				// Corregir numeros positivos como +3
				else if (n.match(/\+\d/i)) {
					// Terminos independientes
					if (!n.match(/[a-z]/i)) {
						// console.log("--------------- TERMINO INDEPENDIENTE: ", n)
						terminosArr.push(new Termino(parseFloat(n.slice(1)), '', 1))
					} else {
						terminosArr.push(new Termino(parseFloat(n.slice(1)), n.split(/\d+/i)[1], 1))
						// console.log("--------------- ELSE IF NUM +: ", n.split(/\d+/i))
					}
					// const matches = n.match(/([a-z])?(\^(\d+))?$/i)
				}
				// x sola
				else if (n.match(/^[-+]/i) && !n.match(/\d[a-z]/i)) {
					// -x
					if (n.match(/^\-/i)) {
						const matches = n.match(/^(-?[a-z])(\^(\d+))?$/i)
						// console.log("NEGATIVA -----------------", matches)
						// const coef = parseFloat(matches[2] || -1)
						const coef = -1
						const variable = n.match(/[a-z]/i)[0] || ''
						const expo = parseFloat(matches[3] || 1)

						const termino = new Termino(coef, variable, expo)

						terminosArr.push(termino)
					}
					// +x
					else if (n.match(/^\+/i)) {
						const matches = n.match(/^(\+?[a-z])(\^(\d+))?$/i)
						// console.log("POSITIVA --------------------", matches)
						// const coef = parseFloat(matches[2] || 1)
						const coef = 1
						const variable = n.match(/[a-z]/i)[0] || ''
						const expo = parseFloat(matches[3] || 1)

						const termino = new Termino(coef, variable, expo)

						terminosArr.push(termino)
					}
					// x^
					else if (n.match(/\^\d/i)) {
						const matches = n.match(/^([-+]?[a-z])(\^(\d+))?$/i)
						const coef = parseFloat(matches[2] || -1)
						const variable = n.match(/[a-z]/i)[0] || ''
						const expo = parseFloat(matches[4] || 1)

						const termino = new Termino(coef, variable, expo)

						terminosArr.push(termino)
					}
					// const matches = n.match(/^([-+]?[a-z])(\^(\d+))?$/i)
					// console.log("-------------- ELSE IF x SOLA: ", matches)
					// const coef = parseFloat(matches[2] || -1)
					// const variable = n.split(/\-/i)[1]
					// const expo = parseFloat(matches[4] || 1)

					// const termino = new Termino(coef, variable, expo)

					// terminosArr.push(termino)
				}
		    })
		    const polinomio = new Polinomio(terminosArr)
			console.log(polinomio)
			// console.log("Normalizado: ", polinomio.normalizar())

			console.log("----------------------------------------------------")
	    }
	}
	if (operaciones[op.toLowerCase()]) {operaciones[op.toLowerCase()]()}
	else {console.log("No se puede realizar la operacion solicitada.")}
    })

program.addHelpText('after', `

***IMPORTANTE***
El programa esta en fase beta, por lo que no
puede realizar operaciones aun.
`)

program.parse()

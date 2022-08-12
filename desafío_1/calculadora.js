let numero;
let resultadoFinal = 0;
let respuesta = "";

do {
    do {
        // el usuario debe ingresar un número, el cual devolverá un string
        numero = prompt('Ingrese un número');

        // saldrá unicamente del while, si la respuesta ingresada es un número
    } while (isNaN(parseInt(numero)))

    numero = parseInt(numero);

    //se guarda el nuevo valor, sumado este al anterior
    resultadoFinal = resultadoFinal + numero;

    // se le pregunta al usuario si continua o no (si/no)
    // si ingresa un valor distinto a (si o no), se le seguirá preguntando (sigue el ciclo)
    do {
        respuesta = prompt("Desea continuar? (si/no)")

        // de while saldrá unicamente con respuesta (si o no)
    } while (respuesta != 'si' && respuesta != 'no')

} while (respuesta != 'no');

//se le envía la alerta con el resultado final obtenido
alert("El resultado final es " + resultadoFinal)
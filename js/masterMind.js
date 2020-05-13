/**
 * masterMind
 * 
 * @author Pablo Murillo Ávila
 */

let masterMind = (function () {
    let bolas = ["rojo", "blanco", "negro", "amarillo", "naranja", "marron", "azul", "verde"];
    let objetivo = [];

    /**
     * Iniciar juego (generar la combinación objetivo)
     */
    let init = function () {
        while (objetivo.length < 4) {
            objetivo.push(bolas[Math.floor(Math.random() * bolas.length)]);
        }
    }

    /**
     * Mostrar por consola la combinación objetivo
     */
    let mostrar = function () {
        console.log(objetivo);
    }

    /**
     * Comprobar la coincidencia del intento con la combinación objetivo
     */
    let comprobar = function (intento) {
        let resultado = [];
        let intentoAux = [];
        let objetivoAux = [];

        // Comprobar bolas correctas (negras)
        intento.forEach((bola, posicion) => {
            if (bola === objetivo[posicion]) {
                resultado.push("negro");
            } else { // Añadir para comprobar como blanca
                intentoAux.push(bola);
                objetivoAux.push(objetivo[posicion]);
            }
        });

        // Comprobar bolas en la combinación (blancas)
        intentoAux.forEach((bola) => {
            if (objetivoAux.includes(bola)) {
                resultado.push("blanco");
                objetivoAux[objetivoAux.indexOf(bola)] = undefined; // Eliminar comprobada
            }
        });

        return resultado;
    }

    return {
        init: init,
        comprobar: comprobar,
        mostrar: mostrar
    }
})();

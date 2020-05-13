/**
 * Interfaz gráfica de masterMind
 * 
 * @author Pablo Murillo Ávila
 */

$(function () {
    masterMind.init(); // Iniciar el juego
    let $intentos = $("#intentos"); // Obtener el div donde se van mostrando los intentos

    /**
     * Recoger los elementos de las bolas donde se muestra el intento actual y añadirles el
     * comportamiento para que al hacer click sobre ellas se puedan quitar las ya puestas
     */
    let $inputs = $("#input_bolas div").click(function () {
        if ($(this).attr("class") !== "") $(this).hide().removeClass().fadeIn();
    });

    /**
     * Recoger los elementos de las bolas de los colores y añadirles el comportamiento para
     * que al hacer click sobre ellas se añadan a las bolas donde se muestra el intento
     */
    let $colores = $("#colores div").click(function () {
        let $hueco = $("#input_bolas div[class=\"\"]");
        if ($hueco.length != 0) $hueco.first().hide().addClass($(this).attr("class")).fadeIn();
    });

    /**
     * Crear los elementos para mostrar un conjunto de 4 bolas, para un intento o para el
     * resultado de un intento
     * 
     * @param {String} tipo Tipo de conjunto de bolas (bolas o resultado)
     * @param {Array} arrayColores Array para los colores de las bolas
     */
    let crearBolas = (tipo, arrayColores) => {

        // Crear div para las bolas
        let $divBolas = $("<div></div>").addClass(tipo);

        // Crear bolas
        $(arrayColores).each(function(posicion, color) {
            $divBolas.append($("<div></div>").addClass(color));
        });

        // Rellenar huecos vacíos (se puede dar en el caso de los resultados)
        if (arrayColores.length < 4) {
            for (let i = 0; i < 4 - arrayColores.length; i++) {
                $divBolas.append($("<div></div>"));
            }
        }

        return $divBolas;
    }

    /**
     * Comprobar un intento y añadirlo al div de intentos
     */
    let $comprobar = $("#input_comprobar").click(function () {

        // Si el intento está completo (0 bolas vacías)
        if ($("#input_bolas div[class='']").length === 0) {

            // Obtener el intento
            let intento = [];
            $inputs.each(function(posicion, bola) {
                intento.push($(bola).attr("class"));
            });

            // Obtener el resultado del intento
            let resultado = masterMind.comprobar(intento);

            // Añadir el intento al div de intentos
            $intentos.prepend($("<div></div>")
                .addClass("intento")
                .append(crearBolas("bolas", intento)) // Añadir conjunto de bolas del intento
                .append(crearBolas("resultado", resultado)) // Añadir conjunto de bolas del resultado
                .hide()
                .fadeIn());

            // Reiniciar las bolas donde se muestra el intento actual
            $inputs.removeClass();

            // Si la jugada es ganadora notificar al usuario
            if (resultado.filter(bola => bola === "negro").length === 4) {
                let $ganar = $("#ganar"); // Diálogo emergente
                let $juego = $("main"); // Tablero del juego

                // Mostrar diálogo
                $ganar.fadeIn();

                // Desactivar todos los controles del juego
                $juego.click(function () {
                    $inputs.off();
                    $colores.off();
                    $comprobar.off();
                });

                // Reiniciar el juego
                $("#volver").click(function () {
                    location.reload();
                });

                // Salir
                $("#salir").click(function () {
                    $ganar.fadeOut();
                    $juego.fadeOut();
                    $("#titulo").html("¡Hasta pronto!");
                });
            }
        }
    });
});

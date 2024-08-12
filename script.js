// I/O de texto
var texto_entrada = document.getElementById("texto-entrada");
var texto_salida = document.getElementById("texto-salida");

//Contenedores para cada ocasion
var con_texto = document.getElementById("con-texto");
var sin_texto = document.getElementById("sin-texto");

//botones
var btn_encriptar = document.getElementById("encriptar");
var btn_desencriptar = document.getElementById("desencriptar");
var btn_copiar = document.getElementById("copiar");

//Texto "Ningún mensaje fue encontrado"
var mensaje = document.getElementById('sin-mensaje');

// informacion
var informacion = document.getElementById('informacion');

//contenedor de salida
var contenedor_salida = document.getElementById('contenedor-salida');

//logo
var logo = document.getElementById('logo');

const entrada_de_texto = {
    existe: function(){
        con_texto.classList.remove('ocultar');
        sin_texto.classList.add('ocultar');
    },
    no_existe: function(){
        con_texto.classList.add('ocultar');
        sin_texto.classList.remove('ocultar');
    }
}

//Funciones para encriptar/desencriptar texto
const transformaciones_encriptar = {
    e: 'enter',
    i: 'imes',
    a: 'ai',
    o: 'ober',
    u: 'ufat'
}

const transformaciones_desencriptar = {
    enter: 'e',
    imes: 'i',
    ai: 'a',
    ober: 'o',
    ufat: 'u'
}

let btn_funcion_pulsado = false;
function encriptar_desencriptar(accion , texto) {
    if (texto_entrada.value === '') {
        if (!btn_funcion_pulsado) {
            contenedor_salida.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            btn_funcion_pulsado = true;
            entrada_de_texto.no_existe();
            mensaje.classList.remove('ocultar'); 
            btn_funcion_pulsado = false;
        }
    } else if (texto.match(/[A-ZÀ-Úà-ú]+/g) !== null) {
        if (!btn_funcion_pulsado) {
            btn_funcion_pulsado = true;
            entrada_de_texto.no_existe();
            informacion.classList.remove('ocultar'); 
            btn_funcion_pulsado = false;
        }
    } else {
        contenedor_salida.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        let texto_encriptado = texto;
        let transformaciones = (accion === 'encriptar') ? 
                                {...transformaciones_encriptar} : 
                                (accion === 'desencriptar') ?
                                {...transformaciones_desencriptar} : 
                                {};

        Object.keys(transformaciones).forEach(key => {
            let regex = new RegExp(key, 'g');
            texto_encriptado = texto_encriptado.replace(regex, transformaciones[key]);
        });

        texto_salida.textContent = texto_encriptado;
        entrada_de_texto.existe();
    }
}

// evento clic en el boton encriptar
btn_encriptar.addEventListener("click", function(event){
    event.preventDefault();
    const texto = texto_entrada.value;
    encriptar_desencriptar('encriptar', texto);
});

// evento clic en el boton desencriptar
btn_desencriptar.addEventListener("click", function(event){
    event.preventDefault();
    const texto = texto_entrada.value;
    encriptar_desencriptar('desencriptar', texto);
});

btn_copiar.addEventListener("click", function(){
    const texto = texto_salida.textContent;
    navigator.clipboard.writeText(texto).then(() => {
        alert('Texto copiado al portapapeles'); 
    }).catch(err => {
        console.log("Error al intentar copiar texto en el portapapeles: ", err);
    });
});


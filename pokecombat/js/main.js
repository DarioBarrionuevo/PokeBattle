// CREACION DE CLASE POKEMON
class Pokemon {
  constructor(ataque, defensa, vidaTotal, foto, nombre) {
    this.ataque = ataque;
    this.defensa = defensa;
    this.vidaTotal = vidaTotal;
    this.foto = foto;
    this.nombre = nombre;
  }
}
let gloom = new Pokemon(80, 30, 900, "img/gloom.png", "gloom");
let ninetales = new Pokemon(70, 40, 1100, "img/ninetales.png", "ninetales");
let seahorse = new Pokemon(60, 35, 1300, "img/seahorse.png", "seahorse");
let talonflame = new Pokemon(90, 10, 800, "img/talonflame.png", "talonflame");
let eevee = new Pokemon(50, 45, 1200, "img/eevee.png", "eevee");
let draco = new Pokemon(85, 20, 1000, "img/draco.png", "draco");

// COGER ELEMENTOS DEL DOM

// CAMBIAR EL TERRENO DE BATALLA Y VER EL BOTON DE PELEA
const cogerHtml = document.querySelector("html");
const cogerBotonPelea = document.getElementById("centro");

const fotoFondo1 = "fondoBatallaPokemon1";
const fotoFondo2 = "fondoBatallaPokemon2";
const fotoFondo3 = "fondoBatallaPokemon3";
const fotoFondo4 = "fondoBatallaPokemon4";

function cambiarFondo(pValor) {
  // cogerHtml.style.background = `url('/practica/pokecombat/img/${pValor}.jpg')`;
  cogerHtml.style.background = `url('img/${pValor}.jpg')`;
  cogerHtml.style.backgroundPositionosition = "center";
  cogerHtml.style.backgroundRepeat = "no-repeat";
  cogerHtml.style.backgroundSize = "cover";
  cogerHtml.style.height = "120% ";

  cogerBotonPelea.style.display = "flex";
}

// ELEGIR LOS PERSONAJES PLAYER 1 Y PLAYER2

const cogerFotoPlayer1 = document.getElementById("fotoPlayer1");
// console.log(cogerFotoPlayer1.src);
const cogerFotoPlayer2 = document.getElementById("fotoPlayer2");
// console.log(cogerFotoPlayer2.src);

const cogerCaracteristicas1 = document.querySelector(".caracteristicas1");
// console.log(cogerCaracteristicas1);
const cogerCaracteristicas2 = document.querySelector(".caracteristicas2");
// console.log(cogerCaracteristicas2);

function player1Cambio(pValor) {
  // const nombre = pValor;
  cogerFotoPlayer1.src = `${pValor.foto}`;
  cogerFotoPlayer1.style.opacity = "1";
  cogerCaracteristicas1.style.opacity = "1";
  cogerCaracteristicas1.innerHTML = `
    <div id="estadisticasPlayer1">
                       <p><img src="img/attackIcon2.png" alt="No disponible">${pValor.ataque}</p>
            <p><img src="img/defenseIcon.png" alt="No disponible">${pValor.defensa}</p>
            <p><img src="img/lifeIcon.png" alt="No disponible">${pValor.vidaTotal}</p>
        </div>
    `;
  // GUARDO EN SESIONSTORAGE
  sessionStorage.setItem("player1", JSON.stringify(pValor));
}

function player2Cambio(pValor) {
  cogerFotoPlayer2.src = `${pValor.foto}`;
  cogerFotoPlayer2.style.opacity = "1";
  cogerCaracteristicas2.style.opacity = "1";
  cogerCaracteristicas2.innerHTML = `
    <div id="estadisticasPlayer2">
                       <p><img src="img/attackIcon2.png" alt="No disponible">${pValor.ataque}</p>
            <p><img src="img/defenseIcon.png" alt="No disponible">${pValor.defensa}</p>
            <p><img src="img/lifeIcon.png" alt="No disponible">${pValor.vidaTotal}</p>
        </div>
    `;
  // GUARDO EN SESIONSTORAGE
  sessionStorage.setItem("player2", JSON.stringify(pValor));
}


// prueba para cambiar el grid funciona, quita el boton de pelea y alarga el log 3 cuadrantes
const cuerpoWeb = document.getElementById("cuerpo");
const botonPelea = document.getElementById("botonPelea");
const logPelea = document.getElementById("logPelea");

function cambiogrid() {
  botonPelea.style.display = "none";
  cuerpoWeb.style.gridTemplateAreas =
    '"fotosPlayer1 fotosPlayer1 cabecera fotosPlayer2 fotosPlayer2" "cardPlayer1 player1 log player2 cardPlayer2" ". player1 log player2 ." ". . log . ." ". footer footer footer ."';
}

//TODO refactorizar todos los ataques dentro de la funcion de pelear, usara condicionales con or y el que mas vida tenga es el ganador
//FIXME QUE NO SE PUEDA PINCHAR EN LOS POKEMON MIENTRAS ESTEN PELEANDO, MENSAJE DE GANADOR MAS CURRADO, BOTON DE REINICIAR QUE NO SALGA HASTA EL FINAL
//FIXME QUE EL DAÑO SE BASE EN UN TANTO POR CIENTO DE EXITO EN FUNCION DE LA DEFENSA DEL CONTRARIO

// FUNCION PELEAR
function empiezaPelea() {
  const sacarPlayer1 = JSON.parse(sessionStorage.getItem("player1"));
  const sacarPlayer2 = JSON.parse(sessionStorage.getItem("player2"));

  const danioPlayer1 = sacarPlayer1.ataque - sacarPlayer2.defensa;
  const danioPlayer2 = sacarPlayer2.ataque - sacarPlayer1.defensa;
  const escenarios = document.getElementById("footer");
  escenarios.style.display = "none"; //BORRA LOS ESCENARIOS
  cambiogrid(); //LLAMA A LA FUNCION QUE MODIFICA EL GRID

  //EMPIEZA RANDOM
  if (Math.floor(Math.random() * 10) <= 4) {

    const turno1 = setInterval(() => {
      // atacaPlayer1(sacarPlayer1, sacarPlayer2, danioPlayer1)
      sacarPlayer2.vidaTotal = sacarPlayer2.vidaTotal - danioPlayer1;

      logPelea.innerHTML += `<p>${sacarPlayer1.nombre.toUpperCase()} ataca y hace ${danioPlayer1} puntos de daño</p>
      <p>A ${sacarPlayer2.nombre.toUpperCase()} le quedan: ${sacarPlayer2.vidaTotal}</p>`; //ATACA PRIMERO
      setTimeout(
        () => {
          sacarPlayer1.vidaTotal = sacarPlayer1.vidaTotal - danioPlayer2;
          logPelea.innerHTML += `<p>${sacarPlayer2.nombre.toUpperCase()} ataca y hace ${danioPlayer2} puntos de daño</p>
      <p>A ${sacarPlayer1.nombre.toUpperCase()} le quedan: ${sacarPlayer1.vidaTotal}</p>`;
        }, 500);
      if (sacarPlayer1.vidaTotal <= 0 || sacarPlayer2.vidaTotal <= 0) {
        // console.log(typeof pPlayer1.vidaTotal);
        if (sacarPlayer1.vidaTotal > sacarPlayer2.vidaTotal) {
          alert(`GANADOR ${sacarPlayer1.nombre.toUpperCase()}`);
        } else {
          alert(`GANADOR ${sacarPlayer2.nombre.toUpperCase()}`);
        }
        clearInterval(turno1);
        // logPelea.style.display = "flex"; //Ponerlo cuando acabe la pelea
      }
    }, 1000);
  } else {
    const turno2 = setInterval(() => {
      // atacaPlayer2(sacarPlayer2, sacarPlayer1, danioPlayer2)
      sacarPlayer1.vidaTotal = sacarPlayer1.vidaTotal - danioPlayer2;
      logPelea.innerHTML += `<p>${sacarPlayer2.nombre.toUpperCase()} ataca y hace ${danioPlayer2} puntos de daño</p>
      <p>A ${sacarPlayer1.nombre.toUpperCase()} le quedan: ${sacarPlayer1.vidaTotal}</p>`; //ATACA PRIMERO
      setTimeout(
        () => {
          sacarPlayer2.vidaTotal = sacarPlayer2.vidaTotal - danioPlayer1;
          logPelea.innerHTML += `<p>${sacarPlayer1.nombre.toUpperCase()} ataca y hace ${danioPlayer1} puntos de daño</p>
      <p>A ${sacarPlayer2.nombre.toUpperCase()} le quedan: ${sacarPlayer2.vidaTotal}</p>`;
        }, 500);

      if (sacarPlayer2.vidaTotal <= 0 || sacarPlayer1.vidaTotal <= 0) {
        // console.log(typeof pPlayer1.vidaTotal);
        if (sacarPlayer1.vidaTotal > sacarPlayer2.vidaTotal) {
          alert(`GANADOR ${sacarPlayer1.nombre.toUpperCase()}`);
        } else {
          alert(`GANADOR ${sacarPlayer2.nombre.toUpperCase()}`);
        }
        clearInterval(turno2);
        // logPelea.style.display = "flex"; //Ponerlo cuando acabe la pelea
      }
    }, 1000);
  }
  logPelea.style.display = "flex"; //Ponerlo cuando acabe la pelea
}
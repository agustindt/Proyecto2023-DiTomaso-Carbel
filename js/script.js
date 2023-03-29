// Definir constantes
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const FORM_SUBMIT_EVENT = 'submit';

// Obtener elementos HTML relevantes
const formElem = document.getElementById('form');
const inputFunctionElem = document.getElementById('funcion');

// Dibujar ejes en pantalla (sólo una vez al cargar)
dibujarEjes();

/**
 * Grafica una funcion dada por su string correspondiente
 * @param {string} funcion La ecuacion a graficar
 */
function graficarFuncion(funcion) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dibujarEjes();

  // Configurar variables necesarias (todas constantes except i)
  const escalaX = 1;
  const escalaY = 1;

  // Variable para guardar el número de veces que se ha ejecutado
  let i = 0;

  // Función para graficar los puntos en base a la función y su coordenada X
  function graficarPunto(intervalo) {
    // Evite utilizar una función anónima dentro del setInterval() ya que afecta al rendimiento
    if (i <= canvas.width) {
      let xPos = i;  
      let yPos = evaluarFuncion(funcion, i * escalaX);
      let canvasYPos = (canvas.height /2 - yPos * escalaY);  
      
      if (i === 0) {
        ctx.moveTo(xPos, canvasYPos);
      } else {
        ctx.lineTo(xPos, canvasYPos );
      }
    
    	ctx.stroke();
    } else { 
      	clearInterval(intervalo); // Detener cuando llegamos al ancho máximo del lienzo
  	}

  	i++;
	};
   
	const intervalId =
	setInterval(() => {graficarPunto(intervalId)},20); 
};

/**
 * Evalúa una ecuación dada por un string en un punto x.
 * @param {string} funcion La ecuacion a evaluar con 'x' como argumento independiente.
 * @param {number} x El valor de entrada 'x'.
 */
function evaluarFuncion(funcion, x) {
const f = new Function('x', `return ${funcion}`);
return f(x - canvas.width /2);
};

/**
* Dibuja los ejes coordenados en el lienzo. 
**/
function dibujarEjes() {
	ctx.beginPath(); 	
	ctx.strokeStyle ='black';

// Eje horizontal X	
ctx.moveTo(0,canvas.height/2);// Se debe situar desde el punto (0, alto/2)
ctx.lineTo(canvas.width,canvas.height/2);

// Eje vertical Y
ctx.moveTo(canvas.width / 2, 0); // Se debe situar desde el punto (ancho/2, cero) 
ctx.lineTo(canvas.width / 2, canvas.height);
	
	ctx.stroke();
};

// Agregar evento submit al formulario
formElem.addEventListener(FORM_SUBMIT_EVENT,function(event){
    event.preventDefault(); // Evitamos que la página se recargue luego del envío del form.
    graficarFuncion(inputFunctionElem.value);
});

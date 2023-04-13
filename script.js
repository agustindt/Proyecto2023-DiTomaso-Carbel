const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//Dibujar ejes cartesianos y grilla
dibujarEjes();
dibujarGrilla();

/**
 * Dibuja los ejes cartesianos en el canvas.
 * @param {string} [color="black"] - El color de los ejes.
 * @returns {CanvasRenderingContext2D} El contexto del canvas.
 */
function dibujarEjes(color = "black") {
  const ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(400, 0); //donde empieza eje y
  ctx.lineTo(400, 800); //donde termina eje y
  ctx.moveTo(0, 400);
  ctx.lineTo(800, 400);
  ctx.strokeStyle = "black";
  ctx.stroke();
  return ctx;
}

// Función para dibujar la grilla
function dibujarGrilla() {
  for (let i = -20; i <= 20; i++) {
    ctx.beginPath();
    ctx.moveTo(i * 30 + 400, 0);
    ctx.lineTo(i * 30 + 400, 800);
    ctx.strokeStyle = "#ccc";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i * 30 + 400);
    ctx.lineTo(800, i * 30 + 400);
    ctx.strokeStyle = "#ccc";
    ctx.stroke();

    if (i !== 0) { //dibuja la escala tanto de y como de x, pero no el 0
      ctx.fillStyle = "black";
      ctx.fillText(i, i * 30 + 396, 420);
      ctx.fillText(-i, 410, i * 30 + 405);
    }
  }
  ctx.fillStyle = "black";
  ctx.fillText("0", 390, 420);
}



function evaluarFuncion(x, tipo, funcion) {
  // Reemplazar patrones como "2x^2", "3.5x^2", "0.5x^2", etc. por "2(x2)", "3.5*(x2)", "0.5*(x2)", etc.
  funcion = funcion.replace(/(\d*.?\d*)x^2/g, "$1*(x2)");
  // Reemplazar patrones como "2x", "3x", "0.5x", etc. por "2x", "3x", "0.5x", etc.
  funcion = funcion.replace(/(\d.?\d+)x/g, "$1*x");

  // Reemplazar patrones como "xx", "3xx", "0.5xx", etc. por "xx", "3xx", "0.5xx", etc.
  funcion = funcion.replace(/(\d.?\d*)xx/g, "$1x*x");

  // Evaluar la función
  let resultado = 0;

  switch (tipo) {
    case "sin":
      resultado = Math.sin(math.evaluate(funcion, { x: x }));
      break;
    case "cos":
      resultado = Math.cos(math.evaluate(funcion, { x: x }));
      break;
    case "tg":
      resultado = Math.tan(math.evaluate(funcion, { x: x }));
      break;
    case "log":
      let log_x = math.evaluate(funcion, { x: x });
      if (log_x <= 0) {
        return NaN;
      }
      resultado = Math.log(log_x) / Math.LN10;
      break;
    case "ln":
      let ln_x = math.evaluate(funcion, { x: x });
      if (ln_x <= 0) {
        return NaN;
      }
      resultado = Math.log(ln_x);
      break;
    case "lineal":
    case "cuadratica":
    case "exponencial":
    case "hiperbolica":
      resultado = math.evaluate(funcion, { x: x });
      break;
    default:
      try {
        resultado = math.evaluate(funcion, { x: x });
      } catch (error) {
        return NaN;
      }
  }

  return resultado;
}

function dibujarGrafica() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before redrawing the graph

  dibujarGrilla();
  dibujarEjes();

  const funcionInput = document.getElementById("funcion").value;
  const tipoInput = document.getElementById("tipo").value;

  // Dibujar la gráfica de la función
  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;
  let xAnterior = -10;
  let yAnterior = evaluarFuncion(xAnterior, tipoInput, funcionInput);
  for (let x = -9.9; x <= 10; x += 0.01) {
    // Evaluar la función con math.js
    const y = evaluarFuncion(x, tipoInput, funcionInput);

    ctx.moveTo(xAnterior * 100 + 400, -yAnterior * 100 + 400);
    ctx.lineTo(x * 100 + 400, -y * 100 + 400);
    ctx.stroke();
    xAnterior = x;
    yAnterior = y;
  }
  ctx.stroke();
}

document.getElementById("graficar").addEventListener("click", dibujarGrafica);

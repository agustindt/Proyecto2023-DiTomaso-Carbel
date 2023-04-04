const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Dibujar ejes cartesianos y grilla
dibujarEjes();
dibujarGrilla();

// Función para dibujar ejes cartesianos
function dibujarEjes() {
  ctx.beginPath();
  ctx.moveTo(250, 0);
  ctx.lineTo(250, 500);
  ctx.moveTo(0, 250);
  ctx.lineTo(500, 250);
  ctx.strokeStyle = "black";
  ctx.stroke();
}

// Función para dibujar la grilla
function dibujarGrilla() {
  for (let i = -25; i <= 25; i++) {
    ctx.beginPath();
    ctx.moveTo(i * 20 + 250, 0);
    ctx.lineTo(i * 20 + 250, 500);
    ctx.strokeStyle = "#ccc";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i * 20 + 250);
    ctx.lineTo(500, i * 20 + 250);
    ctx.strokeStyle = "#ccc";
    ctx.stroke();

    if (i !== 0) {
      ctx.fillStyle = "black";
      ctx.fillText(i, i * 20 + 255, 265);
      ctx.fillText(-i, 255, i * 20 + 255);
    }
  }
  ctx.fillStyle = "black";
  ctx.fillText("0", 255, 265);
}

// Función para evaluar una función matemática en un valor dado de x
function evaluarFuncion(x, tipo, funcion) {
  // Convertir x a un número
  x = parseFloat(x);

  // Reemplazar patrones como "2x", "3x", "0.5x", etc. por "2*x", "3*x", "0.5*x", etc.
  x = x.toString().replaceAll(/(\d*\.?\d+)x/g, "$1*x");

  // Reemplazar patrones como "ax^n" por "a*Math.pow(x, n)"
  x = x.replaceAll(/(\d*\.?\d+)x\^(\d*\.?\d+)/g, "$1*Math.pow(x, $2)");

  // Evaluar la función
  let resultado = 0;
  switch (tipo) {
    case "sin":
      return Math.sin(x);
    case "cos":
      return Math.cos(x);
    case "tg":
      return Math.tan(x);
    case "log":
      if (x <= 0) {
        resultado = NaN;
      } else {
        resultado = Math.log(x) / Math.log(Math.E);
      }
      break;
    case "ln":
      if (x <= 0) {
        resultado = NaN;
      } else {
        resultado = Math.log(x);
      }
      break;
    case "lineal":
      resultado = x;
      break;
    case "cuadratica":
      resultado = x*x;
      break;
    case "exponencial":
      resultado = Math.exp(x);
      break;
    case "hiperbolica":
      resultado = Math.sinh(x);
      break;
    default:
      // Evaluar la expresión con math.js
      resultado = eval(funcion, { x: x });
      break;
  }

  return resultado;
}
function dibujarGrafica() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  dibujarEjes();
  dibujarGrilla();

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
    const y = evaluarFuncion(x,tipoInput);

    ctx.moveTo(xAnterior * 50 + 250, -yAnterior * 50 + 250);
    ctx.lineTo(x * 50 + 250, -y * 50 + 250);
    ctx.stroke();
    xAnterior = x;
    yAnterior = y;
  }
  ctx.stroke();
}

document.getElementById("graficar").addEventListener("click", dibujarGrafica);
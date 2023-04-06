const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//Dibujar ejes cartesianos y grilla
dibujarEjes();
dibujarGrilla();

// Función para dibujar ejes cartesianos
function dibujarEjes() {
  ctx.beginPath();
  ctx.moveTo(400, 0); //donde empieza eje y
  ctx.lineTo(400, 800); //donde termina eje y
  ctx.moveTo(0, 400);
  ctx.lineTo(800, 400);
  ctx.strokeStyle = "black";
  ctx.stroke();
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

// Reemplazar patrones como "2x", "3x", "0.5x", etc. por "2*x", "3*x", "0.5*x", etc. //! Falta hacer lo mismo para xx(x^2)

// Reemplazar patrones como "2x^2", "3.5x^2", "0.5x^2", etc. por "2*(x**2)", "3.5*(x**2)", "0.5*(x**2)", etc.
  funcion = funcion.toString().replace(/(\d*\.?\d*)x\^2/g, "$1*(x**2)");
  
// Reemplazar patrones como "2x", "3x", "0.5x", etc. por "2*x", "3*x", "0.5*x", etc.
  funcion = funcion.toString().replace(/(\d*\.?\d+)x/g, "$1*x");
  
// Evaluar la función

  console.log(funcion)
  console.log(x)
  let resultado = 0;
  switch (tipo) {
    case "sin":
      resultado = Math.sin(eval(funcion));
      return resultado;
    case "cos":
      resultado = Math.cos(eval(funcion));
      return resultado
    case "tg":
      resultado = Math.tan(eval(funcion));
      return resultado;
    case "log":
      let log_x = eval(funcion);
      if (log_x <= 0) {
        resultado = NaN;
        return resultado;
      } else {
        resultado = Math.log(log_x) / Math.log(Math.E);
        return resultado;
      }
    case "ln":
      let ln_x = eval(funcion);
      if (ln_x <= 0) {
        resultado = NaN;
        return resultado;
      } else {
        resultado = Math.log(ln_x);
        return resultado;
      }
    case "lineal":
      resultado = eval(funcion);
      return resultado;
    case "cuadratica":
      resultado = eval(funcion);
      return resultado;
    case "exponencial":
      resultado = Math.exp(eval(funcion));
      return resultado;
    case "hiperbolica":
      resultado = Math.sinh(eval(funcion));
      return resultado;
    default:
      // Evaluar la expresión con math.js
      resultado = eval(funcion, { x: eval(funcion) });
      return resultado;
  }
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
    const y = evaluarFuncion(x,tipoInput,funcionInput);

    ctx.moveTo(xAnterior * 100 + 400, -yAnterior * 100 + 400);
    ctx.lineTo(x * 100 + 400, -y * 100 + 400);
    ctx.stroke();
    xAnterior = x;
    yAnterior = y;
  }
  ctx.stroke();
}

document.getElementById("graficar").addEventListener("click", dibujarGrafica);
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
function evaluarFuncion(x, tipo, funcion) {
  
  // Reemplazar patrones como "2x^2", "3.5x^2", "0.5x^2", etc. por "2*(x**2)", "3.5*(x**2)", "0.5*(x**2)", etc.
  funcion = funcion.toString().replace(/(\d*\.?\d*)x\^2/g, "$1*(x**2)");
  
  // Reemplazar patrones como "2x", "3x", "0.5x", etc. por "2*x", "3*x", "0.5*x", etc.
  funcion = funcion.toString().replace(/(\d*\.?\d*)x/g, "$1*x");
  
  // Reemplazar patrones como "a/x", "a^n/x", "a+b/x", "a-b/x", "a*b/x", "(a/b)/x", etc. por "a*(1/x)", "a^n*(1/x)", "(a+b)*(1/x)", "(a-b)*(1/x)", "(a*b)*(1/x)", "(a/b)*(1/x)", etc.
  funcion = funcion.toString().replace(/([\d\.]*[a-z]?)[\+\-\*\/]([\d\.]*[a-z]?)\/x/gi, "($1*$2)/(x)");
  funcion = funcion.toString().replace(/([\d\.]*[a-z]?)\/x/gi, "($1)/(x)");
  funcion = funcion.toString().replace(/([\d\.]*[a-z]?)\^([\d\.]*[a-z]?)\/x/gi, "($1**$2)/(x)");

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

    ctx.moveTo(xAnterior * 50 + 250, -yAnterior * 50 + 250);
    ctx.lineTo(x * 50 + 250, -y * 50 + 250);
    ctx.stroke();
    xAnterior = x;
    yAnterior = y;
  }
  ctx.stroke();
}

document.getElementById("graficar").addEventListener("click", dibujarGrafica);
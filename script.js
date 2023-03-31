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
  for (let i = 0; i <= 10; i++) {
    ctx.beginPath();
    ctx.moveTo(i * 50, 0);
    ctx.lineTo(i * 50, 500);
    ctx.strokeStyle = "#ccc";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i * 50);
    ctx.lineTo(500, i * 50);
    ctx.strokeStyle = "#ccc";
    ctx.stroke();

    if (i !== 5) {
      // Evitar escribir el número 0 dos veces
      ctx.fillStyle = "black";
      ctx.fillText(i - 5, i * 50 + 5, 265);
      ctx.fillText(5 - i, 255, i * 50 + 15);
    }
  }
  ctx.fillStyle = "black";
  ctx.fillText("0", 255, 265);
}

// Función para evaluar f(x)
function evaluarFuncion(x, funcion) {
  console.log(x);
  x = eval(x);

  switch (funcion) {
    case "sin":
      return Math.sin(x);
    case "cos":
      return Math.cos(x);
    case "tg":
      return Math.tan(x);
    case "log":
      return Math.log(x);
    case "lineal":
      return x;
    case "cuadratica":
      console.log(x)
      console.log(funcion)
      return x; // Utiliza eval() para evaluar la función ingresada
    case "exponencial":
      return Math.exp(x);
    case "hiperbolica":
      return Math.sinh(x);
    default:
      return 0; // Devuelve 0 si la función ingresada no es válida
  }
}

// Dibujar gráfica
function dibujarGrafica() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar ejes cartesianos y grilla
  dibujarEjes();
  dibujarGrilla();

  // Obtener la función y el tipo seleccionados por el usuario
  const funcionInput = document.getElementById("funcion").value;
  const tipoInput = document.getElementById("tipo").value;

  // Dibujar la gráfica de la función
  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;
  let xAnterior = -10;
  let yAnterior = evaluarFuncion(xAnterior, tipoInput);
  for (let x = -9.9; x <= 10; x += 0.1) {
    const y = evaluarFuncion(funcionInput.replaceAll("x", x), tipoInput);
    ctx.moveTo(xAnterior * 50 + 250, -yAnterior * 50 + 250);
    ctx.lineTo(x * 50 + 250, -y * 50 + 250);
    ctx.stroke();
    xAnterior = x;
    yAnterior = y;
  }
}

document.getElementById("graficar").addEventListener("click", dibujarGrafica);

import express from "express";

const router = express.Router();

function calcularPago(nivel, pagoHoraBase, horas) {
  const incrementos = [0.3, 0.5, 1.0];
  const incremento = incrementos[nivel - 1];
  return pagoHoraBase * (1 + incremento) * horas;
}

function calcularImpuesto(pagoPorHoras) {
  return pagoPorHoras * 0.16;
}

function calcularBono(numHijos, pagoPorHoras) {
  let porcentajeBono = 0;
  numHijos = parseInt(numHijos);

  if (numHijos >= 1 && numHijos <= 2) {
    porcentajeBono = 0.05;
  } else if (numHijos >= 3 && numHijos <= 5) {
    porcentajeBono = 0.10;
  } else if (numHijos > 5) {
    porcentajeBono = 0.20;
  }
  
  return pagoPorHoras * porcentajeBono;
}

function calcularTotalAPagar(pagoPorHoras, bono, impuesto) {
  return pagoPorHoras + bono - impuesto;
}

router.get("/", (req, res) => {
  res.render("index", { titulo: "Home" });
});


router.get("/pago", (req, res) => {
  res.render("pago", {
    titulo: "Recibo de Pago",
    isPost: false
  });
});

// Configurar la ruta que procesa el formulario de recibo
router.post("/pago", (req, res) => {
  const { numero, nombre, domicilio, nivel, pagoHoraBase, horas, numHijos } = req.body;

  const nivelNumerico = parseInt(nivel);
  const pagoHoraBaseNumerico = parseFloat(pagoHoraBase);
  const horasNumericas = parseFloat(horas);
  const numHijosNumerico = parseInt(numHijos);

  const pagoPorHoras = calcularPago(parseInt(nivel), parseFloat(pagoHoraBase), parseFloat(horas));
  const bono = calcularBono(parseInt(numHijos), pagoPorHoras);
  const impuesto = calcularImpuesto(pagoPorHoras);
  const totalAPagar = calcularTotalAPagar(pagoPorHoras, bono, impuesto);

  const params = {
    titulo: "Recibo de Pago",
    numero,
    nombre,
    domicilio,
    nivel: nivelNumerico,
    pagoHoraBase: pagoHoraBaseNumerico,
    horas: horasNumericas,
    numHijos: numHijosNumerico,
    pagoPorHoras,
    bono,
    impuesto,
    totalAPagar,
    isPost: true
  };
  res.render("pago", params);
});

router.get('/index',(req,res)=>{
  res.render('index');
})
export default router;

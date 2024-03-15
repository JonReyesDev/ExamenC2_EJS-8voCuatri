import express from "express";

export const router = express.Router();

export default { router };

// Configurar primer ruta
router.get("/", (req, res) => {
  res.render("index", { titulo: "Pre-ExamenC2" });
});

router.get("/recibo", (req, res) => {
  const params = {
    titulo: "Pre-ExamenC2 - Jonathan Alexis Reyes ",
    numero: req.query.numero,
    nombre: req.query.nombre,
    domicilio: req.query.domicilio,
    servicio: req.query.servicio,
    kwConsumidos: req.query.kwConsumidos,
    isPost: false,
  };
  res.render("recibo", params);
});

router.post("/recibo", (req, res) => {
  const precios = [1.08, 2.5, 3.0];

  const { numero, nombre, domicilio, servicio, kwConsumidos } = req.body;
  const precioKw = precios[servicio * 1];
  const tipoDeServicio = servicio == 0 ? 'Domestico' :  servicio == 1 ? 'Comercial' : 'Industrial'
  const subtotal = precioKw * kwConsumidos;

  // Calcular el descuento
  let descuento = 0;
  if (kwConsumidos <= 1000) {
    descuento = 0.1;
  } else if (kwConsumidos > 1000 && kwConsumidos <= 10000) {
    descuento = 0.2;
  } else {
    descuento = 0.5;
  }

  // Aplicar el descuento al subtotal
  const descuentoAplicado = subtotal * descuento;

  // Calcular el impuesto
  const impuesto = 0.16 * subtotal;

  // Calcular el total a pagar
  const total = subtotal + impuesto - descuento;
  const subtotalConDescuento = subtotal + impuesto - descuentoAplicado;

  // Actualizar el objeto 'resultado'
  const params = {
    titulo: "Pre-ExamenC2 - Jonathan Alexis Reyes",
    numero,
    nombre,
    domicilio,
    servicio: tipoDeServicio,
    kwConsumidos,
    precioKw,
    subtotal,
    descuento: descuentoAplicado, // Actualizado para reflejar el descuento aplicado
    subtotalConDescuento,
    impuesto,
    total,
    isPost: true,
  };
  res.render("recibo", params);
});

router.get("/index", (req, res) => {
  res.render("index", { titulo: "Pre-ExamenC2" });
});


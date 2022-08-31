//formulario de cotización para alquiler de salón
const AFIRMATIVO = "si";
const NEGATIVO = "no";

function calcularCosto() {
  let numHoras = document.getElementById("numHoras").value;
  let numPersonas = document.getElementById("numPersonas").value;
  let servicios = document.getElementById("servicios").value;

  let resultado1 = costoSalon(numHoras);
  let resultado2 = costoPorPersona(numPersonas);
  let resultado3 = costoAlquilerServicios(servicios);
  let resultadoTotal = resultadoFinal(resultado1, resultado2, resultado3);
  document.getElementById("result").innerText = resultadoTotal;
}

/** retorna el costo básico del alquiler del salón */
function costoSalon(numHoras) {
  let costoEvento = numHoras * 50000;
  if (numHoras <= 8) {
    return costoEvento;
  } else if (numHoras > 8) {
    alert("Excede el horario máximo de alquiler.");
  }
}

/** retorna el costo por invitado */
function costoPorPersona(numPersonas) {
  let costoPersona = numPersonas * 2000;
  if (numPersonas <= 1500) {
    return costoPersona;
  } else if (numPersonas > 1500) {
    alert("Excede la capacidad máxima de invitados.");
  }
}

/** retorna el costo de los servicio de salón si la opción es un SI */
function costoAlquilerServicios(servicios) {
  let costo = 0;
  switch (servicios) {
    case AFIRMATIVO:
      costo = 180000;
      break;
    case NEGATIVO:
      costo = 0;
      break;
    default:
      alert("Debe seleccionar una opción de servicio de salón.");
      break;
  }
  return costo;
}

/** retorna el resultado final de la cotización */
function resultadoFinal(resultado1, resultado2, resultado3) {
  return `$ ${resultado1 + resultado2 + resultado3}`;
}

/** radios con ciclo For para seleccionar un evento */
let radios = [
  {
    id: "casamiento",
    value: "Casamiento",
    type: "radio",
    name: "opcion",
  },
  {
    id: "cumpleaños",
    value: "Cumpleaños",
    type: "radio",
    name: "opcion",
  },
  {
    id: "despedida",
    value: "Despedida",
    type: "radio",
    name: "opcion",
  },
  {
    id: "otro",
    value: "Otro",
    type: "radio",
    name: "opcion",
  },
];

const opcionesDiv = document.getElementById("opciones");

for (let radio of radios) {
  let input = document.createElement("input");
  input.setAttribute("id", radio.id);
  input.setAttribute("value", radio.value);
  input.setAttribute("name", radio.name);
  input.setAttribute("type", radio.type);

  let label = document.createElement("label");
  label.setAttribute("for", radio.id);
  label.innerText = radio.value;
  opcionesDiv.append(input);
  opcionesDiv.append(label);
}

/**  Arrays - retorna radios con ciclo For para seleccionar un turno */
function crearRadios() {
  let radios = [
    {
      id: "mañana",
      value: "Mañana",
      type: "radio",
      name: "turno",
    },
    {
      id: "noche",
      value: "Noche",
      type: "radio",
      name: "turno",
    },
  ];

  const turnosDiv = document.getElementById("turnos");

  for (let radio of radios) {
    let input = document.createElement("input");
    input.setAttribute("id", radio.id);
    input.setAttribute("value", radio.value);
    input.setAttribute("name", radio.name);
    input.setAttribute("type", radio.type);

    let label = document.createElement("label");
    label.setAttribute("for", radio.id);
    label.innerText = radio.value;
    turnosDiv.append(input);
    turnosDiv.append(label);
  }
}
crearRadios();

/** retorna limpieza del formulario  */
function limpiarForm() {
  console.log(document.getElementById("formulario"));
  document.getElementById("formulario").reset();
  document.getElementById("result").innerText = "";
}

/** Bienvenida */
alert("¡BIENVENIDO/A! te encuentras a un paso de cotizar tu próximo evento.");

/** Extra - mensaje página */
window.onbeforeunload = function () {
  return "Do you really want to close?";
};

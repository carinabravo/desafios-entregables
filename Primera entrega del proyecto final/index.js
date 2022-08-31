/***** FORMULARIO DE CONTACTO *****/
const id_form_contactanos = "formulario__contactanos";

const form_contactanos = document.getElementById(`${id_form_contactanos}`);
const inputs = [
  ...document.querySelectorAll(`#${id_form_contactanos} input,textarea`),
];

const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{5,30}$/, // Letras y espacios, pueden llevar acentos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d{10,14}$/, // 10 a 14 números.
  consulta: /^[a-zA-ZÀ-ÿ\s]{10,200}$/, // Letras y espacios, pueden llevar acentos.
};

const nombreElementos = ["nombre", "correo", "telefono", "consulta"];

/** indica si el campo fue validado */
const campos = {
  nombre: undefined,
  correo: undefined,
  telefono: undefined,
  consulta: undefined,
};

/** validación de formulario de contacto */
const validarFormulario = (e) => {
  // resume todo el switch en una sola linea = validarCampo(expresiones[e.target.name], e.target, e.target.name)
  switch (e.target.name) {
    case "nombre":
      validarCampo(expresiones.nombre, e.target, "nombre");
      break;
    case "correo":
      validarCampo(expresiones.correo, e.target, "correo");
      break;
    case "telefono":
      validarCampo(expresiones.telefono, e.target, "telefono");
      break;
    case "consulta":
      validarCampo(expresiones.consulta, e.target, "consulta");
  }
};

/** Validación de campos de formulario */
const validarCampo = (expresion, input, campo) => {
  if (expresion == undefined) {
    campos[campo] = true;
    return;
  }
  const campoInput = document.getElementById(`grupo__${campo}`);
  const iconInput = document.querySelector(`#grupo__${campo} i`);
  const parrafoError = document.querySelector(
    `#grupo__${campo} .formulario__input-error`
  );

  // para debuggear - EJEMPLO -
  // if (!parrafoError) {
  //   console.log(campo)
  //   debugger;
  // }

  /** valida si la expresión regular es correcta o no */
  if (expresion.test(input.value)) {
    campoInput.classList.remove("formulario__grupo-incorrecto");
    campoInput.classList.add("formulario__grupo-correcto");

    iconInput.classList.add("fa-check-circle");
    iconInput.classList.remove("fa-times-circle");

    parrafoError.classList.remove("formulario__input-error-activo");

    campos[campo] = true;
  } else {
    campoInput.classList.add("formulario__grupo-incorrecto");
    campoInput.classList.remove("formulario__grupo-correcto");

    iconInput.classList.remove("fa-check-circle");
    iconInput.classList.add("fa-times-circle");

    parrafoError.classList.add("formulario__input-error-activo");

    campos[campo] = false;
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

form_contactanos.addEventListener("submit", (e) => {
  e.preventDefault();

  /** valida el campo para todos los inputs que aún no fueron validados */
  inputs
    .filter((input) => campos[input.name] == undefined)
    .forEach((input) => {
      validarCampo(expresiones[input.name], input, input.name);
    });

  if (campos.nombre && campos.telefono && campos.correo && campos.consulta) {
    form_contactanos.reset();

    const parrafo_mensaje_exito = document.getElementById(
      "formulario__mensaje-exito"
    );
    parrafo_mensaje_exito.classList.add("formulario__mensaje-exito-activo");
  } else {
    const parrafo_mensaje_error = document.getElementById(
      "formulario__mensaje"
    );
    parrafo_mensaje_error.classList.add("formulario__mensaje-activo");
  }
});

/** retorna limpieza de formulario de contacto */
function limpiarFormContacto() {
  const limpiarContacto = prompt(
    "¿Desea limpiar el formulario? \n ¡Cuidado! Perderá todos los datos ingresados. \n Ingrese (si o no) según desee."
  );
  if (limpiarContacto == "no") {
    return;
  } else if (limpiarContacto == "si") {
    document.getElementById("formulario__contactanos").reset();
    document
      .getElementById("formulario__mensaje")
      .classList.remove("formulario__mensaje-activo");
    document
      .getElementById("formulario__mensaje-exito")
      .classList.remove("formulario__mensaje-exito-activo");

    /** limpia campo e íconos del formulario de contacto */
    nombreElementos.forEach((campo) => {
      const campoInput = document.getElementById(`grupo__${campo}`);
      const iconInput = document.querySelector(`#grupo__${campo} i`);
      const parrafoError = document.querySelector(
        `#grupo__${campo} .formulario__input-error`
      );
      if (iconInput) {
        campoInput.classList.remove("formulario__grupo-incorrecto");
        campoInput.classList.remove("formulario__grupo-correcto");
        iconInput.classList.remove("fa-check-circle");
        iconInput.classList.remove("fa-times-circle");
        parrafoError.classList.remove("formulario__input-error-activo");
      }
    });
  }
}

/***** FORMULARIO DE COTIZACIÓN PARA RESERVA Y ALQUILER DE SALÓN *****/
const AFIRMATIVO = "si";
const NEGATIVO = "no";

/** Bienvenida a formulario de cotización */
alert("¡BIENVENIDO/A! te encuentras a un paso de cotizar tu próximo evento.");

crearRadiosTurno();
crearRadiosOpcion();

// Definición de funciones para formulario de cotización

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

/** Arrays - retorna radios con ciclo For of para seleccionar un evento */
function crearRadiosOpcion() {
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

  /**  se crean elementos (radios) al formulario a partir de objetos */
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
}

/**  Arrays - retorna radios con ciclo for of para seleccionar un turno */
function crearRadiosTurno() {
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

  /** se crean elementos (radios) al formulario a partir de objetos */
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

/** retorna limpieza del formulario de cotización */
function limpiarForm() {
  const limpiarCotizacion = prompt(
    "¿Desea limpiar el formulario? \n ¡Cuidado! Perderá todos los datos ingresados. \n Ingrese (si o no) según desee."
  );
  if (limpiarCotizacion == "no") {
    return;
  } else if (limpiarCotizacion == "si") {
    console.log(document.getElementById("formulario"));
    document.getElementById("formulario").reset();
    document.getElementById("result").innerText = "";
  }
}

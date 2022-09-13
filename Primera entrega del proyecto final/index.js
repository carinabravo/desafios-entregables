/***** FORMULARIO DE CONTACTO *****/

const id_form_contactanos = "formulario__contactanos";

const form_contactanos = document.getElementById(`${id_form_contactanos}`);
const inputs = [
  ...document.querySelectorAll(`#${id_form_contactanos} input,textarea`),
];

recuperarDatos();

/** Expresiones regex */
const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{5,30}$/, // Letras y espacios, pueden llevar acentos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d.{10}$/, // Número de área más números.
  consulta: /^[a-zA-ZÀ-ÿ\s]{10,200}$/, // Letras y espacios, pueden llevar acentos.
};

const nombreElementos = ["nombre", "correo", "telefono", "consulta"];

/** Indica si el campo fue validado */
const campos = {
  nombre: undefined,
  correo: undefined,
  telefono: undefined,
  consulta: undefined,
};

/** Validación de formulario de contacto - (Resume todo el switch en una sola linea) */
const validarFormulario = (e) => {
  validarCampo(expresiones[e.target.name], e.target, e.target.name);
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

  /** Valida si la expresión regular es correcta o no */
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

  /** Valida el campo para todos los inputs que aún no fueron validados */
  inputs
    .filter((input) => campos[input.name] == undefined)
    .forEach((input) => {
      validarCampo(expresiones[input.name], input, input.name);
    });

  /** Implementa Storage y Json en formulario de contacto - datos personales */
  const camposParaGuardar = {
    nombre: inputs.find((i) => i.id == "nombre").value,
    correo: inputs.find((i) => i.id == "correo").value,
    telefono: inputs.find((i) => i.id == "telefono").value,
  };

  localStorage.setItem("form_contactanos", JSON.stringify(camposParaGuardar));

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

/** Recupera datos del Local Storage */
function recuperarDatos() {
  const camposGuardados = JSON.parse(localStorage.getItem("form_contactanos"));
  if (camposGuardados !== null) {
    inputs.find((i) => i.id == "nombre").value = camposGuardados.nombre;
    inputs.find((i) => i.id == "correo").value = camposGuardados.correo;
    inputs.find((i) => i.id == "telefono").value = camposGuardados.telefono;
  } else {
    // Si no hay datos, no hago nada.
  }
}

/** Retorna limpieza de formulario de contacto */
function limpiarFormContacto() {
  document.getElementById("formulario__contactanos").reset();
  document
    .getElementById("formulario__mensaje")
    .classList.remove("formulario__mensaje-activo");
  document
    .getElementById("formulario__mensaje-exito")
    .classList.remove("formulario__mensaje-exito-activo");

  /** Limpia campo e íconos del formulario de contacto */
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

/***** FORMULARIO DE COTIZACIÓN PARA ALQUILER DE SALÓN *****/

const AFIRMATIVO = "si";
const NEGATIVO = "no";

crearRadiosTurno();
crearRadiosOpcion();

// Definición de funciones para el formulario de cotización
/** Calcula el costo total de una cotización */
function calcularCosto() {
  const datos = obtenerDatosFormCotizacion();

  /** Se calculan los costos */
  let resultado1 = costoSalon(datos.numHoras);
  let resultado2 = costoPorPersona(datos.numPersonas);
  let resultado3 = costoAlquilerServicios(datos.servicios);

  /** Retorna el resultado final de cotización */
  let resultadoTotal = resultado1 + resultado2 + resultado3;
  return resultadoTotal;
}

/** Retorna el costo básico del alquiler del salón */
function costoSalon(numHoras) {
  return numHoras * 20000;
}

/** Retorna el costo por invitado */
function costoPorPersona(numPersonas) {
  return numPersonas * 2000;
}

/** Retorna el costo de los servicio de salón si la opción es afirmativa */
function costoAlquilerServicios(servicios) {
  let costo = 0;
  switch (servicios) {
    case AFIRMATIVO:
      costo = 180000;
      break;
    case NEGATIVO:
      costo = 0;
      break;
  }
  return costo;
}

/** Se obtienen los datos de cotización */
function obtenerDatosFormCotizacion() {
  let numHoras = parseInt(document.getElementById("numHoras").value);
  let numPersonas = parseInt(document.getElementById("numPersonas").value);
  let servicios = document.getElementById("servicios").value;

  let opciones = [...document.getElementsByName("opcion")];
  let opcion = opciones.find((radio) => radio.checked); //Retorna el primero que cumple la condición.

  let fecha = document.getElementById("fecha").value;

  let turnos = [...document.getElementsByName("turno")];
  let turno = turnos.find((radio) => radio.checked); //Retorna el primero que cumple la condición.

  return {
    numHoras,
    numPersonas,
    servicios,
    opcion: opcion ? opcion.id : null, // If corto (si opción existe devuelve opción.id, sino devuelve null).
    fecha: fecha ? fecha : null,
    turno: turno ? turno.id : null,
  };
}

/** Retorna la validación del formulario de cotización */
function validarFormCotizacion() {
  const datos = obtenerDatosFormCotizacion();

  const validacionSalon = validarSalon(datos.numHoras);
  const validacionInvitados = validarPorPersona(datos.numPersonas);
  const validacionAlquiler = validarAlquilerServicios(datos.servicios);
  const validacionOpciones = validarOpciones(datos.opcion);
  const validacionFecha = validarFecha(datos.fecha);
  const validacionTurno = validarTurno(datos.turno);

  mostrarMensajes(
    validacionSalon,
    validacionInvitados,
    validacionAlquiler,
    validacionOpciones,
    validacionFecha,
    validacionTurno
  );

  return (
    validacionSalon &&
    validacionInvitados &&
    validacionAlquiler &&
    validacionOpciones &&
    validacionFecha &&
    validacionTurno
  );
}

/** Devuelve mensajes al usuario, si las validaciones no se cumplen */
function mostrarMensajes(horas, personas, servicios, opcion, fecha, turno) {
  const p_horas_error = document.querySelector("#grupo__numHoras p");
  const p_personas_error = document.querySelector("#grupo__numPersonas p");
  const p_servicios_error = document.querySelector("#grupo__servicios p");
  const p_opcion_error = document.querySelector("#opciones p");
  const p_fecha_error = document.querySelector("#grupo__fechaEvento p");
  const p_turno_error = document.querySelector("#turnos p");

  if (horas == true) {
    p_horas_error.style.display = "none";
  } else {
    p_horas_error.style.display = "block";
  }

  if (personas == true) {
    p_personas_error.style.display = "none";
  } else {
    p_personas_error.style.display = "block";
  }

  if (servicios == true) {
    p_servicios_error.style.display = "none";
  } else {
    p_servicios_error.style.display = "block";
  }

  if (opcion == true) {
    p_opcion_error.style.display = "none";
  } else {
    p_opcion_error.style.display = "block";
  }

  if (fecha == true) {
    p_fecha_error.style.display = "none";
  } else {
    p_fecha_error.style.display = "block";
  }

  if (turno == true) {
    p_turno_error.style.display = "none";
  } else {
    p_turno_error.style.display = "block";
  }
}

/** Retorna las validaciones de cada ejecución */
function validarSalon(numHoras) {
  return (numHoras >=1 && numHoras <=8);
}

function validarPorPersona(numPersonas) {
  return (numPersonas >= 10 && numPersonas <= 1800);
}

function validarAlquilerServicios(servicios) {
  return servicios == AFIRMATIVO || servicios == NEGATIVO;
}

function validarOpciones(opciones) {
  return opciones != null;
}

function validarFecha(fecha) {
  return fecha != null;
}

function validarTurno(turnos) {
  return turnos != null;
}

/** Retorna el costo de cotización y reserva - luego de validar */
function obtenerCotizacionConReserva() {
  if (!validarFormCotizacion()) {
    return;
  }

  const resultadoTotal = calcularCosto();
  document.getElementById("result").innerText = `$ ${resultadoTotal}`;
  document.getElementById("result-reserva").innerText = `$ ${
    (resultadoTotal * 20) / 100
  }`;

  const datosCotizacion = obtenerDatosFormCotizacion();
  /** Implementa Storage y Json en formulario de cotización - Datos del evento */
  const camposGuardar = {
    numHoras: datosCotizacion.numHoras,
    numPersonas: datosCotizacion.numPersonas,
    servicios: datosCotizacion.servicios,
    opcion: datosCotizacion.opcion,
    fecha: datosCotizacion.fecha,
    turno: datosCotizacion.turno,
    total: resultadoTotal,
    reserva: (resultadoTotal * 20) / 100,
  };

  localStorage.setItem("formulario", JSON.stringify(camposGuardar));

  /** quita clase disabled-link al link del botón de reservar */
  document.querySelector(".disabled-link").classList.remove("disabled-link");
}

/** Arrays - retorna "radios" con ciclo For of para seleccionar un evento */
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

  const opcionesDiv = document.querySelector("#opciones div");

  /**  Se crean elementos "radios" al formulario a partir de objetos */
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

/**  Arrays - retorna "radios" con ciclo for of para seleccionar un turno */
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

  const turnosDiv = document.querySelector("#turnos div");

  /** Se crean elementos "radios" al formulario a partir de objetos */
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

/** Retorna limpieza del formulario de cotización */
function limpiarForm() {
  document.getElementById("formulario").reset();
  document.getElementById("result").innerText = "";
  document.getElementById("result-reserva").innerText = "";

  /** Limpia mensajes de error de validación del formulario de cotización */
  document.querySelector("#grupo__numHoras p").style.display = "none";
  document.querySelector("#grupo__numPersonas p").style.display = "none";
  document.querySelector("#grupo__servicios p").style.display = "none";
  document.querySelector("#opciones p").style.display = "none";
  document.querySelector("#grupo__fechaEvento p").style.display = "none";
  document.querySelector("#turnos p").style.display = "none";
}

//listado de productos

/** crear producto */
class Producto {
  constructor(nombre, cantidad, precio) {
    this.nombre = nombre;
    this.cantidad = cantidad;
    this.precio = precio;
  }
}

let productos = [];

/** se agregarán productos a la lista */
function agregarProducto(productos) {
  let nombre = prompt(" ingrese el nombre del producto");
  let cantidad = obtenerNumeroPrompt("ingrese la cantidad de productos");
  let precio = obtenerNumeroPrompt("ingrese su precio");
  let newProduct = new Producto(nombre, cantidad, precio);
  productos.push(newProduct);
  console.log("se ingresó el producto", newProduct);
}

/** solo será válido si se ingresa un número */
function obtenerNumeroPrompt(texto) {
  let num = null;
  do {
    num = parseInt(prompt(texto));
  } while (!Number.isInteger(num));
  return num;
}

/** se verán los productos de la lista */
function verProductos(productos) {
  console.log(`${"=".repeat(10)} Listado de Productos ${"=".repeat(10)}`);
  for (let producto of productos) {
    console.log(producto);
  }
  console.log("=".repeat(40));
}

/** se buscára un producto en particular */
function verProducto(productos) {
  let texto = "";
  for (let index = 0; index < productos.length; index++) {
    texto = texto.concat(
      `ingrese ${index + 1} para el producto ${productos[index].nombre}\n`
    );
  }
  const option = parseInt(prompt(texto));
  console.log(productos[option - 1]);
}

/** estructura general */
let option = 0;
do {
  option = parseInt(
    prompt(
      " Registrar producto: opción 1 / Seleccionar un producto de la lista: opción 2 / Lista de productos registrados: opción 3 / Salir: opción 4"
    )
  );

  switch (option) {
    case 1:
      agregarProducto(productos);
      break;
    case 2:
      verProducto(productos);
      break;
    case 3:
      verProductos(productos);
      break;
    case 4:
      alert("Hasta pronto!");
      break;
    default:
      alert("si desea salir ingrese opción 4");
      break;
  }
} while (option != 4);

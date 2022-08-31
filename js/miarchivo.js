
class Producto {
        constructor(id, nombre, precio, cantidad, oferta) {
                this.id = parseInt(id);
                this.nombre = nombre;
                this.precio = parseFloat(precio);
                this.oferta = oferta;
                this.cantidad = cantidad || 1;
        }
        addCantidad() {
                this.cantidad++;
        }
        ofertaLabel() {
                return this.oferta == true ? "El protudcto está en oferta" : "";
        }
        subTotal(){
                return this.precio * this.cantidad;
        }
}






const productos = [];
const carrito = [];
const cantidadCarrito = document.getElementById('cantidad')
const productosCarrito = document.getElementById('productosCarrito')


añadirProductoCarrito();
seleccionarProducto();



const carritoProductos = document.getElementById("carrito");
const espacioProductos = document.getElementById("productos");


function productosUI(productos) {

        espacioProductos.innerHTML = "";

        for (const producto of productos) {
                let divProducto = document.createElement('div');
                divProducto.classList.add('col');
                divProducto.innerHTML = `
                <div class="card" style="width: 18rem;">
                                <div class="card-body">
                                        <h5 class="card-title">${producto.nombre}</h5>
                                        <p class="card-text"> $ ${producto.precio}</p>
                                        <button id='${producto.id}' class = 'btnCompra btn btn-primary'>Comprar</button>                
                                </div>
                </div>
                 `;

                espacioProductos.append(divProducto);
        }
}

if ("ListaProductos" in localStorage) {
        const productosGuardados = JSON.parse(localStorage.getItem('ListaProductos'));
        for (const productoGenerico of productosGuardados) {
                productos.push(new Producto(productoGenerico.id, productoGenerico.nombre, productoGenerico.precio));

        }
        productosUI(productos);
}


let miFormulario = document.getElementById('registroProducto');

miFormulario.onsubmit = (e) => {
        e.preventDefault();
        const inputs = miFormulario.children;
        productos.push(new Producto(productos.length + 1, inputs[0].value, inputs[1].value));
        localStorage.setItem('ListaProductos', JSON.stringify(productos));
        productosUI(productos);
}


añadirProductoCarrito();
seleccionarProducto();

/* EVENTO + librería aplicada (sweetAlert) */

function añadirProductoCarrito() {
        let botones = document.getElementsByClassName('btnCompra');
        //console.log(botones);
        for (const boton of botones) {
                boton.addEventListener('click', function () {
                        swal("Producto añadido al carrito.")
                })
        }
}

let productosFetch = document.querySelector("#productosFetch");
 fetch("productos.json")
         .then((respuesta) => respuesta.json())
         .then((data) => {
                 data.map((productoTarjetasGraficas) => {
                         const content = document.createElement("div");
                         content.classList.add('col');
                         content.innerHTML = `
                 <div class="card" style="width: 18rem;">
                         <img src="${productoTarjetasGraficas.imgUrl}" class="card-img-top" alt="...">
                                 <div class="card-body">
                                         <h5 class="card-title">${productoTarjetasGraficas.title}</h5>
                                         <p class="card-text"> $ ${productoTarjetasGraficas.price}</p>
                                         <button id='${productoTarjetasGraficas.id}' class = 'btnCompra btn btn-primary'>Comprar</button>                
                                 </div>
                 </div>
                 `;
                         productosFetch.append(content);

                 })

                 

               
                 añadirProductoCarrito();
                 seleccionarProducto();
         })


function seleccionarProducto(){
        let botones = document.getElementsByClassName('btnCompra');
        for (const boton of botones) {
                boton.addEventListener('click', function (){
                        let seleccion = carrito.find(producto => producto.id == this.id);
                        if(seleccion){
                                seleccion.addCantidad();

                        }else{
                                seleccion = productos.find(producto=> producto.id == this.id);
                                carrito.push(seleccion)
                        }
                        localStorage.setItem('Carrito', JSON.stringify(carrito));
                        carritoHTML(carrito);
                
                })

        }
}

function carritoHTML(lista) {
        cantidadCarrito.innerHTML = lista.length;
        productosCarrito.innerHTML="";
        for (const producto of lista) {
                let prod = document.createElement('div');
                prod.innerHTML= ` ${producto.nombre}
                <span class="badge bg-warning text-dark">Precio: $ ${producto.precio}</span>
                <span class="badge bg-primary">Cantidad: ${producto.cantidad}</span>
                <span class="badge bg-dark">Subtotal: $ ${producto.subTotal()}</span>
                `;
                productosCarrito.append(prod)
        }
}



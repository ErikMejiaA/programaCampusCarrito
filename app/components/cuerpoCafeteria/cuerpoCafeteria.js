import { CarritoCompras } from "../../Modelos/CarritoCompras.js";
import { Producto } from "../../baseDatos/producto.js";
export { CuerpoCafeteria };

let Productos = JSON.parse(JSON.stringify(Producto))
let itemCaDatos = [];// guarda nuevos datos del producto
let productosCarrito = []; //local storage
let productosCarro = []; //para reguardar los productos finales del carrito

class CuerpoCafeteria extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode : "open"});

        
        localStorage.removeItem("productosCarrito");

        if (localStorage.getItem("productosCarrito") != null){
            productosCarrito = JSON.parse(localStorage.getItem("productosCarrito"));
            //console.log(productosCarrito)
        }
    }
    connectedCallback() {
        this.shadowRoot.innerHTML = /* html */ ` 
        <style rel="stylesheet">
            @import "app/components/cuerpoCafeteria/cafeteriaStyle.css";
        </style>

        <style rel="stylesheet">
            @import "css/app.css";
        </style>

        <div class="cart">
            <img src="imagenes/cart-regular-24.png" alt="..." id="verCarrito">
            <span id="contar">0</span>
        </div>

        <div class="first-message">
            <h1>Cafeteria Virtual</h1>
            <p>Sección Compra</p>
        </div>

        <div class="first-message">
            <h3>Catalogo</h3>
        </div>

        <div class="products" id="conteTarjeta">
            
        </div>

        <div class="cart-products" id="cartaProducto">
            <div class="close-btn">
                <span id = "cerrarCarrito">&times;</span>
            </div>
            <h3>Mi Carrito</h3>
            <div id="llenarCarrito">

            </div>
            <p>Total: <span id="totalCompras">0.0</span></p>
        </div>
        `;
        
        this.verDatos();
        this.agregarProductoCarro();
        this.llenarElCarrito();
        this.verCarrito();
    }

    //funcion para llenar las cartas y para ver sus datos
    verDatos = () => {
        let productoHTML = '';
        for (let itemProducto of Productos) {
            productoHTML += this.llenadoCarta(itemProducto);
        }
        this.shadowRoot.querySelector('#conteTarjeta').innerHTML = productoHTML;
    }

    //funcion para ver la targeta y ver el modal con sus datos
    llenadoCarta(itemProducto) {
        let productoHTML = /* html */ `
        <div class="carts">
            <h2>${itemProducto.nombre}</h2>
            <img src="imagenes/${itemProducto.imagen}" alt="...."/>
            <p>${this.formatoMoneda(itemProducto.precio)}</p>
            <a href="#" type="button" class="boton" id="${itemProducto.id}">AÑADIR AL CARRITO</a>
        </div>
        `;
        return productoHTML;
    }

    //funcion para agregar productos al carro cuando se oprima el boton añadir al carrito
    agregarProductoCarro = () => {
        this.shadowRoot.querySelectorAll(".boton").forEach((element, posi) => {
            element.addEventListener('click', (e) => {
                alert("se ha agregado un nuevo producto al carrito");
                itemCaDatos.push(Productos[posi]);
                //console.log(itemCaDatos)

                this.contarProductoCarrito(e, posi);
            
                e.stopImmediatePropagation();
                e.preventDefault();
            });
        });
    }

    //funcion para contar el numero de productos a comprar 
    contarProductoCarrito = (e, posi) => {
        let itemDatos = [];
        if (Productos[posi].id == e.target.id){

            itemDatos = itemCaDatos.filter(elementId => elementId.id == e.target.id);//fltramos el objeto que queremos agregar al carrito
            //console.log(itemDatos)
            if (productosCarro.length === 0) {
                productosCarro.push(itemDatos[0]);
                //console.log(productosCarro)
            } else {
                let existe = productosCarro.some(item => item.id === itemDatos[0].id) //para saber si existe el objeto dentro del array 
                if (existe) {
                    productosCarro.forEach(item => {//si exixte el objeto, le modificamos la cantidad del producto
                        if (itemDatos[0].id === item.id) {
                            item.cantidadPro ++; //contador de productos para saber cuantos tengo en el carrito
                        } 
                    });
                } else {
                    productosCarro.push(itemDatos[0]);//sino exixte el objeto, lo estamos agregando al array
                }
            }
        }
        console.log(productosCarro) //array principal es [productosCarro]
        //let productoCarritoo = new CarritoCompras(element.id, element.nombre, element.precio, element.imagen,element.cantidadPro); // se utiliza para cuando se vaya a guardar objeto por objeto
        productosCarrito = productosCarro;
        //hacemos el guardado en el local storage
        localStorage.setItem("productosCarrito", JSON.stringify(productosCarrito));
        console.log(productosCarrito)

        this.llenarElCarrito();
    }

    //funcion para llenar las cartas y para ver sus datos
    llenarElCarrito = () => {
        let contar = 0;
        let carritoHTML = '';
        for (let itemCarrito of productosCarrito) {
            carritoHTML += this.llenarCarritoDatos(itemCarrito);
        }
        this.shadowRoot.querySelector('#llenarCarrito').innerHTML = carritoHTML;

        let spancontar = this.shadowRoot.querySelector('#contar');//ingresamos donde esta el span del contador
        contar = productosCarrito.length //para saber cuantos productos tengo en el carrito
        //console.log(contar)
        spancontar.innerHTML = contar;

        this.totalCompra();
        this.eliminarProducto(); 
    }

    //funcion para sumar el total de la compra
    totalCompra = () => {
        
        let totalCompraPro = 0;
        for (let datoCarrito of productosCarrito) {
            totalCompraPro += (parseFloat(datoCarrito.precio) * parseFloat(datoCarrito.cantidadPro));
        }
        this.shadowRoot.querySelector('#totalCompras').innerHTML = this.formatoMoneda(totalCompraPro) //2 numeros decimales
    }

    //funcion para agregar el producto al carrito
    llenarCarritoDatos = (itemCarrito) => {
        let carritoHTML = /* html */ `
        <div class="item">
            <img src="imagenes/${itemCarrito.imagen}" alt="...."/>
            <p>${itemCarrito.nombre}</p>
            <p>precio: <span>${this.formatoMoneda(itemCarrito.precio)}</span></p>
            <p>cantidad: <span>${itemCarrito.cantidadPro}</span></p>
            <button class="delete-product borrarPro" id="${itemCarrito.id}">X</button>
        </div>
        `;
        return carritoHTML;
    }

    //funcion para ver el carrito
    verCarrito = () => {
        this.shadowRoot.querySelector('#verCarrito').addEventListener('click', (e) => {
            const verCerrarProCarrito = this.shadowRoot.querySelector('#cartaProducto');
            verCerrarProCarrito.style.display = "block"

            this.shadowRoot.querySelector('#cerrarCarrito').addEventListener('click', (e) => {
                const verCerrarProCarrito = this.shadowRoot.querySelector('#cartaProducto');
                verCerrarProCarrito.style.display = "none";
    
                e.stopImmediatePropagation();
                e.preventDefault();
            });
            e.stopImmediatePropagation();
            e.preventDefault();
        });
    }

    //funcion para darle formato  a los precios 
    formatoMoneda = (precio) => {
        return precio.toLocaleString('en-US', {style:'currency', currency:'USD', minimumFractionDigits:2});
    }

    //funcion para borrar un producto del carrito
    eliminarProducto = () => {
        this.shadowRoot.querySelectorAll(".borrarPro").forEach((element, posi) => {
            element.addEventListener('click', (e) => {
                productosCarrito.forEach((item, opc) => {
                    if (item.id == e.target.id) {
                        productosCarrito[opc].cantidadPro --;  //disminuye la cantidad de productos comprados
                        if (productosCarrito[opc].cantidadPro == 0) {
                            productosCarrito[opc].cantidadPro = 1;
                            productosCarrito.splice(opc, 1); //eliminamos el producto a comprara
                        }
                        localStorage.setItem("productosCarrito", JSON.stringify(productosCarrito));

                        this.llenarElCarrito();
                    }
                });
                e.stopImmediatePropagation();
                e.preventDefault();
            });
        });
    }
}
customElements.define('cuerpo-cafeteria-pagina', CuerpoCafeteria);
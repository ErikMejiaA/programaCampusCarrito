import { Servicio } from "../../baseDatos/servicio.js";

//hacemos iterable la base de datos servicio
let Servicios = JSON.parse(JSON.stringify(Servicio));

export { CuerpoServicio };
class CuerpoServicio extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode : "open"});
        
    }
    connectedCallback() {
        this.shadowRoot.innerHTML = /* html */ `
        <style rel="stylesheet">
            @import "app/components/cuerpoServicios/servicioStyle.css";
        </style>
        <style rel="stylesheet">
            @import "css/app.css";
        </style>
        
        <div class="first-message">
            <h1>Servicios</h1>
            <a href="#" class="cuerpoCafeteria" data-verocultar='["c"]'>Cafeteria Virtual</a>
        </div>

        <div id="contenedor-tarjetas">
            
        </div>
        `;

        this.verDatos();
        this.verOcultarModal();
        this.abrirPaginaCafeteria();
    }

    //funcion para llenar las cartas y para ver sus datos
    verDatos = () => {
        let servicioHTML = '';
        for (let itemServicio of Servicios) {
            servicioHTML += this.llenadoModal(itemServicio);
        }
        this.shadowRoot.querySelector('#contenedor-tarjetas').innerHTML = servicioHTML;
    }

    //funcion para ver la targeta y ver el modal con sus datos
    llenadoModal(itemServicio) {
        let servicioHTML = /* html */ `
            <div class="tarjetas">
                <p>${itemServicio.nombre}</p>
                <img src="imagenes/${itemServicio.imagen}">
                <button class="verModal" >Ver Datos</button>
            </div>
            <div id="contenedorModal" class="modal">
                <div class="modal-content">
                    <h2>Servicios</h2>
                    <br>
                    <table border class="tabla">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Detalles</th>
                                <th>Disponibilidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${itemServicio.nombre}</td>
                                <td>${itemServicio.detalle}</td>
                                <td>${itemServicio.disponiblilidad}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br>
                    <div>
                        <button type="button" id="cerrar">Cerrar Modal</button>
                    </div>
                </div>
            </div>
        `;
        return servicioHTML;
    }

    //funciones para ver y ocular el modal-------------------------------
    verOcultarModal = () => {
        this.shadowRoot.querySelectorAll(".verModal").forEach((val, posi) => {
            val.addEventListener('click', (e) => {
                let modal = this.shadowRoot.querySelectorAll('#contenedorModal');
                modal[posi].style.display = "block";
                
                //ocultar el modal
                this.shadowRoot.querySelectorAll('#cerrar').forEach((item, indi) => {
                    item.addEventListener('click', (e) => {
                        let modal = this.shadowRoot.querySelectorAll('#contenedorModal');
                        modal[indi].style.display = "none";
                    });
                });
                e.stopImmediatePropagation();
                e.preventDefault();
            });
        });
    }
    //-----------------------------++++++++++++++++++++++++++++++++++++++
    //funcion para navegar por las diferentes paginas
    abrirPaginaCafeteria = () => {
        this.shadowRoot.querySelector(".cuerpoCafeteria").addEventListener('click', (e) => {
            let data = JSON.parse(e.target.dataset.verocultar);
            let mainContenido = document.querySelector('#mainContenido');
            mainContenido.innerHTML = "";
            switch (data[0]) {
                case 'c':
                    mainContenido.innerHTML = "<cuerpo-cafeteria-pagina></cuerpo-cafeteria-pagina>";
                    break;
            }
            e.stopImmediatePropagation();
            e.preventDefault();
        });
    }
}
customElements.define('cuerpo-servicio-pagina', CuerpoServicio);
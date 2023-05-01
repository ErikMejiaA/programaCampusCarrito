export { CuerpoSoporte };
class CuerpoSoporte extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open"});

    }
    connectedCallback() {
        this.shadowRoot.innerHTML = /* html */ `
        <style rel="stylesheet">
            @import "app/components/cuerpoSoporte/soporteStyle.css";
        </style>

        <div class="FAQ">
            <h1>Preguntas Mas Frecuentes</h1>
        </div>

        <button class="accordion">¿Que servicios ofrece campus?</button>
        <div class="panel">
            <p>Campus ofrece una zona de esparcimiento y descanso llamdo hunters entre otros servicios que se pueden apreciar con mas detalle en el apartado de servicios.</p>
        </div>

        <button class="accordion">¿Estos servicios y zonas manejan alhuntipo de horario? y si es asi ¿Como se distribuye?</button>
        <div class="panel">
            <p>En efecto estas zonas y servicios que ofrecemos respectivamente en horario, el cual es distribuido equitativamente entre los diferentes teams y trabajadores de campus para su uso ordenado y correcto.</p>
        </div>

        <button class="accordion">¿Puedo usar o solicitar estos servicios en cualquier momento?</button>
        <div class="panel">
            <p>Dependiendo del servicio, ya que algunos tiene un horario estricto respecto a su uso y disponibilidad.</p>
        </div>
        `;

        this.mostrarAcordeon();
    }

    //funcion para ver y ocultar el acordeon 
    mostrarAcordeon() {
        this.shadowRoot.querySelectorAll(".accordion").forEach((item, posi) => {
            item.addEventListener('click', (e) => {
                const panel = this.shadowRoot.querySelectorAll(".panel");
                panel[posi].style.display = "block"; 

                item.addEventListener('click', (e) => {
                    panel[posi].style.display = "none"; 

                    this.mostrarAcordeon();
                });
            });
        });
    }
}
customElements.define('cuerpo-soporte-pagina', CuerpoSoporte);
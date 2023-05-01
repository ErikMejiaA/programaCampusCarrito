export { NavBarMenu };
class NavBarMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open"});
        
    }
    connectedCallback() {
        this.shadowRoot.innerHTML = /* html */ `
        <!--se importa los estilos para el menu-->
        <style rel="stylesheet">
            @import "app/components/navBarMenu/menuStyle.css";
        </style>

        <nav>
            <section class="container1">
                <img id="logo" src="imagenes/logoWhite.png" alt="">
                <a href="#" class="alink" data-verocultar='["i"]'>Inicio</a>
                <a href="#" class="alink" data-verocultar='["s"]'>Servicios</a>
                <a href="#" class="alink" data-verocultar='["so"]'>Soporte</a>
            </section>
        </nav>
        `;  

        this.navegarPorPaginas();
    }

    //funcion para navegar por las diferentes paginas
    navegarPorPaginas = () => {
        this.shadowRoot.querySelectorAll(".alink").forEach((val, id) => {
            val.addEventListener('click', (e) => {
                let data = JSON.parse(e.target.dataset.verocultar);
                let mainContenido = document.querySelector('#mainContenido');
                mainContenido.innerHTML = "";
                switch (data[0]) {
                    case 'i':
                        mainContenido.innerHTML = "<cuerpo-inicio-pagina></cuerpo-inicio-pagina>";
                        break;
                    case 's':
                        mainContenido.innerHTML = "<cuerpo-servicio-pagina></cuerpo-servicio-pagina>";
                        break;
                    case 'so':
                        mainContenido.innerHTML = "<cuerpo-soporte-pagina></cuerpo-soporte-pagina>";
                        break;
                }
                e.stopImmediatePropagation();
                e.preventDefault();
            });
            
        });
    }

}
customElements.define('nav-bar-menu', NavBarMenu);
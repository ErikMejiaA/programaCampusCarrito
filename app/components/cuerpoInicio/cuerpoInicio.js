export { CuerpoInicio };
class CuerpoInicio extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        this.shadowRoot.innerHTML = /* html */ `
        <style rel="stylesheet">
            @import "app/components/cuerpoInicio/inicioStyle.css";
        </style>

        <div>
            <div class="first-message">
                <h1>Bienvenido@ Camper</h1>
                <p class="homepage">Campus Programers Land</p>
            </div>

            <div class="first-message">
                <h3>Acerca de la pagina</h3>
                <p class="homepage">ESta es una pagina informativa acerca de nuestros servicios ofrecidos a nuestros queridos campers</p>    
            </div>
        </div>

        <div class="contactanos">
            <div>
                <img src="imagenes/Space astronaut cartoon.png" alt="...">
            </div>

            <div>
                <div class="contact-info">
                    <h4>¡Contactenos!</h4>
                </div>
                <div class="social">
                    <div class="contact-info-container">
                        <a href="#">
                            <img src="imagenes/whatsapp.svg" alt="...">
                        </a>
                    </div>
                    <a href="#">+57 3118807659</a>
                </div>

                <div class="social">
                    <div class="contact-info-container">
                        <a href="#">
                            <img src="imagenes/twitter.svg" alt="...">
                        </a>
                    </div>
                    <a href="#">@CampuLatam</a>
                </div>

                <div class="social">
                    <div class="contact-info-container">
                        <a href="#">
                            <img src="imagenes/facebookF.svg" alt="...">
                        </a>
                    </div>
                    <a href="#">@CampusLand</a>
                </div>

                <div class="social">
                    <div class="contact-info-container">
                        <a href="#">
                            <img src="imagenes/instagram.svg" alt="...">
                        </a>
                    </div>
                    <a href="#">@campusdevelopers</a>
                </div>
            </div>
        </div>
        `;
    }
}
customElements.define('cuerpo-inicio-pagina', CuerpoInicio);

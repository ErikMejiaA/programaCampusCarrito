import { NavBarMenu } from "./components/navBarMenu/navBarMenu.js";
import { CuerpoInicio } from "./components/cuerpoInicio/cuerpoInicio.js";
import { CuerpoServicio } from "./components/cuerpoServicios/cuerpoServicio.js";
import { CuerpoSoporte } from "./components/cuerpoSoporte/cuerpoSoporte.js";
import { CuerpoCafeteria } from "./components/cuerpoCafeteria/cuerpoCafeteria.js";

window.addEventListener("load", (e) => {
    let mainContenido = document.querySelector('#mainContenido');
    mainContenido.innerHTML = "<cuerpo-inicio-pagina></cuerpo-inicio-pagina>";
    e.stopImmediatePropagation();
    e.preventDefault();
});
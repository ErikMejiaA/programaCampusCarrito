export { CarritoCompras };
class CarritoCompras {
    constructor(id, nombre, precio, imagen, contarProducto) {
        this._id = id;
        this._nombre = nombre;
        this._precio = precio;
        this._imagen = imagen;
        this._contarProducto = contarProducto;
    }
    get id() {
        return this._id;
    }
    set id(v_id) {
        this._id = v_id;
    }
    get nombre() {
        return this._nombre;
    }
    set nombre(v_nombre) {
        this._nombre = v_nombre;
    }
    get precio() {
        return this._precio;
    }
    set precio(v_precio) {
        this._precio = v_precio;
    }
    get imagen() {
        return this._imagen;
    }
    set imagen(v_imagen) {
        this._imagen = v_imagen;
    }
    get contarProducto() {
        return this._contarProducto;
    }
    set contarProducto(v_contarProducto) {
        this._contarProducto = v_contarProducto;
    }
}
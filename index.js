//----------CAPTURAS DOM---------
let contenedorCards = document.getElementById("contenedorCards")
let botonCarrito = document.getElementById("botonCarrito")
let modalBody = document.getElementById("modalBody")

setTimeout(()=>{
    loaderTexto.innerHTML=""
    loader.remove()
    catalogoCompleto(arrayDeArticulos)
},3000)

function Producto (id,articulo,marca,categoria,precio,imagen) {
    this.id = id,
    this.articulo = articulo,
    this.marca = marca,
    this.categoria = categoria,
    this.precio = precio,
    this.imagen = imagen
}

let arrayDeArticulos = []

const cargarProductos = async() => {
    const response = await fetch("productos.json")
    const data = await response.json()
    console.log(data)
    for(let producto of data){
        let nuevoProducto = new Producto(producto.id,producto.articulo,producto.marca,producto.categoria,producto.precio,producto.imagen)
        arrayDeArticulos.push(nuevoProducto)
    }
    

}

cargarProductos()

let productosEnCarrito = []


if(localStorage.getItem("carrito")){
    productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
}else{
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
    
}

//----------MOSTRAR CATALOGO---------




function catalogoCompleto (array) {
    contenedorCards.innerHTML = ""
    for(let producto of array) {
        let productoNuevo = document.createElement("div")
        productoNuevo.innerHTML +=
        `<div class="cards">
            <img src="${producto.imagen}" alt="${producto.articulo}"></img>
            <h2>${producto.marca}</h2>
            <h4>${producto.articulo}</h4>
            <p>${producto.precio}</p>
            <button id="agregarBtn${producto.id}" class="btn btn-outline-success">Agregar al carrito</button>
        </div>`
        contenedorCards.appendChild(productoNuevo)  //Agregar un hijo (nuevoProducto) a contenedor
        let btnAgregar = document.getElementById(`agregarBtn${producto.id}`)
        console.log(btnAgregar)
        btnAgregar.addEventListener("click", () =>{
            agregarAlCarrito(producto)
        })
    }
    
}




//----------AGREGAR PRODUCTOS A CARRITO---------



function agregarAlCarrito(producto){
    productosEnCarrito.push(producto)
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
}



//----------IMPRIMIR EN MODAL---------

//Imprimir en modal (carrito) e imprimir en modal
function cargarProductosCarrito(array){
    modalBody.innerHTML = ""
    array.forEach((productoCarrito) =>{
        modalBody.innerHTML += `
        <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
            <img class="card-img-top" src="${productoCarrito.imagen}" alt="${productoCarrito.titulo}">
            <div class="card-body">
                <h4 class="card-title">${productoCarrito.articulo}</h4>
                <h5>${productoCarrito.marca}</h5>
                <p class="card-text">${productoCarrito.precio}</p> 
                <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}">Eliminar producto</button>
            </div>    
        </div>
        `
    })
    
    array.forEach((productoCarrito,indice)=>{
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click", () => {
            // Lo eliminamos del DOM MODAL
            let tarjetaProducto = document.getElementById(`productoCarrito${productoCarrito.id}`) //Capturamos la id de la card del producto, para que salga del modal (DOM).
            tarjetaProducto.remove()

            // // Lo eliminamos del array productosEnCarrito (Al agregar el index en el parámetro del forEach, cada vez que itera el cíclo, ese índice aumenta, por ende le damos al splice el parámetro index y que borre de ahí una sola posición)
            productosEnCarrito.splice(indice, 1)
            console.log(productoCarrito)

            // // // Lo sustituimos en el Local Storage
            // localStorage.removeItem("carrito")
            // localStorage.setItem("carrito",JSON.stringify(productoCarrito))  NO FUNCIONAAAAAAA
        })
    })
}

botonCarrito.addEventListener("click", ()=>{
    cargarProductosCarrito(productosEnCarrito)
})






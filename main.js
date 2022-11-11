let cart = document.querySelectorAll(".add-cart");
let product = [];

const leerProductos = async () => {
    // Utilizo Promesas y Fetch
    const resp = await fetch('/productos.json')

    product = await resp.json()

    const lista = document.querySelector('#listaProd')


    product.forEach((prod) => {

        const div = document.createElement('div')
        div.setAttribute('class', 'list-group-item');


        // modifico dinámicamente el contenido del DOM        
        div.innerHTML = `
            <div class="item">
            <figure>
                <img
                    src= ${prod.img}
                    alt="producto"
                />
            </figure>
            <div class="info-product">
                <h2 id=${prod.nombre}>${prod.nombre}</h2>
                <p class="price">$${prod.precio}</p>
                <a class="add-cart cart1" href="#" prod-id=${prod.codigo}>AÑADIR AL CARRO</a>
            </div>
            </div>
            `

        lista.append(div);
    })

    return product;
}



//lectura inicial de productos desde Json
leerProductos();



// Reemplazo cada listener por Event Delegation

const div = document.querySelector('#listaProd')



div.addEventListener("click", (event) => {

    if (event.target.tagName === 'A') {
        console.log(event.target.getAttribute('prod-id'))
        // Recupero el código del producto desde el DOM , html generado
        let p_id = event.target.getAttribute('prod-id');

        cartNumbers(product[p_id])
        totalCost(product[p_id])
    }
})


function onLoadCartNumbers() {
    // Cada vez que se ejecuta regarga de página recupero el total de items en el carro desde local storage
    let productNumbers = localStorage.getItem("cartNumbers");
    let totalCost = localStorage.getItem("totalCost");

    // Si el contador de productos no estaba en cero, lo muestro en la página web
    if (productNumbers) {
        document.querySelector(".cart span").textContent = productNumbers;
        document.querySelector(".totalContainer span").textContent = totalCost;

    }
}

// Reviso si el producto existe en el local storage
function cartNumbers(product) {

    let productNumbers = localStorage.getItem("cartNumbers");
    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        // modifico el contador de productos del carro y lo muestro en el DOM , html
        document.querySelector(".cart span").textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector(".cart span").textContent = 1;
    }

    // Uso librería ALERTIFY
    alertify.success(product.nombre + ' agregado al carro');


    // ir a agregar el producto al local storage
    setItems(product);
}

// Agrego productos al local storage
function setItems(product) {
    // leo los productos del carro
    let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
    
    if (cartItems != null) {
        
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product,
            };
        }
        // incremento la cantidad del mismo producto comprada
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;  
        cartItems = {
            [product.tag]: product,
        };
    }
    // Almaceno el nuevo contenido en el local storage
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

// Sumo al total de la compra
function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.precio);
        document.querySelector(".totalContainer span").textContent = cartCost + product.precio;
    } else {
        localStorage.setItem("totalCost", product.precio)
        document.querySelector(".totalContainer span").textContent = product.precio;
    }

}


//carrito compras
const btnCart = document.querySelector('.container-icon')
const containerCartProducts = document.querySelector('.container-cart-products')

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart')
    document.querySelectorAll('#lista-compra').forEach((elem) => elem.parentNode.removeChild(elem));
})


// en caso de refrescar la pantalla, recupero el contador de items en el carro
onLoadCartNumbers();
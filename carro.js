function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    let granTotal = parseInt (cartCost);
    if(cartCost != null) {
        document.querySelector("#totalCarro").textContent = granTotal.toLocaleString('es-CL');
    } else {
        document.querySelector("#totalCarro").textContent = "0";
    }

}

function listaCompra (){
    console.log("lista de compras")
    const lc = document.querySelector('#listaCarro')
    let product = [];
    json_data = JSON.parse(localStorage.getItem("productsInCart"));
    //let pls = localStorage.getItem("productsInCart")
    //json_data = JSON.parse(pls)
    if(json_data == null){
        //alertify.confirm("No hay productos en el carro",function(){ alertify.success('Continuar')});
        window.location.assign("index.html");
        return;
    }
    for(var i in json_data)
        product.push([i, json_data [i]]);

    console.log("** ",lc)
    console.log(product)
    console.log(product[0][1].nombre)
    

// if (product){
    product.forEach((prod) => {
    
        const div = document.createElement('div')
        //div.setAttribute('class','list-group-item');
        let totalLinea = parseInt (prod[1].precio) * parseInt(prod[1].inCart);
        let precioLinea = parseInt (prod[1].precio) 
        div.innerHTML= `
            <div class="info-cart-product">

                <span class="cantidad-producto-carrito"> ${prod[1].inCart}  </span>
                <p class="titulo-producto-carrito"> ${prod[1].nombre}  </p>
                <span class="precio-producto-carrito"> $${precioLinea.toLocaleString('es-CL')}  </span>
                <span class="precio-producto-carrito"> $${totalLinea.toLocaleString('es-CL')} </span>
                
            </div>
            `
        console.log(div)
        lc.append(div); 
    })
// }   
    totalCost();
}

function fin () {
    localStorage.clear();
    window.location.assign("index.html");
}

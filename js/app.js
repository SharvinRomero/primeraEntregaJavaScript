/*Función para logeo */
function logForm() {
  let user = document.getElementById("email").value;
  let pass = document.getElementById("password").value;
  if (user == "javier@cohesion.com" && pass == "0123456789") {
    window.location = "home.html";
  }
  else {
    alert("Datos incorrectos \n\n pruebe con: javier@cohesion.com \n\n 0123456789");
    console.log("pruebe con javier@cohesion.com y 0123456789")
  }
}

/*Evaluador de condición para email */
const form = document.querySelector('form');
const email = document.querySelector('#email');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!email.checkValidity()) {
    email.classList.add('is-invalid');
  } else {
    email.classList.remove('is-invalid');
    alert('Correo electrónico validado correctamente.');
  }

});


/*Algoritmo carrito de compras*/

/*Variable constantes globales para el contenedor del carrito*/
const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('d-none');
});

/*Variable constantes globales para los producto dentro del carrito*/
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

/* Lista de todos los contenedores de productos*/
const productsList = document.querySelector('.container-items');

/* Variable de arreglos de Productos */
let allProducts = [];

const valorTotal = document.querySelector('.total-pagar');

const countProducts = document.querySelector('#contador-productos');

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

productsList.addEventListener('click', e => {
	if (e.target.classList.contains('btn-add-cart')) {
		const product = e.target.parentElement;

		const infoProduct = {
			quantity: 1,
			title: product.querySelector('h5').textContent,
			price: product.querySelector('p').textContent,
		};

		const exits = allProducts.some(
			product => product.title === infoProduct.title
		);

		if (exits) {
			const products = allProducts.map(product => {
				if (product.title === infoProduct.title) {
					product.quantity++;
					return product;
				} else {
					return product;
				}
			});
			allProducts = [...products];
		} else {
			allProducts = [...allProducts, infoProduct];
		}

		showHTML();
	}
});

rowProduct.addEventListener('click', e => {
	if (e.target.classList.contains('icon-close')) {
		const product = e.target.parentElement;
		const title = product.querySelector('p').textContent;

		allProducts = allProducts.filter(
			product => product.title !== title
		);

		console.log(allProducts);

		showHTML();
	}
});

/* Funcion para mostrar  HTML */
const showHTML = () => {
	if (!allProducts.length) {
		cartEmpty.classList.remove('d-none');
		rowProduct.classList.add('d-none');
		cartTotal.classList.add('d-none');
	} else {
		cartEmpty.classList.add('d-none');
		rowProduct.classList.remove('d-none');
		cartTotal.classList.remove('d-none');
	}

	/* Restaurar HTML */
	rowProduct.innerHTML = '';

	let total = 0;
	let totalOfProducts = 0;

	allProducts.forEach(product => {
		const containerProduct = document.createElement('div');
		containerProduct.classList.add('cart-product');

		containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="fs-6">${product.quantity}</span>
                <p class="fs-6 my-2">${product.title}</p>
                <span class="fs-6">${product.price}</span>
            </div>
            <i class="bi bi-trash3 icon-close text-danger"></i>
        `;

		rowProduct.append(containerProduct);

		total =
			total + parseInt(product.quantity * product.price.slice(1));
		totalOfProducts = totalOfProducts + product.quantity;
	});

	valorTotal.innerText = `$${total}`;
	countProducts.innerText = totalOfProducts;
};

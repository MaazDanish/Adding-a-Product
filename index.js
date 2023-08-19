let addProductButton = document.querySelector('#add-product-btn');
let priceList = document.querySelector('#priceList');

//  Getting all data and showing it on screen
window.addEventListener('DOMContentLoaded', () => {
	axios.get('https://crudcrud.com/api/2ef5e2ab147243eb8cbbec09f2492d12/listProduct')
		.then((res) => {
			for (var i = 0; i < res.data.length; i++) {
				displayOnScreen(res.data[i]);
			}
		})
		.catch((err) => console.log(err));
})

// saving data in crud crud using object
function saveData(event) {
	event.preventDefault();
	let name = event.target.productName.value;
	let price = event.target.price.value;
	let productStore = {
		name,
		price
	}

	axios.post('https://crudcrud.com/api/2ef5e2ab147243eb8cbbec09f2492d12/listProduct', productStore)
		.then((res) => displayOnScreen(res.data))
		.catch((err) => console.log(err));

	event.target.productName.value = '';
	event.target.price.value = '';

}

//  to display on screen
function displayOnScreen(productStore) {
	if (productStore.name === '' || productStore.price === '') {
		alert('Empty fields are not allowed');
	} else {
		//  Getting the products list element
		let productList = document.querySelector('#product-list');

		//  creating li element for storing data
		let li = document.createElement('li');
		li.textContent = productStore.name + "  -- " + productStore.price;

		// storing total amount of product
		let costPlace = document.getElementById('costPlace');
		let value = Number(costPlace.textContent) + Number(productStore.price);
		costPlace.textContent = value;

		let deleteButton = document.createElement('input');
		deleteButton.type = 'button';
		deleteButton.value = 'Delete';


		let id = productStore._id;
		deleteButton.onclick = () => {
			axios.delete('https://crudcrud.com/api/2ef5e2ab147243eb8cbbec09f2492d12/listProduct/' + id)
				.then(() => {
					value = Number(costPlace.textContent) - Number(productStore.price)
					costPlace.textContent = value;
				})
				.catch((error) => console.log(error));
			productList.removeChild(li);
		};
		li.appendChild(deleteButton);
		productList.appendChild(li);
	}
}
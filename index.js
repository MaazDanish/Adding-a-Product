let addProductButton = document.querySelector('#add-product-btn');
// let priceList = document.querySelector('#priceList');

// saving data in crud crud using object
async function saveData(event) {
	event.preventDefault();
	let name = event.target.productName.value;
	let price = event.target.price.value;
	let productStore = {
		name,
		price
	}
	try {
		let res = await axios.post('https://crudcrud.com/api/a22d16661c9a4e728fd21b3f99ea783d/listProduct', productStore)
		displayOnScreen(res.data);
	} catch (err) {
		console.log(err);
	}

	event.target.productName.value = '';
	event.target.price.value = '';
}

//  Getting all data and showing it on screen
window.addEventListener('DOMContentLoaded', async () => {
	try {
		let res =await axios.get('https://crudcrud.com/api/a22d16661c9a4e728fd21b3f99ea783d/listProduct')
		for (var i = 0; i < res.data.length; i++) {
			displayOnScreen(res.data[i]);
		}
	} catch (err) {
		console.log(err);
	}
})

//  to display on screen
async function displayOnScreen(productStore) {
	if (productStore.name === '' || productStore.price === '') {
		alert('Empty fields are not allowed');
	} else {
		//  Getting the products list element
		let productList = document.querySelector('#product-list');

		//  creating li element for storing data
		let li = document.createElement('li');
		li.className = 'margin-top color-of-text';
		li.textContent = `Product Name - ${productStore.name} || Product Cost - ${productStore.price} `;

		// storing total amount of product
		// let costPlace = document.getElementById('costPlace');
		// let value = Number(costPlace.textContent) + Number(productStore.price);
		// costPlace.textContent = value;

		let deleteButton = document.createElement('input');
		deleteButton.type = 'button';
		deleteButton.value = 'Delete';
		deleteButton.className = 'btn btn-outline-danger float-end';


		let id = productStore._id;
		deleteButton.onclick = async () => {
			try {
				let res = await axios.delete('https://crudcrud.com/api/a22d16661c9a4e728fd21b3f99ea783d/listProduct/' + id)
				// value = Number(costPlace.textContent) - Number(productStore.price);
				// costPlace.textContent = value;
			} catch (err) {
				console.log(err);
			}
			productList.removeChild(li);
		};

		// Appending the elements in parent element
		li.appendChild(deleteButton);
		productList.appendChild(li);
	}
}
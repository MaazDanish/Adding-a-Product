let addProductButton = document.querySelector('#add-product-btn');
// let priceList = document.querySelector('#priceList');

// saving data in crud crud using object
async function saveData(event) {
	event.preventDefault();
	let productName = event.target.productName.value;
	let price = event.target.price.value;
	let productStore = {
		productName,
		price
	}
	try {
		let res = await axios.post('http://localhost:3000/add-product', productStore)
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
		let res =await axios.get('http://localhost:3000/add-product')
		for (var i = 0; i < res.data.length; i++) {
			displayOnScreen(res.data[i]);
		}
	} catch (err) {
		console.log(err);
	}
})

//  to display on screen
async function displayOnScreen(productStore) {
	const {productName,price}  = productStore;
	if (productName === '' || price === '') {
		alert('Empty fields are not allowed');
	} else {
		//  Getting the products list element
		let productList = document.querySelector('#product-list');

		//  creating li element for storing data
		let li = document.createElement('li');
		li.className = 'margin-top color-of-text';
		li.textContent = `Product Name - ${productName} || Product Cost - ${price} `;

		// storing total amount of product
		// let costPlace = document.getElementById('costPlace');
		// let value = Number(costPlace.textContent) + Number(productStore.price);
		// costPlace.textContent = value;

		let deleteButton = document.createElement('input');
		deleteButton.type = 'button';
		deleteButton.value = 'Delete';
		deleteButton.className = 'btn btn-outline-danger float-end';


		let id = productStore.id;
		console.log(productStore);
		deleteButton.onclick = async () => {
			try {
				let res = await axios.post('http://localhost:3000/delete-product/',{id})
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
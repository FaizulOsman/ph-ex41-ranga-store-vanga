const arr = [];

const loadProducts = (url) => {
   fetch(url)
      .then((res) => res.json())
      .then((data) => {
         arr.push(data);
         showProducts(data);
      });
};

loadProducts('https://fakestoreapi.com/products');

// show all product in UI
const showProducts = (products) => {
   // console.log(products.length)
   setInnerText('total_products', products.length);

   document.getElementById("all-products").innerHTML = "";

   const allProducts = products.map((pd) => pd);
   for (const product of allProducts) {
      const image = product.image;
      const div = document.createElement('div');
      div.classList.add('product');
      div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>

      <button onclick="showProductDetails(${product.id})" id="details-btn"    data-bs-toggle="modal"
      data-bs-target="#exampleModal" class="btn btn-outline-secondary mb-2 rounded-1 mt-1">Details</button>
      
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success border-0 w-100 rounded-0 bg-main py-2">Add to cart</button>
      `;
      document.getElementById('all-products').appendChild(div);
   }
};

let count = 0;

const addToCart = (id, price) => {
   count = count + 1;
   updatePrice('price', price);

   updateTaxAndCharge();
   document.getElementById('total-Products').innerText = count;

   updateTotal()
};

const showProductDetails = (product_id) => {
   // console.log(product_id);
   fetch(`https://fakestoreapi.com/products/${product_id}`)
      .then((res) => res.json())
      .then((data) => showProductDetailsInModal(data));
};

const showProductDetailsInModal = (product_details) => {
   setInnerText('exampleModalLabel', product_details.title);
   setInnerText('productId', product_details.id);
   setInnerText('modal_body', product_details.description);
   setInnerText('rating', product_details.rating.rate);
};

const getInputValue = (id) => {
   const element = document.getElementById(id).innerText;
   const converted = parseFloat(element);
   return converted;
};

// main price update function
const updatePrice = (id, value) => {
   const convertedOldPrice = getInputValue(id);
   const convertPrice = parseFloat(value);
   const total = convertedOldPrice + convertPrice;
   document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
   // console.log(Math.round(value))
   if (typeof value === 'number') {
      value = Math.round(value);
   }
   document.getElementById(id).innerText = value;
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
   const priceConverted = getInputValue('price');
   if (priceConverted > 500) {
      setInnerText('delivery-charge', 60);
      setInnerText('total-tax', priceConverted * 0.4);
   } else if (priceConverted > 400) {
      setInnerText('delivery-charge', 50);
      setInnerText('total-tax', priceConverted * 0.3);
   } else if (priceConverted > 200) {
      setInnerText('delivery-charge', 30);
      setInnerText('total-tax', priceConverted * 0.2);
   } else {
      setInnerText('delivery-charge', 20);
   }
};

//grandTotal update function
const updateTotal = () => {
   const grandTotal =
      getInputValue('price') +
      getInputValue('delivery-charge') +
      getInputValue('total-tax');
   document.getElementById('total').innerText = grandTotal.toFixed(2);
};
updateTotal()
// search by category
document.getElementById("search-btn").addEventListener("click", function () {
   const inputField = document.getElementById("input-value").value;
   const searchedProduct = arr[0].filter((p) =>
      p.title.toLowerCase().includes(inputField.toLowerCase())
   );
   showProducts(searchedProduct);
});












// /* Class add system */
// const searchBtn = document.getElementById('search-btn')
// searchBtn.className = 'bbbbbbbbb'
// searchBtn.setAttribute('class', 'zzzzzzzzz')
// searchBtn.classList.add('aaaaaaaaa')




// let str = "";
// console.log(!!str);


// const marks = 60;
// const resubmit = -5;
// console.log(!(marks > 0 || resubmit > 0));



// const person = { name: "hero", id: 101, address: "BD", postalCode: 40321 };
// console.log(Object.keys(person).length)   // 4 = to find length



// const animals = ['cat', 'dog', 'rat'];
// console.log(animals.includes('Cat'));     // false



// const unique = array => console.log(array.indexOf("21"));

// const array = [2, 3, 4, 5, 2]
// unique(unique(array));


const add = (para1, para2) => para2 + para1
console.log(add("2", 3));



// const colors = { mango: 'green', grapes: 'black', organe: 'yellow' };
// console.log(colors[grapes])
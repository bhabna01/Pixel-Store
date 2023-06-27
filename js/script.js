let dataSet;
let cart = [];


let count = 0
let newPrice = 0
let tax = 0







fetch("/data.json")
  .then((res) => res.json())
  .then((data) => {
    dataSet = data;
    displayData(data)
  })
// const phoneDatas = async () => {
//     const res = await fetch('/data.json');
//     const data = await res.json();
//     displayData(data);
// }
// phoneDatas();
function displayData(data) {
  const cardcontainer = document.getElementById("homepage-content")
  data.forEach(element => {
    const { id, img, price, name } = element;
    const divContainer = document.createElement('div');
    divContainer.classList.add("card", "bg-base-100", "shadow-xl")

    divContainer.innerHTML = `
        
        <div class="p-4">
            <figure><img
                    src="${img}"
                    class="rounded-lg" alt="Shoes" /></figure>
        </div>
        <div class="card-body">
            <div id="parent-name-icon-container" class="flex justify-between">
                <h2 class="card-title">${name}</h2>
                <div>
                    <span><span><i class="fa-solid fa-heart"></i></span></span>
                    <span><i class="fa-solid fa-square-minus text-red-600"></i></span>
                </div>
            </div>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <h1>Price:${price}</h1>
            <div class="card-actions justify-between">
            <label
            onclick="handleModal('${id}')"
              for="my-modal-3"
              class="btn btn-outline btn-primary "
            >
              <i class="fa-solid fa-circle-info mr-2"></i> See Details
            </label>
                <button class="btn btn-outline btn-secondary " onclick="handleBuyNow('${id}')"><i
                        class="fa-solid fa-basket-shopping mr-2"></i>Buy
                    Now</button>

            </div>
        </div>
    
        
        
        `
    cardcontainer.appendChild(divContainer)

  });

}
function handleModal(id) {
  const product = dataSet.find((item) => item.id == id);
  console.log(product)
  const modalContainer = document.getElementById("modal-info")
  const { name, price, img } = product
  modalContainer.innerHTML = `
    <div>
  <img
    src="${img}"
    class="w-[100%] h-[200px] mx-auto object-cover"
    alt=""
  />
</div>
<!-- modal infos -->
<div>
  <h1 class="font-semibold text-xl my-2">
    <span class="text-primary">PRODUCT : </span> ${name}
  </h1>
  <p>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis
    dolorem provident hic sed vitae nulla accusamus? Quas cupiditate
    iure nostrum iusto accusantium perspiciatis ad veniam quae
    quisquam perferendis
  </p>
  <div class="my-2">
    <h1 class="font-semibold text-xl text-primary">FEATURES :</h1>
    <p>feature01,feature02, feature03, feature04</p>
  </div>
  <p class="font-semibold text-xl">
    <span class="text-primary">PRICE : </span> $<span>${price}</span>
  </p>
</div>
    
    `

}

function handleBuyNow(id) {
  count = count + 1; //1 //2
  const product = dataSet.find((item) => item.id === id);
  const { id: productId, name, price, img } = product;
  cart.push(product);
  newPrice = newPrice + price;
  tax = newPrice * 0.1;
  const localData = getLocalStorage('cart')
  setLocalStorage('cart', [...localData, product])


  const cartContainer = document.getElementById("cart-items-container");
  const div = document.createElement("div");
  div.classList.add(
    "flex",
    "justify-between",
    "items-center",
    "p-2",
    "rounded-md",
    "mb-4",
    "cart-item-style"
  );
  div.innerHTML = `
  <img
    src="${img}"
    class="w-[15%]"
    alt=""
  />
  <div class="flex items-center justify-between w-[80%]">
    <h1 class="font-semibold">${name}</h1>
    <input
      type="text"
      class="border-2 border-green-800 w-10 text-center rounded-md"
      value="1"
      readonly
    />
    <span onclick="handleRemove('${productId}')"
      ><i
        class="fa-sharp fa-solid fa-trash text-red-700 cursor-pointer text-xl"
      ></i
    ></span>
</div>
  
  `;
  cartContainer.appendChild(div);
  document.getElementById("badge-count").innerText = "";
  document.getElementById("badge-count").innerText = count;

  document.getElementById("product-count").innerText = "";
  document.getElementById("product-count").innerText = count;

  document.getElementById("price").innerText = "";
  document.getElementById("price").innerText = newPrice.toFixed(2);

  document.getElementById("tax-count").innerText = "";
  document.getElementById("tax-count").innerText = tax.toFixed(2);

  document.getElementById("total-price").innerText = "";
  document.getElementById("total-price").innerText = (newPrice + tax).toFixed(
    2
  );

}
function handleClear() {
  document.getElementById("cart-item-container").innerHTML = ""
  document.getElementById("badge-count").innerText = 0
}
function handleRemove(id) {
  const cartContainer = document.getElementById("cart-items-container");
  cartContainer.innerHTML = "";
  count = count - 1;
  const product = cart.filter((item) => item.id !== id);
  cart = product;
  setLocalStorage('cart', product)


  product.forEach((data) => {
    const { id, name, price, img } = data;
    newPrice = newPrice - price;
    tax = newPrice * 0.1;

    const div = document.createElement("div");
    div.classList.add(
      "flex",
      "justify-between",
      "items-center",
      "p-2",
      "rounded-md",
      "mb-4",
      "cart-item-style"
    );
    div.innerHTML = `
  <img
    src="${img}"
    class="w-[15%]"
    alt=""
  />
  <div class="flex items-center justify-between w-[80%]">
    <h1 class="font-semibold">${name}</h1>
    <input
      type="text"
      class="border-2 border-green-800 w-10 text-center rounded-md"
      value="1"
      readonly
    />
    <span onclick="handleRemove('${id}')"
      ><i
        class="fa-sharp fa-solid fa-trash text-red-700 cursor-pointer text-xl"
      ></i
    ></span>
</div>
  
  `;
    cartContainer.appendChild(div);
  });

  document.getElementById("badge-count").innerText = "";
  document.getElementById("badge-count").innerText = count;

  document.getElementById("product-count").innerText = "";
  document.getElementById("product-count").innerText = count;

  document.getElementById("price").innerText = "";
  document.getElementById("price").innerText = newPrice.toFixed(2);

  document.getElementById("tax-count").innerText = "";
  document.getElementById("tax-count").innerText = tax.toFixed(2);

  document.getElementById("total-price").innerText = "";
  document.getElementById("total-price").innerText = (newPrice + tax).toFixed(
    2
  );
}
function displayPrevCart() {
  const localData = getLocalStorage('cart')
  const cartContainer = document.getElementById("cart-items-container");
  cartContainer.innerHTML = ""
  count = localData.length || 0
  cart = localData


  localData.forEach((data) => {
    const { id, name, price, img } = data;
    newPrice = newPrice + price;
    tax = newPrice * 0.1;

    const div = document.createElement("div");
    div.classList.add(
      "flex",
      "justify-between",
      "items-center",
      "p-2",
      "rounded-md",
      "mb-4",
      "cart-item-style"
    );
    div.innerHTML = `
<img
  src="${img}"
  class="w-[15%]"
  alt=""
/>
<div class="flex items-center justify-between w-[80%]">
  <h1 class="font-semibold">${name}</h1>
  <input
    type="text"
    class="border-2 border-green-800 w-10 text-center rounded-md"
    value="1"
    readonly
  />
  <span onclick="handleRemove('${id}')"
    ><i
      class="fa-sharp fa-solid fa-trash text-red-700 cursor-pointer text-xl"
    ></i
  ></span>
</div>

`;
    cartContainer.appendChild(div);
  });
  document.getElementById("badge-count").innerText = "";
  document.getElementById("badge-count").innerText = count;

  document.getElementById("product-count").innerText = "";
  document.getElementById("product-count").innerText = count;

  document.getElementById("price").innerText = "";
  document.getElementById("price").innerText = newPrice.toFixed(2);

  document.getElementById("tax-count").innerText = "";
  document.getElementById("tax-count").innerText = tax.toFixed(2);

  document.getElementById("total-price").innerText = "";
  document.getElementById("total-price").innerText = (newPrice + tax).toFixed(
    2
  );

}
displayPrevCart();
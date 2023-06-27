let cart = [];
let count = 0
let newPrice = 0
let tax = 0

const localData = getLocalStorage('cart');
const localOrder = getLocalStorage('order')
function displayData(data) {
    const cardcontainer = document.getElementById("homepage-content")
    const orderMessage = document.getElementById("order-message")
    if (localOrder.length > 0) {
        orderMessage.innerHTML = `<p class="text-xl text-center mb-6">Thanks for your order!</p>`
    } else {
        orderMessage.innerHTML = `<p class="text-xl text-center mb-6">No order Found!</p>`
    }

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
                  
  
              </div>
          </div>
      
          
          
          `
        cardcontainer.appendChild(divContainer)

    });

}
displayData(localOrder)
function displayPrevCart() {

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

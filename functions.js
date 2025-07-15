export function createCard(cardData){
    const htmlStamp = `
    <div class="card-content" data-product='${JSON.stringify(cardData)}'>
        <figure class="card">
                <img src="${cardData.imageURL}" alt="product">
            <figcaption>
                <a href="">${cardData.brand}</a>
                <div class="flex-between">
                <p>${cardData.price}$</p>
                <svg xmlns="http://www.w3.org/2000/svg" 
                width="35" height="35" viewBox="0 0 64 64" fill="none">
               <rect width="64" height="64" rx="8" fill="#F4F4F4"/>
               <path d="M16 16H20L24 40H44L48 24H24" stroke="#010a59" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
               <circle cx="28" cy="48" r="3" fill="#010a59"/>
               <circle cx="42" cy="48" r="3" fill="#010a59"/>
                </svg>
                </div>
            </figcaption>
        </figure>
     </div> 
    `
    const element = document.querySelector(".products").insertAdjacentHTML("beforeend", htmlStamp);
    return element
}

export function createProductWindow(cardData, cardsData){
    const container =  document.querySelector('.productWindowContainer');
    if(!container) return;
    
       container.innerHTML = `
  <section class="productWindow max-width-containers">
          <div class="two-sides-PW">
            <div class="left-side-picture">
              <img src="${cardData.imageURL}" alt="picture">
            </div>

            <div class="rigth-side-info">
              <h2>${cardData.brand}</h2>
              <h4>is in existence</h4>
              <div class="price-between">
                <h3>${cardData.price}$</h3>

              <button id="buyProductBtn">
                <svg width="160" height="40" xmlns="http://www.w3.org/2000/svg">
    <!-- Зелёный фон кнопки -->
    <rect width="120" height="40" rx="6" ry="6" fill="#8a8dbc"/>
  
    <!-- Корзина (взята из твоего SVG, адаптирована под кнопку) -->
    <g transform="scale(0.6) translate(8, 3)">
      <rect width="64" height="64" rx="8" fill="none"/>
      <path d="M16 16H20L24 40H44L48 24H24" stroke="#010a59" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="28" cy="48" r="3" fill="#010a59"/>
      <circle cx="42" cy="48" r="3" fill="#010a59"/>
    </g>
  
    <!-- Текст "Buy now" -->
    <text x="45" y="25" font-family="Arial, sans-serif" font-size="14" fill="#010a59" font-weight="bold">Buy now</text>
  </svg>
              </button> 
              </div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam eligendi rerum facilis deserunt facere excepturi, consequuntur pariatur doloribus ad reiciendis blanditiis sequi maxime quaerat distinctio eum optio natus deleniti officia. Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis rerum ducimus quae blanditiis dolorum, error eius accusamus amet expedita. Perspiciatis eos deserunt expedita possimus sit ipsum, asperiores exercitationem provident nisi.</p>
            </div>
          </div>

            <div class="similarProducts">
             <h1>Similar products:</h1>
             <div class ="similarProductsContent flex-between"></div>
            </div>

        </section>
    `;
similarProductsCards(cardData, cardsData);

}
export function similarProductsCards(cardData, cardsData){
 const container = document.querySelector('.similarProductsContent');
    if (!container) return;

    container.innerHTML = '';

console.log('cardData:', cardData);
console.log('cardsData:', cardsData);
    const similars = cardsData.filter(el => 
        el.category === cardData.category && 
        el.company === cardData.company)
console.log('similars:', similars);

    if(similars.length === 0){
        container.innerHTML = "<p>No similar products</p>";
        return;
    }

 similars.forEach(similarCard => {
        const html = `
            <div class="card-content" data-product='${JSON.stringify(similarCard)}'>
                <figure class="card">
                    <a href="#">
                        <img src="${similarCard.imageURL}" alt="product">
                    </a>
                    <figcaption>
                        <a href="#">${similarCard.brand}</a>
                        <div class="flex-between">
                            <p>${similarCard.price}$</p>
                        </div>
                    </figcaption>
                </figure>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', html);
    });
}

export function filterProducts(data, selected = []) {
  if (selected.length === 0) return data;

    const selectedCategories = ["phone", "tablet", "laptop"];
    const selectedCompanies = ["apple", "samsung", "xiaomi"];

    const activeCategories = selected.filter(val => selectedCategories.includes(val));
    const activeCompanies = selected.filter(val => selectedCompanies.includes(val));

    return data.filter(el => {
        const matchCategory = activeCategories.length === 0 || activeCategories.includes(el.category);
        const matchCompany = activeCompanies.length === 0 || activeCompanies.includes(el.company);
        return matchCategory && matchCompany;
    });
}

export function renderProducts(value, selectedProduct, cardsData){
if (selectedProduct.includes(value)) {
        selectedProduct = selectedProduct.filter(item => item !== value);
    } else {
    selectedProduct.push(value);
    }

    const productsSection = document.querySelector('.products');
    const saleSlideShow = document.querySelector('.sale-slide-show');

    productsSection.innerHTML = "";
    saleSlideShow.innerHTML = "";    

    const filtered = filterProducts(cardsData, selectedProduct);
    for (const cardData of filtered) {
        createCard(cardData);
    }
}

export function renderFiltered(selectedProduct, cardsData) {
    const productsSection = document.querySelector('.products');
    const saleSlideShow = document.querySelector('.sale-slide-show');

    productsSection.innerHTML = "";
    saleSlideShow.innerHTML = "";

    const filtered = filterProducts(cardsData, selectedProduct);
    for (const cardData of filtered) {
        createCard(cardData);
    }

    console.log("selectedProduct:", selectedProduct);
}

export function renderProductWindow(cardData, cardsData){
    const productsSection = document.querySelector('.products');
    const saleSlideShow = document.querySelector('.sale-slide-show');
    const productWindowContainer = document.querySelector('.productWindowContainer');
    const propositions = document.querySelector('#propositions');

    productsSection.style.display = "none";
    propositions.style.display = "none";
    if (saleSlideShow) saleSlideShow.innerHTML = "";
    if (productWindowContainer) {
        productWindowContainer.innerHTML = "";
        createProductWindow(cardData, cardsData);

    }
}

import { createCard, createProductWindow, similarProductsCards, filterProducts, renderProducts, renderFiltered, renderProductWindow } from "./functions.js";

let cardsData = [];
let selectedProduct = [];

fetch('./arrProducts.json')
    .then(response => response.json())
    .then(data => {
        cardsData = data;

        const categories = {
            phone: ["iPhone", "samsung", "xiaomi"],
            tablet: ["iPad", "galexyTad", "xiaomiPad"],
            laptop: ["macbook", "samsungbook", "xiaomibook"],
        };
        const companys = {
            apple: ["iPhone", "iPad", "macbook"],
            samsung: ["samsung", "galexyTad", "samsungbook"],
            xiaomi: ["xiaomi", "xiaomiPad", "xiaomibook"],
        };
        for (let product of cardsData) {
            for (let categoryName of Object.keys(categories)) {
                if (categories[categoryName].includes(product.brand)) {
                    product.category = categoryName;
                }
            }
            if (!("category" in product)) product.category = "unset";
        }
        for (let product of cardsData) {
            for (let companyName of Object.keys(companys)) {
                if (companys[companyName].includes(product.brand)) {
                    product.company = companyName;
                }
            }
            if (!("company" in product)) product.company = "unset";
        }

        cardsData.forEach(cardData => createCard(cardData));


        document.addEventListener('click', event => {
            const modalContainer = document.querySelector('.modal-container');
            const backdrop = document.querySelector('#backdrop');

            if(event.target.id === "pagePhones"){
                renderProducts("phone", selectedProduct, cardsData);
            } else if(event.target.id === "pageTablets"){
                renderProducts("tablet", selectedProduct, cardsData);
            } else if(event.target.id === "pageLaptops"){
                renderProducts("laptop", selectedProduct, cardsData);
            }

            if(event.target.classList.contains("login")){
                modalContainer.style.display = "block";
                backdrop.style.display ="block";
                document.body.style.overflow = 'hidden';

            } else if(event.target.id === "exitBtn"){
                modalContainer.style.display = "none";
                backdrop.style.display ="none";
                document.body.style.overflow = 'scroll';

            } else if(event.target.id === "backdrop"){
                modalContainer.style.display = "none";
                backdrop.style.display ="none";
                document.body.style.overflow = 'scroll';
            }

            const cardEl = event.target.closest(".card-content");
            if (cardEl && cardEl.dataset.product) {

            if (event.target.tagName === 'A') {
            event.preventDefault();
                }
                const productData = JSON.parse(cardEl.dataset.product);
                renderProductWindow(productData, cardsData);
            }
        });


        document.addEventListener("change", () => {
            selectedProduct = [];

            const leftSideApple = document.querySelector('#apple');
            const leftSideSamsung = document.querySelector('#samsung');
            const leftSideXiaomi = document.querySelector('#xiaomi');
            const leftSidePhones = document.querySelector('#phonesLeftMenu');
            const leftSideTablets = document.querySelector('#tabletsLeftMenu');
            const leftSideLaptops = document.querySelector('#laptopsLeftMenu');
            const burgerApple = document.querySelector('#apple-burger');
            const burgerSamsung = document.querySelector('#samsung-burger');
            const burgerXiaomi = document.querySelector('#xiaomi-burger');
            const burgerPhones = document.querySelector('#phonesLeftMenu-burger');
            const burgerTablets = document.querySelector('#tabletsLeftMenu-burger');
            const burgerLaptops = document.querySelector('#laptopsLeftMenu-burger');

            if (leftSideApple && leftSideApple.checked) selectedProduct.push("apple");
            if (leftSideSamsung && leftSideSamsung.checked) selectedProduct.push("samsung");
            if (leftSideXiaomi && leftSideXiaomi.checked) selectedProduct.push("xiaomi");
            if (leftSidePhones && leftSidePhones.checked) selectedProduct.push("phone");
            if (leftSideTablets && leftSideTablets.checked) selectedProduct.push("tablet");
            if (leftSideLaptops && leftSideLaptops.checked) selectedProduct.push("laptop");
            if (burgerApple && burgerApple.checked) selectedProduct.push("apple");
            if (burgerSamsung && burgerSamsung.checked) selectedProduct.push("samsung");
            if (burgerXiaomi && burgerXiaomi.checked) selectedProduct.push("xiaomi");
            if (burgerPhones && burgerPhones.checked) selectedProduct.push("phone");
            if (burgerTablets && burgerTablets.checked) selectedProduct.push("tablet");
            if (burgerLaptops && burgerLaptops.checked) selectedProduct.push("laptop");

            renderFiltered(selectedProduct, cardsData);
        });


        const swiper = new Swiper(".mySwiper", {
            slidesPerView: 3,
            spaceBetween: 30,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            autoplay: {
                delay: 2000,
            }
        });
    })
    .catch(error => {
        console.error(error);
        document.body.innerHTML += `<p style="color:red;">Error loading data</p>`;
    });
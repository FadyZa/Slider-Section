let categoriesApi = "https://fakestoreapi.com/products/categories";
let productsApi = "https://fakestoreapi.com/products";

async function getData(callBack){
    let catData = await fetch(categoriesApi);
    let prodData = await fetch(productsApi);
    let JsonCat = await catData.json();
    let JsonProd = await prodData.json()
    callBack(JsonCat,JsonProd);
}

let cardsCont = document.querySelector("section .container");
let nav = document.querySelector("nav");
let nex = document.querySelector(".scroll .nex")
let prev = document.querySelector(".scroll .prev")

getData(handlePage);

function handlePage(categories,products){

    // display categories in nav
    for(val in categories){
        let btn = document.createElement("button")
        btn.innerHTML = `${categories[val]}`;
        nav.append(btn);
    }

    // display products
    for(val in products){
        let card = document.createElement("div");
        card.classList.add("card","hide");
        card.innerHTML = `
    <figure>
        <div class="image">
            <img src="${products[val].image}">
        </div>
        <figcaption>
            <h2>${products[val].title}</h2>
            <h3>$${products[val].price}</h3>
            <p>${products[val].description}</p>
            <button>view details <span>&#8594;</span></button>
            <div>&#x2b;</div>
            <div class="category hide">${products[val].category}</div>
        </figcaption>
        </figure>`
        cardsCont.append(card);
    }
    
    // filter by category
    let AllCards = document.querySelectorAll(".card")
    let navBtns = document.querySelectorAll("nav button");
    let category = document.querySelectorAll(".category");
    function filter(val = "all"){
        let numOfCards = 0;
        AllCards.forEach((ele,i)=>{
            if(val.toLowerCase() === "all"){
                console.log("a")
                ele.classList.remove("hide")
                numOfCards++;
            }
            else{
                if(category[i].innerHTML == val.toLowerCase()){
                    ele.classList.remove("hide")
                    numOfCards++;
                }
                else{
                    ele.classList.add("hide")
                }
            }
        })
        handleGrid(numOfCards) // pass num of cards dynamically .114
    }
    filter("all") // make the default parameter = All

    // pass the clicked category to filter() and add class clicked 
    navBtns.forEach((ele)=>{
        ele.addEventListener("click",()=>{
            filter(ele.innerText);
            let current = document.getElementsByClassName("clicked");
            current[0].className = current[0].className.replace("clicked","");
            ele.classList.add("clicked");
        })
    });

    let mycard = document.querySelector("section .card");
    let moreBtns = document.querySelectorAll("figcaption button");
    move(mycard) 
    SeeMore(AllCards,moreBtns)
}

// function to handle the grid system and media query
function handleGrid(num){
    if(window.matchMedia("(max-width: 700px)").matches){
        cardsCont.style.gridTemplateColumns = `repeat(${num}, 99%)`
    }
    else if(window.matchMedia("(max-width: 991px)").matches){
        cardsCont.style.gridTemplateColumns = `repeat(${num}, 49%)`
    }
    else{
        cardsCont.style.gridTemplateColumns = `repeat(${num}, 23%)`
    }
}

// move forward and back
function move(card){
    nex.addEventListener("click",()=>{
        console.log(card.clientWidth)
        cardsCont.scrollLeft += card.clientWidth + 30;

    })
    prev.addEventListener("click",()=>{
        cardsCont.scrollLeft -= card.clientWidth + 30;
    });
}


// see more feature
function SeeMore(cards,btns){
    btns.forEach((ele,i)=>{
        ele.addEventListener("click",()=>{
            cards[i].classList.toggle("active");
            if(cards[i].classList.contains('active')){
                ele.innerHTML ="show less -";
            }
            else{
                ele.innerHTML = "view details <span>&#8594;</span>"
                }
        })
    })
}


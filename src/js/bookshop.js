//import * as accounting from "accounting";
import {addElement} from "./loadFunction.js";
const Url = "https://www.googleapis.com/books/v1/volumes";
const mainBanner=document.querySelector("#main-banner"); 
const round1=document.querySelector("#point1"); 
const round2=document.querySelector("#point2"); 
const round3=document.querySelector("#point3"); 
const mainCategoriya=document.querySelector('#main-categoriya');
let mainbook=document.querySelector('#main-books');
const shopBag=document.querySelector('#shopBag');
const LoadMore_buttom=document.querySelector("#button_load");
const shopBagQuantity=document.querySelector("#shopBagQuantity");
const shopBagEll=document.querySelector('#shopBagEll');
const header_Icon_shop=document.querySelector('#header_Icon_shop');
var ArrowCategoriya=["Architecture", "Art & Fashion", "Biography", "Business", "Crafts & Hobbies","Drama","Fiction","Food & Drink","Health & Wellbeing","History & Politics","Humor","Poetry","Psychology","Science","Technology","Travel & Maps"];
let bookCart = [];
const Key="AIzaSyA3EvHpDAHKUEmqhj-5YkjCY5uo8RHXcOQ";
const BookLimit = 6;
const Lang = "en";
let BookOnScreen=0;
let numberPage;
let currentCategoriya;
let listCategoriya;
let number_el;

let bookInCart;
bookCart=JSON.parse(localStorage.getItem("bookCartLS") ?? '[]');

document.addEventListener('DOMContentLoaded', () => {
    localStorage.getItem("numberPage");
    if(isNaN(numberPage) || numberPage==0 || numberPage == undefined) numberPage=1;
    changePage(numberPage);  
    listCategoriya='<ul class="listCategoriya">';
    number_el=0;
    ArrowCategoriya.forEach(element => {
      if (number_el==0){
        listCategoriya=listCategoriya+'<li id="id_cat'+number_el+'" class="currentCategoriya">'+element+'</li>';
	      currentCategoriya="id_cat"+number_el;
        number_el++;
      }else {
        listCategoriya=listCategoriya+'<li id="id_cat'+number_el+'" class="listCategoriya_li">'+element+'</li>';
        number_el++;
      }
          });
    listCategoriya=listCategoriya+'</ul>';      
    mainCategoriya.innerHTML=listCategoriya;  
    mainCategoriya.addEventListener('click',(event) => {
      //  change class
	    let old_categoriya=document.querySelector('#'+currentCategoriya);		
      let current_li=event.target.id;
  	  let new_categoriya=document.querySelector('#'+current_li);		
	    old_categoriya.classList.remove("currentCategoriya");
	    old_categoriya.classList.add("listCategoriya_li");
  	  new_categoriya.classList.add("currentCategoriya");
	    new_categoriya.classList.remove("listCategoriya_li");
	    currentCategoriya=current_li;
      // end change class
      // load new categoriya
      read_book(event.target.innerHTML,1,true);
      BookOnScreen=BookLimit;
    });
    bookCart=JSON.parse(localStorage.getItem("bookCartLS") ?? '[]');
    read_book("Architecture",1,true);
    BookOnScreen=BookLimit; 
   // localStorage.getItem("bookCart",bookCart);
    if (bookCart.length!=0) {
      if (!header_Icon_shop.hasChildNodes()) {
        header_Icon_shop.appendChild(shopBagEll);
        shopBagQuantity.innerHTML=bookCart.length;
        header_Icon_shop.appendChild(shopBagQuantity);
      }
      else{
        shopBagQuantity.innerHTML=bookCart.length;
      }
    } 
    else{
      header_Icon_shop.removeChild(shopBagEll);
      header_Icon_shop.removeChild(shopBagQuantity);
    } 
});  



 setInterval(() => {
    localStorage.getItem("numberPage");
    if(isNaN(numberPage) || numberPage==0 || numberPage == undefined) numberPage=1;
    numberPage++;
    if (numberPage>3) {numberPage=1};
    changePage(numberPage);  
    localStorage.setItem("numberPage",numberPage);

}, 5000);
 

function changePage(numberPage) {
    mainBanner.innerHTML=`<img class="main-banner" src="./images/banner${numberPage}.jpg" alt="">`;
    //${numberPage}
    switch (numberPage) {
        case 1: 
            round1.innerHTML=`<img src="./images/pointFull.svg" alt="">`;
            round2.innerHTML=`<img src="./images/pointEmpty.svg" alt="">`;
            round3.innerHTML=`<img src="./images/pointEmpty.svg" alt="">`;
            break;
        case 2:
            round1.innerHTML=`<img src="./images/pointEmpty.svg" alt="">`;
            round2.innerHTML=`<img src="./images/pointFull.svg" alt="">`;
            round3.innerHTML=`<img src="./images/pointEmpty.svg" alt="">`;
            break;
        case 3:
            round1.innerHTML=`<img src="./images/pointEmpty.svg" alt="">`;
            round2.innerHTML=`<img src="./images/pointEmpty.svg" alt="">`;
            round3.innerHTML=`<img src="./images/pointFull.svg" alt="">`;
            break;        
    }
    localStorage.setItem("numberPage",numberPage);

};


round1.addEventListener(`click`, () => {changePage(1)});
round2.addEventListener(`click`, () => {changePage(2)});
round3.addEventListener(`click`, () => {changePage(3)});


function read_book(subject,currentStartIndex,clear_f){
  if (clear_f){
      mainbook.innerHTML="";
  }    
  fetch(`${Url}?q=\"subject:${subject}\"&key=${Key}&printType=books&startIndex=${currentStartIndex}&maxResults=${BookLimit}&langRestrict=${Lang}`)
      .then((response) => {
      // Объект ответа на запрос
    
      // Превращаем объект в JSON. Мы не можем его сразу прочитать,
      // надо отдать в следующий then
      const result = response.json();
      return result;
    })
    .then((data) => {
      // Объект результата в формате JSON
      let arrowBooks=data.items;
      arrowBooks.forEach((items) => {
        addElement(mainbook,items,bookCart);
      });
      let footer=document.createElement("div");
      footer.dataset.id="footer";
      footer.classList.add("footer-class");
      let loadMore_buttom_=document.createElement("button");
      loadMore_buttom_.innerText="Load more";
      loadMore_buttom_.classList.add("button_load");
      loadMore_buttom_.addEventListener(`click`,(Event) => {
        let footerBlok=Event.currentTarget.offsetParent;		
        let BlokBook=Event.currentTarget.offsetParent.offsetParent;		
        BlokBook.removeChild(footerBlok);
        let categoriya=document.querySelector('#'+currentCategoriya);		
        read_book(categoriya.innerText,BookOnScreen+1,false);
        BookOnScreen=BookOnScreen+BookLimit;
      });
      footer.appendChild(loadMore_buttom_);
      mainbook.appendChild(footer);
      console.log(arrowBooks.lenght)
    })
    .catch(() => { console.log('error') });
  
}


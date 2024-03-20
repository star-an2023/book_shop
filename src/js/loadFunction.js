const header_Icon_shop=document.querySelector('#header_Icon_shop');

//
function testCard (idBook,elementButton,bookCart){
  if (bookCart.includes(idBook)) {
    let number=bookCart.indexOf(idBook);
    bookCart.splice(number,1);
    elementButton.innerText="BUY NOW";
    elementButton.classList.add("button_buy");
    elementButton.classList.remove("button_buyCart");
  }
  else{
    bookCart.push(idBook);
    elementButton.innerText="IN THE CART";
    elementButton.classList.remove("button_buy");
    elementButton.classList.add("button_buyCart");
  }

}


//

export function addElement(parent,book,bookCart) {
  let newDiv = document.createElement("div");
  let newDivImg=document.createElement("div");
  let newDivDiscr=document.createElement("div");

  let newImg=document.createElement("img");
  newImg.setAttribute("src",book.volumeInfo.imageLinks.smallThumbnail);
  newImg.setAttribute("alt","./images/blank.jpg");
  let tagP=document.createElement("p");
  /* авторы */
  let auhtor=document.createElement("div");
  book.volumeInfo.authors.forEach((item) => {
      let authorItem=document.createTextNode(item );
      auhtor.appendChild(authorItem);
  })
  /* название */ 
  let bookDiv = document.createElement("div");
  let bookName=document.createTextNode(book.volumeInfo.title);
  bookDiv.appendChild(bookName);
  /* рейтинг 
  let rating=document */   
  newDiv.classList.add("listBook");
  /* описание */ 
  let discribDiv=document.createElement("div");
  let discrib=document.createTextNode(book.volumeInfo.description);
  discribDiv.appendChild(discrib);
  // add the text node to the newly created div
  newImg.classList.add("list_books_img");
  newDivImg.appendChild(newImg);
  newDiv.appendChild(newDivImg);

  //p.appendChild(auhtor);
  auhtor.classList.add("book-author");
  bookDiv.classList.add("book-title");
  discribDiv.classList.add("book-discrib");
  newDivDiscr.appendChild(auhtor);
 let bookRating = document.createElement("div"); //`<div class="raiting">`; 
 //document.createElement("div");
  bookRating.classList.add("raiting");
 // bookRating.innerHTML("<br>");
 let rating=0;
 let starRating="";//document.createElement("img");
 let priceDiv=document.createElement("div");
 priceDiv.innerHTML="";
 try {
    let price=book.saleInfo.retailPrice.amount;
    priceDiv.innerHTML=book.saleInfo.retailPrice.currencyCode+" "+price;
  }
  catch (error){
    let price="";
     }
priceDiv.classList.add("bookPrice");    
try {
      rating=book.volumeInfo.averagerating;
      if (rating==undefined){rating=0};
      if (rating!=0){
 //       starRating.scr="./images/Star.svg";
 //       starRating.alt="";
        starRating="./images/Star.svg";
}
      else {
        starRating='./images/Star_grey.svg';
        rating=5;
      } 
      for (let i=1; i<=rating; i++){
          bookRating.innerHTML=bookRating.innerHTML+`<img src="`+starRating+`" alt="">`;
      }        
     for (let i=rating+1; i<=5; i++){
          bookRating.innerHTML=bookRating.innerHTML+`<img src="./images/Star_grey.svg" alt="">`;
      }     
  } catch (error){
    starRating='./images/Star_grey.svg';
    rating=5;
    for (let i=1; i<=rating; i++){
      bookRating.innerHTML=bookRating.innerHTML+`<img src="./images/Star_grey.svg" alt="">`;
    } 
  };
//reviews
try {
  let review=book.volumeInfo.ratingsCount;
  if (review==undefined){review=0};
    if (review!=0){
      bookRating.innerHTML=bookRating.innerHTML+`<div class="review">`+review+` review </div>`;
    }
} catch (error){};

//
  newDivDiscr.appendChild(bookDiv);
  newDivDiscr.appendChild(bookRating);
  newDivDiscr.appendChild(discribDiv);
  newDivDiscr.appendChild(priceDiv);
 /* newDivDiscr.appendChild(auhtor);*/
  newDiv.appendChild(newDivDiscr);
  newDivDiscr.classList.add("list_books_dis");
  //добавляю кнопку
  let Button_buy = document.createElement("button");
 // Button_buy.textContent="BUY NOW";
  Button_buy.dataset.id=book.id;
  if (!bookCart.includes(book.id)) {
    Button_buy.innerText="BUY NOW";
    Button_buy.classList.add("button_buy");
    Button_buy.classList.remove("button_buyCart");
  }
  else{
    Button_buy.innerText="IN THE CART";
    Button_buy.classList.remove("button_buy");
    Button_buy.classList.add("button_buyCart");
  }
  // отправка книги в корзину
  Button_buy.addEventListener('click', (Event) => {
      testCard(Event.target.dataset.id,Event.target,bookCart);
      localStorage.setItem("bookCartLS",JSON.stringify(bookCart));
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
  newDivDiscr.appendChild(Button_buy);
  parent.append(newDiv);
}

fetch("db/product-list.json", {
  method: "GET",
  body: JSON.stringify(),
  headers: {
    "Content-type": "application/json ; charset=UTF-8",
  },
})
  .then((response) => response.json())
  .then((responseJson) => {
    

    var all= responseJson.responses[0][0].params.userCategories;
    var x = Object.entries(all);
    var categoryDocument = document.getElementById('userCategories');
    var categories = '';
    var categoryArray = [];
    x.forEach((element) =>{
        categoryArray.push(element[1]);
        var value = element[1];
        var name = element[1].split('>');
        var innerText = name.length <2 ? name[0] : name[1];
        innerText = innerText[0] == ' ' ? innerText.substring(1) :innerText;
        var category = document.createElement('li');
        console.log(value);
        category.id =String(value);
        category.innerText = innerText;
        category.addEventListener("click", openDiv);
        categoryDocument.appendChild(category);
       });
    

    var allProducts = responseJson.responses[0][0].params.recommendedProducts;

    categoryArray.forEach((element) =>{
        var mainDiv = document.createElement('div');
        
        allProducts[element].forEach((product)=>{
            var productDiv = document.createElement('div');
            productDiv.className = 'item';
            var productImg = document.createElement('img');
            productImg.src = product.image;
            productImg.alt = product.name;
            productImg.loading = 'lazy';
            var productName = document.createElement('p');
            productName.innerText = product.name;
            var itemPriceDiv = document.createElement('div');
            itemPriceDiv.className = 'item__price';
            var itemPrice = document.createElement('h2');
            itemPrice.innerText = product.price + ' ' + product.currency;
            itemPriceDiv.appendChild(itemPrice);
            var itemStatusDiv = document.createElement('div');
            itemStatusDiv.className = 'item__status';
            var shippingImage = document.createElement('img');
            shippingImage.src = 'images/local_shipping_black_18dp.svg';
            shippingImage.className = 'item__status__image';
            shippingImage.alt = 'shipping';
            var cargoText = document.createElement('span');
            cargoText.innerText = 'Ucretsiz Kargo';
            itemStatusDiv.appendChild(shippingImage);
            itemStatusDiv.appendChild(cargoText);
            var button = document.createElement('button');
            button.type = 'button';
            button.className = 'item__button';
            button.onclick = function(){
              openPopup()
            };
            button.innerText = 'Sepete Ekle';
            productDiv.appendChild(productImg);
            productDiv.appendChild(productName);
            productDiv.appendChild(itemPriceDiv);
            productDiv.appendChild(itemStatusDiv);
            productDiv.appendChild(button);
            mainDiv.appendChild(productDiv);
        });
        
        mainDiv.className = 'owl-carousel allDivs '+element;
        mainDiv.style.display = 'none';
        document.getElementById('sliderView').appendChild(mainDiv);
        
    });
    var owl = $('.owl-carousel');
    owl.owlCarousel({
        loop:true,
        margin:10,
        navText:["<img src='images/arrow_back_ios_black_24dp.svg' alt='previous' />","<img src='images/arrow_forward_ios_black_18dp.svg' alt='next' />"],
        responsiveClass:true,
        dots:false,
        responsive:{
            0:{
                items:2,
                nav:false,
    
            },
            576:{
                items:3,
                nav:false
            },
            768:{
               items:2,
               nav:true
            },
    
            1000:{
                items:4,
                nav:true,
                loop:false
            }
        }
    
    });
    owl.on('mousewheel', '.owl-stage', function (e) {
        if (e.deltaY>0) {
            owl.trigger('next.owl');
        } else {
            owl.trigger('prev.owl');
        }
        e.preventDefault();
    });


  }).then((response)=>{
    document.getElementsByClassName('allDivs')[0].style.display = 'block';
  })

  .catch((err) => {
    console.error("Hata var");
    console.error(err);
  });
  function openDiv(){
      var allDivs = document.getElementsByClassName('allDivs');
      for (var i = 0; i < allDivs.length; i++) {
        allDivs.item(i).style.display = 'none';
     }
    document.getElementsByClassName(this.id)[0].style.display = 'block';

  }
  
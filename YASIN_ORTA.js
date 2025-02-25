( function () {

    //array variable to store product data
    let product_list_arr = [];

    //tracker variable for carousel 
    let current_list_index = 0;

    const init = async () => {

        try {

            //acquiring the data 

            if(localStorage.getItem('local_product_arr')===null){
            
            const response = await fetch('https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json');
        
            if(!response.ok){
                throw new Error('Response is not ok!');
            }
        
            const data = await response.json();
            product_list_arr.push(...data);
            localStorage.setItem('local_product_arr',JSON.stringify(product_list_arr));
                
            }else{
                product_list_arr = JSON.parse(localStorage.getItem("local_product_arr"));
                console.log("data acquired from localstorage.")
            }


            //initializing html,css and events
            buildHTML();
            buildCSS();
            setEvents();

            //initializing heart icon states
            for(let i = 0; i < product_list_arr.length;i++){
                let selector = 'item' + i + '_fav_state';
                if( selector != null){
                    update_fav_state(i);
                }
            }
        
            }catch(error){
                console.error('Fetch failed!',error);
            }

        
    };

    const buildHTML = () => {
        const html = `
            <div class="container">

                <p class="carousel-title">You Might Also Like</p>

                <div class="space-container">

                    <button class="button left" id="prev" type="button"><i class="fa fa-arrow-left"></i></button>
                    <button class="button right" id="next" type="button"><i class="fa fa-arrow-right"></i></button>

                        <div class="carousel-flex">

                            <div id="item-1" class="product-flex">
                                <a href="${product_list_arr[0].url}" target="_blank">
                                    <img src="${product_list_arr[0].img}"></img>
                                    <p class="p-name" >${product_list_arr[0].name}</p>
                                    <p class="p-price" >${product_list_arr[0].price} TL</p>
                                </a>
                                <button id="1" class="favbtn" type="button"><i id="fav-item1" class="fa fa-regular fa-heart"></i></button>
                            </div>  
                            
                            <div id="item-1" class="product-flex">
                                <a href="${product_list_arr[1].url}" target="_blank">
                                    <img src="${product_list_arr[1].img}"></img>
                                    <p class="p-name" >${product_list_arr[1].name}</p>
                                    <p class="p-price" >${product_list_arr[1].price} TL</p>
                                </a>
                                <button id="2" class="favbtn" type="button"><id="fav-item2" i class="fa fa-regular fa-heart"></i></button>
                            </div>  

                            <div id="item-3" class="product-flex">
                                <a href="${product_list_arr[2].url}" target="_blank">
                                    <img src="${product_list_arr[2].img}"></img>
                                    <p class="p-name">${product_list_arr[2].name}</p>
                                    <p class="p-price">${product_list_arr[2].price}</p>
                                </a>
                                <button id="3" class="favbtn" type="button"><i id="fav-item3" class="fa fa-regular fa-heart"></i></button>
                            </div> 

                            <div id="item-4" class="product-flex">
                                <a href="${product_list_arr[3].url}" target="_blank">
                                    <img src="${product_list_arr[3].img}"></img>
                                    <p class="p-name" >${product_list_arr[3].name}</p>
                                    <p class="p-price">${product_list_arr[3].price}</p>
                                </a>
                                <button id="4" class="favbtn" type="button"><i id="fav-item4" class="fa fa-regular fa-heart"></i></button>
                            </div> 

                            <div id="item-5" class="product-flex">
                                <a href="${product_list_arr[4].url}" target="_blank">
                                    <img src="${product_list_arr[4].img}"></img>
                                    <p class="p-name" >${product_list_arr[4].name}</p>
                                    <p class="p-price">${product_list_arr[4].price}</p>
                                </a>
                                <button  id="5" class="favbtn" type="button"><i id="fav-item5" class="fa fa-regular fa-heart"></i></button>
                            </div> 

                            <div id="item-6" class="product-flex">
                                <a href="${product_list_arr[5].url}" target="_blank">
                                    <img src="${product_list_arr[5].img}"></img>
                                    <p class="p-name" >${product_list_arr[5].name}</p>
                                    <p class="p-price">${product_list_arr[5].price}</p>
                                </a>
                                <button id="6" class="favbtn" type="button"><i id="fav-item6" class="fa fa-regular fa-heart"></i></button>
                            </div> 

                            <div id="item-7" class="product-flex">
                                <a href="${product_list_arr[6].url}" target="_blank">
                                    <img src="${product_list_arr[6].img}"></img>
                                    <p class="p-name">${product_list_arr[6].name}</p>
                                    <p class="p-price">${product_list_arr[6].price}</p>
                                </a>
                                <button id="7" class="favbtn" type="button"><i id="fav-item7" class="fa fa-regular fa-heart"></i></button>
                            </div> 
                        
                        </div>
                
                </div>
                
            </div>
        `;

        $('.product-detail').append(html);
    };

    const buildCSS = () => {
        const css = `
        
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        
            .container {
                background-color: white;
                height: 100%;
                width: 100%;
            }

            .space-container {
                position: relative;
                margin-left: 5%;
                margin-right: 5%;
                display: flex;
                width: 100%;
                overflow: hidden;
            }
            .carousel-flex{
                background-color: white;
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                box-sizing: border-box;
                overlow: hidden;
                transition: transform 0.5s ease;
            }

            .product-flex{
                background-color: white;
                text-align: center;
                border: 1px solid #ddd;
                box-sizing: border-box;
                width: 210px;
                height: 100%;
                overflow: hidden;
                flex-grow: 0;
                flex-shrink: 0;
                margin-left: 5px;
                margin-right: 5px;
                position: relative;
                display: inline-block;
            }

            .favbtn{
                position: absolute;
                top: 10px;
                right: 10px;
                background-color: rgba(183, 187, 179, 0.97);
                border: none;
                padding: 10px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 20px;
            }

            .favbtn:hover {
                background-color: rgba(0, 123, 255, 0.8);
                box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.5);
            }
            

            .button {
                position: fixed;
                top: 50%;
                z-index: 10;

                background: none;
                border: none;
                padding: 0;
                width: auto;
                height: auto;
                cursor: pointer;
            }

            .left{
                left: 10px;
            }
            .right{
                right: 10px;
            }

            .button i {
                font-size: 36px;
                color: black;
            }

            img{
                width: 210px;
                height: 280px;
            }

            a{
                text-decoration: none;
            }

            p{
                padding-left:  10px;
                padding-right:  10px;
                text-align: left;
            }

            .p-price{
                color: blue; 
                font-weight: bold; 
                font-size: 23px;
            }
            .p-name{
                color: black; 
                font-weight: normal;
            }

            .carousel-title{
                padding-left: 80px;
                font-size: 20px;
            }

            .product-flex-half{
                margin-left: 5px;
                margin-right: 5px;
            }

            @media (max-width: 767px) {
                .button {
                    display: none;
                }
            }

            
        `;

        $('<style>').addClass('carousel-style').html(css).appendTo('head');
    };

    const setEvents = () => {
        // carousel arrow button functions

        $('#prev').on('click', () => {
            if ( current_list_index != 0) {
                current_list_index = current_list_index - 1;
                update_slide();
            }
        });

        $('#next').on('click', () => {
            if (current_list_index < 6){
                current_list_index = current_list_index + 1;
                update_slide();
            }
        });

        //heart icon / favourite button functions

        $('.favbtn').on('click',function(){
            let buttonId = $(this).attr('id');

            let storage_key = 'item' + buttonId + '_fav_state';

            current_selector = document.getElementById(buttonId);

            let currentState = localStorage.getItem(storage_key);

            if(currentState === null){
                localStorage.setItem(storage_key, true);
                current_selector.style.backgroundColor = 'rgba(0, 123, 255, 0.8)';
            }
            else if(currentState === 'false') {
                localStorage.setItem(storage_key, true);
                current_selector.style.backgroundColor = 'rgba(0, 123, 255, 0.8)';
            }else{
                localStorage.setItem(storage_key, false);
                current_selector.style.backgroundColor = 'rgba(183, 187, 179, 0.97)';
            }
        })
        
    };

    const update_slide = () => {
        //carousel functionality / sliding products horizontaly 
        const carousel = document.querySelector('.carousel-flex');
        const offset = -current_list_index * 25;
        carousel.style.transform = `translateX(${offset}%)`;
    };

    const update_fav_state = (number) => {
        //using favourite function to initialize correct preferences
        $('.favbtn').eq(number).click();
        $('.favbtn').eq(number).click();
    };

    init();
})();
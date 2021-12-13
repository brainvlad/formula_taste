const renderGoods = (goods) => {
    const goodsContainer = document.querySelector('.goods__list')

    goodsContainer.innerHTML = ""

    goods.forEach(good => {
        const goodBlock = document.createElement('div')


        goodBlock.classList.add('goods__item')

        goodBlock.innerHTML = `
            <div class="goods__img">
                <img src="${good.img}" alt="${good.name}">
                <div class="goods__img-overlay">
                    <div class="goods__img-text">
                         <span>Ккал</span>
                         ${good.ccal}
                    </div>
                </div>
            </div>
            <div class="goods__nav">
                <div class="goods__info">
                    <h2 class="goods__title">${good.name}</h2>
                    <p class="goods__desc">
                       ${good.description}
                    </p>
                    <div class="goods__price">
                        <div>
                            <span>${good.price}</span> руб/1 шт
                        </div>
                        <div class="goods__menu" data-id="${good.id}">
                            <i class="far fa-heart"></i>
                            <i class="fas fa-shopping-cart"></i>
                        </div>
                    </div>
                </div>
            </div>    
        `

        goodsContainer.append(goodBlock)
    });


}


const getData = () => {
    fetch('vendor/get_goods.php')
        .then((res) => res.json())
        .then((data) => {
            if (data) {
                const path = window.location.pathname;
                const page = path.split("/").pop();


                if (page === 'donuts.html') {
                    goods = data.filter((item) => item.category === 'donut')
                }
                if (page === 'macaroons.html') {
                    goods = data.filter((item) => item.category === 'macaroon')
                }
                if (page === 'milkshakes.html') {
                    goods = data.filter((item) => item.category === 'milkshake')
                }

                localStorage.setItem('goods', JSON.stringify(goods))

                renderGoods(goods)
            } else {
                console.log('Error connection')
            }

        })
}

getData()
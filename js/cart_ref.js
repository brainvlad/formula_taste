const cart = function () {
    const cartBtn = document.querySelector('.button-cart')
    const cart = document.getElementById('modal-cart')
    const cartCloseBtn = cart.querySelector('.modal-close')
    const goodsContainer = document.querySelector('.long-goods-list')
    const cartTable = document.querySelector('.cart-table__goods')

    const addToCart = (id) => {
        const goods = JSON.parse(localStorage.getItem('goods'))
        const clickedGood = goods.find(good => good.id === id)
        const cart = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : [];

        if (cart.some(good => good.id === clickedGood.id)) {
            cart.map(good => {
                if (good.id === clickedGood.id) {
                    good.count++
                }
                return good
            })
        } else {
            clickedGood.count = 1
            cart.push(clickedGood)
        }

        localStorage.setItem('cart', JSON.stringify(cart))
    }

    const renderCartGoods = (goods) => {
        goods.forEach(good => {
            const tr = document.createElement('tr')

            tr.innerHTML = `
                <td>${good.name}</td>
                <td>${good.price}$</td>
                <td><button class="cart-btn-minus"">-</button></td>
                <td>${good.count}</td>
                <td><button class=" cart-btn-plus"">+</button></td>
                <td>${+good.price * +good.count}$</td>
                <td><button class="cart-btn-delete"">x</button></td>
            `

            cartTable.append(tr)

            tr.addEventListener('click', (event) => {
                if (event.target.classList.contains('cart-btn-minus')) {

                } else if (event.target.classList.contains('cart-btn-minus')) {

                } else if (event.target.classList.contains('cart-btn-delete')) { }
            });
        });
    }

    cartBtn.addEventListener('click', () => {
        const cartArray = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : [];

        renderCartGoods(cartArray)
        cart.style.display = 'flex';
    })

    cartCloseBtn.addEventListener('click', () => {
        cart.style.display = '';
    })

    if (goodsContainer) {
        goodsContainer.addEventListener('click', (event) => {
            if (event.target.closest('.add-to-cart')) {
                const buttonToCart = event.target.closest('.add-to-cart')
                const goodId = buttonToCart.dataset.id

                addToCart(goodId)
            }
        })
    }
}

cart()

// //- В модальном окне корзины есть поле с общей ценой (class="card-table__total"). Посчитать стоимость всего товара и результат выводить в это поле
// - В отправляемые данные добавить имя и телефон из формы
// - Отчищать форму после отправки данных
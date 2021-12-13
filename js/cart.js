const cart = () => {
    const cartOpen = document.querySelector('.cart-open')
    const cart = document.querySelector('.cart__popup')
    const cartClose = document.querySelector('.popup__close')
    const popupOverlay = document.querySelector('.popup__overlay')
    const cartList = document.querySelector('.cart__list')
    const goodsContainer = document.querySelector('.goods__list')
    const cartSale = document.querySelector('.cart__sale')

    cartSale.addEventListener('click', () => {
        const cartParse = JSON.parse(localStorage.getItem('cart'));
        cartParse.forEach(good => {
            deleteFromCart(good.id);
        })
        alert('Спасибо за покупку!')
        cart.style.display = 'none'
        popupOverlay.style.display = 'none'
    })

    cartOpen.addEventListener('click', () => {
        const cartArray = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : [];
        renderCartGoods(cartArray)

        cart.style.display = 'block'
        popupOverlay.style.display = 'block'

    })
    cartClose.addEventListener('click', () => {
        cart.style.display = 'none'
        popupOverlay.style.display = 'none'
    })
    popupOverlay.addEventListener('click', () => {
        cart.style.display = 'none'
        popupOverlay.style.display = 'none'
    })

    const addToCart = (id) => {
        const cart = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : [];
        if (cart.some(good => good.id === id)) {
            const cartParse = JSON.parse(localStorage.getItem('cart'));
            clickedGood = cartParse.find(good => good.id === id);
        } else {
            const goods = JSON.parse(localStorage.getItem('goods'))
            clickedGood = goods.find(good => good.id === id);
        }

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
    const removeToCart = (id) => {
        const cart = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : [];
        const cartParse = JSON.parse(localStorage.getItem('cart'));
        const clickedGood = cartParse.find(good => good.id === id);
        if (cart.some(good => good.id === clickedGood.id)) {
            cart.map(good => {
                if (good.id === clickedGood.id) {
                    good.count--
                }
            })
            if (cart.some(good => good.count === 0)) {
                cart.splice(cart.indexOf(cart.find(good => good.count === 0)), 1)
            }
        } else {
            cart.splice(cart.indexOf(cart.find(good => good.count === 0)), 1)
        }

        localStorage.setItem('cart', JSON.stringify(cart))
    }

    const deleteFromCart = (id) => {
        const cart = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : [];
        const cartParse = JSON.parse(localStorage.getItem('cart'));
        const clickedGood = cartParse.find(good => good.id === id);

        cart.splice(cart.indexOf(cart.find(good => good.id === clickedGood.id)), 1)

        localStorage.setItem('cart', JSON.stringify(cart))
    }

    const renderCartGoods = (goods) => {
        cartList.innerHTML = ``;
        let totalSum = 0;

        goods.forEach(good => {
            const cartitem = document.createElement('tr')
            cartitem.classList.add('cart__item')
            totalSum += +(+good.count * +good.price).toFixed(2);

            cartitem.innerHTML = `
            <td class="cart__name">
                ${good.name}
            </td>
            <td class="cart__price">
                <span>${(+good.count * +good.price).toFixed(2)}</span> BYN
            </td>
            <td class="cart__counter" data-id="${good.id}">
                <i class="fas fa-plus-square"></i>
                <span>${good.count}</span>
                <i class="fas fa-minus-square"></i>
            </td>
            <td class="cart__remove" data-id="${good.id}">
                <i class="fas fa-trash-alt"></i>
            </td>
        `

            cartList.append(cartitem)

            cartitem.addEventListener('click', (event) => {
                if (event.target.classList.contains('fa-plus-square')) {
                    const buttonToCart = event.target.closest('.cart__counter')
                    const goodId = buttonToCart.dataset.id
                    addToCart(goodId)

                    const cartArray = localStorage.getItem('cart') ?
                        JSON.parse(localStorage.getItem('cart')) : [];
                    renderCartGoods(cartArray)

                } else if (event.target.classList.contains('fa-minus-square')) {
                    const buttonToCart = event.target.closest('.cart__counter')
                    const goodId = buttonToCart.dataset.id
                    removeToCart(goodId)

                    const cartArray = localStorage.getItem('cart') ?
                        JSON.parse(localStorage.getItem('cart')) : [];
                    renderCartGoods(cartArray)

                } else if (event.target.classList.contains('fa-trash-alt')) {
                    const buttonToCart = event.target.closest('.cart__remove')
                    const goodId = buttonToCart.dataset.id
                    deleteFromCart(goodId)

                    const cartArray = localStorage.getItem('cart') ?
                        JSON.parse(localStorage.getItem('cart')) : [];
                    renderCartGoods(cartArray)
                }
            })
        });

        const totalSumBlock = document.querySelector('.total-sum')
        totalSumBlock.innerHTML = totalSum.toFixed(2);
    }

    if (goodsContainer) {
        goodsContainer.addEventListener('click', (event) => {
            if (event.target.closest('.fa-shopping-cart')) {
                const buttonToCart = event.target.closest('.goods__menu')
                const goodId = buttonToCart.dataset.id

                addToCart(goodId)
            }
        })
    }
}

cart()


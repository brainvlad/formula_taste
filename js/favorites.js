const favor = () => {
    const favorOpen = document.querySelector('.favor-open');
    const favor = document.querySelector('.favor__popup');
    const favorClose = document.querySelector('.close-2');
    const popupOverlay = document.querySelector('.popup__overlay');
    const favorList = document.querySelector('.favor__list');

    const goodsContainer = document.querySelector('.goods__list')

    favorOpen.addEventListener('click', () => {
        popupOverlay.style.display = 'block'
        favor.style.display = 'block'


        const favorArray = localStorage.getItem('favorites') ?
            JSON.parse(localStorage.getItem('favorites')) : [];
        renderFavor(favorArray)
    })
    favorClose.addEventListener('click', () => {
        favor.style.display = 'none'
        popupOverlay.style.display = 'none'
    })
    popupOverlay.addEventListener('click', () => {
        popupOverlay.style.display = 'none'
        favor.style.display = 'none'
    })

    const addToFavor = (id) => {
        try {
            favorites = localStorage.getItem('favorites') ?
                JSON.parse(localStorage.getItem('favorites')) : [];
        } catch {
            favorits = [];
        }

        if (favorites.some(good => good.id === id)) {
            favorites.splice(favorites.indexOf(favorites.find(good => good.id === id)), 1)
        } else {
            const goods = JSON.parse(localStorage.getItem('goods'))
            clickedGood = goods.find(good => good.id === id);
            favorites.push(clickedGood)
        }

        localStorage.setItem('favorites', JSON.stringify(favorites))
    }

    const renderFavor = (favorites) => {
        favorList.innerHTML = ``

        favorites.forEach(good => {
            const favorItem = document.createElement('tr')
            favorItem.classList.add('favor__item')

            favorItem.innerHTML = `
            <td class="favor__name">
                ${good.name}
            </td>
            <td class="favor__price">
                <span>${(+good.price).toFixed(2)}</span> BYN
            </td>
            <td class="goods__menu" data-id="${good.id}">
                <i class="fas fa-shopping-cart"></i>
            </td>
            <td class="goods__menu" data-id="${good.id}">
                <i class="fas fa-heart"></i>
            </td>
            `

            favorList.append(favorItem)

            favorItem.addEventListener('click', (event) => {
                if (event.target.classList.contains('fa-heart')) {
                    const buttonTofavor = event.target.closest('.goods__menu')
                    const goodId = buttonTofavor.dataset.id

                    addToFavor(goodId)

                    const favorArray = localStorage.getItem('favorites') ?
                        JSON.parse(localStorage.getItem('favorites')) : [];
                    renderFavor(favorArray)
                }
            })

            favorItem.addEventListener('click', (event) => {
                const addToCart = (id) => {
                    const cart = localStorage.getItem('cart') ?
                        JSON.parse(localStorage.getItem('cart')) : [];

                    if (cart.some(good => good.id === id)) {
                        const cartParse = JSON.parse(localStorage.getItem('cart'));
                        clickedGood = cartParse.find(good => good.id === id);
                    } else {
                        const favor = JSON.parse(localStorage.getItem('favorites'))
                        clickedGood = favor.find(good => good.id === id);
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

                if (event.target.classList.contains('fa-shopping-cart')) {
                    const buttonTofavor = event.target.closest('.goods__menu')
                    const goodId = buttonTofavor.dataset.id

                    addToCart(goodId)

                    const favorArray = localStorage.getItem('favorites') ?
                        JSON.parse(localStorage.getItem('favorites')) : [];
                    renderFavor(favorArray)
                }


            })
        });
    }

    if (goodsContainer) {
        goodsContainer.addEventListener('click', (event) => {
            if (event.target.closest('.fa-heart')) {
                event.target.closest('.fa-heart').classList.toggle('active')
                const buttonToFavor = event.target.closest('.goods__menu')
                const goodId = buttonToFavor.dataset.id

                addToFavor(goodId)
            }
        })
    }
}

favor()
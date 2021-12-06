const topMenu = () => {
    const header = document.querySelector('.header')
    const headerContent = document.querySelector('.header__content')
    const headerLogo = document.querySelector('.header__logo')

    window.addEventListener('scroll', () => {
        if (window.scrollY >= 250) {
            headerContent.classList.add('header__scrolling');
        } else {
            headerContent.classList.remove('header__scrolling');
        }
    })
}

topMenu()
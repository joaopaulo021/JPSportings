const menuMobile = document.querySelector('.menu-hamb')
const dropDown = document.querySelector('.dropDown')
const menu = document.querySelector('.menu-hamb #menu-open')
const btnMenu = document.querySelectorAll('.dropDown a')

window.onbeforeunload = () => {
    window.scrollTo(0, 0);
};

/* ESCONDE MENU MOBILE AO CLICAR NOS BOTOES */

btnMenu.forEach((link) => {
    link.addEventListener('click', hideMenuClick())

})

function hideMenuClick() {
    dropDown.classList.remove('showMenu')
    dropDown.classList.add('dropDown')
    menuMobile.classList.remove('menu-hamb-click')
    menuMobile.classList.add('menu-hamb')
}

/* MOSTRA O MENU DROPDOWN E FAZ UM 'X' NO MENU */

menuMobile.addEventListener('click', () => {
    if (menuMobile.classList.contains('menu-hamb') && dropDown.classList.contains('dropDown')) {

        menuMobile.classList.add('menu-hamb-click')
        dropDown.classList.remove('dropDown')
        dropDown.classList.add('showMenu')

    } else if (menuMobile.classList.contains('menu-hamb-click')) {
        dropDown.classList.remove('showMenu')
        dropDown.classList.add('dropDown')
        menuMobile.classList.remove('menu-hamb-click')
        menuMobile.classList.add('menu-hamb')
    }
})
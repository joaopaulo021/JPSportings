const btnCamisas = document.querySelector('.btn-camisas')
const subSection = document.querySelector('.sub-section')
const btnBrasil = document.querySelector('.sub-brasil')
const btnEuropa = document.querySelector('.sub-europa')
const btnSelecoes = document.querySelector('.sub-selecoes')
const btnChuteiras = document.querySelector('.btn-chuteiras')


subSection.addEventListener('click', () => {
    subSection.style.fontSize = "0px"
    subSection.style.opacity = '0';
    subSection.style.height = "0px"
})

btnCamisas.addEventListener('click', () => {
    if (subSection.style.opacity === '0') {
        subSection.style.opacity = '1';
        subSection.style.height = "150px"
        subSection.style.fontSize = "15px"
    } else {
        subSection.style.fontSize = "0px"
        subSection.style.opacity = '0';
        subSection.style.height = "0px"
    }

});

window.onload = () => {
    filterProduct("Todos")
}

function filterProduct(value) {

    let elements = document.querySelectorAll('.card')

    elements.forEach((element) => {
        if (value == "Todos") {
            element.classList.remove("hide")
        } else {
            if (element.classList.contains(value)) {
                element.classList.remove("hide")
            } else {
                element.classList.add("hide")
            }
        }
    })
}
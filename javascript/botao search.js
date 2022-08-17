function searchButton() {
    const searchInput = document.getElementById("search-input").value
    document.getElementById("search-input").focus()

    let elements = document.querySelectorAll(".card-header")
    let cards = document.querySelectorAll(".card")

    elements.forEach((element, index) => {
        if (element.innerText.toLowerCase().includes(searchInput)) {

            cards[index].classList.remove('hide')
        } else {
            cards[index].classList.add("hide")
        }
    })
}

document.querySelector('.search').addEventListener("click", () => {
    searchButton()
})

document.querySelector('#search-input').addEventListener("keyup", (e) => {
    let key = e.keyCode
    if (key == 13) {
        searchButton()
    }
})
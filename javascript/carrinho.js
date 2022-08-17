const imgBack = document.querySelector('.back');
const imgFront = document.querySelector('.front');

let modalKey = 0

let quantCamisetas = 1

let cart = []

/* FUNÇÕES */

const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)

const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const formatoMonetario = (valor) => {
    if (valor) {
        return valor.toFixed(2)
    }
}

const abrirModal = () => {
    seleciona('.cardWindowArea').style.opacity = 0
    seleciona('.cardWindowArea').style.display = 'flex'
    setTimeout(() => seleciona('.cardWindowArea').style.opacity = 1, 150)
}
const fecharModal = () => {
    seleciona('.cardWindowArea').style.opacity = 0
    setTimeout(() => seleciona('.cardWindowArea').style.display = 'none', 500)
}

const botoesFechar = () => {
    selecionaTodos('.cardInfo--cancelButton, .cardInfo--cancelMobileButton').forEach((item) => item.addEventListener('click', fecharModal))
}

const preencheCards = (cardItem, item, index) => {
    cardItem.setAttribute('data-key', index)
    cardItem.querySelector('.card-img img').src = item.img
    cardItem.querySelector('.priceItem').innerHTML = formatoReal(item.price)
    cardItem.querySelector('.card-header h3').innerHTML = item.name
}

const preencheModal = (item) => {
    seleciona('.cardBig h1').innerHTML = item.description
    seleciona('.cardInfo h1').innerHTML = item.description
    seleciona('.cardBig .front').src = item.img
    seleciona('.cardBig .back').src = item.dir
    seleciona('.cardInfo--actualPrice').innerHTML = formatoReal(item.price)
}

const pegarKey = (e) => {
    let key = e.target.closest('.card').getAttribute('data-key')
    console.log('Camiseta clicada ' + key)
    console.log(camisetasJson[key])
    quantCamisetas = 1
    modalKey = key

    return key

}
const preencherTamanhos = (key) => {
    // tirar a selecao de tamanho atual e selecionar outro tamanho
    seleciona('.cardInfo--size.selected').classList.remove('selected')

    // selecionar todos os tamanhos
    selecionaTodos('.cardInfo--size').forEach((size, sizeIndex) => {
        // selecionar o tamanho grande
        (sizeIndex == 2) ? size.classList.add('selected'): ''
        size.querySelector('span').innerHTML = (`Tamanho`)
    })

    return key
}

const escolherTamanhoPreco = (key) => {
    // Ações nos botões de tamanho
    // selecionar todos os tamanhos
    selecionaTodos('.cardInfo--size').forEach((size, sizeIndex) => {
        size.addEventListener('click', (e) => {
            // clicou em um item, tirar a selecao dos outros e marca o q vc clicou
            // tirar a selecao de tamanho atual e selecionar o tamanho grande
            seleciona('.cardInfo--size.selected').classList.remove('selected')
                // marcar o que vc clicou, ao inves de usar e.target use size, pois ele é nosso item dentro do loop
            size.classList.add('selected')

        })
    })
}


/* BOTAO FRENTE E VERSO DA CAMISETA */

seleciona('.verso').addEventListener('click', () => {
    if (imgFront.style.display = 'block') {
        imgFront.style.display = 'none';
        imgBack.style.display = 'block';
    }

});
seleciona('.frente').addEventListener('click', () => {
    if (imgFront.style.display = 'none') {
        imgFront.style.display = 'block';
        imgBack.style.display = 'none';
    }

});

const mudarQuantidade = () => {

    seleciona('.cardInfo--qtmais').addEventListener('click', () => {
        quantCamisetas++
        seleciona('.cardInfo--qt').innerHTML = quantCamisetas
            /* ARRUMAR
            let price = camisetasJson[modalKey].price
            document.querySelector('.cardInfo--actualPrice').innerHTML = formatoReal(price * quantCamisetas)
            */
    })

    seleciona('.cardInfo--qtmenos').addEventListener('click', () => {
        if (quantCamisetas > 1) {
            quantCamisetas--
            seleciona('.cardInfo--qt').innerHTML = quantCamisetas


        }
    })
}

const adicionarNoCarrinho = () => {
    seleciona('.cardInfo--addButton').addEventListener('click', () => {
        console.log('Adicionar no carrinho')

        // pegar dados da janela modal atual
        // qual card? pegue o modalKey para usar camisetasJson[modalKey]
        console.log("Camiseta " + modalKey)
            // tamanho
        let size = seleciona('.cardInfo--size.selected').getAttribute('data-key')
        console.log("Tamanho " + size)
            // quantidade
        console.log("Quant. " + quantCamisetas)
            // preco
        let price = seleciona('.cardInfo--actualPrice').innerHTML.replace('R$&nbsp;', '')

        // cria um identificador que junte nome e tamanho
        let identificador = camisetasJson[modalKey].name + ' + ' + size

        // antes de adicionar verifique se ja tem aquele codigo e tamanho
        // para adicionarmos a quantidade
        let key = cart.findIndex((item) => item.identificador == identificador)


        if (key > -1) {
            // se encontrar aumente a quantidade
            cart[key].qt += quantCamisetas
        } else {
            // adicionar objeto card no carrinho
            let card = {
                identificador,
                id: camisetasJson[modalKey].id,
                size, // size: size
                qt: quantCamisetas,
                price: parseFloat(price) // price: price
            }
            cart.push(card)
            console.log(card)
            console.log('Sub total R$ ' + (card.qt * card.price).toFixed(2))
        }

        fecharModal()
        abrirCarrinho()
        atualizarCarrinho()
    })
}

const abrirCarrinho = () => {
    console.log('Qtd de itens no carrinho ' + cart.length)
    if (cart.length > 0) {
        // mostrar o carrinho
        seleciona('aside').classList.add('show')
        seleciona('header').style.display = 'flex' // mostrar barra superior
    }

    // exibir aside do carrinho no modo mobile
    seleciona('.menu-openner').addEventListener('click', () => {
        if (cart.length > 0) {
            seleciona('aside').classList.add('show')
            seleciona('aside').style.left = '0'
        }
    })
}

const fecharCarrinho = () => {
    // fechar o carrinho com o botão X no modo mobile
    seleciona('.menu-closer').addEventListener('click', () => {
        seleciona('aside').style.left = '100vw' // usando 100vw ele ficara fora da tela
        seleciona('header').style.display = 'flex'
    })
}

const atualizarCarrinho = () => {
    // exibir número de itens no carrinho
    seleciona('.menu-openner span').innerHTML = cart.length

    // mostrar ou nao o carrinho
    if (cart.length > 0) {

        // mostrar o carrinho
        seleciona('aside').classList.add('show')

        // zerar meu .cart para nao fazer insercoes duplicadas
        seleciona('.cart').innerHTML = ''

        // crie as variaveis antes do for
        let subtotal = 0
        let desconto = 0
        let total = 0

        // para preencher os itens do carrinho, calcular subtotal
        for (let i in cart) {
            // use o find para pegar o item por id
            let cardItem = camisetasJson.find((item) => item.id == cart[i].id)
            console.log(cardItem)

            // em cada item pegar o subtotal
            subtotal += cart[i].price * cart[i].qt
                //console.log(cart[i].price)

            // fazer o clone, exibir na telas e depois preencher as informacoes
            let cartItem = seleciona('.models .cart--item').cloneNode(true)
            seleciona('.cart').append(cartItem)

            let cardSizeName = cart[i].size

            let cardName = `${cardItem.name} (${cardSizeName})`

            // preencher as informacoes
            cartItem.querySelector('img').src = cardItem.img
            cartItem.querySelector('.cart--item-nome').innerHTML = cardName
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

            // selecionar botoes + e -
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                console.log('Clicou no botão mais')
                    // adicionar apenas a quantidade que esta neste contexto
                cart[i].qt++
                    // atualizar a quantidade
                    atualizarCarrinho()
            })

            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                console.log('Clicou no botão menos')
                if (cart[i].qt > 1) {
                    // subtrair apenas a quantidade que esta neste contexto
                    cart[i].qt--
                } else {
                    // remover se for zero
                    cart.splice(i, 1)
                }

                (cart.length < 1) ? seleciona('header').style.display = 'flex': ''

                // atualizar a quantidade
                atualizarCarrinho()
            })

            seleciona('.cart').append(cartItem)



        } // fim do for

        // fora do for
        // calcule desconto 10% e total
        //desconto = subtotal * 0.1
        desconto = subtotal * 0
        total = subtotal - desconto

        // exibir na tela os resultados
        // selecionar o ultimo span do elemento
        seleciona('.subtotal span:last-child').innerHTML = formatoReal(subtotal)
        seleciona('.desconto span:last-child').innerHTML = formatoReal(desconto)
        seleciona('.total span:last-child').innerHTML = formatoReal(total)

    } else {
        // ocultar o carrinho
        seleciona('aside').classList.remove('show')
        seleciona('aside').style.left = '100vw'
    }
}

const finalizarCompra = () => {
    seleciona('.cart--finalizar').addEventListener('click', () => {
        console.log('Finalizar compra')
        seleciona('aside').classList.remove('show')
        seleciona('aside').style.left = '100vw'
        seleciona('header').style.display = 'flex'
    })
}



/* PREENCHIMENTO DOS CARDS */

camisetasJson.map((item, index) => {

    const cards = document.querySelector('.cards')
    const cardItem = document.querySelector('.models .card').cloneNode(true)
    cards.append(cardItem)
    cardItem.classList.add(item.liga, "hide")
    preencheCards(cardItem, item, index)


    /* PREENCHIMENTO DO MODAL */

    cardItem.querySelector('.card-footer button').addEventListener('click', (e) => {
        e.preventDefault()
        console.log('clicou na camiseta')

        let chave = pegarKey(e)

        abrirModal()

        preencheModal(item)

        preencherTamanhos(chave)

        seleciona('.cardInfo--qt').innerHTML = quantCamisetas

        escolherTamanhoPreco(chave)

    })

    botoesFechar()


})


mudarQuantidade()
adicionarNoCarrinho()
atualizarCarrinho()
fecharCarrinho()
finalizarCompra()
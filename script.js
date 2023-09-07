let currentPageUrl = 'https://swapi.dev/api/people/'   //url da api, let, pois mudará o valor constantemente e const é fixo


window.onload = async () => {                         // window.onload --> toda vez qe a pagina carregar
    try {
        await loadCharacters(currentPageUrl)          //função responsável por fazer a requisição p/ api 
    } catch (error) {                                 //e carregar os cards   
        console.log(error)
        alert('Erro ao carregar cards')
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)             //monitora eventos dentro deste elemento
    backButton.addEventListener('click', loadpreviousPage)         //evento é o click, executa a função
};

async function loadCharacters(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''; //limpa os resultados anteriores para gerar a próxima página

    try {

        const response = await fetch(url);
        const responseJson = await response.json(); //o que é recebido pela api ñ vem em formato json, para converter

        responseJson.results.forEach((character) => {       //foreach -->para cada personagem
            const card = document.createElement('div')  //createElement cria um elemento html
            card.style.backgroundImage = 
            `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
            card.className = 'cards'                                                     //expressão regular
            
            const characterNameBg = document.createElement('div')
            characterNameBg.className = 'character-name-bg'
            
            const characterName = document.createElement('span')
            characterName.className = 'character-name'
            characterName.innerText = `${character.name}`   //innerText --> modifica o conteúdo de texto do elemento

            characterNameBg.appendChild(characterName)    //cria um elemento filho dentro do characterNameBg
            card.appendChild(characterNameBg)

            card.onclick = () => {
                const modal = document.getElementById('modal')
                modal.style.visibility = 'visible'

                const modalContent = document.getElementById('modal-content')
                modalContent.innerHTML = ''    //limpa todo o conteúdo dentro de modalContent

                const characterImage = document.createElement('div')
                characterImage.style.backgroundImage = 
                `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
                characterImage.className = 'character-image'

                const name = document.createElement('span')//const name = document.createElement('span')
                name.className = 'character-details' //name.className = 'character-details'
                name.innerText = `Nome: ${character.name}`

                const characterHeight = document.createElement('span')
                characterHeight.className = 'character-details'
                characterHeight.innerText = `Altura: ${convertHeight(character.height)}`

                const mass = document.createElement('span')
                mass.className = 'character-details'
                mass.innerText = `Peso: ${convertMass(character.mass)}`

                const eyeColor = document.createElement('span')
                eyeColor.className = 'character-details'
                eyeColor.innerText = `Cor dos olhos: ${convertEyeColor(character.eye_color)}`

                const birthYear = document.createElement('span')
                birthYear.className = 'character-details'
                birthYear.innerText = `Nascimento: ${convertBirthYear(character.birth_year)}`

                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(characterHeight)
                modalContent.appendChild(mass)
                modalContent.appendChild(eyeColor)
                modalContent.appendChild(birthYear)
            }

            mainContent.appendChild(card)
        });

        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.next   //desabilita o botão quando não houver mais um next na api
        backButton.disabled = !responseJson.previous

        backButton.style.visibility = responseJson.previous? 'visible' : 'hiden'

        currentPageUrl = url        //chama a url para ser carregada atribuindo um novo valor
        
    } catch (error) {
        alert('Erro ao carregar os personagens')
        console.log(error)
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;
    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)
        
    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a próxima página')
    }
}

async function loadpreviousPage() {
    if (!currentPageUrl) return;
    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.previous)
        
    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a página anterior')
    }
}

function hideModal() {
    const modal = document.getElementById('modal')
    modal.style.visibility = 'hidden'
}

function convertEyeColor(eyeColor) {
    const cores = {
        blue: 'azul',
        brown: 'castanho',
        green: 'verde',
        yellow: 'amarelo',
        black: 'preto',
        pink: 'rosa',
        red: 'vermelho',
        orange: 'laranja',
        hazel: 'avelã',
        unknow: 'desconhecida'
    }

    return cores[eyeColor.toLowerCase()] ||eyeColor;
}

function convertHeight(height) {
    if(height === 'unknow'){
        return 'desconhecida'
    }

    return (height / 100).toFixed(2)
}

function convertMass(mass) {
    if(mass === 'unknow'){
        return 'desconhecido'
    }

    return `${mass} kg`
}

function convertBirthYear(birthYear) {
    if(birthYear === 'unknow'){
        return 'desconhecido'
    }

    return birthYear
}
 


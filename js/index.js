document.addEventListener("DOMContentLoaded", () => {
    const monsterContainer = document.getElementById('monster-container')
    const backButton = document.getElementById('back')
    const forwardButton = document.getElementById('forward')
    const formContainer = document.getElementById('create-monster')
    let pageNum = 1

const monsterForm = document.createElement("form")
monsterForm.innerHTML = `
    <label>Name</label>
    <input type="text" id="monster-name"/>
    <label>Age</label>
    <input type="number" id="monster-age"/>
    <label>Description</label>
    <input type="text" id="monster-description"/>
    <input type="submit" id="monster-sumit" value="Create Monster!"></input>
`
formContainer.append(monsterForm)

monsterForm.addEventListener("submit", (event) => {
    event.preventDefault()
    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"}, 
        body: JSON.stringify({
                name: document.getElementById('monster-name').value,
                age: document.getElementById('monster-age').value,
                description: document.getElementById('monster-description').value,
                
            })
    })
    .then(response => resp.json())
    .then(console.log)
})

//const inputs = document.querySelectorAll("input")
//console.log(inputs)

fetch (`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
.then(resp => resp.json())
.then((monsters) => {
    monsters.forEach((monster) => {
        monsterContainer.append(renderMonster(monster), document.createElement("hr"))
    })  
})

backButton.addEventListener("click", () => {
    pageNum += 1;
    fetch (`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
    .then(resp => resp.json())
    .then((monsters) => {
        
        if (monsters.length === 0){
            pageNum -= 1
            window.alert("End of List")
        } else {
        monsterContainer.innerHTML= `Page ${pageNum}`;
        monsters.forEach((monster) => {
        monsterContainer.append(renderMonster(monster), document.createElement("hr"))
     })  
    }
   })
})

forwardButton.addEventListener("click", () => {
    if(pageNum === 20){
        window.alert("At End of List")
    } else {
    pageNum += 1
    fetch (`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
    .then(resp => resp.json())
    .then((monsters) => {
    monsters.forEach((monster) => {
        monsterContainer.innerHTML= `Page ${pageNum}`;
        monsterContainer.append(renderMonster(monster), document.createElement("hr"))
     })  
   })
  }
})

function renderMonster(monster) {
    const monsterSpan = document.createElement("span")
    monsterSpan.innerHTML =  `
        <h1>${monster.name}</h1>
        <h4>Age: ${monster.age}</h4>
        <p>Description: ${monster.description}</p> `

        monsterSpan.setAttribute("data-id", monster.id)
        monsterSpan.style.color = "green"
    return monsterSpan
}

















})
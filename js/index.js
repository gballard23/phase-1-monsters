let pageNum = 1
document.addEventListener('DOMContentLoaded',()=>{
    createForm()
    getMonster(pageNum)
    const form = document.querySelector('#monster-form')
    form.addEventListener('submit',(e)=>{
        e.preventDefault()
        const monName = e.target.elements['name'].value
        const monAge = e.target.elements['age'].value
        const monDes = e.target.elements['description'].value
        const monObj = {"name": monName, "age": monAge, "description": monDes}
        newMonster(monObj)
    })
    const back = document.querySelector('#back')
    const forward = document.querySelector('#forward')
    back.addEventListener('click',(e)=>{
        pageNum -= 1
        document.querySelector('#monster-container').innerHTML = ""
        getMonster(pageNum)
    })

    forward.addEventListener('click',(e)=>{
        pageNum += 1
        document.querySelector('#monster-container').innerHTML = ""
        getMonster(pageNum)
    })
})

function getMonster(pageNum){
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${pageNum}`)
    .then(res => res.json())
    .then(data => {
        Array.from(data).forEach((monster)=>{
            monsterList(monster)
        })
    })
}

function newMonster(monObj){
    fetch('http://localhost:3000/monsters',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(monObj)
    })
}

function monsterList(monObj){
    const container = document.querySelector('#monster-container')
    const div= document.createElement('div')
    div.innerHTML = `<h2>${monObj.name}</h2>
                     <h4>${monObj.age}</h4>
                     <p>${monObj.description}</p>`
    container.appendChild(div)  
}

function createForm(){
    const createMon = document.querySelector('#create-monster')
    const form = document.createElement('form')
    const btn = document.createElement('button')
    const nameInput = document.createElement('input')
    const ageInput = document.createElement('input')
    const desInput = document.createElement('input')
    btn.innerText="Create"
    nameInput.id = 'name'
    nameInput.placeholder = 'name...'
    ageInput.id = 'age'
    ageInput.placeholder = 'age...'
    desInput.id = 'description'
    desInput.placeholder = 'description...'
    form.id = 'monster-form'
    form.append(nameInput, ageInput, desInput, btn)
    createMon.appendChild(form)              
} 
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const toysContainer = document.getElementById("toy-collection")
const toysUrl = 'http://localhost:3000/toys'

fetch(toysUrl)
.then((respObj)=> respObj.json())
.then( toysArray => {
  toysArray.forEach( toyObj => {
    const theDiv = document.createElement('div')
    theDiv.className = 'card'

    const nameElement = document.createElement('h2')
   nameElement.textContent = toyObj.name

   const imageElement = document.createElement('img')
   imageElement.src = toyObj.image
   imageElement.className = 'toy-avatar'

   const likesElement = document.createElement('p')
   likesElement.textContent = `${toyObj.likes} likes`

   const likeBtn = document.createElement('button')
   likeBtn.textContent = 'Like ❤️'
   likeBtn.className = 'like-btn'
   likeBtn.id = toyObj.id



    theDiv.append(nameElement, imageElement, likesElement, likeBtn)
    toysContainer.append(theDiv)
    console.log( theDiv)
  })
  

})
const newToyForm = document.querySelector('form')
  newToyForm.addEventlistener('submit', eventObj => {
    eventObj.preventDefault()

    const newToyObj = {
      name: eventObj.target.name.value,
      image: eventObj.target.image.value,
      likes:0
    }
    fetch( toysUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body:JSON.stringify (newToyObj)

    })
    .then( respObj => respObj.json() )
    .then( aFreshNewToyObj => {
      renderToy(aFreshNewToyObj)
    })
  })
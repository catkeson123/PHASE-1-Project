document.addEventListener("DOMContentLoaded", function () {
  const allDogs = document.querySelector("#allDogs");
  

  fetch("http://localhost:3000/dogs")
    .then((response) => response.json())
    .then((dogs) => {
      console.log(dogs), dogs.forEach(renderDog);
    });

  function renderDog(dog) {
    const card = document.createElement('div')
    const cardh2 = document.createElement('h2')
    cardh2.textContent = dog.name + " ( " + dog.breed + " ) "
    card.append(cardh2)
    const img = document.createElement("img");
    img.src = dog.image;
    img.alt = dog.name; 
    card.append(img)
    const dogDescription = document.createElement('p')
    dogDescription.textContent = "Description: " + dog.description
    card.append(dogDescription)
    const dogAge = document.createElement('p')
    dogAge.textContent = "Age: " + dog.age + " years old" 
    card.append(dogAge)
    const dogGender = document.createElement('p')
    dogGender.textContent = "Gender: " + dog.gender
    card.append(dogGender)
    const dogPersonality = document.createElement('p')
    dogPersonality.textContent = "Personality: " + dog.personality
    card.append(dogPersonality)

    const adoptButton = document.createElement('button')
    adoptButton.textContent = "Adopt Me!"
    card.append(adoptButton)
    


    allDogs.append(card) 
    
  }
});

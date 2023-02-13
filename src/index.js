document.addEventListener("DOMContentLoaded", function () {
  const allDogs = document.querySelector("#allDogs");

  fetch("http://localhost:3000/dogs")
    .then((response) => response.json())
    .then((dogs) => {
      console.log(dogs), dogs.forEach(renderDog);
    });

  function renderDog(dog) {
    const img = document.createElement("img");
    img.src = dog.image;
    img.alt = dog.name;
    allDogs.append(img);
  }
});

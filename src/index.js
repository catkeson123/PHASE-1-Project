document.addEventListener("DOMContentLoaded", function () {
  const allDogs = document.querySelector("#allDogs");
  const postForm = document.querySelector("#posting-form");

  fetch("http://localhost:3000/dogs")
    .then((response) => response.json())
    .then((dogs) => {
      dogs.forEach(renderDog);
    });

  function renderAdoptionForm(dog) {
    const form = document.createElement("form");
    form.id = "form-container";
    const header = document.createElement("h3");
    header.textContent =
      "Ready to adopt " + dog.name + "? Fill out the form below.";
    form.append(header);
    
    const br = document.createElement("br");

    const ownerLabel = document.createElement("label");
    ownerLabel.setAttribute("for", "ownerName");
    ownerLabel.textContent = "Owner: ";
    const ownerName = document.createElement("input");
    ownerName.setAttribute("type", "text");
    ownerName.setAttribute("name", "ownerName");
    ownerName.setAttribute("placeholder", "Your Name");
    form.append(ownerLabel, ownerName, br);

    const petLabel = document.createElement("label");
    petLabel.setAttribute("for", "pet-owner");
    petLabel.textContent = "Are you already a pet owner? ";
    const petOwner = document.createElement("select");
    petOwner.setAttribute("name", "pet-owner");
    const yesOption = document.createElement("option");
    yesOption.setAttribute("value", "yes");
    yesOption.textContent = "Yes";
    const noOption = document.createElement("option");
    noOption.setAttribute("value", "no");
    noOption.textContent = "No";
    petOwner.append(yesOption, noOption);
    form.append(petLabel, petOwner);
    const br2 = document.createElement("br");
    form.append(br2);

    const activityLabel = document.createElement("label");
    activityLabel.setAttribute("for", "activity-level");
    activityLabel.textContent = "What level of activity are you looking for? ";
    const activityLevel = document.createElement("select");
    activityLevel.setAttribute("name", "activity-level");
    const veryActive = document.createElement("option");
    veryActive.setAttribute("value", "very-active");
    veryActive.textContent = "Very Active";
    const moderatelyActive = document.createElement("option");
    moderatelyActive.setAttribute("value", "moderately-active");
    moderatelyActive.textContent = "Moderately Active";
    const lessActive = document.createElement("option");
    lessActive.setAttribute("value", "less-active");
    lessActive.textContent = "Less Active";
    activityLevel.append(veryActive, moderatelyActive, lessActive);
    form.append(activityLabel, activityLevel);
    const br3 = document.createElement("br");
    form.append(br3);

    const submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "Adopt");

    form.append(submit);

    document.getElementsByTagName("body")[0].appendChild(form);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      document.getElementById(dog.id).remove();
      fetch(`http://localhost:3000/dogs/${dog.id}`, {
        method: "DELETE",
      });
      form.remove();
    });
  }

  function renderDog(dog) {
    const card = document.createElement("div");
    card.id = dog.id;
    card.className = "card";

    const cardh2 = document.createElement("h2");
    cardh2.textContent = dog.name + " (" + dog.breed + ")";
    card.append(cardh2);

    const img = document.createElement("img");
    img.src = dog.image;
    img.alt = dog.name;
    img.className = "cardImg";
    card.append(img);

    card.addEventListener("mouseover", (e) => {
      img.src = dog.altImage;
      card.className = "cardAlt";
    });

    card.addEventListener("mouseout", (e) => {
      img.src = dog.image;
      card.className = "card";
    });

    const dogDescription = document.createElement("p");
    dogDescription.innerHTML = "<b>Description: </b>" + dog.description;
    card.append(dogDescription);

    const dogAge = document.createElement("p");
    dogAge.innerHTML = "<b>Age: </b>" + dog.age + " years old";
    card.append(dogAge);

    const dogGender = document.createElement("p");
    dogGender.innerHTML = "<b>Gender: </b>" + dog.gender;
    card.append(dogGender);

    const dogPersonality = document.createElement("p");
    dogPersonality.innerHTML = "<b>Personality: </b>" + dog.personality;
    card.append(dogPersonality);

    const adoptButton = document.createElement("button");
    adoptButton.innerHTML = "<b>Adopt Me!</b>";
    adoptButton.addEventListener("click", () => {
      console.log("click");
      renderAdoptionForm(dog);

      document.querySelector("#footer").scrollIntoView({
        behavior: "smooth",
      });
    });

    card.append(adoptButton);

    allDogs.append(card);
  }

  postForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const dog = {
      name: e.target.dogName.value,
      age: e.target.dogAge.value,
      breed: e.target.dogBreed.value,
      gender: e.target.dogGender.value,
      description: e.target.dogDescription.value,
      personality: e.target.dogPersonality.value,
      image: e.target.dogImage.value,
      altImage: e.target.altImage.value,
    };

    fetch("http://localhost:3000/dogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dog),
    })
      .then((res) => res.json())
      .then((dog) => renderDog(dog));
    postForm.reset();
  });
    
    const dogFactButton = document.querySelector("#dogFactButton");
    const dogFactParagraph = document.querySelector("#dogFactParagraph");
    
    fetch('https://dog-api.kinduff.com/api/facts?number=1')
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      dogFactParagraph.textContent = data.facts[0];
  })

    dogFactButton.addEventListener('click',
    (e) => {
      fetch('https://dog-api.kinduff.com/api/facts?number=1')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        dogFactParagraph.textContent = data.facts[0];
    })
  });
});

const dropdown = document.querySelector("#dropdownBtn");
const countries = document.querySelector(".countries");
const cardContainer = document.querySelector("#cards");
const selectText = document.querySelector('.optionText')

dropdownBtn.addEventListener("click", (e) => {
  // Used ternary operator for smaller code
countries.style.display = countries.style.display === 'block' ? 'none' : 'block';
});

countries.addEventListener("click", (e) => {
    if (e.target.tagName === 'A') { // Ensure user is clicking on a link
        dropdownBtn.setAttribute("value", e.target.innerHTML);
        countries.style.display = "none";
        fetchData(e.target.innerHTML);
        selectText.style.display = 'none';
      }
});

fetch("https://restcountries.com/v3.1/all")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const countryArray = [];
    data.forEach((country) => {
      if (country) {
        countryArray.push(country.name.common);
      }
    });
    countryArray.sort();
    countryArray.forEach((country) => {
      const newChild = document.createElement("a");
      newChild.innerHTML = country;
      countries.appendChild(newChild);
    });
  })
  .catch((err) => {
    alert("Sorry there seems to be some issue with the servers");
  });

async function fetchData(location) {
  try {
    const response = await fetch(`https://api.github.com/search/users?q=location:${location}&page=1&per_page=18`);
    const data = await response.json();
    cardContainer.innerHTML = ''; // Clear existing cards
    data.items.forEach(user => {
      const newCard = document.createElement("div");
      newCard.className = "card";
      newCard.innerHTML = `
        <img src="${user.avatar_url}" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">${user.login}</h5>
          <a href="https://github.com/${user.login}" class="btn btn-primary">Visit Profile</a>
        `;
      cardContainer.appendChild(newCard);
    });
  } catch (err) {
    console.log(err);
  }
}

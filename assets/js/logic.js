const APIkey = "c9f9d4de3b46b94205136311ab9cb999"
const storedUserInputs = JSON.parse(localStorage.getItem('userInputs')) || [];
const submitButton = document.querySelector('button[type="submit"]');
const searchResults = document.getElementById('search-results')


window.onload = function() {
    localStorage.removeItem('userInputs');
    storedUserInputs.length = 0;
    searchResults.innerHTML = '';
};
// Add an event listener to the submit button
submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    // Retrieve the user input text
    const userInput = document.querySelector('input[type="text"]').value;
    document.querySelector('.main-content').innerHTML = '';
    
    // Add the new search to the array of stored user inputs
    storedUserInputs.push(userInput);
    
    // Update local storage with the updated array
    localStorage.setItem('userInputs', JSON.stringify(storedUserInputs));

    document.querySelector('input[type="text"]').value = '';

    // Clear previous buttons
    searchResults.innerHTML = '';


    // Iterate over stored user inputs and create a button for each search
    storedUserInputs.forEach(userInput => {
        const button = document.createElement('button');
        button.textContent = userInput;
        searchResults.appendChild(button);
    });

    searchResults.addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON') {

            document.querySelector('.main-content').innerHTML = '';

        // Check if a card is already displayed
        const existingCard = document.querySelector('.main-content .card');
        if (existingCard) {
            existingCard.remove(); // Remove the existing card
        }
            const searchTerm = event.target.textContent;
            displaySearchData(searchTerm);
        }
    });

    getAPI(userInput);
});

function kelvinToFahrenheit(kelvin) {
    return (kelvin - 273.15) * 9/5 + 32;
}

function getAPI(userInput) {
    let requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=" + APIkey
    
    fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        return data;
    })
    .then(function(data) {
        // Create a card to display the data in the main content section
        const card = document.createElement('div');
        card.classList.add('card');
        
        // Populate the card with data from the API response
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text">Temperature: ${kelvinToFahrenheit(data.main.temp).toFixed(2)} °F</p>
                <p class="card-text">Wind: ${data.wind.speed}mph</p>
                <p class="card-text">Humidity: ${data.main.humidity}%</p>
            </div>
        `;
        
        // Append the card to the main content section
        document.querySelector('.main-content').appendChild(card);
    })
}

function displaySearchData(searchTerm) {

    document.querySelector('.main-content').innerHTML = '';

    const existingCard = document.querySelector('.main-content .card');
    if (existingCard) {
        existingCard.remove(); // Remove the existing card
    }

    getAPI(searchTerm)
    .then(function(data) {
        // Clear previous content in main content section
        document.querySelector('.main-content').innerHTML = '';
        

        // Create a card to display the data in the main content section
        const card = document.createElement('div');
        card.classList.add('card');
        
        // Populate the card with data from the API response
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text">Temperature: ${kelvinToFahrenheit(data.main.temp).toFixed(2)} °F</p>
                <p class="card-text">Wind: ${data.wind.speed}mph</p>
                <p class="card-text">Humidity: ${data.main.humidity}%</p>
            </div>
        `;
        
        // Append the card to the main content section
        document.querySelector('.main-content').appendChild(card);
    });
}




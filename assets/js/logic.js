const APIkey = "c9f9d4de3b46b94205136311ab9cb999"
const storedUserInputs = JSON.parse(localStorage.getItem('userInputs')) || [];
const submitButton = document.querySelector('button[type="submit"]');
const searchResults = document.getElementById('search-results')


// Add an event listener to the submit button
submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    // Retrieve the user input text
    const userInput = document.querySelector('input[type="text"]').value;
    
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
});


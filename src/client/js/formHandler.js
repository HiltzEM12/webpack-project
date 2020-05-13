// Function to handle the DOM click event on the submit button
// Could be included in serverFunction.js but the ruberic required two files
function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    const formText = document.getElementById('name').value

    Client.updateSummary(formText); //Update the UI using the nlp API
    
}

export { handleSubmit }

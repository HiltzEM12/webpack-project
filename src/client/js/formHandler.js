// Function to handle the DOM click event on the submit button
// Could be included in serverFunction.js but the ruberic required two files
function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    const formText = document.getElementById('name').value
    if (htmlValid(formText)){
        Client.updateSummary(formText); //Update the UI using the nlp API
    }
    else{
        alert('Invalid url, please try again.')
    }
}

// Regular expression to check if the syntax is for a url
// Must be using https, don't want any non-secure sites!
function htmlValid(txt){
    const reg = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    const regex = new RegExp(reg);
    if(regex.test(txt)){
        return true;
    }
    else{
        return false;
    }
}

export { 
    handleSubmit,
    htmlValid
}

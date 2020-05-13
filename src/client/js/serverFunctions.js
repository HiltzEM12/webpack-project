
// Function to call the aylien on the server and get the
// statement summary
// The argument here is the statement to analyze
async function updateSummary(data){
    
    //Post to the server with the sentence as an argument
    fetch('http://localhost:8081/nlp', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({'text': data}), // body data type must match 'Content-Type' header        
    })
    .then(res => res.json())  //Process the json
    .then(function(res) { // Apply the results to the DOM
        document.getElementById('txt').innerHTML = 'Text entered: ' + res.text;
        document.getElementById('obj').innerHTML = 'Polarity of the statment: ' + res.polarity;
        document.getElementById('subj').innerHTML = 'Subjectivity of the statment: ' + res.subjectivity;
    })
}

export { 
    updateSummary
}
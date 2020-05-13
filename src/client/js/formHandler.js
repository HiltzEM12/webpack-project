function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    const formText = document.getElementById('name').value

    // Post url from form to the server
    // Client.postUrl('http://localhost:8081/nlp',
    //     {
    //         site: formText
    //     }
    // ).then(function(){
        Client.updateSummary(formText); //Update the UI using the nlp API
    // });

    // fetch('http://localhost:8081/nlp')
    // .then(res => res.json())
    // .then(function(res) {
    //     document.getElementById('results').innerHTML = res.summary
    // })
}

export { handleSubmit }

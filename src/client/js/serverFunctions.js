// // Function to post data to the server
// async function postUrl(url = '', data = {}) {
//     console.log("::: Posting url to server :::", data) // Mark where the proccess is for debugging
//     const response = await fetch(url, {
//         method: 'POST',
//         credentials: 'same-origin',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data), // body data type must match 'Content-Type' header        
//     });

//     try {
//         // Send JSON over to the server
//         const newData = await response.json();
//         return newData;
//     } catch (error) {
//         console.log('error in postUrl()', error);
//     }
// };

// Function to call the aylien on the server and get the
// article summary
async function updateSummary(data){
    console.log("::: Updating the summary data:::") // Mark where the proccess is for debugging

    fetch('http://localhost:8081/nlp', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({'text': data}), // body data type must match 'Content-Type' header        
    })
    .then(res => res.json())
    .then(function(res) {
        //console.log(res); // For debugging
        document.getElementById('txt').innerHTML = 'Text entered: ' + res.text;
        document.getElementById('obj').innerHTML = 'Polarity of the statment: ' + res.polarity;
        document.getElementById('subj').innerHTML = 'Subjectivity of the statment: ' + res.subjectivity;
    })

    // try {
    //     // Send JSON over to the server
    //     const newData = await response.json();
    //     return newData;
    // } catch (error) {
    //     console.log('error in postUrl()', error);
    // }

    // const request = await fetch('http://localhost:8081/nlp');
    // console.log('Prior to json processing',request.json());
    // try {
    //     const newData = await request.json(); // Get the JSON from the server
    //     // Set the divs
    //     console.log(newData);
    //     document.getElementById('results').innerHTML = newData.summary;
    // } catch (error) {
    //     console.log('error in updateSummary()', error);
    // }
}

export { 
    //postUrl,
    updateSummary
}
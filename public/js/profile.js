document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('create-account-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const password = document.getElementById('password').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const usertype = document.getElementById('usertype').value;

        // Send a POST request to the server
        fetch('/users/create-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                usertype: usertype
            })
        })
        
        .then(response => response.json()) // Updated to handle JSON response
        .then(data => {
            alert('Response: ' + data.message); // Assumes the server sends back a JSON object with a message property
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error creating account');
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('create-account-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const password = document.getElementById('password').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const usertype = document.getElementById('usertype').value;

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

            .then(response => response.json())
            .then(data => {
                alert('Response: ' + data.message);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error creating account');
            });
    });
});

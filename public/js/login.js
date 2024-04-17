document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.user_type === 'admin') {
                window.location.href = '/admin_upload.html';
            } else if (data.user_type === 'customer') {
                window.location.href = '/index.html';
            }
        })
        .catch(error => console.error('Error:', error));
});

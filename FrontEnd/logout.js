const logOutButton = document.querySelector('.logout-button');

logOutButton.addEventListener('click', () => {

    localStorage.removeItem('token');
    location.href = 'index.html';
});
const response = await fetch('http://localhost:5678/api/works/');
const works = await response.json();

const boutonFiltrerTous = document.querySelector('.filtre-tous');
const boutonFiltrerObjets = document.querySelector('.filtre-objet');
const boutonFiltrerApartments = document.querySelector('.filtre-appartement');
const boutonFiltrerHotelsAndRestaurants = document.querySelector('.filtre-hotelrestaurant');

const loginButton = document.querySelector('.login-button');
const editionMode = document.querySelector('.edition-mode');
const logoutButton = document.querySelector('.logout-button');

const logOutButton = document.querySelector('.logout-button');

const modal = document.querySelector('.the-modal');
const modifyButton = document.querySelector('.modal-button');
const cross = document.querySelector('.close');
const modal2 = document.querySelector('.the-modal-2');
const addButton = document.querySelector('.add-button');
const cross2 = document.querySelector('.close-2');
const leftArrow = document.querySelector('.back');

const addProject = document.querySelector('.modal-body-2');
const addedPhoto2 = document.querySelector('#imageOutput');

const login = document.querySelector('.login-option-nav');
const loginForm = document.querySelector('#login-form');
const introduction = document.querySelector('#introduction');
const portfolio = document.querySelector('#portfolio');
const contact = document.querySelector('#contact');
const modify = document.querySelector('.modify');
const modify2 = document.querySelector('.modify2');
const filters = document.querySelector('.filters');
const h2 = document.querySelector('.portfolio-h2');

function galleryConstructor(works) {
    for (let i = 0; i < works.length; i++) {
    
        const figure = works[i];

        const divGallery = document.querySelector('.gallery');

        const workElement = document.createElement('figure');

        const imageElement = document.createElement('img');
        imageElement.src = figure.imageUrl;

        const nomElement = document.createElement('figcaption');
        nomElement.innerText = figure.title;

        const categorieIDElement = document.createElement('p');
        categorieIDElement.innerText = figure.category.id;

        const categorienameElement = document.createElement('p');
        categorienameElement.innerText = figure.category.name

        const userElement = document.createElement('p');
        userElement.innerText = figure.userId;

        divGallery.appendChild(workElement);

        workElement.appendChild(imageElement);
        workElement.appendChild(nomElement);
        workElement.appendChild(categorieIDElement);
        workElement.appendChild(categorienameElement)
        workElement.appendChild(userElement);
    };
};
galleryConstructor(works);

boutonFiltrerTous.addEventListener('click', function () {
    document.querySelector('.gallery').innerHTML = '';
    galleryConstructor(works);
});

boutonFiltrerObjets.addEventListener('click', function () {
    const objetsFiltres = works.filter(function (work) {
        return work.category.name === 'Objets';
    });
    document.querySelector('.gallery').innerHTML = '';
    galleryConstructor(objetsFiltres);
});

boutonFiltrerApartments.addEventListener('click', function () {
    const apartmentsFiltres = works.filter(function (work) {
        return work.category.name === 'Appartements';
    });
    document.querySelector('.gallery').innerHTML = '';
    galleryConstructor(apartmentsFiltres);
});

boutonFiltrerHotelsAndRestaurants.addEventListener('click', function () {
    const hotelAndRestaurantFiltres = works.filter(function (work) {
        return work.category.name === 'Hotels & restaurants';
    });
    document.querySelector('.gallery').innerHTML = '';
    galleryConstructor(hotelAndRestaurantFiltres);
});

login.addEventListener('click', function () {
    introduction.style.display = 'none';
    portfolio.style.display = 'none';
    contact.style.display = 'none'
    filters.style.display = 'none';
    login.style.fontWeight = 'bolder';

    loginForm.style.display = 'flex';
});

loginButton.addEventListener('click', async function connect(e) {
    e.preventDefault();

    const emailAddress = document.getElementById('Email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'email': emailAddress,
                'password': password,
            })
        });

        if (!response.ok) {
            throw Error('Error');
        };

        const responseBody = await response.json();
        const token = responseBody.token;

        localStorage.setItem('token', token);

        if (emailAddress === 'sophie.bluel@test.tld') {
            logoutButton.style.display = 'inline';
            login.style.display = 'none';
            loginForm.style.display = 'none';
            introduction.style.display = 'flex';
            portfolio.style.display = 'block';
            contact.style.display = 'block'
            editionMode.style.display = 'flex';
            modify.style.display = 'block';
            modify2.style.display = 'block';
            h2.style.paddingLeft = '5rem';
            document.querySelector('.gallery').innerHTML = '';
            galleryConstructor(works);
        } else {
            location.href = 'index.html';
        };
    }

    catch (Error) {
        document.getElementById('error').style.display = 'block';
    };
});

logOutButton.addEventListener('click', () => {

    localStorage.removeItem('token');
    location.href = 'index.html';
});

modifyButton.addEventListener('click', function () {
    modal.style.display = 'block';
});

cross.addEventListener('click', function () {
    modal.style.display = 'none';
});

window.addEventListener('click', function (e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    };
});

addButton.addEventListener('click', function () {
    modal2.style.display = 'block';
    addProject.reset();
});

leftArrow.addEventListener('click', function () {
    modal2.style.display = 'none'
    modal.style.display = 'block';
});

cross2.addEventListener('click', function () {
    modal2.style.display = 'none';
    modal.style.display = 'none';
});

window.addEventListener('click', function (e) {
    if (e.target == modal2) {
        modal2.style.display = 'none';
        modal.style.display = 'none';
    };
});

function modalGalleryConstructor(works) {

    for (let i = 0; i < works.length; i++) {

        const figure = works[i];

        const modalBody = document.querySelector('.modal-body');

        const workElement = document.createElement('figure');

        const divElement = document.createElement('div');
        divElement.classList.add('divElement');
        divElement.style.position = 'relative';
        divElement.style.height = '11.5rem';

        const divImage = document.createElement('div');

        const imageElement = document.createElement('img');
        imageElement.style.display = 'block';
        imageElement.style.position = 'absolute';
        imageElement.src = figure.imageUrl;

        const deleteWork = document.createElement('div');
        deleteWork.classList.add('deleteTag');
        deleteWork.insertAdjacentHTML('beforeend', '<i class="fa-solid fa-trash-can"></i>')
        deleteWork.style.position = 'absolute';
        deleteWork.addEventListener('click', (e) => deleteEventListener(works[i]));
        deleteWork.setAttribute('id', i);
        deleteWork.addEventListener('click', (e) => deleteEventListener(works[i]));

        const pElement = document.createElement('figcapion');
        const textEdit = document.createTextNode('edit');

        modalBody.appendChild(workElement);

        workElement.appendChild(divElement);
        workElement.appendChild(pElement);

        divElement.appendChild(divImage);
        divElement.appendChild(deleteWork);

        divImage.appendChild(imageElement);

        pElement.appendChild(textEdit);
    };
};
modalGalleryConstructor(works);

function deleteEventListener(work) {
    fetch('http://localhost:5678/api/works/' + work.id, {
        method: 'DELETE',
        headers: {
            accept: '*/*',
            Authorization: 'Bearer ' + localStorage.getItem('token')
        } 
    })
    .then(async (response) =>  {
        const responseBody = await fetch('http://localhost:5678/api/works/');
        const works = await responseBody.json();

        if (response.ok) {
            // modal2.style.display = 'none';
            // modal.style.display = 'none';
            document.querySelector('.gallery').innerHTML = '';
            document.querySelector('.modal-body').innerHTML = '';
            galleryConstructor(works);
            modalGalleryConstructor(works);
        } else {
            throw Error('Error');
        } 
    })
    .catch((Error) => {
        console.log('Try again!');
    });
};

imageInput.onchange = evt => {
    const addedPhoto = document.getElementById('imageInput').files[0];

    const btn0 = document.querySelector('.btn-0');
    const icon = document.querySelector('.fa-image');
    const formatImg = document.querySelector('.formatImg');
    const photoFormat = document.querySelector('.photo-added');
    const validate = document.querySelector('#validate-button');

    if (addedPhoto) {
        document.getElementById('imageOutput').src = URL.createObjectURL(addedPhoto);
        imageOutput.style.display = 'block';
        btn0.style.display = 'none';
        icon.style.display = 'none';
        formatImg.style.display = 'none';
        photoFormat.style.padding = '0rem';
        validate.style.backgroundColor = '#1D6154';
    };

    addButton.addEventListener('click', function () {
        document.getElementById('imageOutput').src = URL.createObjectURL(addedPhoto);

        btn0.style.display = 'block';
        icon.style.display = 'block';
        formatImg.style.display = 'block';
        photoFormat.style.padding = '2rem';
        imageOutput.style.display = 'block';
        modal2.style.display = 'block';
        addProject.reset();
        addedPhoto2.style.display = 'none';
        document.querySelector('.upload-success').style.display = 'none';
    }); 
};

addProject.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData();

    const addedPhoto = document.getElementById('imageInput').files[0];
    const addedTitle = document.getElementById('added-title').value;
    const addedCategory = document.getElementById('added-category').value;

    formData.append('image', addedPhoto);
    formData.append('title', addedTitle);
    formData.append('category', addedCategory);

    try {
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            body: formData
        });

        if (!response.ok) {
            throw Error('Error');
        };

        //modal.style.display = 'none';
        modal2.style.display = 'none';
        /*const addedPhoto = document.getElementById('imageInput').files[0];
        const btn0 = document.querySelector('.btn-0');
        const icon = document.querySelector('.fa-image');
        const formatImg = document.querySelector('.formatImg');
        const photoFormat = document.querySelector('.photo-added'); */

        document.getElementById('imageOutput').src = URL.createObjectURL(addedPhoto);

        /*btn0.style.display = 'block';
        icon.style.display = 'block';
        formatImg.style.display = 'block';
        photoFormat.style.padding = '2rem';
        imageOutput.style.display = 'block';
        modal2.style.display = 'block';
        addProject.reset();
        addedPhoto2.style.display = 'none';*/

        document.querySelector('.upload-success').style.display = 'block';

        const responseBody = await fetch('http://localhost:5678/api/works/');
        const works = await responseBody.json();
        
        document.querySelector('.gallery').innerHTML = '';
        document.querySelector('.modal-body').innerHTML = '';

        galleryConstructor(works);
        modalGalleryConstructor(works);
    }

    catch (Error) {
        document.querySelector('.error-2').style.display = 'block';
    };
});
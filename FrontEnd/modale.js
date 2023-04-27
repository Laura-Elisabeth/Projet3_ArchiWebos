// first page of the modal:

// get the modal
const modal = document.querySelector(".the-modal");

// get the button that opens the modal
const modifyButton = document.querySelector(".modal-button");

// get the <span> element that closes the modal 
const cross = document.querySelector(".close");

// When the user clicks on the modify button, this opens the modal 
modifyButton.addEventListener("click", function () {
    modal.style.display = "block";
});

// When the user clicks on the span element ('x'), the modal closes thanks to:
cross.addEventListener("click", function () {
    modal.style.display = "none";
});

// closes the modal if user clicks anywhere outside the modal box, why is it e.target and not !e.target ? 
window.addEventListener("click", function(e) {
    if (e.target == modal) {
        modal.style.display = "none";
    };
}); 

const response = await fetch('http://localhost:5678/api/works/', {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    },
                });  

const works = await response.json(); 

const genererWorks = (works) => {

    for (let i = 0; i < works.length; i++) { 

		const figure = works[i];

		const modalBody = document.querySelector(".modal-body");
        modalBody.style.gap = '1.5rem';

		const workElement = document.createElement("figure");

        const divElement = document.createElement('div');
        divElement.style.position = "relative";
        divElement.style.height = '9rem';
        divElement.style.gap = '1.5rem';
        
		const imageElement = document.createElement("img");
        imageElement.style.display = 'block';
        imageElement.style.position = 'absolute';
		imageElement.src = figure.imageUrl;   

        const deleteWork = document.createElement('div');
        deleteWork.classList.add('delete-tag');
        deleteWork.insertAdjacentHTML("beforeend", '<i class="fa-solid fa-trash-can"></i>')
        deleteWork.style.position = 'absolute'; 

        const pElement = document.createElement('p');
		const textEdit = document.createTextNode('edit');
        pElement.style.position = 'absolute';
        
        modalBody.appendChild(workElement);

		workElement.appendChild(divElement);
        workElement.appendChild(pElement);

        divElement.appendChild(imageElement);
        divElement.appendChild(deleteWork);

		pElement.appendChild(textEdit);      
    };
};
genererWorks(works);

// Second page of the modal:

const modal2 = document.querySelector(".the-modal-2");

const addButton = document.querySelector(".add-button");

const cross2 = document.querySelector('.close-2');

const back = document.querySelector('.back');

addButton.addEventListener('click', function () {
    modal2.style.display = 'block';
});

back.addEventListener('click', function () {
    modal2.style.display = 'none'
    modal.style.display = 'block';
});

cross2.addEventListener("click", function () {
    modal2.style.display = "none";
    modal.style.display = "none";
});

window.addEventListener("click", function(e) {
    if (e.target == modal2) {
        modal2.style.display = "none";
        modal.style.display = "none";
    };
});

//////////////////////////////////////////////

// deletes work 

const deleteProject = document.querySelector('.delete-tag');
console.log(deleteProject)
let id = 0;
console.log(id);
for (let i = 0; i < deleteProject.length; i++) { 
    deleteProject[i].addEventListener('click', (e) => {
        const workId = works.map(work => work.id);
        id = workId[i];
        fetch('http://localhost:5678/api/works/${id}', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
        })
    });
};

// sends the data 

// displays uploaded images on the second page of the modal 

imageInput.onchange = evt => {
    const addedPhoto = document.getElementById("imageInput").files[0];
    const btn0 = document.querySelector('.btn-0');
    const icon = document.querySelector('.fa-image');
    const formatImg = document.querySelector('.formatImg');

    if (addedPhoto) {
        document.getElementById('imageOutput').src = URL.createObjectURL(addedPhoto);
        imageOutput.style.display = 'block';
        btn0.style.display = 'none';
        icon.style.display = 'none';
        formatImg.style.display = 'none';
    };
}

/* to do: 
         - add option to empty form when closing window or sending form infos*/ 


// sends new work

const form = document.querySelector('.modal-body-2');

form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData();

    const addedPhoto = document.getElementById('imageInput').files[0];
    const addedTitle = document.getElementById('added-title').value;
    const addedCategory = document.getElementById('added-category').value;

    console.log(addedPhoto); 
    console.log(addedTitle);
    console.log(addedCategory); 

    formData.append('image', addedPhoto);
    formData.append('title', addedTitle);
    formData.append('category', addedCategory);

    console.log(formData);
    

    try {
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            body: formData
        });

        if (!response.ok) {
            throw Error("oooopsi");
        }; 

        console.log(response);
        modal2.style.display = "none";
        modal.style.display = "none";
        response = await fetch('http://localhost:5678/api/works/');
        const works = await response.json();

        genererWorks(works);
    }

    catch(Error) {
        document.querySelector('.erreeeuuur').style.display = "block";
    };
}); 

/*
    - display new work dynamically; 
    - add possibility to send the form infos by clicking the enter button 
    - afterwards, create a function to delete the work (calling the API one more time);
    - then, make sure the admin/user problem has been understood and fixed; 
    - and finally, clean and re-read everthing. fix mistakes, make it prettier etc. 
                                                                                            
    */

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

const response = await fetch('http://localhost:5678/api/works/');
const works = await response.json(); 

function genererWorks(works){
	for (let i = 0; i < works.length; i++) {

		const figure = works[i];

		const modalBody = document.querySelector(".modal-body");

		const workElement = document.createElement("figure");

		const imageElement = document.createElement("img");
		imageElement.src = figure.imageUrl;   

        document.getElementById("editfig").style.display = "block";
        
        const editFig = document.getElementById("editfig");

        modalBody.appendChild(workElement);

		workElement.appendChild(imageElement);

        workElement.appendChild(editFig);
    };
};

genererWorks(works);

/* to do : 1. Modification buttons displayed on the pictures.
           2. Check if there's a possibility to display the 
              edit p underneath the photos without displaying
              them 11 times in the html file.
           3. add possibility to send the form infos with button
              (ok) AND clicking on enter button (still to do)
*/

////////////////////////////////////////////////////////////

// Second page of the modal:

const modal2 = document.querySelector(".the-modal-2");

const addButton = document.querySelector(".add-button");

addButton.addEventListener("click", function () {
    modal2.style.display = "block";
});

// not working
cross.addEventListener("click", function () {
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
// sends the data 

const validateButton = document.querySelector(".validate-button");

validateButton.addEventListener("click", async function(e) {
    e.preventDefault();

    const addedPhoto = document.getElementById("added-photo").value;
    const addedTitle = document.getElementById("added-title").value;
    const addedCategory = document.getElementById("added-category").value;

    const response = await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4',
            'Content-Type' : 'multipart/form-data'
        },
        body: JSON.stringify({
            'image' : 'addedPhoto',
            'title' : 'addedTitle',
            'category' : 'addedCategory', 
        })
    });

    genererWorks(works);
});

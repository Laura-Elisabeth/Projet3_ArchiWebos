// Récupération des travaux qu'on a listé dans le fichier JSON)
const response = await fetch('http://localhost:5678/api/works/');
const works = await response.json(); 

function genererWorks(works){
	for (let i = 0; i < works.length; i++) {

		const figure = works[i];

		const divGallery = document.querySelector(".gallery");

		const workElement = document.createElement("figure");

		const imageElement = document.createElement("img");
		imageElement.src = figure.imageUrl;

		const nomElement = document.createElement("figcaption");
		nomElement.innerText = figure.title;

		const categorieIDElement = document.createElement("p");
		categorieIDElement.innerText = figure.category.id;

		const categorienameElement = document.createElement("p");
		categorienameElement.innerText = figure.category.name

		const userElement = document.createElement("p");
		userElement.innerText = figure.userId;

		divGallery.appendChild(workElement);

		workElement.appendChild(imageElement);
		workElement.appendChild(nomElement);
		workElement.appendChild(categorieIDElement);
		workElement.appendChild(categorienameElement)
		workElement.appendChild(userElement);
	};
};

genererWorks(works);

// Bouton Filtre show all 
const boutonFiltrerTous = document.querySelector(".filtre-tous"); 

boutonFiltrerTous.addEventListener("click", function () {
	document.querySelector(".gallery").innerHTML = "";
	genererWorks(works);
});

// Bouton Filtre show objects only 
const boutonFiltrerObjets = document.querySelector(".filtre-objet"); 

boutonFiltrerObjets.addEventListener("click", function () {
	const objetsFiltres = works.filter(function (work) {
		return work.category.name == "Objets" ;
	});
	document.querySelector(".gallery").innerHTML = "";
	genererWorks(objetsFiltres);
});

// Bouton Filtre show Apartments only 
const boutonFiltrerApartments = document.querySelector(".filtre-appartement"); 

boutonFiltrerApartments.addEventListener("click", function () {
	const apartmentsFiltres = works.filter(function (work) {
		return work.category.name == "Appartements";
	});
	document.querySelector(".gallery").innerHTML = "";
	genererWorks(apartmentsFiltres);
});

// Bouton Filtre show Hôtels et Restaurants
const boutonFiltrerHotelsAndRestaurants = document.querySelector(".filtre-hotelrestaurant"); 

boutonFiltrerHotelsAndRestaurants.addEventListener("click", function () {
	const hotelAndRestaurantFiltres = works.filter(function (work) {
		return work.category.name == "Hotels & restaurants";
	});
	document.querySelector(".gallery").innerHTML = "";
	genererWorks(hotelAndRestaurantFiltres);
});


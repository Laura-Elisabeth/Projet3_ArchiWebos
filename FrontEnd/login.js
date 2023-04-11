const loginButton = document.querySelector(".login-button")

loginButton.addEventListener("click", async function (e) {
    e.preventDefault();

    const emailAddress = document.getElementById("Email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer token',
            },
            body: JSON.stringify({
                'email': emailAddress,
                'password': password, /* quand clé=valeur, on enlève les guillemets et on l'écrit une fois */
            })
        });

        /* const token = await response.token;
        localStorage.getItem('token');
        localStorage.setItem('token'); */

        /* let tokens = localStorage.getItem('token');
        tokens = await response.json();
        const valeurToken = JSON.stringify(tokens);
        localStorage.setItem('token', valeurToken); 
        console.log(tokens) */ 

        /* const token = await response.text();
        console.log(token); */

        if (!response.ok) {
            throw Error("oooopsi");
        }; 

        /* const token = await response.text();
        console.log(token); */

        /* const token = document.createElement("div");
        token.innerText = div.token */
        
        /* const token = response.text();
        this.token = token;
        if(token){
            
        }; */
        // l'administrateur peut avoir un compte admin et un utilisateur avec la même adresse. Dans ce cas, comment faire pour redirigier vers la bonne version du site ? Ci-dessous, redirection vers la page adaptée seulement si l'admin n'a pas de compte utilisateur 

        if(emailAddress === "sophie.bluel@test.tld"){
            location.href = "homepage-edit.html";
        }else{
            location.href = "index.html";
        };
    }

    catch (Error) {
        document.getElementById("erreeur").style.display = "block";
       // alert("ERREUR"); autre possibibilité 
    }
})

// stocké le token pour rester connecté, OK?
// pouvoir être connecté en tant qu'administrateur, OK?
// renvoyé l'administrrateur vers la page d'accueil d'administrateur (3ème partie de la maquette Figma) OK?

const logoutButton = document.querySelector("login-option-nav")

/*
INSÉRER ICI UNE FONCTION QUI DECONNCETE UTILISATEUR/ADMIN
*/
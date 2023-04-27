const loginButton = document.querySelector('.login-button');

loginButton.addEventListener("click", async function connect(e) {
    e.preventDefault();

    const emailAddress = document.getElementById("Email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'email': emailAddress,
                'password': password, /* quand clé=valeur, on enlève les guillemets et on l'écrit une fois */
            })
        });

        if (!response.ok) {
            throw Error("oooopsi");
        }; 

        const responseBody = await response.json();
        const token = responseBody.token;
        
        localStorage.setItem('token', token); 

        // l'administrateur peut avoir un compte admin et un utilisateur avec la même adresse. Dans ce cas, comment faire pour redirigier vers la bonne version du site ? Ci-dessous, redirection vers la page adaptée seulement si l'admin n'a pas de compte utilisateur 

        if(emailAddress === "sophie.bluel@test.tld"){
            location.href = "homepage-edit.html";
        }else{
            location.href = "index.html";
        };
 
    }

    catch (Error) {
        document.getElementById('erreeur').style.display = "block";
    };
});


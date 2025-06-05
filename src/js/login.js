//Kör funktionen att kolla om token finns vid inladdning av sida
window.onload = checkToken;


//Funktion för att kolla om token redan finns och användaren är inloggad
async function checkToken() {
    //Hämta token från localStorage
    let token = localStorage.getItem("token");
    //Om token finns kontrolleras det om den stämmer
    if (token) {
        let newResponse = await fetch('https://backend-projekt-k6hc.onrender.com/api/secret', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'

            }
        });

        //Om token stämmer visas inte inloggningen utan det hemliga innehållet på sidan
        if (newResponse.ok) {
            document.getElementById("secret-content").style.display = "block";
            document.getElementById("anställd-content").style.display = "none";

            //Om token inte stämmer visas inloggning och token tas bort från localStorage
        } else {
            document.getElementById("secret-content").style.display = "none";
            document.getElementById("anställd-content").style.display = "block";
            localStorage.removeItem("token");

            //Om token inte finns visas inloggning
        }
    } else {
        document.getElementById("secret-content").style.display = "none";
        document.getElementById("anställd-content").style.display = "block";
    }
}


//Funktion för inloggning för en användare
async function loginEmployee(event) {
    //Hindrar formuläret från att ladda om
    event.preventDefault();

    //Hämta användarnamn och lösenord från inloggningsformulär
    let username = document.getElementById("login-username");
    let password = document.getElementById("login-password");
    let error = document.getElementsByClassName("error-p");

    let users = {
        username: username.value,
        password: password.value
    };

    //Koppla till POST-anrop för inloggning
    try {
        //Koppla till API
        let response = await fetch('https://backend-projekt-k6hc.onrender.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(users)
        });

        //Sätter svaret från anropet till data
        let data = await response.json();


        //Om det finns något meddelande eller error-meddelande i data visas det
        if (data.message) {
            error.innerText = `${data.message}`;
        } else if (data.error) {
            error.innerText = `${data.error}`
        }

        //Om allt är ok sparas token till local storage och hemligt innehåll hämtas
        if (response.ok) {
            localStorage.setItem("token", data.response.token);

            let newResponse = await fetch('https://backend-projekt-k6hc.onrender.com/api/secret', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + data.response.token,
                    'Content-Type': 'application/json'
                }
            });

            //Om allt stämmer visas den skyddade sidan
            if (newResponse.ok) {
                document.getElementById("secret-content").style.display = "block";
                document.getElementById("anställd-content").style.display = "none";

            }

            //Om något går fel visas ett felmeddelande
        } else {
            alert("Inloggningen misslyckades, kontrollera användarnamn och lösenord")
        }

        //Om något går fel med hämtningen av data visas felmeddelande
    } catch (err) {
        console.error("Något gick fel vid inloggning", err);
        alert("Något gick fel vid inloggning, försök igen")
    }

}

//Hämta inloggningsknapp från formulär
let loginButton = document.getElementById("login-button");

//Lägger till funktion på knappen
loginButton.onclick = loginEmployee;

//Hämta in knapp för att logga ut
let logOutButton = document.getElementById("logout-button");
//Lägger till funktion för att logga ut på knappen
logOutButton.onclick = logOut;

//Funktion för att logga ut
function logOut() {
    //Tar bort token från localStorage
    localStorage.removeItem("token");
    //Hemligt innehåll visas inte och inloggningssidan visas istället
    document.getElementById("secret-content").style.display = "none";
    document.getElementById("anställd-content").style.display = "block";

}


//Kör funktionen att kolla om token finns vid inladdning av sida
window.onload = checkToken;

//Funktion för att kolla om token redan finns och användaren är inloggad
async function checkToken() {
    //Hämta token från localStorage
let token = localStorage.getItem("token");
//Om token finns kontrolleras det om den stämmer
if(token) {
     let newResponse = await fetch('http://localhost:3001/api/secret', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            
        }});

        //Om token stämmer visas inte inloggningen utan innehållet på sidan
         if (newResponse.ok) {
            document.getElementById("secret-content").style.display = "block";
            
            //Om token inte stämmer visas inloggning och token tas bort från localStorage
        } else {
            document.getElementById("secret-content").style.display = "none";
        localStorage.removeItem("token");
            
        //Om token inte finns visas inloggning
    } }  else {

        document.getElementById("secret-content").style.display = "none";
}    
}


//Funktion för inloggning för en användare
async function loginEmployee(event) {
    event.preventDefault();

    //Hämta användarnamn och lösenord från inloggningsformulär
    let username = document.getElementById("login-username");
    let password = document.getElementById("login-password");

    let users = {
        username: username.value,
        password: password.value 
    };

    //Koppla till POST-anrop för inloggning
    try {
        //Koppla till API
        let response = await fetch('http://localhost:3001/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(users)
        });
        
        let data = await response.json();

        //Om allt är ok sparas token till local storage och hemligt innehåll hämtas
        if(response.ok) {
            localStorage.setItem("token", data.response.token);

            let newResponse = await fetch('http://localhost:3001/api/secret', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + data.response.token,
                    'Content-Type': 'application/json'
                }
            });

            //Om allt stämmer visas den skyddade sidan
            if (newResponse.ok) {
                document.getElementById("secret-content").style.display = "block";
            }

        } else {
            alert("Inloggningen misslyckades, kontrollera användarnamn och lösenord")
        }

    } catch (err) {
        console.error("Något gick fel vid inloggning");
        alert("Något gick fel vid inloggning, försök igen")
    }
    
}

//Hämta inloggningsknapp från formulär
let loginButton = document.getElementById("login-button");

//Lägger till funktion på knappen
loginButton.onclick = loginEmployee;
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
            document.getElementById("anställd-content").style.display = "none";
            postMenu();
            
            //Om token inte stämmer visas inloggning och token tas bort från localStorage
        } else {
            document.getElementById("secret-content").style.display = "none";
            document.getElementById("anställd-content").style.display = "block";
        localStorage.removeItem("token");
            
        //Om token inte finns visas inloggning
    } }  else {

        document.getElementById("secret-content").style.display = "none";
        document.getElementById("anställd-content").style.display = "block";
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
                document.getElementById("anställd-content").style.display = "none";
                postMenu();
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

//Funktion för att publicera menyn
async function postMenu() {
    //Hämtar in list-element från HTML
    let menuList = document.getElementById("menu-list");

    //Tömmer listan så det inte blir dubbletter
    menuList.innerHTML="";

    //Hämtar in information från API och databasen som ska publiceras
    let response = await fetch('http://localhost:3001/api/menu', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    
    let data = await response.json();
    let info = data.rows;
    console.log(data.rows);

    //För varje rad i databasen ska ett li-element skapas i listan som visar informationen
    info.forEach(input => {
        //Skapar ett li-element
        let li = document.createElement("li");
        li.innerHTML = `<h3 id="post-h3"> ${input.drinkname}, ${input.price}</h3> <br> <p> Beskrivning: ${input.description} <br> ${input.allergens} </p>`

        //Lägger till li-element 
        menuList.appendChild(li);

    });
}
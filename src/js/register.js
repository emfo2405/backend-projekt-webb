//Funktion för att lägga till en ny användare i databasen
async function addEmployee(event) {
    event.preventDefault();

    let username = document.getElementById("username");
    let password = document.getElementById("password");
    let email = document.getElementById("email");

    //Hämtar de inmatade värdena från formuläret
    let users = {
        username: username.value,
        password: password.value,
        email: email.value
    }

    try {
        let response = await fetch('http://localhost:3001/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(users)
        });

        let data = await response.json();

        if (data.error === 'Användarnamn ska vara ifyllt och minst 5 tecken långt') {
            alert("Användarnamn ska vara ifyllt och minst 5 tecken långt")
        } else if (data.error === 'Lösenord ska vara ifyllt och minst 8 tecken långt') {
            alert("Lösenordet ska vara ifyllt och minst 8 tecken långt")
        } else if (data.error === 'E-post ska vara ifyllt') {
            alert("E-postadress måste vara ifylld")
        } else if (data.message === 'Användarnamn eller e-post finns redan') {
            alert("Användaren är redan registrerad, testa med ett nytt användarnamn eller e-postadress")
        } else if (data.message === 'Användare skapad') {
            alert("Användaren skapad");
        }

    } catch (err){
        console.error("Registreringen misslyckades")
    }

}

//Hämta in knapp från formuläret
let submitButton = document.getElementById("submit-button");

//Lägga till funktionen på knappen
submitButton.onclick = addEmployee;
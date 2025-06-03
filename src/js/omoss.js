//Funktion för att lägga till ett meddelande i kontaktformulär

async function addMessage(event) {
    event.preventDefault();

    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let message = document.getElementById("message");

    //Hämtar värden inmatade i formuläret
    let contact = {
        name: name.value,
        email: email.value,
        message: message.value 
    }

    try {

    //Koppla till API och lägga till den nya datan
    let response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
    });

    let data = await response.json();

    console.log(data);


} catch (err) {
    console.error("Meddelandet misslyckades")
}}

//Hämtar formulär-knapp för att lägga till information
let contactButton = document.getElementById("contact-button");

//Funktion för att lägga till i databasen körs när man klickar på knappen
contactButton.onclick = addMessage;
//Funktion för att lägga till ett meddelande i kontaktformulär

async function addMessage(event) {
    //Hindrar formuläret från att ladda om
    event.preventDefault();
    //Hämtar in formulär-element
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let message = document.getElementById("message");
    let error = document.getElementById("error-p");

    //Hämtar värden inmatade i formuläret
    let contact = {
        name: name.value,
        email: email.value,
        message: message.value
    }

    try {

        //Koppla till API och lägga till den nya datan
        let response = await fetch('https://backend-projekt-k6hc.onrender.com/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        });
        //Sparar data till variabeln data
        let data = await response.json();

        //Om det finns meddelanden eller error-meddelanden skrivs de ut
        if (data.message) {
            error.innerText = `${data.message}`;
        } else if (data.error) {
            error.innerText = `${data.error}`
        }

        if(name.value && email.value && message.value) {
            document.getElementById("contactForm").reset();
        }
        

        //Om något går fel visas felmeddelande
    } catch (err) {
        console.error("Meddelandet misslyckades")
    }
}

//Hämtar formulär-knapp för att lägga till information
let contactButton = document.getElementById("contact-button");

//Funktion för att lägga till i databasen körs när man klickar på knappen
contactButton.onclick = addMessage;
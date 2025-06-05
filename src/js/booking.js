//Funktion för att lägga till en bokning i bokningsformuläret

//Funktion för att hämta information från ett formulär och posta data i databasen
async function addBooking(event) {
    //Hindrar formuläret från att ladda om
    event.preventDefault();

    //Hämta in formulärelementen från webbsidan
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let date = document.getElementById("date");
    let time = document.getElementById("time");
    let message = document.getElementById("message");
    let error = document.getElementById("error-p")

    //Hämtar värden inmatade i formuläret
    let booking = {
        name: name.value,
        email: email.value,
        date: date.value,
        time: time.value,
        message: message.value
    }



    try {

        //Koppla till API och lägga till den nya datan
        let response = await fetch('http://localhost:3001/api/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(booking)
        });

        //Data sätts till det som fås från API
        let data = await response.json();

        //Om det finns ett meddelande eller error-meddelande skrivs det ut på webbplatsen
        if (data.message) {
            error.innerText = `${data.message}`;
        } else if (data.error) {
            error.innerText = `${data.error}`
        }

        //Om något går fel visas ett error-meddelande i konsollen
    } catch (err) {
        console.error("Bokningen misslyckades")
    }
}

//Hämtar formulär-knapp för att lägga till information
let bookingButton = document.getElementById("booking-button");

//Funktion för att lägga till i databasen körs när man klickar på knappen
bookingButton.onclick = addBooking;

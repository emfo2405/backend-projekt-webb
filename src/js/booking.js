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
        let response = await fetch('https://backend-projekt-k6hc.onrender.com/api/booking', {
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

        if (name.value && email.value && date.value && time.value && data.message != "Se till att en tid är vald och inom våra öppettider") {
            document.getElementById("bookingForm").reset();
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

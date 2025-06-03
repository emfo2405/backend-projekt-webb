//Funktion för att lägga till en bokning

async function addBooking(event) {
    event.preventDefault();

    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let date = document.getElementById("date");
    let time = document.getElementById("time");
    let message = document.getElementById("message");

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

    let data = await response.json();

    console.log(data);


} catch (err) {
    console.error("Bokningen misslyckades")
}}

//Hämtar formulär-knapp för att lägga till information
let bookingButton = document.getElementById("booking-button");

//Funktion för att lägga till i databasen körs när man klickar på knappen
bookingButton.onclick = addBooking;

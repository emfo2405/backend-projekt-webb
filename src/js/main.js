//När sidan laddas kör funktionen för att visa menyn
window.onload = postMenuCustomers();

//Funktion för att publicera menyn för kunder
async function postMenuCustomers() {
    //Hämtar in list-element från HTML
    let menuColdCoffee = document.getElementById("kall-kaffe");
    let menuWarmCoffee = document.getElementById("varm-kaffe");
    let menuColdOthers = document.getElementById("kall-övrigt");
    let menuWarmOthers = document.getElementById("varm-övrigt");

    //Tömmer listan så det inte blir dubbletter
    menuColdCoffee.innerHTML = "";
    menuWarmCoffee.innerHTML = "";
    menuColdOthers.innerHTML = "";
    menuWarmOthers.innerHTML = "";

    //Hämtar in information från API och databasen som ska publiceras
    let response = await fetch('https://backend-projekt-k6hc.onrender.com/api/menu', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    //Väntar på svar från hämtning av data från API och sätter till data
    let data = await response.json();
    //Tar ut raderna i svaret från API
    let info = data.rows;

    //För varje rad i databasen ska ett li-element skapas i listan som visar informationen
    info.forEach(input => {

        //Skapar ett li-element
        let li = document.createElement("li");
        //Sätter struktur för li-element där data visas från API
        li.innerHTML = `<h3 id="post-h3"> ${input.drinkname}, ${input.price} kr</h3> <br> <p> Beskrivning: ${input.description} <br> Allergener: ${input.allergens} </p>`

        //Lägger till li-element under olika rubriker beroende på dryckens typ
        if (input.drinktype === "Kalla kaffedrycker") {
            menuColdCoffee.appendChild(li);
        } else if (input.drinktype === "Varma kaffedrycker") {
            menuWarmCoffee.appendChild(li);
        } else if (input.drinktype === "Övriga varma drycker") {
            menuWarmOthers.appendChild(li);
        } else if (input.drinktype === "Övriga kalla drycker") {
            menuColdOthers.appendChild(li);
        }


    });
}
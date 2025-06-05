//Kör funktionerna postBooking, postMessage och postMenu
postBooking();
postMessage();
postMenu();

//Funktion för att publicera menyn för anställda
async function postMenu() {
    //Hämtar in list-element från HTML
    let menuList = document.getElementById("menu-list");

    //Tömmer listan så det inte blir dubbletter
    menuList.innerHTML = "";

    //Hämtar in information från API och databasen som ska publiceras
    let response = await fetch('https://backend-projekt-k6hc.onrender.com/api/menu', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    //Låter variabeln data få svaret från API
    let data = await response.json();
    //Tar ut raderna i data
    let info = data.rows;

    //För varje rad i databasen ska ett li-element skapas i listan som visar informationen
    info.forEach(input => {
        //Tar ut produktens id-nummer
        let productId = input.id;
        //Skapar ett li-element
        let li = document.createElement("li");
        //Skapar knappar för att radera eller uppdatera produkt
        let deleteButton = document.createElement("button");
        let updateButton = document.createElement("button");
        //Sätter text på knapparna
        deleteButton.innerText = "Ta bort produkt";
        updateButton.innerText = "Uppdatera produkt";
        //Sätter id på en knapp
        updateButton.id = "updateButton"
        //Sätter funktioner på knapparna för att kunna radera eller uppdatera produkt
        deleteButton.onclick = () => removeProduct(productId);
        updateButton.onclick = () => updateProduct(productId);
        //Sätter struktur för li-element
        li.innerHTML = `<h3 id="post-h3"> ${input.drinkname}, ${input.price}</h3> <br> <p> Beskrivning: ${input.description} <br> ${input.allergens} </p>`
        //Lägger till knapparna till li-elementen
        li.appendChild(deleteButton);
        li.appendChild(updateButton);
        //Lägger till li-element i listan
        menuList.appendChild(li);

    });
}

//Funktion för att lägga till nya element i menyn
async function addProduct(event) {
    //Hindrar formuläret från att ladda om
    event.preventDefault();
    //Hämtar in formulär-element från webbplatsen
    let drinkName = document.getElementById("drinkName");
    let drinkType = document.getElementById("drinkType");
    let price = document.getElementById("price");
    let description = document.getElementById("description");
    let allergens = document.getElementById("allergens");
    let error = document.getElementById("error");


    //Hämtar värden inmatade i formuläret
    let menu = {
        drinkName: drinkName.value,
        drinkType: drinkType.value,
        price: price.value,
        description: description.value,
        allergens: allergens.value
    }


    try {

        //Koppla till API och lägga till den nya datan
        let response = await fetch('https://backend-projekt-k6hc.onrender.com/api/menu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(menu)
        });

        //Svaret från API lagras i variabeln data
        let data = await response.json();

        //Om det finns några meddelanden eller error-meddelanden skrivs de ut
        if (data.message) {
            error.innerText = `${data.message}`;
        } else if (data.error) {
            error.innerText = `${data.error}`
        }
        //Menyn publiceras sedan
        postMenu();

        //Om något går fel visas ett felmeddelande
    } catch (err) {
        console.error("Tillägg av produkt misslyckades")
    }
}

//Hämtar formulär-knapp för att lägga till information
let menuButton = document.getElementById("menu-button");

//Funktion för att lägga till i databasen körs när man klickar på knappen
menuButton.onclick = addProduct;



//Funktion för att radera produkt med specifikt id
async function removeProduct(productId) {

    //Hämtar information från API för att kunna radera inlägg
    let response = await fetch(`https://backend-projekt-k6hc.onrender.com/api/menu/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    //Inhämtad data sätts till variabeln data
    let data = await response.json();

    //Om allt går rätt visas den nya listan utan de raderade inläggen
    if (response.ok) {
        postMenu();
    }
}

//Funktion för att hämta information om en produkt med specifikt id
async function updateProduct(productId) {
    //Hämtar in html-elementet menuDiv
    let menuDiv = document.getElementById("menuDiv");

    //Hämtar in data för en produkt med id productId
    let response = await fetch(`https://backend-projekt-k6hc.onrender.com/api/menu/${productId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    //Inhämtad data sparas i variabeln data
    let data = await response.json();

    //Värden hämtade från API sätts in i formuläret på rätt platser
    document.getElementById("drinkName").value = data.rows[0].drinkname;
    document.getElementById("drinkType").value = data.rows[0].drinktype;
    document.getElementById("price").value = data.rows[0].price;
    document.getElementById("description").value = data.rows[0].description;
    document.getElementById("allergens").value = data.rows[0].allergens;

    //Skapar en knapp för att kunna uppdatera
    let updateProductBtn = document.createElement("button");
    //Sätter knapptext till uppdatera produkt
    updateProductBtn.innerText = "Uppdatera produkt";
    //Sätter ett id till knappen
    updateProductBtn.id = "updateProductBtn";
    //Vid klick på knappen körs funktionen postNewProdukt med specifikt produktid
    updateProductBtn.onclick = () => postNewProduct(productId);
    //Knapp läggs till i menydiv
    menuDiv.appendChild(updateProductBtn);
}

//Funktion för att kunna uppdatera en produkt med specifikt produktid
async function postNewProduct(productId) {

    //Hämtar in formulär-element från webbplatsen
    let drinkName = document.getElementById("drinkName");
    let drinkType = document.getElementById("drinkType");
    let price = document.getElementById("price");
    let description = document.getElementById("description");
    let allergens = document.getElementById("allergens");

    //Hämtar värden inmatade i formuläret
    let menu = {
        drinkName: drinkName.value,
        drinkType: drinkType.value,
        price: price.value,
        description: description.value,
        allergens: allergens.value
    }


    //Hämtar information från API för att kunna uppdatera inlägg
    let response = await fetch(`https://backend-projekt-k6hc.onrender.com/api/menu/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(menu)
    });
    //Lagrar svaret i variabeln data
    let data = await response.json();

    //Om allt går rätt visas den nya listan utan de raderade inläggen
    if (response.ok) {
        postMenu();
        //Sidan laddas om
        location.reload();
    }



}

//Funktion för att visa bokade bord för anställda
async function postBooking() {
    //Hämtar in list-element från HTML
    let bookingList = document.getElementById("booking-list");

    //Tömmer listan så det inte blir dubbletter
    bookingList.innerHTML = "";

    //Hämtar in information från API och databasen som ska publiceras
    let response = await fetch('https://backend-projekt-k6hc.onrender.com/api/booking', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    //Sparar data i variabeln data
    let data = await response.json();
    //Tar ut rader från data
    let info = data.rows;

    //För varje rad i databasen ska ett li-element skapas i listan som visar informationen
    info.forEach(input => {
        //Hämtar produktens id
        let productId = input.id;
        //Skapar ett li-element
        let li = document.createElement("li");
        //Skapar en radera-knapp
        let deleteButton = document.createElement("button");
        //Sätter text i knappen
        deleteButton.innerText = "Ta bort bokning";
        //Sätter en funktion på knappen för att ta bort en bokning
        deleteButton.onclick = () => removeBooking(productId);
        //Skapar struktur för li-element
        li.innerHTML = `<h3 id="post-h3"> ${input.name}</h3> <br> <p> E-post: ${input.email} <br> Datum: ${input.date.split("T")[0]} <br> Tid: ${input.time} </p>`
        //Lägger till knapp till li-element
        li.appendChild(deleteButton);
        //Lägger till li-element 
        bookingList.appendChild(li);
    });
}

//Funktion för att radera en bokning
async function removeBooking(productId) {

    //Hämtar information från API för att kunna radera inlägg
    let response = await fetch(`https://backend-projekt-k6hc.onrender.com/api/booking/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    //Sparar hämtad data i variabeln data
    let data = await response.json();

    //Om allt går rätt visas den nya listan utan de raderade inläggen
    if (response.ok) {
        postBooking();
    }
}

//Funktion för att visa meddelanden från kontaktformulär
async function postMessage() {
    //Hämtar in list-element från HTML
    let messagesList = document.getElementById("messages-list");

    //Tömmer listan så det inte blir dubbletter
    messagesList.innerHTML = "";

    //Hämtar in information från API och databasen som ska publiceras
    let response = await fetch('https://backend-projekt-k6hc.onrender.com/api/contact', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    //Sparar hämtad data i variabeln data
    let data = await response.json();
    //Tar ur rader från data
    let info = data.rows;

    //För varje rad i databasen ska ett li-element skapas i listan som visar informationen
    info.forEach(input => {
        //Tar ut id för elementet
        let productId = input.id;
        //Skapar ett li-element
        let li = document.createElement("li");
        //Skapar en radera-knapp
        let deleteButton = document.createElement("button");
        //Sätter text på knappen
        deleteButton.innerText = "Ta bort meddelande";
        //Sätter en funktion för att ta bort meddelande på knappen med ett specifikt id
        deleteButton.onclick = () => removeMessage(productId);
        //Skapar struktur för li-element
        li.innerHTML = `<h3 id="post-h3"> ${input.name}</h3> <br> <p> E-post: ${input.email} <br>  Meddelande: ${input.message}</p>`
        //Lägger till knappen till li-elementet
        li.appendChild(deleteButton);
        //Lägger till li-element 
        messagesList.appendChild(li);

    });
}


//Funktion för att radera meddelanden med specifikt id
async function removeMessage(productId) {

    //Hämtar information från API för att kunna radera inlägg
    let response = await fetch(`https://backend-projekt-k6hc.onrender.com/api/contact/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    //Lagrar data i variabeln data
    let data = await response.json();

    //Om allt går rätt visas den nya listan utan de raderade inläggen
    if (response.ok) {
        postMessage();
    }


}






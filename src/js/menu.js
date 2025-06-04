postBooking();
postMessage();

//Funktion för att publicera menyn för anställda
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
        let productId = input.id;
        let li = document.createElement("li");
        let deleteButton = document.createElement("button");
        let updateButton = document.createElement("button");
        deleteButton.innerText = "Ta bort produkt";
        updateButton.innerText = "Uppdatera produkt";
        updateButton.id = "updateButton"
        deleteButton.onclick = () => removeProduct(productId);
        updateButton.onclick = () => updateProduct(productId);

        li.innerHTML = `<h3 id="post-h3"> ${input.drinkname}, ${input.price}</h3> <br> <p> Beskrivning: ${input.description} <br> ${input.allergens} </p>`
        li.appendChild(deleteButton);
        li.appendChild(updateButton);
        //Lägger till li-element 
        menuList.appendChild(li);

    });
}

//Lägga till nya element i menyn
async function addProduct(event) {
    event.preventDefault();

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
    let response = await fetch('http://localhost:3001/api/menu', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(menu)
    });

    let data = await response.json();

           if(data.message) {
        error.innerText=`${data.message}`;
    }else if (data.error) {
        error.innerText=`${data.error}`
    }

    console.log(data);
    postMenu();


} catch (err) {
    console.error("Tillägg av produkt misslyckades")
}}

//Hämtar formulär-knapp för att lägga till information
let menuButton = document.getElementById("menu-button");

//Funktion för att lägga till i databasen körs när man klickar på knappen
menuButton.onclick = addProduct;

postMenu();

//Funktion för att radera innehåll
async function removeProduct(productId) {
    
//Hämtar information från API för att kunna radera inlägg
    let response = await fetch(`http://localhost:3001/api/menu/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    let data = await response.json();
    console.log(data);

    //Om allt går rätt visas den nya listan utan de raderade inläggen
    if(response.ok) {
        postMenu();
    } 

    
}

async function updateProduct(productId) {

    let menuDiv = document.getElementById("menuDiv");

        let response = await fetch(`http://localhost:3001/api/menu/${productId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

        let data = await response.json();
        console.log(data);

    document.getElementById("drinkName").value = data.rows[0].drinkname;
    document.getElementById("drinkType").value = data.rows[0].drinktype;
    document.getElementById("price").value = data.rows[0].price;
    document.getElementById("description").value = data.rows[0].description;
    document.getElementById("allergens").value = data.rows[0].allergens;

    let updateProductBtn = document.createElement("button");
    updateProductBtn.innerText = "Uppdatera produkt";
    updateProductBtn.id = "updateProductBtn";
    updateProductBtn.onclick = () => postNewProduct(productId);

    menuDiv.appendChild(updateProductBtn);


    } 

    async function postNewProduct(productId) {

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

    
//Hämtar information från API för att kunna radera inlägg
    let response = await fetch(`http://localhost:3001/api/menu/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(menu)
    });

    let data = await response.json();

    //Om allt går rätt visas den nya listan utan de raderade inläggen
    if(response.ok) {
        postMenu();
        location.reload();
    } 

    

}

//Funktion för att visa bokade bord för anställda
async function postBooking() {
    //Hämtar in list-element från HTML
    let bookingList = document.getElementById("booking-list");

    //Tömmer listan så det inte blir dubbletter
    bookingList.innerHTML="";

    //Hämtar in information från API och databasen som ska publiceras
    let response = await fetch('http://localhost:3001/api/booking', {
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
        let productId = input.id;
        let li = document.createElement("li");
        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Ta bort bokning";
        deleteButton.onclick = () => removeBooking(productId);
        li.innerHTML = `<h3 id="post-h3"> ${input.name}</h3> <br> <p> E-post: ${input.email} <br> Datum: ${input.date.split("T")[0]} <br> Tid: ${input.time} </p>`
        li.appendChild(deleteButton);
        //Lägger till li-element 
        bookingList.appendChild(li);

    });
}

//Funktion för att radera innehåll
async function removeBooking(productId) {
    
//Hämtar information från API för att kunna radera inlägg
    let response = await fetch(`http://localhost:3001/api/booking/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    let data = await response.json();
    console.log(data);

    //Om allt går rätt visas den nya listan utan de raderade inläggen
    if(response.ok) {
        postBooking();
    } 

    
}

//Funktion för att visa meddelanden från kontaktformulär
async function postMessage() {
    //Hämtar in list-element från HTML
    let messagesList = document.getElementById("messages-list");

    //Tömmer listan så det inte blir dubbletter
    messagesList.innerHTML="";

    //Hämtar in information från API och databasen som ska publiceras
    let response = await fetch('http://localhost:3001/api/contact', {
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
        let productId = input.id;
        let li = document.createElement("li");
        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Ta bort meddelande";
        deleteButton.onclick = () => removeMessage(productId);
        li.innerHTML = `<h3 id="post-h3"> ${input.name}</h3> <br> <p> E-post: ${input.email} <br>  Meddelande: ${input.message}</p>`
        li.appendChild(deleteButton);
        //Lägger till li-element 
        messagesList.appendChild(li);

    });
}


//Funktion för att radera innehåll
async function removeMessage(productId) {
    
//Hämtar information från API för att kunna radera inlägg
    let response = await fetch(`http://localhost:3001/api/contact/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    let data = await response.json();
    console.log(data);

    //Om allt går rätt visas den nya listan utan de raderade inläggen
    if(response.ok) {
        postMessage();
    } 

    
}


    



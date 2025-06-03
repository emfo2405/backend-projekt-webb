
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
        let li = document.createElement("li");
        li.innerHTML = `<h3 id="post-h3"> ${input.drinkname}, ${input.price}</h3> <br> <p> Beskrivning: ${input.description} <br> ${input.allergens} </p>`

        //Lägger till li-element 
        menuList.appendChild(li);

    });
}

//Lägga till nya element i menyn
//Funktion för att lägga till användare i databasen
async function addProduct(event) {
    event.preventDefault();

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

console.log(menu);


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

            if (data.message === 'Drycken finns redan i menyn') {
        alert("Drycken finns redan i menyn, lägg till en ny!");
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


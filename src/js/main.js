//Funktion för att lägga till produkt i databasen

async function addProduct(event) {
    event.preventDefault();

    let drinkName = document.getElementById("drinkName");
    let drinkType = document.getElementById("drinkType");
    let price = document.getElementById("price");
    let description = document.getElementById("description");
    let allergens = document.getElementById("allergens");

    //Hämta in värden från formuläret
    let menu = {
        drinkName: drinkName.value,
        drinkType: drinkType.value,
        price: price.value,
        description: description.value,
        allergens: allergens.value
    }

    try {
        let response = await fetch('http://localhost:3001/api/menu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(menu)
        });

        let data = await response.json();

        if (data.message === "Drycken finns redan i menyn") {
            alert("Drycken finns redan i menyn")
        }

    } catch (err) {
        console.error("Det gick inte att lägga till produkten")
    }
    
}
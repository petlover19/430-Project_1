class Card {
    constructor(recipe) {
        this.name = recipe.name;
        this.ingredients = recipe.ingredients;
        this.directions = recipe.directions;
    }

    makeCard() {
        let card_list = document.querySelector("#card_list");
        let card = document.createElement("DIV");
        let name = document.createElement("h2");
        let in_label = document.createElement("h3");
        let dir_label = document.createElement("h3");

        //append the new card to the rest
        card.classList.add("cards");
        card_list.appendChild(card);

        //name
        name.appendChild(document.createTextNode(this.name))
        card.appendChild(name);

        //ingredients
        in_label.appendChild(document.createTextNode("Ingredients: "));
        card.appendChild(in_label);

        let in_list = document.createElement("ul");
        for (i in this.ingredients) {
            let ing = document.createElement("li");
            ing.appendChild(document.createTextNode(i));
            in_list.appendChild(ing);
        }

        //directions
        in_label.appendChild(document.createTextNode("Directions: "));
        card.appendChild(dir_label);

        let dir_list = document.createElement("ol");
        for (d in this.directions) {
            let dir = document.createElement("li");
            dir.appendChild(document.createTextNode(d));
            dir_list.appendChild(dir);
        }
    }

}
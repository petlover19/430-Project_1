class Card {
    constructor(recipe) {
        // console.log("recipe: ", recipe)
        this.name = recipe.name;
        this.ingredients = recipe.ingredients;
        this.directions = recipe.directions;

        console.log(`Cards:\nname: ${this.name}\ningredients: ${this.ingredients}\ndirections: ${this.directions}`)
    }

    makeCard() {
        let card_list = document.querySelector("#recipeCards");
        let card = document.createElement("DIV");
        let name = document.createElement("h2");
        let in_label = document.createElement("h3");
        let dir_label = document.createElement("h3");

        //name
        name.appendChild(document.createTextNode(this.name))
        card.appendChild(name);

        //ingredients
        in_label.appendChild(document.createTextNode("Ingredients: "));
        card.appendChild(in_label);

        let in_list = document.createElement("ul");
        card.appendChild(in_list)
        let ings = this.ingredients.split(",");
        // console.log("ings: ", ings);
        for (let i in ings) {
            // console.log("ings[i]: ", ings[i]);
            let ing = document.createElement("li");
            ing.appendChild(document.createTextNode(ings[i]));
            in_list.appendChild(ing);
        }

        //directions
        dir_label.appendChild(document.createTextNode("Directions: "));
        card.appendChild(dir_label);

        let dir_list = document.createElement("ol");
        card.appendChild(dir_list)
        let dirs = this.directions.split(",");
        for (let d in dirs) {
            // console.log("dirs[d]: ", dirs[d]);
            let dir = document.createElement("li");
            dir.appendChild(document.createTextNode(dirs[d]));
            dir_list.appendChild(dir);
        }

        //append the new card to the rest
        card.classList.add("cards");
        card_list.appendChild(card);
    }

}
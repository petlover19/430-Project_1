"use strict";
let recipes = [];

const parseJSON = (xhr, content) => {
    if (xhr.response && xhr.getResponseHeader('Content-Type') === 'application/json') {
        const obj = JSON.parse(xhr.response);
        console.dir(obj);

        // newCard(obj);

        if (obj.message) {
            content.innerHTML += `<p>${obj.message}</p>`;
        }
    }
};

const handleResponse = (xhr) => {
    const message = document.querySelector("#message");

    switch (xhr.status) {
        case 200:
            message.innerHTML = '<b>Success!</b>';
            break;
        case 201:
            message.innerHTML = '<b>Created!</b>';
            break;
        case 204:
            message.innerHTML = '<b>Updated (No Content)!</b>';
            break;
        case 400:
            message.innerHTML = '<b>Bad Request!</b>';
            break;
        default:
            message.innerHTML = '<b>Error code not implemented by client</b>';
    }

    parseJSON(xhr, message);
};

const sendPost = (e, recipeForm) => {
    e.preventDefault();

    const recipeAction = recipeForm.getAttribute("action");
    const recipeMethod = recipeForm.getAttribute("method");

    const nameField = recipeForm.querySelector("#nameField");
    const ingredientsField = recipeForm.querySelector("#ingredientsField");
    const directionsField = recipeForm.querySelector("#directionsField");

    const xhr = new XMLHttpRequest();
    xhr.open(recipeMethod, recipeAction); // NEW - in the past we've been using "GET"

    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload = () => handleResponse(xhr);

    let ing = ingredientsField.value.split('\n');
    let direct = directionsField.value.split('\n');
    console.log(ing, direct)

    const formData = `name=${nameField.value}&ingredients=${ing}&directions=${direct}`;

    xhr.send(formData);

    return false; // prevents event bubbling
};

const newCard = () => {
    console.log("recipes:", recipes);
    for (let r in recipes) {
        console.log("recipes[r]:", recipes[r]);
        let card = new Card(recipes[r]);
        card.makeCard();
    }
}

const getCards = () => {
    const xhr = new XMLHttpRequest();
    console.log("xhr", xhr)
    xhr.onload = () => {

        let obj = JSON.parse(xhr.response)
        console.log("obj.recipes", obj.recipes);
        let list = obj.recipes;
        recipes = [{
            name: "Grilled Cheese",
            ingredients: "bread,cheese",
            directions: "cut or shread cheese,place inbetween bread slices,cook in pannini press till the bread is toasty brown"
        }, {
            name: "Mashed Potatoes",
            ingredients: "potatoes,butter,milk",
            directions: "peel the potatoes,cut potatoes into cubes,boil potatoes until soft,mash potatoes,add in milk with butter"
        }];
        for (let l in list) {
            let result = list[l];
            console.log("result: ", result);
            recipes.push(result)
                // console.log("list recipe: ", result)
        }
        newCard(obj);
    }

    xhr.open("GET", "/getRecipes");

    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.send();
}

const removeCards = () => {
    // Get the element id
    let rList = document.querySelector("#recipeCards");

    // As long as recipeCards has a child node, remove it
    while (rList.hasChildNodes()) {
        rList.removeChild(rList.firstChild);
    }

}


const init = () => {
    const recipeForm = document.querySelector('#recipeForm');
    const show = document.querySelector('#show');

    const addRecipe = (e) => {
        sendPost(e, recipeForm);
    }
    const showRecipes = (e) => {
        removeCards();
        getCards();
    }

    recipeForm.addEventListener('submit', addRecipe);
    show.onclick = showRecipes;
};

window.onload = init;
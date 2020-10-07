"use strict";

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
    const content = document.querySelector("#content");

    switch (xhr.status) {
        case 200:
            content.innerHTML = '<b>Success!</b>';
            break;
        case 201:
            content.innerHTML = '<b>Created!</b>';
            break;
        case 204:
            content.innerHTML = '<b>Updated (No Content)!</b>';
            break;
        case 400:
            content.innerHTML = '<b>Bad Request!</b>';
            break;
        default:
            content.innerHTML = '<b>Error code not implemented by client</b>';
    }

    parseJSON(xhr, content);
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

    newCard(xhr.response)
    console.log("xhr:", xhr.response)

    return false; // prevents event bubbling
};

const newCard = (results) => {
    console.log("newCard called");
    for (r in results.recipes) {
        let card = new Card(r);
        card.makeCard();
    }
}

const init = () => {
    const recipeForm = document.querySelector('#recipeForm');

    const addRecipe = (e) => {
        sendPost(e, recipeForm);
    }
    recipeForm.addEventListener('submit', addRecipe);
};

window.onload = init;
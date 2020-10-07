const recipes = {};

const respondJSON = (request, response, status, object) => {
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(object));
    response.end();
};

const respondJSONMeta = (request, response, status) => {
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.end();
};


const getRecipes = (request, response) => {
    const responseJSON = {
        recipes,
    };
    respondJSON(request, response, 200, responseJSON);
};

const addRecipe = (request, response, body) => {
    const responseJSON = {
        message: 'all fields are required',
    };

    if (!body.name || !body.ingredients || !body.directions) {
        responseJSON.id = 'missingParams';
        return respondJSON(request, response, 400, responseJSON); // 400=bad request
    }

    // got all params entered
    let responseCode = 201; // "created"
    if (recipes[body.name]) { // recipe exists
        responseCode = 204; // updated
    } else {
        recipes[body.name] = {}; // make a new recipe
    }

    // update or initialize values, as the case may be
    recipes[body.name].name = body.name;
    recipes[body.name].ingredients = body.ingredients;
    recipes[body.name].directions = body.directions;

    if (responseCode === 201) {
        responseJSON.message = 'Created Successfully';
        return respondJSON(request, response, responseCode, responseJSON);
    }

    return respondJSONMeta(request, response, responseCode); // this is for 204, a "no content" header
};

module.exports = {
    getRecipes,
    addRecipe,
};
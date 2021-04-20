const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

mongoose.set('useFindAndModify', false);

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const recipeTest = {
      title: "Bulgogi",
      level: "Easy Peasy",
      ingredients: ["Beef", "Soy sauce", "Sesame oil", "Sugar", "Onion", "Mushroom"],
      cuisine: "Asian",
      disyType: "main_course",
      duration: 30,
      creator: "Korean"
    }

    return Recipe.create(recipeTest)
    .then(recipe => console.log("New recipe is added:", recipeTest.title))
    .catch(error => console.log("An error happened while saving a new recipe", error));
    
  })
  .then(() => {
    return Recipe.insertMany(data)
    .then(recipes => {
     recipes.forEach(recipe => console.log("New recipe is added:", recipe.title))})
    .catch(error => console.log("An error happened while saving a new recipe", error));
    
  })
  .then(() => {
    return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100})
   .then(console.log("Duration has changed"))
   .catch(error => console.log("An error happened while changing duration", error));

  })
  .then(() => {
    return Recipe.deleteOne({title: "Carrot Cake"})
    .then(console.log("The recipe has removed"))
    .catch(error => console.log("An error happened while removing the recipe", error));
  }) 
  .then(() => {
    console.log("Closing the database")
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
    

 
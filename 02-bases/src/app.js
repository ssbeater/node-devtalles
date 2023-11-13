console.log("Running application from app.js");

// const { emailTemplate } = require("./js-foundation/01-template");
// console.log(emailTemplate);

// require("./js-foundation/02-desestructuring");

// const { getUserById } = require("./js-foundation/04-arrow");

// const id = 3;

// getUserById(id, (error, user) => {
//   if (error) {
//     throw new Error(error);
//   }

//   console.log(user);
// });


// ! Factory function - Dependency injection

// const { buildMakePerson } = require("./js-foundation/05-factory")
// const { getAge, getUUID } = require("./plugins");
 
// const makePerson = buildMakePerson({getAge, getUUID});

// const obj = { name: "John", birthdate: "1990-01-01" };
// const john = makePerson(obj);

// console.log(john);

const { getPokemonById } = require("./js-foundation/06-promises");

getPokemonById(1)
  .then((pokemon) => console.log({ pokemon }))
  .catch((err) => console.log(err.message))
  .finally(() => console.log("Finished"));
const faker = require("faker");

// Based on this comment https://github.com/Marak/faker.js/issues/399#issuecomment-433090692
// random generator
const generator = (schema, min = 1, max) => {
  max = max || min;
  return Array.from({ length: faker.random.number({ min, max }) }).map(() =>
    Object.keys(schema).reduce((entity, key) => {
      entity[key] = faker.fake(schema[key]);
      return entity;
    }, {})
  );
};

// your schema
const clientsSchema = {
  id: "{{random.number}}",
  name: "{{company.companyName}} {{company.companySuffix}}",
  address: "{{address.streetAddress}}",
  phone: "{{phone.phoneNumber}}",
  email: "{{internet.email}}"
};

// generate random clients between 5 and 20 units, based on client schema defined above
const data = generator(clientsSchema, 5, 20).map(e => {
  // the id is by default string but we need some integer for testing purpose
  e.id = parseInt(e.id);
  return e;
});

module.exports = data;

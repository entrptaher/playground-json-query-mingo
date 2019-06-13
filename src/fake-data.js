const faker = require("faker");

// random generator
const generator = (schema, min = 1, max) => {
  max = max || min
  return Array.from({ length: faker.random.number({ min, max }) }).map(() => Object.keys(schema).reduce((entity, key) => {
    entity[key] = faker.fake(schema[key])
    return entity
  }, {}))
}

// your schema
const clientsSchema = {
  id: '{{random.number}}',
  name: '{{company.companyName}} {{company.companySuffix}}',
  address: '{{address.streetAddress}}',
  phone: '{{phone.phoneNumber}}',
  email: '{{internet.email}}'
}

// generate random clients between 5 and 20 units, based on client schema defined above
const data = generator(clientsSchema, 5, 20)

module.exports = data;
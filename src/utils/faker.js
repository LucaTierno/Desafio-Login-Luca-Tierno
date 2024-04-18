const {faker} = require("@faker-js/faker");

const generateProducts = () => {
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        department: faker.commerce.department(),
        stock: parseInt(faker.string.numeric()),
        description: faker.commerce.productDescription(),
        img: faker.image.url(),
    }
}

const generateUser = () => {
    const numberProducts = parseInt(faker.string.numeric());
    let cart = [];

    for (let i = 0; i < numberProducts; i++ ) {
        cart.push(generateProducts());
    }

    return {
        id: faker.database.mongodbObjectId(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        age: faker.number.int({min: 10, max:100}),
        cart
        //role:
    }
}

module.exports = generateUser;
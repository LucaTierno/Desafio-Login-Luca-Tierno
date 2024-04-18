const {faker} = require("@faker-js/faker");

const generateProducts = () => {
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        img: faker.image.url(),
        code: faker.string.alphanumeric(),
        stock: parseInt(faker.string.numeric()),
        category: faker.commerce.department(),
        status: faker.datatype.boolean(),
        thumbnails: faker.image.avatar(),
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
        cart,
        role: faker.datatype.boolean(),
    }
}

module.exports = generateUser;
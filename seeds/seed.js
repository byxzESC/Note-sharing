const models = require("../models");
const connection = require("../config/connection");
const { faker } = require("@faker-js/faker");
function randomFromList(list, count) {
  if (count > list.length) {
    return list;
  }
  const items = new Set(list);
  while (items.size > count) {
    items.delete(list[Math.floor(Math.random() * list.length)]);
  }
  return [...items];
}

connection.sync({ force: true }).then(async () => {
  /**
   * @type {import("../models").User[]}
   */
  const users = [];
  const userData = [];

  for (let i = 0; i < 3; i++) {
    let data = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    userData.push(data);
    users.push(await models.User.create(data));
  }
  /**
   * @type {import("../models").Tag[]}
   */
  const tags = [];

  for (let i = 0; i < 10; i++) {
    tags.push(
      await models.Tag.create({
        message: faker.commerce.productName(),
        color: faker.internet.color(),
        darkColor: faker.internet.color(),
        filledIn: Math.random() > 0.5,
      })
    );
  }

  for (let i = 0; i < 10; i++) {
    await models.Note.create({
      title: faker.commerce.productName(),
      content: faker.lorem.paragraph(),
      type: "text",
      user_id: users[Math.floor(Math.random() * users.length)].id,
      tags: randomFromList(tags, Math.floor(Math.random() * tags.length)),
    });
  }
  console.log("Seeding complete!");
  console.log("Users:");
  userData.forEach((user) => {
    console.log(user.name + " - " + user.email + " - " + user.password);
  });
});

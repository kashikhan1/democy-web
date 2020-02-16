import faker from "faker";

function createFakeRow(index) {
  return {
    id: index,
    question: faker.lorem.sentence(),
    postcode: faker.address.zipCode(),
    birth: faker.date.past().toLocaleDateString(),
    sex:  faker.random.arrayElement(['male','female','sss']),
    answer: faker.company.catchPhrase()
  };
}

export default function createRowData(count) {
  return [...Array(count).keys()].map(i => createFakeRow(i));
}

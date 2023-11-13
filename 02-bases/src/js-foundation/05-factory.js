
const buildMakePerson = ({ getAge, getUUID }) => ({ name, birthdate }) => {
  return {
    id: getUUID(),
    name,
    birthdate: birthdate,
    age: getAge(birthdate),
  }
};

module.exports = {
  buildMakePerson,
};

const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Pete" },
  { id: 3, name: "Mary" },
];

const getUserById = (id, cb) => {
  const user = users.find((user) => user.id === id);

  (user)
    ? cb(null, user)
    : cb(`User not found with id ${id}`);
}

module.exports = {
  getUserById
}
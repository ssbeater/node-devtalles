interface User {
  id: number;
  name: string;
}

const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Pete" },
  { id: 3, name: "Mary" },
];

const getUserById = (id: number, cb: (err?: string, user?: User) => void) => {
  const user = users.find((user) => user.id === id);

  (user)
    ? cb(undefined, user)
    : cb(`User not found with id ${id}`);
}

module.exports = {
  getUserById
}
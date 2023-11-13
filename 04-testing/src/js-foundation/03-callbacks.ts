interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: "John" },
  { id: 2, name: "Pete" },
  { id: 3, name: "Mary" },
];

export function getUserById(id: number, cb: (err?: string, user?: User) => void ) {
  const user = users.find(function (user) {
    return user.id === id;
  });

  if (!user) {
    return cb(`User not found with id ${id}`);
  }
  
  return cb(undefined, user);
}

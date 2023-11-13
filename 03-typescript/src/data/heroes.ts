export interface Hero {
  id: number;
  name: string;
  owner: string;
};

export const heroes: Hero[] = [
  {
    id: 1,
    name: "Spiderman",
    owner: " Marvel",
  },
  {
    id: 2,
    name: "Batman",
    owner: "DC",
  },
];
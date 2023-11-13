interface BuildMakePersonOptions {
  getAge: (birthdate: string) => number;
  getUUID: () => string;
}

interface PersonOptions {
  name: string;
  birthdate: string;
}

export const buildMakePerson =
  ({ getAge, getUUID }: BuildMakePersonOptions) =>
  ({ name, birthdate }: PersonOptions) => {
    return {
      id: getUUID(),
      name,
      birthdate: birthdate,
      age: getAge(birthdate),
    };
  };

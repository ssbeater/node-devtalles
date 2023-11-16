import { buildMakePerson } from "../../src/js-foundation/05-factory";

describe("Factory", () => {

  const getAge = (birthdate: string) => 1;
  const getUUID = () => "1";

  test("buildMakePerson should return a function", () => {
    const makePerson = buildMakePerson({ getAge, getUUID });  
    expect(typeof makePerson).toBe("function");
  });

  test("makePerson should return a person", () => {
    const makePerson = buildMakePerson({ getAge, getUUID });
    const person = makePerson({ name: "John", birthdate: "2020-01-01" });

    expect(person).toEqual({
      id: "1",
      name: "John",
      birthdate: "2020-01-01",
      age: 1,
    });
  });

});
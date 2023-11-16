import { getUserById } from "../../src/js-foundation/03-callbacks";

describe("Callbacks", () => {
  
  test("Get used by id should return an error if user don't exist", (done) => {
    const id = 10;
    getUserById(id, (err, user) => {
      expect(err).toBe(`User not found with id ${id}`);
      expect(user).toBeUndefined();

      done();
    });
  });

  test("Get user by id should return the user if exist", (done) => {
    const id = 1;
    getUserById(id, (err, user) => {
      const { id, name } = user!;

      expect(err).toBeUndefined();
      expect(id).toBe(1);
      expect(name).toBe("John");

      done();
    });
  });
});
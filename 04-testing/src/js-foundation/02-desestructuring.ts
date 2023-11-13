const { OS, PROMPT, USERNAME } = process.env;
// console.table({ OS, PROMPT, USERNAME });

const array = ["a", "b", "c", "d", "e"];
const [, , c] = array;
console.log(c);

import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  const myImportantVariable = process.env.MY_IMPORTANT_VARIABLE;
  if (!myImportantVariable) throw "MY_IMPORTANT_VARIABLE is not set";

  console.log("Hello world from logs!");

  return new Response(JSON.stringify({ myImportantVariable }));
};

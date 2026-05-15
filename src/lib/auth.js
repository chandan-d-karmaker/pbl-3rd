import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
// console.log("AUTH_DB_URI:", process.env.AUTH_DB_URI);

const client = new MongoClient(process.env.AUTH_DB_URI);

const db = client.db("english_janala_db");

export const auth = betterAuth({
  emailAndPassword: { 
    enabled: true, 
  },
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
});

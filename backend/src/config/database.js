const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

let db;

async function connectDB() {

    try {

        await client.connect();

        db = client.db(
            process.env.DB_NAME
        );

        console.log(
            "MongoDB Connected"
        );

    } catch(error) {

        console.log(error);

    }

}

module.exports = {
    connectDB,
    getDB: () => db
};
module.exports = {
    development: {
        dialect: "sqlite",
        storage: "./database.sqlite", // This will create a file-based SQLite database
        logging: true,
    },
    test: {
        dialect: "sqlite",
        storage: ":memory:", // In-memory DB for testing
    },
    production: {
        dialect: "sqlite",
        storage: "./database.sqlite",
    },
};

import { config } from "dotenv";
config();

export default {
    port: process.env.PORT || 5050,
    mongodbUrl:
        process.env.MONGO_URL || "mongodb://localhost:27017/simple-blog-db",
    bcryptSalt: 12,
    jwtSecret: process.env.JWT_SECRET || "secret",
};

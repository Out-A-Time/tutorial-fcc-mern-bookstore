export const PORT = 5555;
import "dotenv/config";
// console.log(process.env);

const mongoUSER = process.env.mongoUSER;
const mongoPASSWORD = process.env.mongoPASSWORD;

export const mongoDB_URL = `mongodb+srv://${mongoUSER}:${mongoPASSWORD}@bookstorecluster.boli8n2.mongodb.net/?retryWrites=true&w=majority`;

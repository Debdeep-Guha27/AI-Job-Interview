import OpenAI from "openai";
import { key } from "./ServerConfig.js";

const client = new OpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: key
});

export default client;

// export async function main() {

//     const client = new OpenAI({
//         baseURL: "https://models.inference.ai.azure.com",
//         apiKey: key
//     });

//     const response = await client.chat.completions.create({
//         messages: [
//             { role: "developer", content: "" },
//             { role: "user", content: "Give just a question of frontend interview?" }
//         ],
//         model: "o3-mini"
//     });

//     console.log(response.choices[0].message.content);
// }

// main().catch((err) => {
//     console.error("The sample encountered an error:", err);
// });
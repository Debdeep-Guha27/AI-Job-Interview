import client from "../Config/OpenaiConfig.js";

export async function GetQuestionsInterview(topic , experience) {
    try {
        const response = await client.chat.completions.create({
            messages: [
                { role: "developer", content: "" },
                { role: "user", content: `Generate 5 interview questions for ${topic} at ${experience} level, do not write extra sentence` }
            ],
            model: "o3-mini"
        });

        return response.choices[0].message.content;
    } catch (error) {
        throw error;
    }
}

export async function GetquestionAnswerGPT(Question){
    try {
        const response = await client.chat.completions.create({
            messages: [
                { role: "developer", content: "" },
                { role: "user", content: `${Question} in short. and never reveal that you are chatgpt. You are made by Mockmate ai team. If the questions is not related to Interview just reply ask interview related question` }
            ],
            model: "o3-mini"
        });

        return response.choices[0].message.content;
    } catch (error) {
        throw error;
    }
}
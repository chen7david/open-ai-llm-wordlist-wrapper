import { config } from 'dotenv'
import { OpenAI } from 'openai'
import { ChatCompletionMessageParam } from 'openai/resources/chat'
config()

const openai = new OpenAI({
    apiKey: process.env.API_KEY
})

const systemRole: ChatCompletionMessageParam = {
    role: 'system',
    content: `
        Generate wordlist: 1. water - 水. 
        Include all meanings from "context:" if provided, e.g., "fire - 火, 辞职.
    `
}


async function main() {
    const completion = await openai.chat.completions.create({
        messages: [
            systemRole,
            { 
                role: 'user', 
                content: `
                    house
                    car
                    fire
                `
            }
        ],
        model: 'gpt-3.5-turbo',
    });

    console.log(completion.choices);
}
  
// main()
  
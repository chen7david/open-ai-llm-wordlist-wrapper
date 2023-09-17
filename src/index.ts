import { config } from 'dotenv'
import { OpenAI } from 'openai'
import { ChatCompletionMessageParam } from 'openai/resources/chat'
config()

const openai = new OpenAI({
    apiKey: process.env.API_KEY
})

const rules = `
Below: 
- a list of words each on a new line henceforth called the WorldList
For each word in the WordList, lowercase all common nouns, sort alphabetically, and add one or more Chinese translation based on their in the Context 
Where more than one meaning is found in the Context you should separate the translations with a comma e.g. 1. fire - 火, 辞职
`

const rulesz = `
Below: 
- a list of words each on a new line henceforth called the WorldList
For each word in the WordList, lowercase all common nouns, sort alphabetically, and add one or more Chinese translation based on their in the Context 
Where more than one meaning is found in the Context you should separate the translations with a comma e.g. 1. fire - 火, 辞职
`

const rulesx = `
For each word in the word list do the following:
type TWord = {
    word: srting // original input word
    phonetic: string[] // american phonemic transcription for all pronuciations variations of that word ordered by most common to least
    cn: string[] // consider all context in which this word can be used and provide a Chinese translation for each.
}
return TWord[]
`
const paragraph = `The man was fired while making a fire. I was drinking water as she watered the planst.`

const instructionsContext: ChatCompletionMessageParam = {
    role: 'system',
    content: rulesx
}

const wordList = [
    'Solar System',
    'David',
    'house',
    'car',
    'Fire',
    'water',
    'water',
    'water',
]

const wordListTemplate = wordList.map((w) => w.trim()).join(',')

console.log({wordListTemplate})

async function main() {
    const completion = await openai.chat.completions.create({
        messages: [
            instructionsContext,
            { role: 'user', content: `${wordListTemplate}` }
        ],
        model: 'gpt-3.5-turbo',
    });
    const body: string = `${completion.choices[0].message.content}`
    console.log(body)
    console.table(JSON.parse(body))
}
  
main()
  
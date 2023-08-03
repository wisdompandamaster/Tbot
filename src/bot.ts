import { Configuration, OpenAIApi } from "openai";
import { addBotMessage, messages } from "./message.js";
import colors from "colors";

// api init
let openAi: OpenAIApi;
export function initBot() {
  openAi = new OpenAIApi(
    new Configuration({
      basePath: "https://api.chatanywhere.com.cn/",
      apiKey: process.env.OPEN_API_KEY_30,
    })
  );
}

export async function botAnswer() {
  const chatCompletion = await openAi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
    // stream: true,
  });

  const answer = chatCompletion.data.choices[0].message?.content;

  //   添加到message数组，用来形成上下文
  addBotMessage(answer!);

  console.log(colors.bold.blue("Tbot:"), answer);
}

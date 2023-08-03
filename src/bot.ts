import { Configuration, OpenAIApi } from "openai";
import { addBotMessage, messages } from "./message.js";
import colors from "colors";
import { Stream } from "stream";
// import { createServer } from "http";
import axios from "axios";
import ora from "ora";

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
  const api = axios.create({
    baseURL: "https://api.chatanywhere.com.cn/v1",
    headers: {
      Authorization: `Bearer ${process.env.OPEN_API_KEY_30}`,
    },
  });

  let loading = ora("正在努力思考...\r").start();
  // const response = await openAi.createChatCompletion({
  const response = await api.post<Stream>(
    "chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages,
      // max_tokens: 20,
      stream: true,
    },
    {
      responseType: "stream",
    }
  );
  loading.stop();

  return new Promise<void>((resolve, reject) => {
    process.stdout.write(colors.bold.blue("Tbot: "));
    let answer = "";
    response.data.on("data", (chunk) => {
      const lines = chunk
        .toString()
        .split("\n\n")
        .filter((line: string) => line.trim() !== "");
      for (const line of lines) {
        const message = line.replace("data: ", "");
        if (message === "[DONE]") {
          // 结尾换行
          process.stdout.write("\n");
          return;
        }

        const parsed = JSON.parse(message);

        if (parsed.choices[0].delta.content) {
          answer += parsed.choices[0].delta.content;
          process.stdout.write(parsed.choices[0].delta.content);
        }
      }
    });

    response.data.on("end", () => {
      // console.log("\n");
      // 添加回答到上下文中
      addBotMessage(answer!);
      resolve(); // 流式传输结束后解析Promise
    });
  });
  // 返回一个Promise以指示流式传输完成
  // return new Promise<void>((resolve, reject) => {
  // response.data.on("end", () => {
  //   console.log("\n");
  //   resolve(); // 流式传输结束后解析Promise
  // });
  // });
  // const answer = (await chatCompletion).data.choices;

  //   添加到message数组，用来形成上下文
}

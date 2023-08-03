import dotenv from "dotenv";
import readlineSync from "readline-sync";
import ora from "ora";
import { askQuestion } from "./user.js";
import { botAnswer, initBot } from "./bot.js";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

//  TODO:流式输出

// 从.env文件中读取环境变量，并将其设置为Node.js进程的环境变量
dotenv.config({
  // dirname函数返回给定路径的目录名，resolve函数将路径片段解析为绝对路径
  path: resolve(dirname(fileURLToPath(import.meta.url)), "../.env"),
});

initBot();

// main
// API reference: https://platform.openai.com/docs/api-reference/chat/create
(async () => {
  // 连续提问
  while (true) {
    const userInput = askQuestion();
    checkExit(userInput);
    let loading = ora("正在努力思考...\r").start();
    await botAnswer();
    loading.stop();
  }
})();

function checkExit(input: string) {
  input.toLocaleLowerCase() === "exit" && process.exit();
}

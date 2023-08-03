import dotenv from "dotenv";
import readlineSync from "readline-sync";
import ora from "ora";
import { askQuestion } from "./user.js";
import { botAnswer, initBot } from "./bot.js";

// 调用环境变量
dotenv.config();

initBot();

// main
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
  if (input == "exit") {
    process.exit();
  }
}

# Tbot
a chatgpt robot run in terminal

#### 功能
- 支持聊天上下文
- exit 功能
- 显示 loading 
- 全局 cli

#### use package
- readline-sync
- colors
- dotenv
- ora
- rollup
- rollup-plugin-add-shebang

 #### what i learn 
- npm link 
- how to use rollup
```typescript
    "bin": "./dist/bundler.js",
    "scripts":{
      // -w can build in time
      "build": "rollup -c rollup.config.js -w",
      "dev": "node dist/bundler.js"
    }
      
```

#### 注意
1. pnpm init

2. npm install -g typescript tsc -v

3. tsc --init

   创建下目录结构，ts-node src/index.ts 测试一下

4. pnpm i openai

   import {Configuration,OpenAIApi} from 'openai';去引入

5. 关于环境变量，导入dotenv这个库 pnpm i dotenv

   process报错：npm i --save-dev @types/node
6. es module不支持requeir 的，因为ts-node无法进行转换 ，借助打包工具

   对于库最佳选择：pnpm i rollup -D

   Type:module

   pnpm i @rollup/plugin-typescript -D

   Tsconfig: "module": "NodeNext",

7. 解决换行

   /r stop ,pnpm build -w 进入watch模式

8. bin设置："bin": "./dist/bundler.js",

   pnpm link --global 注册全局 //如果pnpm配置后失效换npm link全局

   解决指定要执行文件 利用shebang头

   pnpm i rollup-plugin-add-shebang

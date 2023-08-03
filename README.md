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
     

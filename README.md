# 基于Node.js的静态博客系统
核心功能：把Markdown装换成HTML，从而用于静态发布。

使用步骤：
``` shell
git clone https://github.com/chayangge/smart-blog.git
cd smart-blog
npm install
```

文章（.md）源文件存放在md文件夹下，执行：
``` shell
node app
```
在dist文件夹下，编译生成博客整体html结构，为减少不必要的编译浪费，只编译监控修改过的文件。

const WindowsBot = require('WindowsBot');//引用WindowsBot模块

//注册主函数
WindowsBot.registerMain(windowsMain, "127.0.0.1", 26678);

//引入readline模块
const readline = require('readline');


/**用作代码提示，windowsMain函数会被多次调用，注意使用全局变量
* @param {WindowsBot} windowsBot
*/
async function windowsMain(windowsBot){
    //设置隐式等待
    await windowsBot.setImplicitTimeout(5000);
    // let hwnd = await windowsBot.findWindow(null, "运行");
    // let words = await windowsBot.getWords(hwnd);
    // console.log(words);
  
}
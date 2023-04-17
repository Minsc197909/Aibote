const WindowsBot = require('WindowsBot');//引用WindowsBot模块
const AndroidBot = require('AndroidBot');//引用AndroidBot模块

//注册主函数
WindowsBot.registerMain(windowsMain, "127.0.0.1", 26678);//windowsMain 应当在 androidMain之前注册，以防在androidMain 函数内，出现gWindowsBot未赋值情况
AndroidBot.registerMain(androidMain, 16678);

//bot 存放全局变量
let gWindowsBot = null;
let androidId = null;

//回调 函数接受存放驱动Bot
async function windowsMain(windowsBot){
    gWindowsBot = windowsBot;
}

/**用作代码提示，androidMain函数会被多次调用，注意使用全局变量
* @param {AndroidBot} androidBot
*/
async function androidMain(androidBot){
    //AndroidBot较为特殊，它是纯云端构架，只能远程等待连接。不像WebBot和WindowsBot 可以本地执行驱动，也可以远程等待驱动连接
    //AndroidBot 云端构架多设备连接的特殊性，我们直接在回到函数处理
    //用户也可以将androidBot存入数组，在其他函数调用。可参考WebSocketBot&AndroidBot 服务端node.js 代码

    //为null，等待gWindowsBot赋值
    if(gWindowsBot == null)
        await androidBot.sleep(3000);

    //这里直接使用gWindowsBot。
    await gWindowsBot.setImplicitTimeout(5000);
    await androidBot.setImplicitTimeout(3000);

    //实现功能

    await androidBot.showToast("1111", 1000)
    androidId = await androidBot.getAndroidId();
    console.log(androidId);
}
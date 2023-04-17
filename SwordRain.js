const AndroidBot = require('AndroidBot');//引用AndroidBot模块

//注册主函数，安卓端连接脚本会自动调用androidMain，并传递AndroidBot对象。设置服务端监听端口，手机端默认连接端口16678
AndroidBot.registerMain(androidMain, 16678);

/**用作代码提示，androidMain函数会被多次调用，注意使用全局变量
* @param {AndroidBot} androidBot
*/
async function androidMain(androidBot){
    //设置隐式等待
    await androidBot.setImplicitTimeout(5000);
    let androidId = await androidBot.getAndroidId();
    console.log(androidId);
    await androidBot.sleep(5000);
    // await androidBot.showToast("显示 1000毫秒", 1000);
    // await androidBot.sleep(3000);
    await androidBot.showToast("显示 10000毫秒", 100000);
    // await androidBot.sleep(3000);
    // await androidBot.press(162, 1134, 2000);
    // await androidBot.move(182, 788, 3000);
    // await androidBot.release();
    //await androidBot.swipe(100, 100, 500, 800, 5000)
    //await androidBot.dispatchGesture([[100, 200], [400, 500], [100, 900]], 3000)
    // while(true){
    //     let time = Math.floor(Math.random()*500 + 500);
    //     await androidBot.longClick(1288, 610, time);
    //     await androidBot.sleep(100);
    // }
    
    //await androidBot.doubleClick(346, 1678);
}
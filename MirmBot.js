const WindowsBot = require('WindowsBot');//引用WindowsBot模块
//全局变量
let hwnd = null;
let sys_resolution = null;
let bot_module = null;
let bp_Location_X = null;
let bp_Location_Y= null;
let bpAll_Location_X = null;
let bpAll_Location_Y = null;
let bpClose_Location_X = null;
let bpClose_Location_Y = null;
let tab1_Location_X = null;
let tab1_Location_Y = null;
let tab2_Location_X = null;
let tab2_Location_Y = null;
let options = null;
let point = null;
let imagePath="C:\\MirmBot\\png\\";
let scale = "yellow";
let winCounts = 1;
let windowsDes = "【窗口1】";
let args = null;
// let simValue = 0.7;
let mainColor = null;
//常量
const bp_Location_X_19201080 = 1697;
const bp_Location_Y_19201080= 85;
const bpAll_Location_X_19201080 = 1494;
const bpAll_Location_Y_19201080 = 219;
const bpClose_Location_X_19201080 = 1804;
const bpClose_Location_Y_19201080 = 145;
const tab1_Location_X_19201080 = 84;
const tab1_Location_Y_19201080 = 22;
const tab2_Location_X_19201080 = 380;
const tab2_Location_Y_19201080 = 20;

//注册主函数
WindowsBot.registerMain(windowsMain, "127.0.0.1", 26678);

/**用作代码提示，windowsMain函数会被多次调用，注意使用全局变量
* @param {WindowsBot} windowsBot
*/
async function windowsMain(windowsBot){
    //设置隐式等待
    await windowsBot.setImplicitTimeout(5000);
    hwnd = await windowsBot.findWindow("H-SMILE-FRAME", null);
    console.log("【参数提示】欢迎使用MirmBot，当前版本V0.91，捕获toDesk窗口句柄，句柄值为：" + hwnd + "。");
    //todo:选择分辨率
    sys_resolution = "1920_1080";
    console.log("【参数提示】目前只支持1920_1080分辨率，请自行调整分辨率为1920_1080并将toDesk最大化。");
    //todo:选择模块
    bot_module = "miner";
    console.log("【参数提示】目前只完成矿工模块，其它模块敬请期待。");
    //选择工具更换时机 --scale=yellow 或者--scale=red
    try{
        args = require('minimist')(process.argv.slice(2));
        if(args['scale'] != null){
            scale = args['scale'];
        }
    }catch{
        
    }
    console.log("【参数提示】工具更换阈值：" + scale + "。");
    //窗口数量 --winCounts=1 或 --winCounts=2
    try{
        args = require('minimist')(process.argv.slice(3));
        if(args['winCounts'] != null){
            winCounts = args['winCounts'];
        }
    }catch{
       
    }
    console.log("【参数提示】窗口数量：" + winCounts + "。");
    // //工具图片识别灵敏度
    // try{
    //     args = require('minimist')(process.argv.slice(4));
    //     if(args['simValue'] != null){
    //         simValue = args['simValue'];
    //     }
    // }catch{
       
    // }
    // console.log("【参数提示】工具图片识别灵敏度：" + simValue + "。");
    //分辨率处理
    switch(sys_resolution){
        case "1920_1080":
            bp_Location_X = bp_Location_X_19201080;
            bp_Location_Y = bp_Location_Y_19201080;
            bpAll_Location_X = bpAll_Location_X_19201080;
            bpAll_Location_Y = bpAll_Location_Y_19201080;
            bpClose_Location_X = bpClose_Location_X_19201080;
            bpClose_Location_Y = bpClose_Location_Y_19201080;
            tab1_Location_X = tab1_Location_X_19201080;
            tab1_Location_Y = tab1_Location_Y_19201080;
            tab2_Location_X = tab2_Location_X_19201080;
            tab2_Location_Y = tab2_Location_Y_19201080;
            imagePath = imagePath + sys_resolution + "\\";
            break;
        case "1024_768":
            break;
        default:
            bp_Location_X = bp_Location_X_19201080;
            bp_Location_Y = bp_Location_Y_19201080;
            bpAll_Location_X = bpAll_Location_X_19201080;
            bpAll_Location_Y = bpAll_Location_Y_19201080;
            bpClose_Location_X = bpClose_Location_X_19201080;
            bpClose_Location_Y = bpClose_Location_Y_19201080;
            tab1_Location_X = tab1_Location_X_19201080;
            tab1_Location_Y = tab1_Location_Y_19201080;
            tab2_Location_X = tab2_Location_X_19201080;
            tab2_Location_Y = tab2_Location_Y_19201080;
            imagePath = imagePath + sys_resolution + "\\";
    }
    let i = 1;
    while(i>0){
        i = i + 1;  
        if(winCounts === 2){
            if(i%2===0){
                windowsDes = "【窗口1】";
                console.log("正在切换第一个窗口...");
                await windowsBot.clickMouse(hwnd, tab1_Location_X, tab1_Location_Y, 1, {mode: true});
            }else{
                windowsDes = "【窗口2】";
                console.log("正在切换第二个窗口...");
                await windowsBot.clickMouse(hwnd, tab2_Location_X, tab2_Location_Y, 1, {mode: true});
            }
        }
        await randomTimeDelay(windowsBot, windowsDes, 5000, 10000);//随机延时5-10秒 
        await windowsBot.moveMouse(hwnd, 0, 0, {mode:true});//找图时把鼠标移开
        console.log(windowsDes + "检查是否打开道具明细页...");
        //检查道具明细页状态
        console.log(windowsDes + "检查道具明细页状态...");
        options = {sim: 0.95,mode: true};
        point = await windowsBot.findImage(hwnd, imagePath + "common\\" + "destory_btn.png", options);
        if(point != null){
            //关闭背包
            console.log(windowsDes + "道具明细页打开，执行关闭背包...");
            await windowsBot.clickMouse(hwnd, bpClose_Location_X, bpClose_Location_Y, 1, {mode: true});
        }else{
            console.log(windowsDes + "道具明细页未打开，不执行操作...");
        }
        await randomTimeDelay(windowsBot, windowsDes, 1000, 1500);//随机延时1-1.5秒 
        //检查背包状态
        console.log(windowsDes + "检查背包状态...");
        await windowsBot.moveMouse(hwnd, 0, 0, {mode: true});//找图时把鼠标移开
        options = {sim: 0.95,mode: true};
        point = await windowsBot.findImage(hwnd, imagePath + "common\\" + "all_backpack_btn.png", options);
        if(point != null){
            //背包已打开，切换所有道具标签
            console.log(windowsDes+"背包已打开，切换所有道具标签...");
            await windowsBot.clickMouse(hwnd, bpAll_Location_X, bpAll_Location_Y, 1, {mode: true});
        }else{
            //背包关闭，打开背包
            console.log(windowsDes+"背包关闭，打开背包...");
            await windowsBot.clickMouse(hwnd, bp_Location_X, bp_Location_Y, 1, {mode:true});
        }
        await randomTimeDelay(windowsBot, windowsDes, 1000, 1500);//随机延时1-1.5秒 
        await windowsBot.moveMouse(hwnd, 0, 0, {mode:true});//找图时把鼠标移开
        // options = {region:[1200, 580, 1440, 790], sim: simValue, mode: true};
		// point = await windowsBot.findImage(hwnd, imagePath + bot_module + "\\" +"pickaxe_eq_" + scale + ".png", options);
        if(scale == "yellow"){
            mainColor = "#36a6df";
            options = {region:[1327, 680, 1407, 759], sim: 0.95}; 
            point = await windowsBot.findColor(hwnd, mainColor, options);
            if(point == null){
                mainColor = "#4abce9";
                options = {region:[1327, 680, 1407, 759], sim: 0.95}; 
                point = await windowsBot.findColor(hwnd, mainColor, options);
            }
        }
        if(scale == "red"){
            mainColor = "#1722c5";
            options = {region:[1327, 680, 1407, 759], sim: 0.95}; 
            point = await windowsBot.findColor(hwnd, mainColor, options);
            if(point == null){
                mainColor = "#0f17bb";
                options = {region:[1327, 680, 1407, 759], sim: 0.95}; 
                point = await windowsBot.findColor(hwnd, mainColor, options);
            }
        }
		if(point != null){
			console.log(windowsDes + "装备的工具耐久度报警，更换中...");
            //换矿工镐
            await windowsBot.moveMouse(hwnd, 0, 0, {mode: true});//找图时把鼠标移开
            options = {sim: 0.9, mode: true};
            point = await windowsBot.findImage(hwnd, imagePath + bot_module + "\\" +"pickaxe_bp_new1.png", options);
            if(point != null){
                await windowsBot.clickMouse(hwnd, point[0].x, point[0].y, 1, {mode: true});
                await windowsBot.sleep(100);
                await windowsBot.clickMouse(hwnd, point[0].x, point[0].y, 1, {mode: true});
            }else{
                options = {sim: 0.9,mode: true};
                point = await windowsBot.findImage(hwnd, imagePath + bot_module + "\\" +"pickaxe_bp_new2.png", options);
                if(point != null){
                    await windowsBot.clickMouse(hwnd, point[0].x, point[0].y, 1, {mode: true});
                    await windowsBot.sleep(100);
                    await windowsBot.clickMouse(hwnd, point[0].x, point[0].y, 1, {mode: true});
                }
            }
		}else{
			console.log(windowsDes+"装备的工具耐久正常，不执行操作...");
		}
        await randomTimeDelay(windowsBot, windowsDes, 3000, 10000);//随机延时3-10秒
    }
}

async function randomTimeDelay(windowsBot, windowsDes, min, max){
    let delay = getRandomNum(min, max);
    console.log(windowsDes + "暂停" + delay/1000 + "秒");
    await windowsBot.sleep(delay);
}

function getRandomNum(Min,Max){
    let Range = Max - Min;   
    let Rand = Math.random();   
    return(Min + Math.round(Rand * Range));   
}
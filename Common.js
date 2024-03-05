const fs = require('fs');
//取当前北京时间
function getBjTime() {
    const options = {
      timeZone: 'Asia/Shanghai',
      hour12: false,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    };  
    return new Date().toLocaleString('en-US', options);
  }

// 控制台文本样式
const colors = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",
  
    FgBlack: "\x1b[30m",
    FgRed: "\x1b[31m",
    FgGreen: "\x1b[32m",
    FgYellow: "\x1b[33m",
    FgBlue: "\x1b[34m",
    FgMagenta: "\x1b[35m",
    FgCyan: "\x1b[36m",
    FgWhite: "\x1b[37m",
  
    BgBlack: "\x1b[40m",
    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
    BgYellow: "\x1b[43m",
    BgBlue: "\x1b[44m",
    BgMagenta: "\x1b[45m",
    BgCyan: "\x1b[46m",
    BgWhite: "\x1b[47m",
  };

function resetConsoleColor() {
   console.log(colors.Reset); // 重置控制台颜色
}

function log(s, tag="",color=colors.FgWhite ) {
    if (tag != "")
    {
        s = `[${tag}] ${s}`;
    }
    const logMessage = `${getBjTime()} ${s}\n`; // 包含时间信息的日志消息
    const logMessageConfig = `${getBjTime()} ${s}`; // 包含时间信息的日志消息
    
    // 输出到控制台
    console.log(color, logMessageConfig);
    resetConsoleColor();
    const logFileName = getLogFileName();
    const logFilePath = `./${logFileName}`; // 当天日期的日志文件路径
    // 追加写入日志文件
    fs.appendFileSync(logFilePath, logMessage);
}

function logRed(s, tag="")
{
    log(s, tag, colors.FgRed,);
}

function logGreen(s, tag="")
{
    log(s, tag, colors.FgGreen);
}


// 获取当前日期作为日志文件名
function getLogFileName() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `log_${year}${month}${day}.txt`;
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function generateUniqueID() {
    const randomBytes = crypto.randomBytes(16); // 生成 16 字节的随机数据
    return randomBytes.toString('hex'); // 将随机数据转换成十六进制字符串作为标识值
}

function decodeHexString(hexData) {
    // 去掉十六进制字符串中的前缀 "0x" 并将其转换为字节数组
    const hexStringWithoutPrefix = hexData.startsWith('0x') ? hexData.slice(2) : hexData;
    const bytes = Uint8Array.from(Buffer.from(hexStringWithoutPrefix, 'hex'));
  
    // 解码字节数组为 UTF-8 字符串
    const utf8String = new TextDecoder().decode(bytes);
    return utf8String;
  }

module.exports = {
    getBjTime,
    log,
    logRed,
    logGreen,
    sleep,
    generateUniqueID,
    decodeHexString
  };
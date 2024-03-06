const req = require("request");
const pup = require("puppeteer");
const cheerio = require("cheerio");

// 要获取的对象

let opencv_data = {
    url: "https://www.w3school.com.cn/js/js_object_methods.asp",
    title: "",
};


// 返回html
function get_html(url) {
    req.get(url, (err, resp, body)=>{
        if (body) {
            
            console.log("get_html success!!!");
            let $ = cheerio.load(body.toString());
            let els = [];
            console.log($("h1").text());;
            return ;
        }else{
            console.log("get_html failed!!!");
        }
    });
}


// 生成pdf
function to_pdf(html, title) {
    
}


function main() {
    get_html(opencv_data.url);
}
main();
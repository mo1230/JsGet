const req = require("axios").default;

const cheerio = require("cheerio");
const officegen = require('officegen');
const fs = require('fs');
const docx = officegen('docx');//word
const pptx = officegen('pptx');//pptx

// 要获取的对象

let opencv = {
    url: "https://www.w3cschool.cn/opencv/",
    title: "OpenCV文档",
    selectors: {
        titles: "div.dd-content a",

    }
};


// 返回html
function get_html(goal) {
    req.get(opencv.url).then((respose)=>{
        console.log("get_html success!!!");
        let $ = cheerio.load(respose.data);
        let datas = [];
        let data_el = {
            title: "",
            href: ""
        };
        let titles = $(opencv.selectors.titles);

        for (const i in titles) {

            // console.log(typeof(titles[i].attribs));
            if (typeof (titles[i].attribs) == "object" && Object.getOwnPropertyNames(titles[i].attribs).length != 0) {
                // console.log(titles[i].attribs);
                data_el.title = titles[i].attribs.title;
                data_el.href = titles[i].attribs.href;
                datas.push(data_el);
                console.log(data_el);
            }
            // #pro-mian

        }
    });
}


// 生成pdf
function to_pdf(html, title) {

}


function main() {
    get_html(opencv);
}



main();
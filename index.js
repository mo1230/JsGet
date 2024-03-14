const req = require("axios").default;

const cheerio = require("cheerio");
const officegen = require('officegen');
const fs = require('fs');
const { default: axios } = require("axios");
const docx = officegen('docx');//word
const pptx = officegen('pptx');//pptx
const markdown = require("node-html-markdown").NodeHtmlMarkdown;
const markdown_opt = require("node-html-markdown").NodeHtmlMarkdownOptions;


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
        
        // 处理url字符串，拼接字符串形成目标url
        let url_tmp = opencv.url.split("/");
        let base_url = url_tmp[0] + "//"  + url_tmp[2];
        let titles = $(opencv.selectors.titles);

        for (const i in titles) {
            // console.log(i);
            // console.log(typeof(titles[i].attribs));
            if (typeof (titles[i].attribs) == "object" && Object.getOwnPropertyNames(titles[i].attribs).length != 0) {
                // console.log(titles[i].attribs);
                let data_el = {
                    title: "",
                    href: ""
                };
                data_el.title = titles[i].attribs.title;
                data_el.href = titles[i].attribs.href;
                datas.push(data_el);
                
                // console.log(datas);
            }
        }
        // console.log(datas);
        for (const el of datas) {
            if (typeof(el.href) != "undefined") {
                // console.log(base_url + el.href);
                el.href = base_url + el.href;
                // console.log(el.href);
                setTimeout(() => {
                    axios.get(el.href).then((respose)=>{
                        $ = cheerio.load(respose.data);
                        // let marks = markdown.translate($("pro-mian"));
                        console.log($("pro-mian"));
                    });
                }, Math.random() * 1000);
                
                // html转为markdown
                
                
            }
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
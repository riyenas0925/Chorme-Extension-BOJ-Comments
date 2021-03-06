﻿var problemComments = new Array("","","","","","");
var i = 0;

var codeLanguage = new Array(
    "",
    "#include<stdio.h>\n\nint main(void) {\n\n\treturn 0;\n}",
    "#include<iostream>\n#include<string>\n#include<algorithm>\nusing namespace std;\n\nint main(void) {\n\n\treturn 0;\n}",
    "public class Main {\n\n\tpublic static void main(String[] args) {\t\n\n\t}\n}"
)

function problemParsing(tag, selector){

    if(arguments.length == 1){
        chrome.tabs.executeScript({
            code:'document.querySelector("' + tag + '").innerHTML'
        }, function(result){
            var problem = result[0];
            problemComments[i] = removeTag(problem);
            i++;

            document.querySelector(tag).innerHTML = problem;
        });
    } else{
        chrome.tabs.executeScript({
            code:'document.querySelector("' + tag + '").innerHTML'
        }, function(result){
            var problem = result[0];

            if(selector == null){
                problemComments[i] = problem;
                i++;
            } else {
                problemComments[i] = removeTag(problem);
                i++;
                document.querySelector(selector).innerHTML = problem;
            }
        });
    }
}

function time(option){
    var now = new Date();

    var year = now.getFullYear();
    var month = now.getMonth();
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

    if(option == 0){
        return year + "년 " + month + "월 " + date + "일 " + hour + "시 " + minute + "분 " + second + "초";
    }
    else{
        return year + "년 " + month + "월 " + date + "일 " + "시 " + "분 " + "초";
    }
}

function removeTag(text){
    text = text.replace(/<br\/>/ig, "\n"); 
    text = text.replace(/<(sup)([^>]*)>/gi,"^")
    text = text.replace(/<(sub)([^>]*)>/gi,"_")
    text = text.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
    text = text.replace(/	/g,"");
    text = text.replace(/&nbsp;/g," ");
    text = text.replace(/\s+$/," ");
    text = text.replace(/\n/g,"");
    text = text.replace(/&lt;/g,"<");
    text = text.replace(/&gt;/g,">");

    return text;
}

function copyToClipboard(val) {
    var t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = val;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
}

function createHtml(){
    alert("HTML 복사되었습니다!")
    var html = document.documentElement.innerHTML;
    html = html.replace(/(<button[^>]+[>])([^<]*)(<\/button>)/g, "");
    html = html.replace(/(<select[^>]+[>])([^]*)(<\/select>)/g, "");
    copyToClipboard(html);
}

function createCode(){
    alert("주석이 복사되었습니다!")
    copyToClipboard(createComments());
}

document.addEventListener('DOMContentLoaded', function() {
    var htmlbtn = document.getElementById('htmlbtn');

    htmlbtn.addEventListener('click', function() {
        createHtml();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var codebtn = document.getElementById('codebtn');

    codebtn.addEventListener('click', function() {
        createCode();
    });
});

function createComments(){
    var comments = "";
    comments += "/*********************************************************************\n";
    comments += "*Title : " + problemComments[1] + "\n";
    comments += "*Number : " + problemComments[2] + "\n";
    comments += "*Author : " + problemComments[3] + "\n";
    comments += "*Description : " + problemComments[4] + "\n";
    comments += "*Input : " + problemComments[5] + "\n";
    comments += "*Output : " + problemComments[6] + "\n";
    comments += "*Start Time : " + time(0) + "\n";
    comments += "*End Time : " + time(1) + "\n";
    comments += "*********************************************************************/\n\n";
    comments += selectLanguage();
    
    return comments;
}

function selectLanguage(){
    var i = document.getElementById("selectLanguage").value;
    return codeLanguage[i];
}

problemParsing("#problem-info");
problemParsing("#problem_title");
problemParsing("body > div.wrapper > div.container.content > div.row > div:nth-child(2) > ul > li.active > a", null);
problemParsing(".username", null);
problemParsing("#problem_description");
problemParsing("#problem_input");
problemParsing("#problem_output");
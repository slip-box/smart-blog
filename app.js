var fs = require("fs");
var path = require("path");
var marked = require('marked');
var gcf = require('gcf');

var changed = gcf.get('./md', function(item) {
    if (item.match(/^node_modules|^\./)) return false;
    return true;
});

console.log(typeof changed, changed); // [];


var blog = (function() {
    var htmlHead = '<!DOCTYPE html><html><head></head><body>';
    var htmlTail = '</body></html>';
    // var changeMap = {};
    // fs.watch('./md', function(event, filename) {
    //     console.log('event is: ' + event);
    //     if (filename) {
    //         changeMap[filename] = true;
    //         console.log('filename provided: ' + filename);
    //         console.log(changeMap)
    //     } else {
    //         console.log('filename not provided');
    //     }
    // });
    return {
        init: function() {
            var _this = this;

            fs.mkdir("./dist", function(err, folder) {
                if (err) {
                    return "创建文件夹失败"
                }
            });

            // console.log(changeMap, changeMap === {})
            if (changed.length == 0) {
                console.log("没有新改动")
                return;
            }
            changed.forEach(function(idx) {
                // console.log(idx)
                _this.md2html(idx);
                // console.log(this)
            });
        },
        isEmptyObject: function(obj) {
            for (var name in obj) {
                return true;
            }
            return false;
        },
        isFile: function(path) {
            console.log(path)
            fs.stat(path, function(err, stat) {
                if (err == null) {
                    if (stat.isDirectory()) {
                        console.log('文件夹存在');
                        return 1;
                    } else if (stat.isFile()) {
                        console.log('文件存在');
                        return 2;
                    } else {
                        // console.log('路径存在，但既不是文件，也不是文件夹');
                        //输出路径对象信息
                        console.log(stat);
                        return false;
                    }
                } else if (err.code == 'ENOENT') {
                    console.log(err.name);
                    // console.log('路径不存在');
                    return false;
                } else {
                    console.log('错误：' + err);
                    return false;
                }
            });
        },
        md2html: function(filePath) {
            // if (!this.isFile("./md" + filePath)) {
            //     console.log("1")
            //     return;
            // }

            // console.log(filePath);


            // var a = this.isFile("./dist");
            // console.log("is:", a)
            // if (!this.isFile("dist")) {
            //     console.log("2")


            // }
            fs.readFile(filePath, function(err, data) {
                console.log("3")

                var html = marked(data.toString());
                // path.resolve("../dist");
                // console.log();
                // path.resolve("./dist");
                filePath = filePath.slice(3);
                console.log("wenjian", filePath);
                fs.writeFile("./dist/" + filePath.slice(0, -3) + ".html", htmlHead + html + htmlTail, function(err) {
                    if (err) {
                        console.error(err);
                        return err;
                    }
                    console.log("写入成功！");
                });
                // fs.readdir('./dist', function(err, files) {
                //     if (err) {
                //         console.log('读取目录失败')
                //     }
                //     // console.log(files);

                // })


            });
        }
    }
})()

blog.init();




// fs.readFile("./md/test.md", function(err, data) {
//     // console.log(data.toString());
//     // console.log(marked(data.toString()));
//     var html = marked(data.toString());
//     // fs.readFile
//     // if
//     fs.writeFile("这是自定义标题.html", htmlHead + html + htmlTail, function(err) {
//         if (err) {
//             return console.error(err);
//         }
//         console.log("写入成功！");
//     })
// });
// console.log(marked('I am using __markdown__.'));
// fs.watchFile('./md', (curr, prev) => {
//     console.log(curr);
//     console.log(prev)
//         // console.log(`the current mtime is: ${curr.mtime}`);
//         // console.log(`the previous mtime was: ${prev.mtime}`);
// });
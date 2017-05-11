var fs = require("fs");
fs.writeFile("./dist/" + "a.html", "123", function(err) {
    if (err) {
        return console.error(err);
    }
    console.log("写入成功！");
})
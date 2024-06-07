"use strict";

const fs = require("fs");


fs.readdir("./dist/", function (err, files) {
    console.log(`files`, files);
    files.forEach(function (file) {
        fs.readFile("./dist/"+file, "utf8", (err, data) => {
            if (!data.match(/import .* from/g)) {
                return;
            }
            let newData = data.replace(/(import .* from\s+['"])(.*)(?=['"])/g, "$1$2.js");
            if (err) throw err;

            fs.writeFile("./dist/"+file, newData, function (err) {
                if (err) {
                    throw err;
                }
                console.log("complete");
            });
        });
    });
});


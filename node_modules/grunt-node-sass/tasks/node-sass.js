const path = require('path');
const fs = require('fs-extra');
const sass = require('node-sass');

module.exports = function (grunt) {
    grunt.registerMultiTask('sass', 'compile sass', function () {
        let done = this.async(),
            promises;

        promises = this.filesSrc.map((item) => {
            return new Promise((resolve, reject) => {
                sass.render({
                    file: item
                }, (err, result) =>{
                    if (err) {
                        reject(err);
                    } else {
                        let dir = path.dirname(this.data.dest);

                        if (!fs.existsSync(dir)) {
                            fs.mkdirpSync(dir);
                        }

                        fs.writeFile(this.data.dest, result.css.toString(), (err) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve();
                            }
                        });
                    }
                })
            });
        });

        Promise.all(promises)
            .then(() => done())
            .catch((err) => {
                console.log(err);
                done(true);
            })
    });
};

const superagent = require('superagent');
const fs = require('fs');



module.exports = (pageUrl = 'http://diy.aixuexi.com/diy/piece') => {

   /* var newDir = fs.readdirSync('./wordurl', { encoding: "utf8" });
    console.log(newDir, "kkkk")
    let urls = '';
    newDir.map((item) => {
        urls += ',' + fs.readFileSync('./wordurl/' + item, { encoding: "utf8" }).replace(/\'/ig, '');

    })

    let urlsArr = urls.split(',')
    urlsArr.map((item) => {
        superagent.get(`http://img-test.aixuexi.com/${item}/widget-word.html`)
            .then((res) => {
                let fileName = item.replace(/\//ig, '-');
                fs.writeFile(`./wordfile/${fileName}.html`, res.res.text, function (err, data) {
                    if (err) {
                        console.log("bad")
                    } else {
                        console.log("ok");
                    }
                })

            })
    })


    return;*/
    superagent.get(pageUrl)
        .set({
            'Set-Cookie': 'token_m=4b0d14baef45f9d0ddaa3b9b5981362f%2C2bfs11n%2C2; Domain=aixuexi.com; Path=/',
            'token_m': '4b0d14baef45f9d0ddaa3b9b5981362f,2bfs11n,2',
            'Content-Type': 'application/json;charset=UTF-8'
        })
        .query({ subjectProductId: 7, pageSize: 500, pageNum: 1 })
        .then((res) => {
            let data = JSON.parse(res.res.text)
            console.log(data, "jjjjj")
            let arr = [];
            let list = data.body.list;
            list.map((item) => {
                arr.push("'" + item.pieceUri + "'");
            })
            console.log(arr, "kkkk")
            fs.writeFile('./wordurl/file.txt', arr.join(','), function (err, data) {
                if (err) {
                    console.log("bad")
                } else {
                    console.log("ok");
                    // console.log(data);
                    // console.log(data.toString());
                }
            })


        })
}
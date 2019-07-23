var express = require('express');
var router = express.Router();
var moment = require('moment');
var request = require('request');

var listModel = require('./db');

var session = require('express-session');

router.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true
}));

var slide = require('./slide');

router.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

router.post('/api/newslist', (req, res, next) => {
    var reqBody = req.body;
    if (reqBody.pageIndex == null) {
        reqBody.pageIndex = 1;
    }
    if (reqBody.pagesize == null) {
        reqBody.pagesize = 5;
    }

    var resDatas = {
        msg: 'msg',
        pageIndex: parseInt(reqBody.pageIndex),
        pagesize: parseInt(reqBody.pagesize)
    }

    listModel.count().then(count => {
        resDatas.records = count;
        resDatas.total = Math.ceil(count/resDatas.pagesize);

        if (resDatas.pageIndex > resDatas.total) { resDatas.pageIndex = resDatas.total; }
        var limit = resDatas.pagesize;
        var skip = (resDatas.pageIndex - 1) * resDatas.pagesize;

        listModel.find().sort({_id: -1}).limit(limit).skip(skip)
        .then((data) => {
            resDatas.rows = data;
            res.send(resDatas);
        })
    });
});

router.get('/api/newsone/:id', (req, res, next) => {
    listModel.findById(req.params.id, (err, data) => {
        return err ? res.send(err) : res.send(data);
    });
});

router.post('/api/newsedit', (req, res, next) => {

    let editList = new listModel({
        title: req.body.title,
        author: req.body.author,
        date: req.body.date ? req.body.date : moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        content: req.body.content
    });

    editList.save((err, data) => {
        return err ? res.send(err) : res.send(data);
    });

});

router.get('/api/newsdelet/:id',(req, res, next) => {

    listModel.findById(req.params.id, (err, data) => {
        data.remove((err, data) => {
            res.send({
                msg: 'msg!'
            });
            res.end();
        });
    });

});

router.post("/api/newsedit/:id", (req, res, next) => {
    listModel.findById(req.params.id, (err, data) => {
        data.content = req.body.content;
        data.date = req.body.date ? req.body.date : moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        data.author = req.body.author;
        data.title = req.body.title;

        data.save(function(err, data) {
            return err ? res.send(err) : res.send(data);
        });

    });
});

router.post('/api/login', function (req, res) {
    if (req.body.userName !== '' && req.body.passWord === '123456') {
        return res.json({ userName: req.body.userName })
    }
    res.status(401).json({ error: 'Error!' })
})

router.get("/api/gt/register-slide", function (req, res) {
    slide.register(null, function (err, data) {

        if (err) {
            res.status(500);
            res.send(err);
            return;
        }

        if (!data.success) {
            req.session.fallback = true;
            res.send(data);
        } 
        else {
            req.session.fallback = false;
            res.send(data);
        }
    });
});

router.post("/api/gt/validate-slide", function (req, res) {

    slide.validate(req.session.fallback, {
        geetest_challenge: req.body.geetest_challenge,
        geetest_validate: req.body.geetest_validate,
        geetest_seccode: req.body.geetest_seccode
    }, function (err, success) {

        if (err) {
            res.send({
                status: "error",
                info: err
            });

        } 
        else if (!success) {
            res.send({
                status: "fail",
                info: 'fail'
            });
        } 
        else {
            res.send({
                status: "success",
                info: 'success'
            });
        }
    });
});


module.exports = router;

const express = require('express')

const nodemailer = require("nodemailer");
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const login = process.env.LOGIN
const password = process.env.PASSWORD

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        // user: 'sender.larionovra@gmail.com',
        user: login,
        // pass: 'SendEmailRoman391',
        pass: password,
    }
});


app.get('/', (req, res) => {

    res.send('Hello World!')

});

app.post('/sendMessage', async  function(req, res){

let {name, company, message} = req.body
    let info = await transporter.sendMail({
        from: 'From my site Portfolio', // sender address
        to: "larionovra@gmail.com", // list of receivers
        subject: "Message about new works 👻", // Subject line
        html: `<div><b>Новое сообщение с портфолио!</b></div> 
        <div>Имя: ${name}</div>
        <div>Компания: ${company}</div>
        <div>Сообщение: ${message}</div>`,
    })
    res.send('Email send!')


});

const port = process.env.PORT || 3010;
// const port = 3010

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
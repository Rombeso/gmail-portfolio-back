const express = require('express')
const port = 3010
const nodemailer = require("nodemailer");
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sender.larionovra@gmail.com', // generated ethereal user
        pass: 'SendEmailRoman391', // generated ethereal password
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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
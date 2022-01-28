"use strict";module.exports=(e,{services:s,exceptions:E,env:n})=>{let t=require("nodemailer"),a=require("@aws-sdk/client-ses");var S=require("nodemailer-express-handlebars");process.env.AWS_ACCESS_KEY_ID=n.EMAIL_SES_CREDENTIALS__ACCESS_KEY_ID,process.env.AWS_SECRET_ACCESS_KEY=n.EMAIL_SES_CREDENTIALS__SECRET_ACCESS_KEY;const _=new a.SES({apiVersion:n.EMAIL_SES_API_VERSION||"2010-12-01",region:n.EMAIL_SES_REGION});let i=t.createTransport({SES:{ses:_,aws:a}});i.use("compile",S({viewEngine:{extName:".handlebars",partialsDir:"extensions/views/partials",defaultLayout:!1},viewPath:"extensions/views/",extName:".handlebars"})),e.post("/",((e,s)=>null!=n.EMAIL_SES_ALLOW_GUEST_SEND&&n.EMAIL_SES_ALLOW_GUEST_SEND||null!=e.accountability.user&&null!=e.accountability.role?"string"!=typeof n.EMAIL_SES_CREDENTIALS__ACCESS_KEY_ID?s.status(400).send({message:"env: aws access key missing 🐱‍👤"}):"string"!=typeof n.EMAIL_SES_CREDENTIALS__SECRET_ACCESS_KEY?s.status(400).send({message:"env: aws secret key missing 👻"}):"string"!=typeof n.EMAIL_SES_REGION?s.status(400).send({message:"env: aws region missing 🌎"}):void(async()=>{try{const E=await i.sendMail(e.body);s.send({status:E})}catch(e){return s.send({status:e})}})():s.status(400).send({message:"User not authorized, enable guest sending or include a token"})))};

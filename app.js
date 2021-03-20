var express = require("express");
const app = express();
const bodyParser = require("body-parser");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/sendmail", (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let message = req.body.message;
  let subject = req.body.subject;
  const msg = {
    to: `rcrajesh.designs@gmail.com`, // Change to your recipient
    from: "hello@rajeshchandran.in", // Change to your verified sender
    subject: `${subject}`,
    text: `${message}`,
    html: `<h1>hello this is a test mail from ${name}</h1><p>message:${message}<p><p>email:</p><p>${email}</p>`,
  };
  sgMail
    .send(msg)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });
  app.get("/test", (req, res, _) => {
    res.send("hello world!!!");
  });
  res.send("success!");
});
app.listen(process.env.PORT || 5000);

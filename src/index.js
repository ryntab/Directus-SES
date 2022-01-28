export default (router, { services, exceptions, env }) => {
  let nodemailer = require("nodemailer");
  let aws = require("@aws-sdk/client-ses");

  var hbs = require("nodemailer-express-handlebars");

  process.env.AWS_ACCESS_KEY_ID = env.EMAIL_SES_CREDENTIALS__ACCESS_KEY_ID;
  process.env.AWS_SECRET_ACCESS_KEY =
    env.EMAIL_SES_CREDENTIALS__SECRET_ACCESS_KEY;

  const ses = new aws.SES({
    apiVersion: env.EMAIL_SES_API_VERSION || "2010-12-01",
    region: env.EMAIL_SES_REGION,
  });

  let transporter = nodemailer.createTransport({
    SES: { ses, aws },
  });

  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: "extensions/views/partials",
      defaultLayout: false,
    },
    viewPath: "extensions/views/",
    extName: ".handlebars",
  };

  transporter.use("compile", hbs(handlebarOptions));

  router.post("/", (req, res) => {
    if (
      env.EMAIL_SES_ALLOW_GUEST_SEND == null ||
      !env.EMAIL_SES_ALLOW_GUEST_SEND
    ) {
      if (req.accountability.user == null || req.accountability.role == null) {
        return res.status(400).send({
          message:
            "User not authorized, enable guest sending or include a token",
        });
      }
    }

    if (typeof env.EMAIL_SES_CREDENTIALS__ACCESS_KEY_ID != "string")
      return res.status(400).send({
        message: "env: aws access key missing 🐱‍👤",
      });
    if (typeof env.EMAIL_SES_CREDENTIALS__SECRET_ACCESS_KEY != "string")
      return res.status(400).send({
        message: "env: aws secret key missing 👻",
      });

    if (typeof env.EMAIL_SES_REGION != "string")
      return res.status(400).send({
        message: "env: aws region missing 🌎",
      });

    (async () => {
      try {
        const sendMail = await transporter.sendMail(req.body);
        return res.send({
          status: sendMail,
        });
      } catch (err) {
        return res.send({
          status: err,
        });
      }
    })();
  });
};

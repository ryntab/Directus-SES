export default (router, { services, exceptions, env }) => {
  let nodemailer = require("nodemailer");
  let aws = require("@aws-sdk/client-ses");

  process.env.AWS_ACCESS_KEY_ID = env.EMAIL_SES_CREDENTIALS__ACCESS_KEY_ID;
  process.env.AWS_SECRET_ACCESS_KEY = env.EMAIL_SES_CREDENTIALS__SECRET_ACCESS_KEY;

  const ses = new aws.SES({
    apiVersion: env.EMAIL_SES_API_VERSION || "2010-12-01",
    region: env.EMAIL_SES_REGION,
  });
  let transporter = nodemailer.createTransport({
    SES: { ses, aws },
  });

  router.post("/", (req, res) => {
	if (typeof(env.EMAIL_SES_CREDENTIALS__ACCESS_KEY_ID) != 'string') return res.send({status: "env: aws access key missing 🐱‍👤"});
	if (typeof(env.EMAIL_SES_CREDENTIALS__SECRET_ACCESS_KEY) != 'string') return res.send({status: "env: aws secret key missing 👻"});
	if (typeof(env.EMAIL_SES_REGION) != 'string') return res.send({status: "env: aws region missing 🌎"});

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

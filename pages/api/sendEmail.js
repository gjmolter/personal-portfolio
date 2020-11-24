const sgMail = require("@sendgrid/mail");

export default function handler(req, res) {
  console.log(req.body);
  console.log(process.env.SENDGRID_API_TOKEN);

  sgMail.setApiKey(process.env.SENDGRID_API_TOKEN);
  const msg = {
    to: "gabriel@chillycapybara.com",
    from: "contato@gjmolter.com",
    subject: "Website Contact",
    text: `Name: ${req.body.name} Email: ${req.body.email} Message: ${req.body.message}`,
    html: `Name: ${req.body.name}<br>Email: ${req.body.email}<br>Message: ${req.body.message}`,
  };
  sgMail
    .send(msg)
    .then(() => {
      res.statusCode = 200;
      res.end();
    })
    .catch((error) => {
      res.statusCode = 500;
      res.end();
    });
}

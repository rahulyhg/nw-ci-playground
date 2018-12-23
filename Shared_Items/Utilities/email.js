var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'shd.nw.report@gmail.com',
           pass: 'shaadi123'
       }
   });

   const mailOptions = {
    from: 'shd.nw.report@gmail.com', // sender address
    to: 'rajeevv67@yahoo.com', // list of receivers
    subject: 'Subject of your email', // Subject line
    html: '<p>Your html here</p>',// plain text body
    attachments : [
        { // use URL as an attachment
          path: 'C:\\office_work\\Nightwatch-Web-Testing\\Result\\regression_Thankpayatshaadi_20181111134558233.html'
        }
      ]
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
 });
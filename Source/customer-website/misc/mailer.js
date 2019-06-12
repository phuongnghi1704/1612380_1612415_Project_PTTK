const nodemailer=require('nodemailer')

const config =require('../config/mailer')


const transporter=nodemailer.createTransport(
    {
        service:'gmail',
        auth:{
            user:config.USER,
            pass:config.PASS
        }
    }
);



const sendMail = (email, subject, text, cb) => {
    const mailOptions = {
        from: 'Verify', // TODO replace this with your own email
        to: email, // TODO: the receiver email has to be authorized for the free tier
        subject,
        text
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            return cb(err, null);
        }
        return cb(null, data);
    });
}

module.exports = sendMail;

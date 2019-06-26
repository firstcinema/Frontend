import axios from 'axios';

const from = 'FirstCinema <noreply@firstcinema.co>';

export default {
    methods: {
        sendConfirmation: function(user) {
            let mailOptions = {
                from: from,
                to: user.email,
                subject: 'Please Confirm Your Email Address'
            };

            this.sendEmail(mailOptions, {
                user: user
            }, 'confirm', (error, info) => {
                if (error) {
                    console.log(error);
                    return;
                }
            });
        },
        sendPaswordUpdate: function(user) {
            let mailOptions = {
                from: from,
                to: user.email,
                subject: 'FirstCinema Account Password Updated'
            };
            this.sendEmail(mailOptions, { user: user }, 'password-updated', (error, info) => {
                if (error) {
                    console.log(error);
                    return;
                }
            })
        },
        sendEmail: function(mailOptions, replacements, template, callback) {
            let html = require(`@/assets/templates/${template}.html`);
            mailOptions.html = html;
            axios.post("/api/mail", { mailOptions, replacements }, {
                withCredentials: true
            }).then(response => {
                callback(null, response);
            }).catch(error => {
                callback(error);
            });
        },
    }
}
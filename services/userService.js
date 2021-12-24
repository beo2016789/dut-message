const util = require('util');
const nodemailer = require('nodemailer');

class UserService {
    constructor(userRepo, requestRsPwRepo) {
        this._userRepo = userRepo;
        this._requestRsPwRepo = requestRsPwRepo;
    }

    async getUser(userId) {
        try {
            let user = await this._userRepo.findUserById(userId);
            if(user) return user;
            else throw({error: 'user not found'}); 
        } catch (err) {
            throw(err);
        }
    }

    async findByUsername(username) {
        try{
            const user = this._userRepo.findByUsername(username);
            return user;
        } catch (err) {
            throw(err);
        }
    }

    async findUserByPhone(phone) {
        try{
            const user = this._userRepo.findUserByPhone(phone);
            return user;
        } catch (err) {
            throw(err);
        }
    }

    async findUserByEmail(email) {
        try{
            const user = this._userRepo.findUserByEmail(email);
            return user;
        } catch (err) {
            throw(err);
        }
    }

    async createFriendRequest(fromId, toId){
        try{
            const F_requests = await this._userRepo.createFriendRequest(fromId, toId);
            return F_requests;
        } catch (err) {
            throw(err);
        }
    }

    async removeFriendRequest(F_requestId) {
        try{
            await this._userRepo.removeFriendRequest(F_requestId);
        } catch (err) {
            throw(err);
        }
    }

    async getAllF_RequestTo(userId) {
        try{
            const F_requests = await this._userRepo.getAllF_RequestTo(userId);
            return F_requests;
        } catch (err) {
            throw(err);
        }
    }

    async getFriendRequest(fromId, toId) {
        try{
            const F_request = await this._userRepo.getFriendRequest(fromId, toId);
            return F_request;
        } catch (err) {
            throw(err);
        }
    }

    async getFriendRequestById(frId) {
        try {
            const F_request = await this._userRepo.getFriendRequestById(frId);
            return F_request;
        } catch (err) {
            throw(err);
        }
    }

    async addFriend(userId, friendId) {
        try{
            await this._userRepo.addFriend(userId, friendId);
            await this._userRepo.addFriend(friendId, userId);
        } catch (err) {
            throw(err);
        }
    }

    async removeFriend(userId, friendId) {
        try{
            await this._userRepo.removeFriend(userId, friendId);
            await this._userRepo.removeFriend(friendId, userId);
        } catch (err) {
            throw(err);
        }
    }

    async getAllFriends(userId) {
        try{
            const friends = await this._userRepo.getAllFriends(userId);
            return friends;
        } catch (err) { 
            throw(err);
        }
    }

    async checkFriend(userId, friendId){
        try{
            const user = await this._userRepo.findUserById(userId);
            if(user.friends.includes(friendId)){
                return true;
            } else {
                return false;
            }
        } catch (err) {
            throw(err);
        }
    }

    async updateInfoUser(userId, name, email, avatar){
        try {
            await this._userRepo.updateInfoUser(userId, {name: name, email: email, avatar: avatar});
        } catch (err) {
            throw(err);
        }
    }

    async changePassword(userId, inputPassword) {
        try{
            const checkCurrentPassword = await this._userRepo.checkPassword(userId, inputPassword.current);
            if(checkCurrentPassword) {
                await this._userRepo.changePassword(userId, inputPassword.new);
                return true;
            } else {
                return false;
            }
        } catch (err) {
            throw(err);
        }
    }

    async sendEmailResetPassword(userId, email) {
        try{
            const request = await this._requestRsPwRepo.createRequest(userId, email);
            setTimeout(this._requestRsPwRepo.deleteRequest, 180000, request._id);
            let content = '';
            content += `
            <!DOCTYPE html>
            <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
            
            <head>
                <title></title>
                <meta charset="utf-8" />
                <meta content="width=device-width, initial-scale=1.0" name="viewport" />
                <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css" />
                <link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" type="text/css" />
                <style>
                    * {
                        box-sizing: border-box;
                    }
            
                    body {
                        margin: 0;
                        padding: 0;
                    }
            
                    a[x-apple-data-detectors] {
                        color: inherit !important;
                        text-decoration: inherit !important;
                    }
            
                    #MessageViewBody a {
                        color: inherit;
                        text-decoration: none;
                    }
            
                    p {
                        line-height: inherit
                    }
            
                    @media (max-width:620px) {
                        .icons-inner {
                            text-align: center;
                        }
            
                        .icons-inner td {
                            margin: 0 auto;
                        }
            
                        .row-content {
                            width: 100% !important;
                        }
            
                        .image_block img.big {
                            width: auto !important;
                        }
            
                        .stack .column {
                            width: 100%;
                            display: block;
                        }
                    }
                </style>
            </head>
            
            <body style="background-color: #d9dffa; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
                <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d9dffa;" width="100%">
                    <tbody>
                        <tr>
                            <td>
                                <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1"
                                    role="presentation"
                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #cfd6f4;" width="100%">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                    class="row-content stack" role="presentation"
                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px;"
                                                    width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td class="column"
                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 20px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                                width="100%">
                                                                <table border="0" cellpadding="0" cellspacing="0"
                                                                    class="image_block" role="presentation"
                                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                    width="100%">
                                                                    <tr>
                                                                        <td style="width:100%;padding-right:0px;padding-left:0px;">
                                                                            <div align="center" style="line-height:10px"><img
                                                                                    alt="Card Header with Border and Shadow Animated"
                                                                                    class="big"
                                                                                    src="https://i.imgur.com/yZtx511.gif"
                                                                                    style="display: block; height: auto; border: 0; width: 600px; max-width: 100%;"
                                                                                    title="Card Header with Border and Shadow Animated"
                                                                                    width="600" /></div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2"
                                    role="presentation"
                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d9dffa; background-image: url('https://i.imgur.com/ELhQ0Zn.png'); background-position: top center; background-repeat: repeat;"
                                    width="100%">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                    class="row-content stack" role="presentation"
                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px;"
                                                    width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td class="column"
                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-left: 50px; padding-right: 50px; padding-top: 15px; padding-bottom: 15px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                                width="100%">
                                                                <table border="0" cellpadding="10" cellspacing="0"
                                                                    class="text_block" role="presentation"
                                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                                    width="100%">
                                                                    <tr>
                                                                        <td>
                                                                            <div style="font-family: sans-serif">
                                                                                <div
                                                                                    style="font-size: 14px; mso-line-height-alt: 16.8px; color: #506bec; line-height: 1.2; font-family: Helvetica Neue, Helvetica, Arial, sans-serif;">
                                                                                    <p style="margin: 0; font-size: 14px;">
                                                                                        <strong><span style="font-size:38px;">Forgot
                                                                                                your password?</span></strong>
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table border="0" cellpadding="10" cellspacing="0"
                                                                    class="text_block" role="presentation"
                                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                                    width="100%">
                                                                    <tr>
                                                                        <td>
                                                                            <div style="font-family: sans-serif">
                                                                                <div
                                                                                    style="font-size: 14px; mso-line-height-alt: 16.8px; color: #40507a; line-height: 1.2; font-family: Helvetica Neue, Helvetica, Arial, sans-serif;">
                                                                                    <p style="margin: 0; font-size: 14px;"><span
                                                                                            style="font-size:16px;">Hey, we received
                                                                                            a request to reset your password.</span>
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table border="0" cellpadding="10" cellspacing="0"
                                                                    class="text_block" role="presentation"
                                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                                    width="100%">
                                                                    <tr>
                                                                        <td>
                                                                            <div style="font-family: sans-serif">
                                                                                <div
                                                                                    style="font-size: 14px; mso-line-height-alt: 16.8px; color: #40507a; line-height: 1.2; font-family: Helvetica Neue, Helvetica, Arial, sans-serif;">
                                                                                    <p style="margin: 0; font-size: 14px;"><span
                                                                                            style="font-size:16px;">Let’s get you a
                                                                                            new one!</span></p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table border="0" cellpadding="0" cellspacing="0"
                                                                    class="button_block" role="presentation"
                                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                    width="100%">
                                                                    <tr>
                                                                        <td
                                                                            style="padding-bottom:20px;padding-left:10px;padding-right:10px;padding-top:20px;text-align:left;">
                                                                            <a
                                                                                href="https://dut-message.up.railway.app/api/user/request-reset-password/${request._id}"
                                                                                style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#506bec;border-radius:16px;width:auto;border-top:0px solid TRANSPARENT;border-right:0px solid TRANSPARENT;border-bottom:0px solid TRANSPARENT;border-left:0px solid TRANSPARENT;padding-top:8px;padding-bottom:8px;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;"
                                                                                target="_blank"><span
                                                                                    style="padding-left:25px;padding-right:20px;font-size:15px;display:inline-block;letter-spacing:normal;"><span
                                                                                        style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"><span
                                                                                            data-mce-style="font-size: 15px; line-height: 30px;"
                                                                                            style="font-size: 15px; line-height: 30px;"><strong>RESET
                                                                                                MY
                                                                                                PASSWORD</strong></span></span></span></a>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table border="0" cellpadding="10" cellspacing="0"
                                                                    class="text_block" role="presentation"
                                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                                    width="100%">
                                                                    <tr>
                                                                        <td>
                                                                            <div style="font-family: sans-serif">
                                                                                <div
                                                                                    style="font-size: 14px; mso-line-height-alt: 16.8px; color: #40507a; line-height: 1.2; font-family: Helvetica Neue, Helvetica, Arial, sans-serif;">
                                                                                    <p style="margin: 0; font-size: 14px;"><span
                                                                                            style="font-size:14px;">Having trouble?
                                                                                            <a href="http://www.example.com/"
                                                                                                rel="noopener"
                                                                                                style="text-decoration: none; color: #40507a;"
                                                                                                target="_blank"
                                                                                                title="@dut-message"><strong>@dut-message</strong></a></span>
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table border="0" cellpadding="10" cellspacing="0"
                                                                    class="text_block" role="presentation"
                                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                                    width="100%">
                                                                    <tr>
                                                                        <td>
                                                                            <div style="font-family: sans-serif">
                                                                                <div
                                                                                    style="font-size: 14px; mso-line-height-alt: 16.8px; color: #40507a; line-height: 1.2; font-family: Helvetica Neue, Helvetica, Arial, sans-serif;">
                                                                                    <p style="margin: 0; font-size: 14px;">Didn’t
                                                                                        request a password reset? You can ignore
                                                                                        this message.</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3"
                                    role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                    class="row-content stack" role="presentation"
                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px;"
                                                    width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td class="column"
                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                                width="100%">
                                                                <table border="0" cellpadding="0" cellspacing="0"
                                                                    class="image_block" role="presentation"
                                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                    width="100%">
                                                                    <tr>
                                                                        <td style="width:100%;padding-right:0px;padding-left:0px;">
                                                                            <div align="center" style="line-height:10px"><img
                                                                                    alt="Card Bottom with Border and Shadow Image"
                                                                                    class="big"
                                                                                    src="https://i.imgur.com/ZJEVrqk.png"
                                                                                    style="display: block; height: auto; border: 0; width: 600px; max-width: 100%;"
                                                                                    title="Card Bottom with Border and Shadow Image"
                                                                                    width="600" /></div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4"
                                    role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                    class="row-content stack" role="presentation"
                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px;"
                                                    width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td class="column"
                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-left: 10px; padding-right: 10px; padding-top: 10px; padding-bottom: 20px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                                width="100%">
                                                                <table border="0" cellpadding="5" cellspacing="0"
                                                                    class="image_block" role="presentation"
                                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                    width="100%">
                                                                    <tr>
                                                                        <td>
                                                                            <div align="center" style="line-height:10px"><a
                                                                                    href=""
                                                                                    style="outline:none" tabindex="-1"
                                                                                    target="_blank"><img alt="Your Logo"
                                                                                        src="https://i.imgur.com/lLWySAN.png"
                                                                                        style="display: block; height: auto; border: 0; width: 145px; max-width: 100%;"
                                                                                        title="Your Logo" width="145" /></a></div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </body>
            
            </html>
            `
            let transporter =  nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'quocdatdn292001@gmail.com',
                    pass: 'datkenry29'
                },
                tls: {
                    rejectUnauthorized: false,
                }
            })

            let mailOptions = {
                from: 'quocdatdn292001@gmail.com',
                to: email,
                subject: 'DUT-Message',
                html: content
            }

            await transporter.sendMail(mailOptions, (err, info) => {
                if(err) {
                    console.log(err)
                } else {
                    console.log('Message sent: ' + info.response)
                }
            })
            return request;
        } catch (err) {
            throw(err);
        }
    }

    

    async resetPassword(requestId, password){
        try {
            const request = await this._requestRsPwRepo.findRequest(requestId);
            if(request) {
                await this._userRepo.changePassword(request.userId._id, password);
                await this._requestRsPwRepo.deleteRequest(requestId);
                return true;
            } else {
                return false;
            }
        } catch (err) {
            throw(err);
        }
    }
}

module.exports = UserService;
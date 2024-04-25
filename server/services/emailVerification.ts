import nodemailer from "nodemailer";
import "dotenv/config";
import { utils as ethersUtils } from "ethers";
import fetchGifUrl from "./fetchGifUrl";
import { log } from "console";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});




// account email verification
const sendVerificationEmail = async (userEmail:any, verificationToken:any) => {
  const verificationUrl = `http://localhost:5173/verify?token=${verificationToken}`;

  const mailOptions = {
    from: process.env.EMAIL, 
    to: userEmail, 
    subject: "Verify Your Email",
    html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Verification email sent:", info.response);
  } catch (error) {
    console.error("Error sending verification email", error);
  }
};



// blockchain confirmation email for Transactions on frontend
async function sendTransactionEmail(senderEmail: string, transaction: any): Promise<void> {
  console.log("sendTransaction function is working in terminal")
  const amountInEther = ethersUtils.formatEther(transaction.amount);
  const gifUrl = await fetchGifUrl(transaction.keyword);
  console.log("Gif URL obtained:", gifUrl);
  console.log(gifUrl);
  const mailOptions = {
    from: process.env.EMAIL,
    to: senderEmail, 
    subject: "Your Recent Transaction Summary",
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="line-height: 1.5; padding: 0; font-family: 'Open Sans', sans-serif; background: linear-gradient(to right, #460645, #FF5450); color: rgba(2s50, 250, 250, 0.7);">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 2px solid #FF5450;">
            <div style="padding: 20px; background-color: #460645; color: white; text-align:center; border-bottom: 1px solid #FF5450;">
                <img src="https://i.imgur.com/ql40xeb.png" alt="CryptoX Logo" style="width: 170px; margin-bottom: 10px;">
                <h1>Thank You For Your Transaction! with <span style="color: #FF5450;">CryptoX</span></h1>
            </div>
            <div style="padding: 40px 60px; background: linear-gradient(to right, #460645, #FF5450), url('https://i.imgur.com/R2aeLcD.png') no-repeat center center; color: rgba(250, 250, 250, 0.7); background-size: cover; line-height: 2; text-align: center;">
                <h2 style="text-align: center; padding-bottom: 40px;" >Congratulations! Your transaction has been sent securely through the <span style="color: #FF5450; font-weight: bold; font-size: larger;">Blockchain</span></h2>
                <hr style="width: 80%; margin-bottom: 40px;">
                <h3 style="font-size: 25px;">Transaction Summary!</h3>
                <p style="line-height: 1.5; padding-bottom: 2px;"><strong>Sent from this Account Address:</strong>  0xc3A1aB75350C49baBea6deec82f06B685b7A68B2</p>
                <p style="line-height: 0.5;"><strong>To this Account Address:</strong></p>
                <p style="line-height: 0; padding-bottom: 2px;"><strong></strong>  0xc3A1aB75350C49baBea6deec82f06B685b7A68B2</p>
                <p><strong>Total Amount Sent:</strong> ${amountInEther} (ETH)</p>
                <p><strong>Your Message:</strong> ${transaction.message}</p>
                <p><strong>Transaction sent at:</strong> ${transaction.timestamp}</p>
                <p style="padding-bottom: 20px;"><strong>Gif of your choice:</strong> ${transaction.keyword}</p>
                <div style="text-align: center; margin-top:10px; margin-bottom: 10px; padding-bottom: 40px;">
                    <img src="${gifUrl}" alt="Transaction GIF" style="max-width: 100%; height: auto; display: block; margin: auto;">
                </div>
                <hr style="margin-top: 40px; margin-bottom: 60px; width: 80%;">
                <p style="line-height: 1.5; text-align: center;">Thank you for choosing us for your Ethereum transactions. Your trust in our secure, blockchain-powered platform ensures your financial empowerment and seamless global transfers.</p>
            </div>
            <div style="background-color: #460645; color: rgba(250, 250, 250, 0.7); text-align: center; padding: 20px 60px; font-size: smaller; border-top: 1px solid #FF5450;">
                <h2 style="font-weight: bold; padding: 20px 0px;">Expectations when using our <span style="color: #FF5450;">CryptoX</span> services!</h2>
                <p style="line-height: 1.5;">Rest assured, your decision to transact with us marks a step towards unparalleled convenience and security in the digital currency space.</p>
                <p style="line-height: 1.5;">We're honored to be your chosen partner in navigating the cryptocurrency landscape, and we're committed to continually providing you with the most efficient and reliable service.</p>
            </div>
        </div>
    </body>
    </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Ethereum Transaction email sent:", info.response);
  } catch (error) {
    console.error("Error sending transaction summary email", error);
  }
}

export { sendVerificationEmail, sendTransactionEmail };

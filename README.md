# CryptoX---DApp
CriptoX is a decentralized application (DApp), that combines REACT/TYPESCRIPT/NODEJS/HARDHAT/SOLIDITY and METAMASK to send Sepolia ETH(Ethereum) interacting with blockchain for transactions
=======

**CLIENT FOLDER**
emailjs env variables here in client is strictly for sending email from contact form on FRONTEND UI
giphy env variable api is when making a transaction, you will send/see a gif too (check Transaction page on FRONTEND UI)
ADD .env the next variables within the root directory of client.
1. VITE_GIPHY_API=... ===>>> https://developers.giphy.com/
2. VITE_EMAILJS_PUBLIC_KEY ===>> emailjs public key
3. VITE_EMAILJS_SERVICE_ID  ==>> emailjs service id
4. VITE_EMAILJS_TEMPLATE_ID ==>> emailjs email template id


**SERVER FOLDER**
    --ADD .env the next variables within the root directory of server.
            1. EMAIL=... ===>> THIS is the email you will get the receipt after transaction
            2. EMAIL_PASSWORD=... ==>> This is the password of that email, is required
            3. MONGO_URI=... ==>> This is Your MONGODB URI link to your Atlas database for VSC
            4. JWT_SECRET=... ==>> JASON WEB TOKEN, you need it for authentication purposes
            5. PORT=... ==>> YOU CAN SET IT TO 3001
            6. PRIVATE_KEY=... ==>> THIS is your private Crypto wallet key 
            7. ALCHEMY_API=... ==>> This is your alchemy_api key
            8. VITE_GIPHY_API=... ==>> just like in the frontend, a giphy api key
            9. RECAPTCHA_KEY=... ==>> this is RECAPTCHA google key, for verifying when sign up with RECAPTCHA


**CLIENT FOLDER**
    --ADD .env the next variables within the root directory of smart_contracts.
            1. PRIVATE_KEY=... ==>> THIS is your private Crypto wallet key 
            2. ALCHEMY_API=... ==>> This is your alchemy_api key



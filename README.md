# <p align="center">[<img style="height: 200px; width: 200px;" src="./client/src/images/Hardpost-logos_transparent.png">](https://hardpost-f79ecee5b44d.herokuapp.com/)</p>

## <h2 align="center"> An online marketplace to buy, sell, and trade skateboarding items. </h2>

## <p align="center"> [deployed site](https://hardpost-f79ecee5b44d.herokuapp.com/) </p>

## <p align="center">Motivation

The decision to develop this platform stemmed from a personal hobby of mine, skateboarding. The prices of skateboarding hard-goods are at an all time high, and they must still continuously be replaced after a certain amount of wear. Being in the skateboarding community for over 10 years, I have found that we typically accumulate lots of expensive products that are no longer used after a certain time. I found that there is no online platform for us to specifically sell our items or buy from other individuals at a more affordable price. Until now, the only option would be to go on generic e-commerce platforms, where the majority of users have no interest in skateboarding products. Hardpost aims to fill that gap

## <p align="center">Technologies used

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=black)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=red)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)

</p>

## Relational Database Design

<img src="./hardpost-ERD.png">

### steps for running locally

- clone repo
- 'npm install' all dependencies inside root, client, and server folders
- in server folder, create .env file with DB_NAME="hardpost_db", and DB_USER and DB_PASSWORD set to your MySQL credentials (default user is 'root')
- still in server, log into MySQL shell and run 'source db/schema.sql' to create database
- return to root of project an 'npm run start' to concurrently run node-express server and vite dev mode

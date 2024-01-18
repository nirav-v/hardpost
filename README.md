# <p align="center">[<img style="height: 200px; width: 200px;" src="./client/src/images/Hardpost-logos_transparent.png">](https://hardpost-f79ecee5b44d.herokuapp.com/)</p>

## <h2 align="center"> An online marketplace to buy, sell, and trade skateboarding items. </h2>

### <p align="center"> [deployed site](https://hardpost-f79ecee5b44d.herokuapp.com/) </p>

## <p align="center">Motivation

The prices of skateboarding hard-goods are at an all time high. Skateboarders typically accumulate lots of gear while many people cannot afford to buy those items brand new. There is no dedicated platform for people to specifically buy or sell skateboarding items from other individuals at a more affordable price. The main option has been to go on generic online marketplaces where the majority of users have no interest in skateboarding products. Hardpost aims to close that gap.

## <p align="center">Description

The concept is straightforward. Skateboarders can create an account and make posts of items they have for sale, including an image and price tag. Other users can browse those items, add them to their cart, and then must be logged in with an account to purchase those items.

## <p align="center">Technologies used

![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=black)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=red)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)

<br>

[badges source](https://github.com/alexandresanlim/Badges4-README.md-Profile)

</p>

## <p align="center">Testing

- For unit testing, run 'npm run test' in both client and server folders individually (runs jest tests).
- For integration testing, run 'npm start' at root of the project to start up the client and server. Then cd into the client and run 'npm run cypress', select chrome as the browser testing environment

## <p align="center"> Relational Database Design

<img src="./hardpost-ERD.png">

## <p align="center"> steps for running locally

- clone repo
- 'npm install' all dependencies inside root, client, and server folders
- in server folder, create .env file with DB_NAME="hardpost_db", and DB_USER and DB_PASSWORD set to your MySQL credentials (default user is 'root')
- still in server, log into MySQL shell and run 'source db/schema.sql' to create database
- return to root of project an 'npm run start' to concurrently run node-express server and vite dev mode

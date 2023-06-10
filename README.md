# QueueEase

The "QueueEase" project is an implementation of a queue system in a bank aimed at simplifying the customer service process. The system consists of four main components: Teller, FrontDesk, Admin, and Monitor.

The Teller is responsible for serving customers according to their queue number. The Teller uses QueueEase by logging in to the available counter and starts serving customers. The FrontDesk is where customers fill out customer forms and take a queue number when they enter the bank. The Monitor is used to display queue numbers and call customers based on the queue number they received at the front desk. The Admin is the management personnel who can monitor the ongoing queue, history, and the status and types of customer transactions.

Customers will be given a queue number and wait for their turn while monitoring the monitor. The assigned queue number will be registered in a database accessible by the teller. After being served by the teller, the queue number will be marked as "Completed" and recorded in the historical database.

# Installation Guide

Clone this repository

```
git clone https://github.com/SistemBasisData2023/QueueEase.git
```

## Frontend

- Ensure You’re on the right folder

  <img width="153" alt="image" src="https://github.com/SistemBasisData2023/QueueEase/assets/113244831/5bc53ff0-9cb4-4b98-b76f-2fb0b4333860">

  ```
  git clone https://github.com/SistemBasisData2023/QueueEase.git
  ```

- Run npm install to install all dependencies
  ```
   npm install
  ```
- To test the installation result run
  ```
  npm run dev
  ```
   <img width="288" alt="image" src="https://github.com/SistemBasisData2023/QueueEase/assets/113244831/a22d9c66-4e36-445f-9d48-31807f399a51">

## Backend

- Ensure You’re on the right folder

  <img width="162" alt="image" src="https://github.com/SistemBasisData2023/QueueEase/assets/113244831/634c08fa-b33a-4c19-be0a-868e18e21e21">

- Run npm install to install all dependencies
  ```
   npm install
  ```
- Create an .env file in your project root folder and add your variables.

  <img width="187" alt="image" src="https://github.com/SistemBasisData2023/QueueEase/assets/113244831/c6fd8cef-e5dd-4ec7-8fbf-81a72eb4d8c6">

- Insert Database Variables

  <img width="807" alt="image" src="https://github.com/SistemBasisData2023/QueueEase/assets/113244831/c450082c-e494-4e4d-92eb-9ca67ba3a3f4">

- To test the installation result run
  ```
   npm run start
  ```

# 🚀 Stellar Crowdfunding Platform  

## About Me  
**Name:** Yusuf Utkurak 
**Background:** Passionate about blockchain development and smart contracts.  
**Skills:** Rust, Node.js, React, ICP, and Stellar Blockchain.  
**Projects:** Developing decentralized applications with a focus on crowdfunding solutions.  
**Hobbies:** Playing the guitar, doing crossword puzzles.  

---

## 📑 Project Description  
This project is a **decentralized crowdfunding platform** built on the **Stellar Blockchain**. The smart contract enables users to create projects, contribute funds, and claim rewards based on contribution tiers. If the project goal isn’t reached, backers can request a refund after the deadline.  

The application is powered by **Rust** for smart contracts, **Node.js** for the backend, and **React** for the front-end interface.

<img width="929" alt="Ekran Resmi 2024-10-13 23 39 40" src="https://github.com/user-attachments/assets/e4988cf6-2c6d-4bec-918d-5902643b76a7">

---

## 🌟 Vision  
My platform seeks to empower creators and innovators by providing an efficient and transparent crowdfunding solution. By leveraging the **Stellar blockchain**, I enable secure and traceable transactions, ensuring backers can trust the process.  
I believe this project will promote the growth of decentralized funding for creative and social ventures.

---

## 🛠️ Software Development Plan  

### **Smart Contract Development**  
- Define structures for `Project` and `RewardTier`.  
- Implement core functions:
  - `create_project()`: Create new projects with funding goals and deadlines.
  - `fund_project()`: Allow backers to fund projects.
  - `refund()`: Refund contributions if goals are unmet within the deadline.  
- Handle errors such as expired deadlines and zero fund contributions.

### **Backend Development (Node.js)**  
- Develop endpoints for creating, funding, and refunding projects.  
- Integrate with the Stellar blockchain using CLI commands.

### **Front-End Development (React)**  
- Create forms for project creation and funding.  
- Display project progress, raised funds, and rewards dynamically.

### **Deployment**  
- Deploy the smart contract on the **Stellar testnet**.  
- Host the backend on **Heroku** or **Vercel**, and the front-end on **Netlify**.

---

## 🚀 How to Install the Project  

### Prerequisites  
- Node.js and npm installed.  
- Rust and Cargo installed.  
- Access to **Stellar Testnet**.

### Installation  

**Clone the repository:**  
```bash
git clone https://github.com/your-username/stellar-crowdfunding.git
cd stellar-crowdfunding
```

**Smart Contract Build:**  
```bash
cd rust
cargo build --target wasm32-unknown-unknown --release
```

**Testnet Deploy:**  
```bash
stellar keys generate --global alice --network testnet
stellar keys address alice
```
```bash
stellar contract invoke \
  --id CACDYF3CYMJEJTIVFESQYZTN67GO2R5D5IUABTCUG3HXQSRXCSOROBAN \
  --source alice \
  --network testnet \
  -- \
  hello \
  --to RPC
```

**NodeJs Server:**  
```bash
cd backend-api
npm init -y
node server.js
```

**Frontend Deploy Localhost:**  
```bash
cd stellar-crowdfunding-frontend
npm install
npm start
```


## 🖼️ Visuals & Mascot
A futuristic city where abundance and creativity thrive, featuring a bull mascot symbolizing strength and new opportunities.

![DALL·E 2024-10-13 23 38 13 - A logo design featuring a stylized, futuristic bull mascot that symbolizes strength and new opportunities  The bull should have a sleek, modern appear](https://github.com/user-attachments/assets/f64aad6a-99f9-4aaf-a50b-6e8bc18e5b95)

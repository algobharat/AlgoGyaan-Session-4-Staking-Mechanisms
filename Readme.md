
# Liquid Staking

## Overview

This project demonstrates the implementation of **Liquid Staking** on the **Algorand blockchain**. The system allows users to:

1. Generate an Algorand wallet address and private key.
2. Create blockchain assets for staking.
3. Bootstrap and add liquidity to a staking pool.
4. Remove liquidity and convert pooled tokens back into assets.

The project uses:
- **Flask** for the back-end server.
- **React** for the front-end user interface.
- **Algorand SDK** to interact with the blockchain.

---

## Prerequisites

Ensure you have the following installed before running the application:

- **Python 3.8+**
- **Node.js** and **npm** (for the React front-end)
- An **Algorand account** to interact with the blockchain

---

## Libraries Required

- **Flask** (backend server)
- **Algorand SDK** (blockchain interactions)
- **React** and associated packages (front-end UI)

---

## Getting Started

Follow the steps below to set up and run the application.

### 1. Create a Python Virtual Environment

To isolate dependencies, create a virtual environment:

```bash
python -m venv .venv
```

### 2. Activate the Virtual Environment

- On **Windows**:
    ```bash
    .venv\Scripts\activate
    ```
- On **macOS/Linux**:
    ```bash
    source .venv/bin/activate
    ```

Your terminal should display the virtual environment's name once activated.

### 3. Install Python Dependencies

Install the required libraries:

```bash
pip install -r requirements.txt
```

This will install all dependencies, including Flask and the Algorand SDK.

---

### 4. Start the Flask Server

Navigate to the backend directory (e.g., `v2/tutorials`) and start the server:

```bash
python app.py
```

The Flask server will run locally and provide APIs to interact with the Algorand blockchain.

---

### 5. Install Node Packages for the Front-End

Navigate to the `Front-End` directory and install Node.js dependencies:

```bash
npm install
```

---

### 6. Build the Front-End

To create an optimized production build:

```bash
npm run build
```

This will generate the production-ready files in the `build` folder.

---

### 7. Start the Front-End

To run the React front-end in development mode:

```bash
npm run start
```

The React app will start on your default browser.

---

## Liquid Staking Steps

The React interface guides you through the following steps:

### 1. Generate Account
- Generates an **Algorand wallet**.
- Provides:
   - A wallet address.
   - A private key (securely store it).
- Displays a link to **fund the wallet** (e.g., Testnet faucet).

---

### 2. Create Assets
- Creates two **blockchain assets** for liquid staking.
- Deploys assets to the Algorand blockchain.
- Returns the **Asset IDs**.

---

### 3. Bootstrap Staking
- Sets up the liquid staking structure:
   - Deploys contracts.
   - Sets up staking pools for liquidity.

---

### 4. Add Liquidity
- Converts the created assets into **TM Liquid Pool Tokens**.
- Locks assets in the staking pool.
- In return, the user receives TM tokens representing their share of the pool.

---

### 5. Remove Liquidity
- Converts TM Liquid Pool Tokens back into original assets.
- Allows users to retrieve their staked funds.

---

## Technologies Used

- **Flask**: Python web framework for the back-end API.
- **React**: JavaScript library for the user interface.
- **Algorand SDK**: Python library for blockchain interactions.
- **Node.js**: JavaScript runtime environment.

---

## Directory Structure

```
/backend
    app.py                # Flask server entry point
    requirements.txt      # Backend dependencies
/frontend
    src/                  # React source code
    package.json          # Front-end dependencies
    build/                # Production build files
```

---

## Conclusion

This project provides a complete solution for implementing **Liquid Staking** on the Algorand blockchain. It combines Flask for back-end API management, React for an interactive front-end, and the Algorand SDK for blockchain communication.

Feel free to fork, modify, and expand upon this project!

---

## License

This project is licensed under the **MIT License**.

---

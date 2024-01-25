# zksync-beacon-proxy-deployment-example

## How to run the example:

### Install dependencies:
```
yarn install
```

### Compile the contract:
```
yarn hardhat compile
```

### Set up you private key:
```
cp .env.example .env
```
Go to `.env` file and set `WALLET_PRIVATE_KEY` env variable to your private key.

### Run the deployment script
```
yarn hardhat run scripts/deploy.ts
```
Specify a different network for the script if you want to deploy to a network other than the default one.
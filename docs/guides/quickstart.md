---
sidebar_position: 1
---

# Quickstart

Explore a basic implementation of account abstraction using ERC-4337. This example will create an account and initiate a transaction on the Polygon Mumbai testnet.

If you are new to account abstraction, we recommend the [introduction to account abstraction](/docs/introduction/account-abstraction) and an [overview of ERC-4337](/docs/introduction/erc-4337-overview).

<details>
<summary>📺 Video Tutorial</summary>
<div align="center" width="100%" class="video"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/zvnm2GnMAts" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div></details>

## 1. Download

Clone the [ERC-4337 Examples](https://github.com/stackup-wallet/erc-4337-examples) repository to download the scripts.

```
git clone https://github.com/stackup-wallet/erc-4337-examples.git
```

## 2. Install

This example uses the [Infinitism](https://github.com/eth-infinitism/account-abstraction) package created by the ERC-4337 core developers. Install it, and all other dependencies.

```
yarn install
```

## 3. Initialize your configuration

You can now initialize your local configuration.

```
yarn run init
```

A `config.json` file will be created. The file will look like this:

```
{
  "bundlerUrl": "http://localhost:4337",
  "rpcUrl": "https://rpc-mumbai.maticvigil.com/",
  "signingKey": "0x000...000",
  "entryPoint": "0x1D9a2CB3638C2FC8bF9C01D088B79E75CD188b17",
  "simpleAccountFactory": "0xe19E9755942BB0bD0cCCCe25B1742596b8A8250b"
}

```

It defaults to running a local [bundler](https://github.com/stackup-wallet/stackup-bundler) at http://localhost:4337. Alternatively, you can spin up a bundler hosted by Stackup at [app.stackup.sh](https://app.stackup.sh) or contact us.

## 4. Create an account

Create an account using the factory `simpleAccountFactory` defined in the configuration file.

```
yarn run simpleAccount:address
```

An address will be returned. At this point, the smart contract account has not been deployed.

## 5. Fund the account

Deposit MATIC into the account on Mumbai.

Navigate to a faucet, such as https://faucet.polygon.technology/ and https://mumbaifaucet.com/. Enter the account address and claim the testnet MATIC.

:::info

Faucets do not send directly to smart contracts. You must deposit MATIC or ERC-20 tokens from the faucet before your first transaction.

:::

## 6. Initiate the transfer

The `simpleAccount:transfer` command allows you to transfer MATIC from the smart contract account to any address. It will create a UserOperation, sign it, and send it to the bundler:

```
yarn run simpleAccount:transfer <recipient-address> <eth-amount>
```

You can then find the transaction using a block explorer like [polygonscan](https://mumbai.polygonscan.com/).

## That's it!

You've successfully sent a transaction using a smart contract account and ERC-4337. Now that you've done a simple transfer with your wallet, you can also check out other commands in the example.

- [Transfer ERC-20 tokens](https://github.com/stackup-wallet/erc-4337-examples#transfer-erc-20-token)
- [Batch transfer ETH](https://github.com/stackup-wallet/erc-4337-examples#transfer-erc-20-token)
- [Batch transfer ERC-20 tokens](https://github.com/stackup-wallet/erc-4337-examples#transfer-erc-20-token)

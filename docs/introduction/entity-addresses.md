---
sidebar_position: 6
title: Reference EIP-4337 entity addresses
sidebar_label: Entity Addresses
description: Find the latest official ERC-4337 entity addresses, such as the EntryPoint, on all EVM networks and testnets.
---

# Entity Addresses

A reference to related ERC-4337 addresses. Refer [here](../api/nodes#supported-networks) for a overview of supported networks.

## EntryPoint

A summary of EntryPoint addresses. These are the same on all EVM networks. The latest audit report by OpenZeppelin can be found [here](https://blog.openzeppelin.com/eip-4337-ethereum-account-abstraction-incremental-audit/).

| Address                                                                                                                | Commit                                                                                | Related Bundler version                                                         | Audited |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------- |
| [0x0576a174D229E3cFA37253523E645A78A0C91B57](https://blockscan.com/address/0x0576a174D229E3cFA37253523E645A78A0C91B57) | [7368f3d](https://github.com/eth-infinitism/account-abstraction/commit/7368f3d)       | [v0.4.x](https://github.com/stackup-wallet/stackup-bundler/releases/tag/v0.4.0) | ✅      |
| [0x0F46c65C17AA6b4102046935F33301f0510B163A](https://blockscan.com/address/0x0F46c65C17AA6b4102046935F33301f0510B163A) | [6dea6d8](https://github.com/eth-infinitism/account-abstraction/commit/6dea6d8)       | [v0.3.x](https://github.com/stackup-wallet/stackup-bundler/releases/tag/v0.3.0) | ❌      |
| [0x1306b01bC3e4AD202612D3843387e94737673F53](https://blockscan.com/address/0x1306b01bC3e4AD202612D3843387e94737673F53) | [6aeb396](https://github.com/eth-infinitism/account-abstraction/commit/6aeb396)       | [v0.2.x](https://github.com/stackup-wallet/stackup-bundler/releases/tag/v0.2.0) | ❌      |
| [0x78d4f01f56b982a3B03C4E127A5D3aFa8EBee686](https://blockscan.com/address/0x78d4f01f56b982a3B03C4E127A5D3aFa8EBee686) | [57c5d77c77](https://github.com/eth-infinitism/account-abstraction/commit/57c5d77c77) | [v0.1.x](https://github.com/stackup-wallet/stackup-bundler/releases/tag/v0.1.0) | ❌      |

## Stackup Bundlers

These are the official bundler addresses ran by Stackup for bundler versions `v0.4` and up.

| Address                                                                                                                | Bundler version                                                                 |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| [0x9C98B1528C26Cf36E78527308c1b21d89baED700](https://blockscan.com/address/0x9C98B1528C26Cf36E78527308c1b21d89baED700) | [v0.4.x](https://github.com/stackup-wallet/stackup-bundler/releases/tag/v0.4.0) |

## Stackup Paymasters

These are the official paymaster addresses ran by Stackup that supports the [latest audited EntryPoint](https://blockscan.com/address/0x0576a174D229E3cFA37253523E645A78A0C91B57).

| Address                                                                                                                               | Type                                                     | Networks        |
| ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | --------------- |
| [0x6087C019C9495139AD9ED230173e8681DEe3FFF2](https://etherscan.io/address/0x6087C019C9495139AD9ED230173e8681DEe3FFF2)                 | [PAYG](../api/paymaster/introduction#payg-pay-as-you-go) | Ethereum        |
| [0x474Ea64BEdDE53aaD1084210BD60eeF2989bF80f](https://polygonscan.com/address/0x474Ea64BEdDE53aaD1084210BD60eeF2989bF80f)              | [PAYG](../api/paymaster/introduction#payg-pay-as-you-go) | Polygon         |
| [0x7122EDe4e3823387a69F42193baD1409BfD97AC8](https://goerli.etherscan.io/address/0x7122EDe4e3823387a69F42193baD1409BfD97AC8)          | [PAYG](../api/paymaster/introduction#payg-pay-as-you-go) | Goerli          |
| [0xFE7dBcAb8AaeE4eB67943c1e6BE95B1D065985c6](https://mumbai.polygonscan.com/address/0xFE7dBcAb8AaeE4eB67943c1e6BE95B1D065985c6)       | [PAYG](../api/paymaster/introduction#payg-pay-as-you-go) | Mumbai          |
| [0x0967e1707bd2719cbF152ebE62D1Af2962aC00A2](https://goerli-optimism.etherscan.io/address/0x0967e1707bd2719cbF152ebE62D1Af2962aC00A2) | [PAYG](../api/paymaster/introduction#payg-pay-as-you-go) | Goerli Optimism |

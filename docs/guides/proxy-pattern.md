---
sidebar_position: 6
---

# Proxy Pattern

A lightweight contract for delegating calls.

## Naive account abstraction

A `Contract Account` will have a lot of code needed to implement complex use cases for an application. A naive approach to using account abstraction would be to deploy the same smart contract for all your users. But this is a mistake for a few reasons.

1. It's more expensive for user's to deploy big contracts with a lot of complexity.
2. You'll be deploying the same contract over and over again but just initialized in different ways.
3. User's will need to deploy a whole new wallet address every time your application has a contract update.

## Proxy as the solution

A `Proxy` is the solution to these problems. The account is split into two separate contracts, the `Proxy` and the `Implementation`. The first is a light weight contract that receives a call and delegates it to the second contract which has the logic.

A user can always switch the `Implementation` used by the `Proxy`. But the `Proxy` address will always remain consistent. This is what allows applications to have upgradable accounts for their users.

Lastly, the `Proxy` is also a lot smaller in size compared to the `Implementation` which means deployment cost for users is minimal.

## Deploying a Proxy

Fortunately, there are already great packages available for building with proxies. Using an [ERC1967Proxy from OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/api/proxy#ERC1967Proxy) we can deploy one with less than 10 lines of code.

```solidity
pragma solidity 0.8.9;

import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

contract WalletProxy is ERC1967Proxy {
  constructor(address logic, bytes memory data) ERC1967Proxy(logic, data) {}
}

```

The constructor takes two arguments:

1. `logic`: The address of the `Implementation` contract.
2. `data`: Typically encoded instructions to call an `initialize` function on the `Implementation`. This is used to setup storage on the `Proxy`.

## Building the implementation

Although there are several mechanisms for building proxies and implementations, the current recommendation is to use UUPS Proxies. In this pattern, the upgrade is handled by the `Implementation` rather than in the `Proxy`. Less code in the `Proxy` means a smaller contract size and cheaper deployment!

:::info

All implementations in the [Contracts package](/docs/category/contracts) inherits [UUPSUpgradeable from OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/api/proxy#UUPSUpgradeable).

:::

## Additional resources

A proxy pattern is core to building account abstraction that is fit for production. This was a quick summary, but we recommend developers also checkout the following links for a deeper dive:

- [Proxy Upgrade Pattern](https://docs.openzeppelin.com/upgrades-plugins/1.x/proxies)
- [Proxies](https://docs.openzeppelin.com/contracts/4.x/api/proxy)

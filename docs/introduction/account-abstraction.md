---
sidebar_position: 1
---

# Account Abstraction

Enabling the use of smart contract wallets over EOAs.

<div class="video"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/wnh8Ea6aYM8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

## Contract Accounts vs EOAs

Account Abstraction is a blockchain technology that allows users to use smart contracts as their accounts.

The default account for most users is an Externally Owned Account, or `EOA`. EOAs are accounts controlled by an external private key. On most blockchain networks using the Ethereum Virtual Machine (EVM), only an EOA can trigger transactions so this is the default account model for most users.

Unfortunately EOAs require users to know a lot about how a blockchain works to use them safely. We can create much better user experiences using `Contract Accounts`.

### Why use contract accounts?

If you've ever tried to build Web3 apps with amazing user experiences you'll eventually hit road blocks that are imposed by the limitations of an EOA. In other words, the UX ceiling in terms of what you can achieve with an EOA is not very high. Here are some of the things contract accounts can enable that aren't possible with EOAs:

- **🔑 Arbitrary verification logic**: Support single and multi sig verification and any arbitrary signature scheme.
- **💱 Sponsored transactions**: Allow users to pay transaction fees in ERC-20 tokens or build your own fee logic, including sponsoring transaction fees on your app.
- **🔒 Account security**: Enable social recovery and security features like time-locks and withdraw limits.
- **⚛️ Atomic multi-operations**: Build flows that better align with your user's intent such as trading in one click rather than approving and swapping separately.

Account abstraction sounds great! But there are some down sides to also consider:

- **✍️ Signing issues**: Ideally, all apps would following [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) to validate signatures. Unfortunately this is not always the case and those apps would be incompatible with contract accounts.
- **⛽️ Higher gas cost**: On L2s and other scaling solutions this becomes less of a problem. However more research on how to reduce gas cost in this context, especially on Ethereum mainnet, is required.

## The state of account abstraction

There have been multiple approaches to account abstraction over the years such as [EIP-86](https://eips.ethereum.org/EIPS/eip-86) and [EIP-2938](https://eips.ethereum.org/EIPS/eip-2938). Unfortunately these weren't practical to achieve since they required consensus layer changes.

Luckily we can build account abstraction without consensus layer changes. A new standard, **[EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)**, is a new approach to account abstraction that **relies on higher-level infrastructure that avoids the need for consensus layer changes**.

This means, unlike past proposals, developers can start building on a universal standard today.

## The challenge for builders

Although contract accounts offer the ability to build much better user experiences, they also introduce more complexity for developers to manage the interaction between different components.

That's where Stackup comes in.

**Stackup is a suite of open source tools for building applications with account abstraction.**

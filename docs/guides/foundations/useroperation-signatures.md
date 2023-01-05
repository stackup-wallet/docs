---
sidebar_position: 4
title: How UserOperation signatures work in ERC-4337
sidebar_label: UserOperation signature
description: Learn how serOperation signatures work in ERC-4337 and the basis of the userOpHash.
---

# UserOperation signature

The ERC-4337 standard is un-opinionated in terms of how the signature field is encoded and is up to the contract to decide how to validate it. However there are certain practices that should be followed.

:::info

This guide touches on some foundational concepts related to smart contract accounts.

If you're after more abstracted and concrete examples, check out [github.com/stackup-wallet/erc-4337-examples](https://github.com/stackup-wallet/erc-4337-examples).

:::

---

## The `userOpHash`

The `userOpHash` is a keccak256 hash of three things in order:

1. The entire UserOperation (minus the signature field).
2. The EntryPoint address.
3. The chain ID.

**All signatures should be a signed message of the `userOpHash`.** To optimize gas, the EntryPoint will generate this hash once and pass it to both `validateUserOp` and `validatePaymasterUserOp` during the [verification phase](../../introduction/erc-4337-overview#entrypoint).

### How do I get the userOpHash for X language?

There are currently a few examples in various languages for generating a `userOpHash`. Refer to the list below for reference to specific implementations.

- [Solidity](https://github.com/eth-infinitism/account-abstraction/blob/6dea6d8752f64914dd95d932f673ba0f9ff8e144/contracts/core/EntryPoint.sol#L243)
- [TypeScript](https://github.com/eth-infinitism/bundler/blob/7db16744aad16bd2960f74b5b503c5c717aee861/packages/utils/src/ERC4337Utils.ts#L115)
- [Go](https://github.com/stackup-wallet/stackup-bundler/blob/b9733f02e9167f5be34daec1bbea5c9e989a37db/pkg/userop/object.go#L157)

It is important that a `userOpHash` generated off-chain matches the one generated on-chain by the EntryPoint. A mismatched hash will result in incorrect validation and subsequently rejected by the bundler.

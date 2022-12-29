---
sidebar_position: 5
---

# UserOperation signature

Encoding the data to validate a UserOperation.

The ERC-4337 standard is un-opinionated in terms of how the signature field is encoded. **In this guide, we outline what the [Contracts package](/docs/category/contracts) requires from the [`UserOperation`](../introduction/erc-4337-overview.md#useroperation) for validation.**

## The `requestId`

The `requestId` is a hash of three things in order:

1. The entire `UserOperation` (minus the signature field).
2. The `EntryPoint` address.
3. The `chainId`.

**All signatures should be a signed message of the `requestId`.** To optimize gas, the `EntryPoint` will generate this hash once and pass it to both `validateUserOp` and `validatePaymasterUserOp` during the [verification phase](../introduction/erc-4337-overview.md#entrypoint).

:::tip

The [`UserOperationBuilder`](../packages/client-sdk/useroperation.md#useroperationbuilder) exposes a `getRequestId` function on it's middleware context to easily calculate the latest value at any stage of building an operation.

:::

## `EOA` signature types

ECDSA signatures from an `EOA` cannot be aggregated. Hence we encode the `Wallet` and `Paymaster` signatures together. Encoding in your app can be done with [ethers.js](https://docs.ethers.io/).

```typescript
import { ethers } from "ethers";

userOp.signature = ethers.utils.defaultAbiCoder.encode(
  ["bytes wallet", "bytes paymaster"],
  [walletSignature, paymasterSignature]
);
```

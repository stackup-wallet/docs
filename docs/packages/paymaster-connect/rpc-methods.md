---
sidebar_position: 4
title: Paymaster RPC methods
sidebar_label: RPC methods
description: This page is a reference for all supported RPC methods in Paymaster Connect, Stackup's ERC-4337 service for sponsoring gasless transactions
---

# RPC methods

A reference to the supported RPC methods.

<head>
  <meta name="title" content="Paymaster RPC methods | Stackup" />
  <meta name="og:title" content="Paymaster RPC methods | Stackup" />
  <meta name="description" content="This page is a reference for all supported RPC methods in Paymaster Connect, Stackup's ERC-4337 service for sponsoring gasless transactions." />
  <meta name="og:description" content="This page is a reference for all supported RPC methods in Paymaster Connect, Stackup's ERC-4337 service for sponsoring gasless transactions." />
  <meta name="keywords" content="gasless transactions,
    sponsor Ethereum transactions,
    pay gas fees,
    ERC-4337 paymaster,
    ERC-4337 RPC,
    stackup-bundler,
    account abstraction,
    eth_sponsorUserOperation" />
  <meta name="og:keywords" content="gasless transactions,
    sponsor Ethereum transactions,
    pay gas fees,
    ERC-4337 paymaster,
    ERC-4337 RPC,
    stackup-bundler,
    account abstraction,
    eth_sponsorUserOperation" />
</head>

## Paymaster methods

These methods relate to sponsoring a `UserOperation` using `Paymaster Connect`.

### `eth_sponsorUserOperation`

Used to submit a [`UserOperation`](../../introduction/erc-4337-overview.md#useroperation) to `Paymaster Connect` for approval. If the paymaster agrees to sponsor the transaction, `Paymaster Connect` will return a partial `UserOperation` with the following fields:

- `paymasterAndData`: Paymaster address and any extra data required for [verification and execution](../../introduction/erc-4337-overview.md#entrypoint).
- `signature`: The paymaster's signature of the [`requestId`](../../guides/useroperation-signatures.md#the-requestid) for use in `validatePaymasterUserOp`.

:::info

Apps should make sure the paymaster and user signatures are appropriately encoded together before sending to a client. See the [`UserOperation` signature](../../guides/useroperation-signatures.md) guide for more details.

:::

#### Request

```typescript
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "eth_sponsorUserOperation",
  "params": [
    // UserOperation object
    {
      sender,
      nonce,
      initCode,
      callData,
      callGasLimit,
      verificationGasLimit,
      preVerificationGas,
      maxFeePerGas,
      maxPriorityFeePerGas,
      paymasterAndData,
      signature
    },

    // Supported EntryPoint address
    entryPoint
  ]
}
```

#### Success response

```typescript
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    { paymasterAndData, signature }
  ]
}
```

#### Error response

```typescript
{
  "jsonrpc": "2.0",
  "id": 1
  "error": {
    code,
    message
  }
}
```

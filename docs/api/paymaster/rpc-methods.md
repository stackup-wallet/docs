---
sidebar_position: 2
title: Paymaster API reference
sidebar_label: RPC methods
description: How to use Stackup's Paymaster API to enable simple access to gasless transactions for your ERC-4337 accounts.
---

# RPC methods

This page has a reference to the list of available RPC methods that are common to all Paymaster API endpoints. For the list of available endpoints see the table [here](./introduction#stackup-paymaster-api).

## `pm` namespace

These endpoints relate to a paymaster's off-chain component.

---

### Sponsor UserOperation

This methods sends a UserOperation to a paymaster for off-chain verification. If approved, it will return the `paymasterAndData` field as the result which can be appended to the UserOperation before signing.

If the paymaster rejects the UserOperation it does not return a result but a standard JSON-RPC error with the reason.

**Parameters:**

- **partial UserOperation**: This essentially the UserOperation without the signature field. The final signature must include the returned `paymasterAndData` or it will fail validation.
- **entryPoint**: The EntryPoint address the UserOperation is intended for.
- **chainId**: The chainId the UserOperation is intended for.

#### Request

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "pm_sponsorUserOperation",
  "params": [
    {
      sender, // address
      nonce, // uint256
      initCode, // bytes
      callData, // bytes
      callGasLimit, // uint256
      verificationGasLimit, // uint256
      preVerificationGas, // uint256
      maxFeePerGas, // uint256
      maxPriorityFeePerGas, // uint256
      paymasterAndData, // bytes
    }
  ]
}
```

#### Response (success)

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x1234...5678" // valid paymasterAndData value
}
```

#### Response (error)

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "message": "Error reason here.",
    "code": -32601
  }
}
```

---

### Supported EntryPoints

This method is almost identical to what is specified in the ERC-4337 standard for `eth_supportedEntryPoints` except with the inclusion of a `chainId` param. It returns an array of the entryPoint addresses supported by the paymaster for the specified Network.

Ideally, apps can use this method to check if a Paymaster is currently online and ready to accept sponsorship requests.

#### Request

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "pm_supportedEntryPoints",
  "params": [
      chainId // string
  ]
}
```

#### Response

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": ["0x0F46c65C17AA6b4102046935F33301f0510B163A"]
}
```

---

## Client SDK integration

The eth-infinitism client SDK already has a class component for integrating a generic [PaymasterAPI](https://github.com/eth-infinitism/bundler/blob/main/packages/sdk/src/PaymasterAPI.ts). If you are using this library, we also recommend creating a new `VerifyingPaymasterAPI` class that extends `PaymasterAPI` to support this interface.

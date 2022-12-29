---
sidebar_position: 3
---

# RPC methods

A reference to the supported RPC methods.

## Client methods

All RPC methods listed here are required to be compliant as an ERC-4337 bundler.

### `eth_sendUserOperation`

Used to submit a [`UserOperation`](../../introduction/erc-4337-overview.md#useroperation) to the Bundler's mempool.

#### Request

```typescript
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "eth_sendUserOperation",
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
  "result": true
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

### `eth_supportedEntryPoints`

Returns an array of supported [EntryPoint](../../introduction/erc-4337-overview.md#entrypoint) addresses as specified in the [configuration](./configure.md). The first element is the Bundler client's preferred EntryPoint.

#### Request

```typescript
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "eth_supportedEntryPoints",
  "params": []
}
```

#### Success response

```typescript
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    "0x..."
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

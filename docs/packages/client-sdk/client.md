---
sidebar_position: 2
---

# Client

A connection to an ERC-4337 bundler client.

An instance of a `ERC4337ClientRpc` is an abstraction to support the following RPC methods as outlined in the EIP:

1. `eth_sendUserOperation`
2. `eth_supportedEntryPoints`

---

## Interfaces

These interfaces are built using [`UserOperation`](./useroperation.md#useroperation-1), [`UserOperationBuilder`](./useroperation.md#useroperationbuilder), and [`BigNumberish`](https://docs.ethers.io/v5/api/utils/bignumber/#BigNumberish) from [ethers.js](https://docs.ethers.io/).

### ERC4337ClientRpc

An instance of `ERC4337ClientRpc` exposes methods to help get your `UserOperation` to an ERC-4337 client.

```typescript
interface ERC4337ClientRpc {
  // URL string of ERC-4337 client node.
  readonly url: string;

  // Chain ID of the EVM network ops are intended for.
  // See https://chainlist.org
  readonly chainId: BigNumberish;

  sendUserOperation: (
    userOpOrBuilder: UserOpOrBuilder,
    id?: number
  ) => Promise<JSONRpcResponse<SendUserOperationResult>>;

  buildUserOperation: (builder: UserOperationBuilder) => Promise<UserOperation>;

  supportedEntryPoints: (
    id?: number
  ) => Promise<JSONRpcResponse<SupportedEntryPointsResult>>;

  setEntryPoint: (entryPoint: string) => Promise<ERC4337ClientRpc>;
}

type UserOpOrBuilder = UserOperation | UserOperationBuilder;

interface JSONRpcResponse<T> {
  id: number;
  result: T;
}

interface JSONRpcError {
  code: number;
  message: string;
}

type SendUserOperationResult = boolean | undefined;

type SupportedEntryPointsResult = Array<string>;
```

---

## Usage

One instance should be initialized for each node and network your application supports.

```js
import { ERC4337ClientRpc } from "packageName";

const client = new ERC4337ClientRpc(url, chainId);
```

---

### sendUserOperation

A method for calling `eth_sendUserOperation`. The optional `id` argument is for the RPC request and defaults to `1`.

If a [`builder`](./useroperation.md#useroperationbuilder) is passed into `userOpOrBuilder`, it will use the `buildOp` method to construct the `UserOperation`. Otherwise the `UserOperation` is sent as is.

```typescript
const { id, result } = await client.sendUserOperation(userOpOrBuilder, id);
```

:::info

This method will also call `resetOp` on a [`builder`](./useroperation.md#useroperationbuilder) if successful.

:::

---

### buildUserOperation

This method can be used to direct a [`builder`](./useroperation.md#useroperationbuilder) using the client's `chainId` and set `EntryPoint`. However it will only return the `UserOperation` and not initiate a send request.

```typescript
const userOp = await client.buildUserOperation(builder);
```

:::info

This method will also call `resetOp` on a [`builder`](./useroperation.md#useroperationbuilder) if successful.

:::

---

### supportedEntryPoints

A method for calling `eth_supportedEntryPoints`. The optional `id` argument is for the RPC request and defaults to `1`.

The result is an array of `EntryPoint` addresses supported by the client. The first element is the client's preferred `EntryPoint`.

```typescript
const { id, result } = await client.supportedEntryPoints(id);
```

---

### setEntryPoint

This method will switch the client to the specified `EntryPoint` address or throw an error if the address is not supported.

---

## JSONRpcError

In the event of a failed RPC request the client will throw a `JSONRpcError`. This `error` object will have the following schema as outlined by the [JSON-RPC spec](https://www.jsonrpc.org/specification#error_object).

Client specific `codes` and `messages` may also be used which aren't defined in the standard.

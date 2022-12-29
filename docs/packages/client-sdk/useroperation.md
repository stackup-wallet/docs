---
sidebar_position: 3
---

# UserOperation

A class for building ERC-4337 transaction objects.

A [`UserOperation`](../../introduction/erc-4337-overview.md#useroperation) is a pseudo-transaction object used to execute actions through a smart contract wallet. Although it can be quite complex to create, the `UserOperationBuilder` simplifies this process using the [builder pattern](https://en.wikipedia.org/wiki/Builder_pattern). The interface is also agnostic to any ERC-4337 wallet or paymaster implementation.

---

## Interfaces

These interfaces are built using common [ethers.js](https://docs.ethers.io/) types. More specifically [`BigNumberish`](https://docs.ethers.io/v5/api/utils/bignumber/#BigNumberish) and [`BytesLike`](https://docs.ethers.io/v5/api/utils/bytes/#BytesLike).

### UserOperation

An interface for an ERC-4337 transaction object. Building a `UserOperation` involves constructing multiple parts and merging them together.

```typescript
interface UserOperation {
  sender: string;
  nonce: BigNumberish;
  initCode: BytesLike;
  callData: BytesLike;
  callGasLimit: BigNumberish;
  verificationGasLimit: BigNumberish;
  preVerificationGas: BigNumberish;
  maxFeePerGas: BigNumberish;
  maxPriorityFeePerGas: BigNumberish;
  paymasterAndData: BytesLike;
  signature: BytesLike;
}
```

### UserOperationBuilder

An instance of `UserOperationBuilder` can help build a `UserOperation` that can be passed to the [`client`](./client.md#senduseroperation).

```typescript
interface UserOperationBuilder {
  // `get` methods.
  getSender: () => string;
  getNonce: () => BigNumberish;
  getInitCode: () => BytesLike;
  getCallData: () => BytesLike;
  getCallGasLimit: () => BigNumberish;
  getVerificationGasLimit: () => BigNumberish;
  getPreVerificationGas: () => BigNumberish;
  getMaxFeePerGas: () => BigNumberish;
  getMaxPriorityFeePerGas: () => BigNumberish;
  getPaymasterAndData: () => BytesLike;
  getSignature: () => BytesLike;
  getOp: () => UserOperation;

  // `set` methods.
  setSender: (address: string) => UserOperationBuilder;
  setNonce: (nonce: BigNumberish) => UserOperationBuilder;
  setInitCode: (code: BytesLike) => UserOperationBuilder;
  setCallData: (data: BytesLike) => UserOperationBuilder;
  setCallGasLimit: (gas: BigNumberish) => UserOperationBuilder;
  setVerificationGasLimit: (gas: BigNumberish) => UserOperationBuilder;
  setPreVerificationGas: (gas: BigNumberish) => UserOperationBuilder;
  setMaxFeePerGas: (fee: BigNumberish) => UserOperationBuilder;
  setMaxPriorityFeePerGas: (fee: BigNumberish) => UserOperationBuilder;
  setPaymaster: (address: string) => UserOperationBuilder;
  setPaymasterAndData: (data: BytesLike) => UserOperationBuilder;
  setSignature: (bytes: BytesLike) => UserOperationBuilder;
  setPartial: (partialOp: Partial<UserOperation>) => UserOperationBuilder;

  // Sets the default values that won't be wiped on reset.
  useDefaults: (partialOp: Partial<UserOperation>) => UserOperationBuilder;
  resetDefaults: () => UserOperationBuilder;

  // Some fields may require arbitrary logic to build an op.
  // Middleware functions allow you to set custom logic for building op fragments.
  useMiddleware: (fn: UserOperationMiddlewareFn) => UserOperationBuilder;
  resetMiddleware: () => UserOperationBuilder;

  // This will construct a UserOperation that can be sent to a client.
  // It will run through your entire middleware stack in the process.
  buildOp: (
    entryPoint: string,
    chainId: BigNumberish
  ) => Promise<UserOperation>;

  // Will reset all fields back to default value.
  resetOp: () => void;
}

type UserOperationMiddlewareFn = (
  context: UserOperationMiddlewareCtx
) => Promise<Partial<UserOperation>>;

interface UserOperationMiddlewareCtx {
  op: UserOperation;
  entryPoint: string;
  chainId: BigNumberish;

  // A `requestId` is a unique hash of op + entryPoint + chainId.
  getRequestId: () => Promise<string>;
}
```

---

## Usage

```typescript
import { UserOperationBuilder } from "packageName";

const builder = new UserOperationBuilder().useDefaults({ sender });
```

:::tip

The `useDefaults` method will set fields that will persist after calling `resetOp`. This could be for fields like `sender` which you don't expect to change across different operations.

:::

---

### Building a UserOperation

A `UserOperation` is built using the `buildOp` method once it is properly configured. The easiest way to avoid passing around `EntryPoint` and `chainId` values is to [use the `client` as a director](./client.md#builduseroperation).

```typescript
// If you only want to build.
const userOp = await client.buildUserOperation(builder);

// If you want to build and send.
const result = await client.sendUserOperation(builder);
```

:::info

Using the above methods on a `client` to direct a `builder` will also call `resetOp` if successful.

:::

Alternatively, if you want to control the build process:

```typescript
// Build op with the middleware stack.
let userOp = await builder.buildOp(entryPoint, chainId);

// Or get the latest built op. Will not use the middleware stack.
let userOp = await builder.getOp();

// Send userOp to client node.
const result = await client.sendUserOperation(userOp);

// Reset op back to default values when you're done.
builder.resetOp();
```

---

### `get` and `set` Functions

These are basic getters and setters for all fields on a `UserOperation`. Getters return the field type whereas setters will return the instance to enable chaining.

For example:

```typescript
const builder = new UserOperationBuilder()
  .setCallData(callData)
  .setCallGasLimit(callGas);
```

---

### Middleware Functions

Some fragments on a `UserOperation` may depend on custom logic in order to be built. For example, based on your `Wallet Contract` implementation there might be a specific way to fetch the `nonce` and sign an operation which aren't specified in the standard.

For such cases we can set custom middleware functions. During `buildOp`, a middleware will be called in the order they are set. Here is a example of middleware functions you might have in your application:

```typescript
const fetchNonce = (provider) => async (ctx) => {
  // Fetch nonce from smart contract wallet on-chain.
  return { nonce };
};

const fetchGasEstimate = async (ctx) => {
  // Fetch gas estimate from providers like Blocknative.
  return { maxFeePerGas, maxPriorityFeePerGas };
};

const getPaymasterApproval = async (ctx) => {
  // Fetch paymaster data.
  return { PaymasterAndData };
};

const signUserOperation = async (ctx) => {
  // Use the required signature scheme based on your wallet.
  // ctx.getRequestId() will generate the required hash for verification.
  // Multisig, ECDSA, etc.
  return { signature };
};

const builder = new UserOperationBuilder()
  .useMiddleware(fetchNonce(provider))
  .useMiddleware(fetchGasEstimate)
  .useMiddleware(getPaymasterApproval)
  .useMiddleware(signUserOperation);
```

---

## Specific scenarios

These are some suggested patterns to follow if you run into specific situations in your application.

### Multi step builds

There might be flows in your application where building a transaction happens over multiple pages, screens, or steps. Take a simple swap transaction for example:

1. **First screen**: User selects the parameters of the swap and your application builds an `op`.
2. **Second screen**: They'll select how to pay the fee. Your application then takes `op`, goes to the relevant paymaster, and creates `opWithFee`.
3. **Third screen**: They'll confirm the transaction. Your application adds the signature to `opWithFee` and sends it to the `client`.

In this case we can use multiple `builders` with the `setPartial` method in order to set multiple fields from the previous build.

```typescript
// Assume you have 3 configured builders for each screen in the example:
// 1. baseBuilder
// 2. feeBuilder
// 3. sigBuilder

// First screen
const op = await client.buildUserOperation(baseBuilder);

// Second screen
const opWithFee = await client.buildUserOperation(feeBuilder.setPartial(op));

// Third screen
const result = await client.sendUserOperation(sigBuilder.setPartial(opWithFee));
```

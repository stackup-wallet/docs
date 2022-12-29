---
sidebar_position: 3
---

# Handlers

Functions for handling paymaster business logic.

The `Paymaster Connect` framework allows you to manage your `Paymaster Contracts` and any fee logic you want to use for your application. All paymasters need to:

1. Approve a `UserOperation`
2. Manage its stake on the `EntryPoint`
3. Manage its own assets

The `Paymaster Connect` framework will generate boilerplate handlers for certain functions. We can program these handlers to give us maximum flexibility in how we build the fee logic in our apps.

## Sign

The `sign` handler allows you to sign a message using your `Paymaster Contract`'s private key.

A big benefit of account abstraction is that it is agnostic to any signature scheme. This handler allows you to implement custom logic to sign a given message.

**`handlers/sign.ts`**

```typescript
import { createSign } from "@PackageName";

export default createSign((privateKey) => {
  return async (message) => {
    /**
     * Logic signing message with configured private key
     *
     * @param message: BytesLike message to be signed
     * @returns Promise<BytesLike>
     */

    return "0x";
  };
});
```

## Sponsor

The `sponserHandler` handler allows you to implement any logic for sponsoring a given `UserOperation`.

Specifically, this handler allows you to implement any logic for [eth_sponsorUserOperation](./rpc-methods.md#ethsponsoruseroperation).

**`handlers/sponsor.ts`**

```typescript
import { sponsorHandler } from "@PackageName";

export default sponsorHandler<T>(async (userOperation, config) => {
  /**
   * Logic for parsing a UserOperation requesting to be sponsored
   * If approve, return extra data to be encoded in the paymasterAndData
   * If rejected, throw error with a message
   *
   * @param userOperation: UserOperation from request
   * @param config: Paymaster configuration
   * @returns Promise<T>
   */

  return;
});
```

## Execute

The `executeHandler` is called by all [scripts](./scripts.md) to send transactions. It can also be used to make final adjustments to the `UserOperation`.

The framework assumes that the paymaster contract is also an ERC-4337 `Contract Account` as described in the Stackup [paymaster contract](../contracts/paymaster) documentation.

**`handlers/execute.ts`**

```typescript
import { executeHandler } from "@PackageName";

export default executeHandler(async (userOperation, config) => {
  /**
   * Logic for adjusting UserOperation built for scripts
   * The signature field will be the signed `requestId` using handlers/sign.ts
   * If no adjustments are required, this file can remain as is.
   *
   * @param userOperation: Transaction to execute
   * @param config: Paymaster configuration
   * @returns Promise<UserOperation>
   */

  return userOperation;
});
```

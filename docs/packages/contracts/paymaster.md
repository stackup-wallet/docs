---
sidebar_position: 5
---

# Paymaster

Solidity components for ERC-4337 `Paymaster Contracts`.

A `Paymaster Contract` is a `Contract Account` designed to pay fees. It is constructed from a wallet `Base` and is paired with one [paymaster implementation](#implementations).

Unlike wallet `Extensions`, you should only use one paymaster implementation in the `Paymaster Contract`.

## Example Paymaster Contract

A typical paymaster contract looks like this:

```solidity
// This is an example of a Paymaster contract.
pragma solidity ^0.8.0;

// Add base and paymaster from Stackup's contract library
import "@PackageName/contracts/ERC4337/wallet/BaseEOAOwner.sol";
import "@PackageName/contracts/ERC4337/paymaster/SimplePaymaster.sol";

// Build the paymaster
contract Paymaster is BaseEOAOwner, SimplePaymaster {
  constructor(address entryPoint) BaseEOAOwner(entryPoint) {}
}

```

In this example, the `Paymaster Contract` uses `SimplePaymaster` as the template for its paymaster logic, and will validate signatures in accordance with `BaseEOAOwner`.

:::info

If none of the implementations fit your use case, come chat with us on [Discord](https://discord.gg/FpXmvKrNed) or [E-mail](mailto:founders@stackup.sh) about getting it built!

Alternatively, the package also exports the minimum interface required to build your own `Paymaster` that is compliant with the spec.

:::

---

## Minimum viable interface

This is the minimum interface that must be implemented in order to be a compliant ERC-4337 `Paymaster Contract`.

This interface is included in all [paymaster implementations](#implementations).

```solidity
import @PackageName/contracts/ERC4337/paymaster/IERC4337Paymaster.sol;
```

```solidity
enum PostOpMode {
  opSucceeded, // UserOperation succeeded.
  opReverted, // UserOperation reverted, but still have to pay for gas.
  postOpReverted // UserOperation succeeded, but postOp reverted.
}

interface IERC4337Paymaster {
  function validatePaymasterUserOp(
    UserOperation calldata op,
    bytes32 requestId,
    uint256 maxCost
  ) external view returns (bytes memory context);

  function postOp(
    PostOpMode mode,
    bytes calldata context,
    uint256 actualGasCost
  ) external;
}

```

The `validatePaymasterUserOp` function is called by the `EntryPoint` during the [verification phase](../../introduction/erc-4337-overview.md#entrypoint). It has the following arguments:

- [`UserOperation`](./useroperation.md)
- `requestId`: Hash of `UserOperation`, `EntryPoint` address, and `chainId`
- `maxCost`: Max amount of wei that must be staked on the `EntryPoint` to cover gas fees.

If `validatePaymasterUserOp` agrees to sponsor the transaction it will return a `context` that is passed to `postOp` during the [execution phase](../../introduction/erc-4337-overview.md#entrypoint). The `postOp` function has the following arguments:

- `mode`: An enum to check the execution status of the [`UserOperation`](./useroperation.md).
- `context`: Arbitrary data set by `validatePaymasterUserOp` that can be used to run the fee logic.
- `actualGasCost`: The actual amount of wei used for the transaction.

---

## Implementations

Stackup has various implementations of an ERC-4337 paymaster. Use one that matches the fee logic you require. A `Paymaster Contract` will validate a signature in accordance with the [`Base`](./wallet.md#base) used.

### `SimplePaymaster`

If the `requestId` signature is valid, the `Paymaster Contract` will agree to sponsor the `UserOperation` without doing anything else in `postOp`. This could be a good option for apps where the business logic for transaction fees happens either off-chain or through some other mechanism.

To use the `SimplePaymaster` implementation, import it from the package:

```solidity
import @PackageName/contracts/ERC4337/paymaster/SimplePaymaster.sol;
```

And add it to your paymaster contract:

```solidity
contract Paymaster is BaseEOAOwner, SimplePaymaster {
  constructor(address entryPoint) BaseEOAOwner(entryPoint) {}
}

```

### `ERC20Paymaster`

:::caution

**🚧 This implementation is still TBD.**

:::

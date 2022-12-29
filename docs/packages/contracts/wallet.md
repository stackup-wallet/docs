---
sidebar_position: 4
---

# Wallet

Solidity components for ERC-4337 Wallet Contracts.

The easiest way to use the wallet libraries is to compose your smart contracts with one `Base` and a combination of `Extensions` that fit your use case.

The `Base` implements the core interface of an ERC-4337 wallet with a specific type of verification logic. The `Extensions` build on top of your `Base` to add common wallet functions.

## Example Contract

A smart contract wallet typically looks like this:

```solidity
// Example smart contract wallet composed of a base and extension.
pragma solidity ^0.8.0

// Import contracts from Stackup's contract library.
// Base.sol and WithExtension.sol are placeholders only.
import "@PackageName/contracts/ERC4337/wallet/Base.sol";
import "@PackageName/contracts/ERC4337/wallet/WithExtension.sol";

// Create the wallet
contract Wallet is Base, WithExtension {
  constructor(address entryPoint) Base(entryPoint) {}
}

```

:::info

If none of the implementations fit your use case, come chat with us on [Discord](https://discord.gg/FpXmvKrNed) or [E-mail](mailto:founders@stackup.sh) about getting it built!

Alternatively, the package also exports the minimum interface required to build your own `Wallet Contract` that is compliant with the spec.

:::

---

## Minimum viable interface

This is the minimum interface that must be implemented in order to be a compliant ERC-4337 wallet.

This interface is included in all [`Base`](#base) contracts. If you use a pre-built `Base`, you do not need to add this interface to your wallet.

```solidity
import "@PackageName/contracts/ERC4337/wallet/IERC4337Wallet.sol";

```

```solidity
interface IERC4337Wallet {
  function validateUserOp(
    UserOperation calldata op,
    bytes32 requestId,
    uint256 missingWalletFunds
  ) external;
}

```

The `validateUserOp` function is called by the `EntryPoint` during the [verification phase](../../introduction/erc-4337-overview.md#entrypoint). It has the following arguments:

- [`UserOperation`](./useroperation.md)
- `requestId`: Hash of `UserOperation`, `EntryPoint` address, and `chainId`
- `missingWalletFunds`: Max amount of wei that must be sent to the `EntryPoint` to cover gas fees. Any unused gas is refunded from this amount.

---

## Base

Base implementations of an ERC-4337 `Wallet Contract`. **Use one that matches the verification method you require.**

:::info

All `Base` implementations are also compatible with [ERC-1271](../../guides/validating-signatures.md#a-standard-to-ensure-interoperability) for signature validation and [UUPSUpgradeable](https://docs.openzeppelin.com/contracts/4.x/api/proxy#UUPSUpgradeable) for upgrading proxies.

:::

:::tip

These implementations will also encode signatures in specific ways depending on the scheme used. See the [`UserOperation` signature guide](../../guides/useroperation-signatures.md) for more details.

:::

### `BaseEOAOwner`

This base implementation uses a single EOA as the owner. The current owner can initiate a transfer of ownership to a new EOA.

To use it, import it from the Stackup contracts library:

```solidity
import "@PackageName/contracts/ERC4337/wallet/BaseEOAOwner.sol";

```

And select it as the base in your `Wallet Contract`.

```solidity
contract Wallet is BaseEOAOwner {
  constructor(address entryPoint) BaseEOAOwner(entryPoint) {}
}

```

#### Functions

The `initialize` function is used to initialize a Proxy. Can only be called once.

```solidity
function initialize(address owner) external initializer;

```

The read only function `getOwner` returns the address of the current owner.

```solidity
function getOwner() external view returns (address);

```

To transfer ownership to a new EOA, call `transferOwner`.

```solidity
function transferOwner(address account) external authenticate;

```

`_validateSignature` is an internal function to validate if a hash was signed by the current owner.

```solidity
function _validateSignature(
  address signer,
  bytes32 hash,
  bytes memory signature
) internal view;

```

#### Signatures

`BaseEOAOwner` will use `ecrecover` to return the address that signed the `hash` to produce the `signature`. This address is then checked against the current owner for verification.

### `BaseEOAOwnerAndGuardians`

:::caution

**🚧 This `Base` is still TBD.**

:::

<!-- Uses a single EOA as the owner and N number of other EOAs as guardians. Transfer of ownership can be initiated either by the current owner or majority consensus from guardians. -->

### `BaseEOAMultisig`

:::caution

**🚧 This `Base` is still TBD.**

:::

<!-- Uses N number of EOAs as the owner. Any action requires majority consensus from owners. -->

---

## Extensions

Extensions are contracts that can be added to a `Base` to increase a `Wallet Contract`'s functionality. Although these are not part of the ERC-4337 spec, they may still be useful in building out your specific use cases.

You can replace `WithExtensionName` for any of the importable extensions below. Any one [`Base`](#base) can also be paired with multiple `Extensions`.

```solidity
contract Wallet is BaseEOAOwner, WithExtensionName {
  constructor(address entryPoint) BaseEOAOwner(entryPoint) {}
}

```

### `WithReceive`

The extension `WithReceive` enables wallets to receive native token transfers.

To use it in your wallets, import `WithReceive` from the Stackup contracts library:

```solidity
import "@PackageName/contracts/ERC4337/wallet/WithReceive.sol";

```

And add it as an extension in your wallet contract. For example:

```solidity
// Example ERC-4337 wallet with an EOA owner.
// This wallet can receive a blockchain's native currency, such as ETH or MATIC.
pragma solidity ^0.8.0

import "@PackageName/contracts/ERC4337/wallet/BaseEOAOwner.sol";
import "@PackageName/contracts/ERC4337/wallet/WithReceive.sol";

contract Wallet is BaseEOAOwner, WithReceive {
  constructor(address entryPoint) BaseEOAOwner(entryPoint) {}
}

```

#### Functions

The `WithReceive` extension has a single public function, `receive`:

```solidity
receive() external payable;

```

### `WithExecute`

The extension `WithExecute` enables wallets to send internal transactions to any address.

In your `Wallet Contract`, import `WithExecute` from the Stackup contracts library:

```solidity
import "@PackageName/contracts/ERC4337/wallet/WithExecute.sol";

```

#### Functions

The `WithExecute` extension has a single public function, `execute`:

```solidity
function execute(
  address to,
  uint256 value,
  bytes calldata data
) external authenticate;

```

### `WithExecuteBatch`

The extension `WithExecuteBatch` is similar to [`WithExecute`](#withexecute) but allows an array of internal transactions to be executed. This allows a wallet to support atomic multi-operations.

`WithExecuteBatch` can be imported directly from the Stackup contracts library:

```solidity
import @PackageName/contracts/ERC4337/wallet/WithExecuteBatch.sol
```

#### Functions

The `WithExecuteBatch` extension has a single public function, `executeBatch`:

```solidity
function executeBatch(InternalTransaction[] calldata transactions)
  external
  authenticate;

```

#### Types

The `WithExecuteBatch` extension includes an `InternalTransaction` type:

```solidity
struct InternalTransaction {
  address to;
  uint256 value;
  bytes data;
}

```

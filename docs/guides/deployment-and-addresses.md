---
sidebar_position: 2
---

# Deployment and addresses

An intro to the Contract Account code and address.

A `Contract Account` can be programmed to support many different use cases for your users. In order for those use cases to be live, the `code` that implements it must be deployed to the EVM under it's own address.

:::info

Concrete examples of how to generate an ERC-4337 address and deploy the contract code is coming soon.

:::

---

## Smart contract `code`

Every smart contract address has a `code` attached to it that implements the logic. Anyone can retrieve this code by calling the `eth_getCode` RPC method. On a tool like [ethers.js](https://docs.ethers.io/v5/api/providers/provider/#Provider-getCode) this can be as simple as calling:

```typescript
const code = await provider.getCode(address);
```

An ERC-4337 smart contract wallet is no different. Before the wallet can do common things, like validate a signature, its `code` must be deployed otherwise the EVM will not know how to handle the request. A quick way to check if a smart contract wallet is deployed is to verify if the `code` field is null or not:

```typescript
const code = await provider.getCode(walletAddress);
const isDeployed = code !== "0x";
```

---

## Deterministic addresses

With EOAs, the address is consistent across all EVM networks. As long as a user has access to the private key they can access the same address on any network. Ideally we would also like to create the same user experience with contract accounts too.

**A user should be able to deterministically know their wallet address and keep it consistent on every EVM network irrespective of whether the `code` has been deployed or not.** This means they can generate a wallet and start sending funds to it with full assurance that they'll be able to control those funds at any time given they have the correct verification method.

ERC-4337 does this by using the `CREATE2` opcode through a [Singleton Factory](https://eips.ethereum.org/EIPS/eip-2470). Let's break this down to understand what that means in practice.

---

## Generating an address

Below is an example of how you can calculate a `CREATE2` address with [ethers.js](https://docs.ethers.io/v5/api/utils/address/#utils-getCreate2Address):

```typescript
const walletAddress = ethers.utils.getCreate2Address(
  fromAddress,
  salt,
  initCodeHash
);
```

A contract address would be determined by a `fromAddress`, `salt`, and `initCodeHash`.

### `fromAddress`

The `fromAddress` is the address of the [Singleton Factory](https://eips.ethereum.org/EIPS/eip-2470). This factory receives the `salt` and `initCode` as input and uses `CREATE2` to deploy the contract on-chain.

**Because the factory address is the same on every chain, we can rely on it to also deploy our smart contract `code` on all networks under the same address too.**

### `salt`

For an ERC-4337 accounts, the `salt` parameter is the first `nonce` value. This is most likely `0`.

### `initCodeHash`

The `initCode`, which is also a field on the `UserOperation`, is the smart contract code and arguments used for initializing it. It is hashed using `keccak256` to derive the `initCodeHash`.

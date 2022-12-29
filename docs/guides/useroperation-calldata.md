---
sidebar_position: 4
---

# UserOperation callData

The instructions for an ERC-4337 wallet.

A [`UserOperation`](../packages/client-sdk/useroperation.md#useroperation-1) has a field called `callData`. This is sent to the `sender` smart contract address during the [execution phase](../introduction/erc-4337-overview.md#entrypoint) in order to carry out the user's desired intent.

## An overview of transaction data

When a regular transaction is made in an EVM network it will usually consist of a `to`, `value`, and optional `data` field.

Take the simplest transaction of sending 1 ETH (the native token) from wallet A to wallet B. The transaction will have the following information:

- To: address of wallet B
- Value: 1 ETH
- Data: null

Now let's say wallet A wants to send Wallet B 100 USDC (an ERC-20 token). All ERC-20 tokens are just smart contracts that track address balances in it's own state. So the transaction will look like this:

- To: address of USDC smart contract
- Value: 0 ETH
- Data: Instructions to transfer 100 USDC from wallet A to wallet B

**So now we can see that data is how we send instructions to a smart contract.** The `callData` in an ERC-4337 `UserOperation` is no different. It is the instructions given to the `sender` smart contract address.

## Sending instructions to an ERC-4337 wallet

The above overview is a high level take of the data field, but what does it look like in practice? In order to start sending generic instructions to an ERC-4337 wallet, you'll need to implement an interface like this on the smart contract:

```solidity
interface ExecutableWallet {
  function executeUserOp(
    address to,
    uint256 value,
    bytes calldata data
  ) external;
}

```

With this function available the smart contract can mimic a regular transaction when we call `executeUserOp` with `to`, `value`, and `data` as arguments. **The data that is required to call `executeUserOp` is what we would use as the `callData` field in a `UserOperation`.**

## Encoding `callData` with ethers.js

:::info

The exact details to encode function data is outside the scope of this overview. However, you can read more about interacting with contracts [here](https://ethereum.stackexchange.com/questions/234/what-is-an-abi-and-why-is-it-needed-to-interact-with-contracts).

:::

Fortunately, we have great tools at our disposal to abstract the encoding process using ethers.js. The only thing we require is a reference to the contract's [Application Binary Interface (ABI)](https://docs.ethers.io/v5/api/utils/abi/#application-binary-interface). This gives ethers.js the information needed for encoding and decoding.

With ethers.js you can use either a [human-readable ABI](https://docs.ethers.io/v5/api/utils/abi/formats/#abi-formats--human-readable-abi) or a [solidity JSON ABI](https://docs.ethers.io/v5/api/utils/abi/formats/#abi-formats--solidity). The latter can be exported by the Solidity compiler.

Using the wallet interface above and an ERC-20 token, a human-readable ABI would look like this:

```typescript
const walletABI = [
  "function executeUserOp(address to, uint256 value, bytes data)",
];

// An ABI can be fragments and does not have to include the entire interface.
// As long as it includes the parts we want to use.
const partialERC20TokenABI = [
  "function transfer(address to, uint amount) returns (bool)",
];
```

With these two ABIs we can encode a `callData` for our `UserOperation` that sends an `amount` of USDC to another wallet's address:

```typescript
const wallet = new ethers.utils.Interface(walletABI);
const erc20Token = new ethers.utils.Interface(partialERC20TokenABI);

const callData = wallet.encodeFunctionData("executeUserOp", [
  usdcToken,
  ethers.constants.Zero,
  erc20Token.encodeFunctionData("transfer", [walletAddress, amount]),
]);

// Send encoded callData to a UserOperationBuilder.
builder.setCallData(callData);
```

:::info

In the above example our smart contract wallet is required to interact with another smart contract. Which is why we need to encode more data within the `callData`.

:::

If we only wanted to send an `amount` of ETH (the native token) to another wallet's address, the code would look like this:

```typescript
const wallet = new ethers.utils.Interface(walletABI);

const callData = wallet.encodeFunctionData("executeUserOp", [
  usdcToken,
  amount,
]);

// Send encoded callData to a UserOperationBuilder.
builder.setCallData(callData);
```

Just like the simplest regular transaction, there is no data field. Which means we **don't** need to encode any data within the userOp's `callData`.

:::info

In this guide we used the example of calling the function `executeUserOp`. However there is no reason why the smart contract wallet couldn't also have other functions that the `callData` could be encoded to run.

:::

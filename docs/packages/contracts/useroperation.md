---
sidebar_position: 3
---

# UserOperation

The pseudo-transaction object for ERC-4337.

## Type

This type can be imported and used within any of your Solidity smart contracts to represent an ERC-4337 [`UserOperation`](../../introduction/erc-4337-overview.md#useroperation).

If you use Stackup's wallet contracts and paymaster contracts without modification, you do not need to import this type.

```solidity
import @PackageName/contracts/ERC4337/UserOperation.sol;
```

```solidity
struct UserOperation {
  address sender;
  uint256 nonce;
  bytes initCode;
  bytes callData;
  uint256 callGasLimit;
  uint256 verificationGasLimit;
  uint256 preVerificationGas;
  uint256 maxFeePerGas;
  uint256 maxPriorityFeePerGas;
  bytes paymasterAndData;
  bytes signature;
}

```

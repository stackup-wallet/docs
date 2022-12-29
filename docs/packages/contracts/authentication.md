---
sidebar_position: 2
---

# Authentication

Making sure calls to your contract accounts are legit.

## Authenticate modifier

All implementations in this package inherit the following abstract contract with an `authenticate` modifier. This will check that calls are coming from the immutable `EntryPoint` address. **Functions with this modifier will not execute unless they have already passed the [verification phase](../../introduction/erc-4337-overview.md#entrypoint).**

```solidity
import @PackageName/contracts/ERC4337/Authenticate.sol;
```

```solidity
abstract contract Authenticate {
  address public immutable entryPoint;

  constructor(address _entryPoint) {
    entryPoint = _entryPoint;
  }

  modifier authenticate() {
    require(msg.sender == entryPoint, "Sender not allowed");
    _;
  }
}

```

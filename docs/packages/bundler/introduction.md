---
sidebar_position: 1
title: ERC-4337 Bundler
sidebar_label: Introduction
description: What are Bundlers and how does Stackup's bundler infrastructure help to deliver account abstraction with EIP-4337.
---

# Introduction

In ERC-4337, a bundler is the core infrastructure component that allows account abstraction to work on any EVM network. On the highest level, its purpose is to work with a mempool of UserOperations to get the transaction to be included on-chain.

## Security considerations

When reading the [EIP specs](https://eips.ethereum.org/EIPS/eip-4337), you'll notice that there are many rules a bundler must follow. Although the list of rules may seem long and complex, each one has been extensively debated and discussed by security researchers and builders within the Ethereum ecosystem.

One of the bundlers main jobs is to comply with these rules to prevent all possible DoS attack vectors. These include everything from basic sanity checks that make sure a UserOperation is structurally sound to more in-depth tracing for banned opcodes and storage access to make sure bundles cannot be censored once submitted to the network.

**Similar to Ethereum clients, all bundler implementations are expected to pass a [test suite](https://github.com/eth-infinitism/bundler-spec-tests) to ensure its compliance and that it won't fragment the mempool.**

:::info

Stackup bundler currently maintains 100% coverage of the test suite. Although the spec is still a work in progress, all future iterations will strive to maintain full compliance coverage.

:::

## UserOperation mempool

The canonical mempool for EIP-4337 is decentralized and is made up of a permissionless P2P network of independent bundlers. To maintain this requirement, it doesn't make any assumptions about which contracts are okay and which are not. All contracts must follow the same rules during validation.

However, there will be cases where some contracts are audited and proven to be safe even though they break some of the rules set by the canonical mempool. In this case a group of bundlers can create alternative mempools for such exceptions. A common example of when this might be needed is in the case of a [Deposit Paymaster](../../api/paymaster/introduction#deposit-paymaster) that can abstract gas fees with any ERC-20 token.

**Another role of the bundler is to maintain a connection to the canonical mempool and also any other alternative mempools it opts into. To read more about this topic, we highly recommend checking out [this article](https://notes.ethereum.org/@yoav/unified-erc-4337-mempool).**

## Stackup bundler

One of Stackup's core open-source contributions is to develop a [fully compliant and production grade bundler in Go](https://github.com/stackup-wallet/stackup-bundler). We see this work as critical to pushing account abstraction forward and improving the user experience for all accounts on Ethereum and other EVM networks.

### Modes

An instance of the bundler supports different modes out of the box. Although all modes produce the same outcome, they vary in three areas:

1. **Mempool support**: A private mempool is only visible to an individual bundler whereas a P2P mempool has UserOperations that have been propagated to all bundlers in the network.
2. **Networks**: Some modes rely on specific features (e.g. mev-boost) that makes it only available to a certain set of EVM networks.
3. **DoS mitigation strategy**: A bundler that sends a batch of UserOperations on-chain must secure itself against frontrunning.

| Mode                      | Mempool support                                      | Networks                                                                                 | DoS mitigation strategy                                                                                                    |
| ------------------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `private`                 | Private mempool of UserOperations only               | All EVM networks                                                                         | IP throttle clients that send UserOperations which revert transactions                                                     |
| `searcher`                | Can support both private and P2P mempool<sup>1</sup> | Ethereum and Goerli only                                                                 | Integrates with block builders like [flashbots](https://github.com/flashbots/builder) to send UserOperations via mev-boost |
| `conditional`<sup>2</sup> | Can support both private and P2P mempool             | EVM networks with [conditional transactions](https://notes.ethereum.org/@yoav/SkaX2lS9j) | Relies on validators/sequencers to reject transactions that can cause a revert through certain state changes               |

<sup>1. searcher mode with P2P support is not yet implemented.</sup>
<br />
<sup>2. conditional mode is not yet implemented.</sup>

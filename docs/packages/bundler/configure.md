---
sidebar_position: 3
title: How to configure an ERC-4337 bundler
sidebar_label: Configure
description: This page lists the environment variables for configuring a local EIP-4337 bundler using stackup-bundler
---

# Configure

Options to configure a bundler with env variables.

The Bundler can be configured through environment variables or a `.env` file at the working directory. Some variables are required while others are optional.

## Environment variables

Required variables:

```bash
# Connection string to a standard Ethereum node.
ERC4337_BUNDLER_ETH_CLIENT_URL

# The private key for the EOA used to relay bundles to the EntryPoint.
ERC4337_BUNDLER_PRIVATE_KEY
```

Optional variables:

```bash
# Port to run the Client on.
# Defaults to 4337.
ERC4337_BUNDLER_PORT

# Data directory to store embedded mempool.
# Defaults to /tmp/stackup_bundler.
ERC4337_BUNDLER_DATA_DIRECTORY

# Comma separated EntryPoint addresses to support.
# The first address is the preferred EntryPoint.
# Default depends on major version, see release notes on GitHub.
ERC4337_BUNDLER_SUPPORTED_ENTRY_POINTS

# Address to send gas refunds for relaying bundlers.
# Defaults to the public address of the private key.
ERC4337_BUNDLER_BENEFICIARY

# The maximum verificationGasLimit on a received UserOperation.
# Defaults to 1500000 wei.
ERC4337_BUNDLER_MAX_VERIFICATION_GAS

# The maximum number of pending UserOperations an unstaked sender is allowed.
# Defaults to 4.
ERC4337_BUNDLER_MAX_OPS_FOR_UNSTAKED_SENDER
```

## Private mode variables

These variables are relevant to bundlers running in [`private` mode](./introduction#modes).

Optional variables:

```bash
# The limit for how many ops can be seen from a client without being included on-chain.
# Defaults to 3.
ERC4337_BUNDLER_RELAYER_BANNED_THRESHOLD

# The limit for how long a banned client will be rejected for in seconds.
# Defaults to 86400 seconds (i.e. 24 hours).
ERC4337_BUNDLER_RELAYER_BANNED_TIME_WINDOW
```

## Searcher mode variables

These variables are relevant to bundlers running in [`searcher` mode](./introduction#modes).

Required variables:

```bash
# Connection string to a block builder that supports eth_sendBundle RPC.
ERC4337_BUNDLER_ETH_BUILDER_URL
```

Optional variables:

```bash
# The number of future blocks to submit a transaction for.
# A higher value may slow down processing but has a higher chance of inclusion.
# Defaults to 25.
ERC4337_BUNDLER_BLOCKS_IN_THE_FUTURE
```

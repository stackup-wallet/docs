---
sidebar_position: 2
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
# Defaults to 1500000.
ERC4337_BUNDLER_MAX_VERIFICATION_GAS
```

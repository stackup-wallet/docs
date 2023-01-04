---
sidebar_position: 2
title: How to configure an ERC-4337 paymaster
sidebar_label: Configuration
description: This page lists the environment variables for configuring an EIP-4337 paymaster using Paymaster Connect by Stackup. Start sponsoring gasless transactions today!
---

# Configuration

Options to configure a paymaster service.

<head>
  <meta name="title" content="How to configure an ERC-4337 paymaster | Stackup" />
  <meta name="og:title" content="How to configure an ERC-4337 paymaster | Stackup" />
  <meta name="description" content="This page lists the environment variables for configuring an EIP-4337 paymaster using Paymaster Connect by Stackup. Start sponsoring gasless transactions today!" />
  <meta name="og:description" content="This page lists the environment variables for configuring an EIP-4337 paymaster using Paymaster Connect by Stackup. Start sponsoring gasless transactions today!" />
  <meta name="keywords" content="gasless transactions,
    sponsor Ethereum transactions,
    pay gas fees,
    ERC-4337 paymaster,
    account abstraction,
    ERC-4337,
    EIP-4337" />
  <meta name="og:keywords" content="gasless transactions,
    sponsor Ethereum transactions,
    pay gas fees,
    ERC-4337 paymaster,
    account abstraction,
    ERC-4337,
    EIP-4337" />
</head>

The `Paymaster Connect` service can be configured either through a `.paymasterrc.json` file or using environment variables.

## JSON options

```json
{
  // Port to run Paymaster Connect on.
  "port": 3001,

  // Connection string to a standard Ethereum node.
  "rpcUrl": "",

  // Connection string to a standard ERC-4337 Bundler RPC client.
  "erc4337RpcUrl": "",

  // Array of EntryPoint addresses to support.
  // TODO: Add default address.
  "supportedEntryPoints": [],

  // A path to the file containing the private key.
  // The private key is used to sign UserOperations as a paymaster or wallet.
  // This is scheme agnostic and used in handlers/singer.ts.
  // Make sure NOT to commit the file to version control.
  "privateKeyPath": ".privateKey"
}
```

## Environment variables

```bash
STACKUP_PAYMASTER_PORT=3001

STACKUP_PAYMASTER_RPC_URL=

STACKUP_PAYMASTER_ERC_4337_RPC_URL=

STACKUP_PAYMASTER_SUPPORTED_ENTRY_POINTS=

STACKUP_PAYMASTER_PRIVATE_KEY_PATH=
```

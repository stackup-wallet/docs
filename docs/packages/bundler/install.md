---
sidebar_position: 1
---

# Install

A guide to spinning up a bundler and RPC client to handle ops.

<head>
  <meta name="title" content="How to install a local ERC-4337 bundler | Stackup" />
  <meta name="og:title" content="How to install a local ERC-4337 bundler | Stackup" />
  <meta name="description" content="This page shows how to spin up a local ERC-4337 bundler using Stackup." />
  <meta name="og:description" content="This page shows how to spin up a local ERC-4337 bundler using Stackup." />
  <meta name="keywords" content="ERC-4337 bundler,
    ERC-4337 Go Ethereum,
    install stackup-bundler,
    account abstraction,
    ERC-4337,
    EIP-4337,
    geth ERC-4337" />
  <meta name="og:keywords" content="ERC-4337 bundler,
    ERC-4337 Go Ethereum,
    install stackup-bundler,
    account abstraction,
    ERC-4337,
    EIP-4337,
    geth ERC-4337" />
</head>

This package is a Go implementation of an ERC-4337 `Bundler`. The current version supports a private mempool with a peer-to-peer (P2P) version on the roadmap.

This package is open source at [github.com/stackup-wallet/stackup-bundler](https://github.com/stackup-wallet/stackup-bundler).

:::tip

**Looking for a fully managed instance for your project instead?**

Use our [cloud platform](https://app.stackup.sh/) to get set up with a bundler in 2 minutes 🚀

:::

## Via `go install`

Make sure to have your environment variables configured before running the client. See the [configure page](./configure.md) for details.

### Install

To get the latest version:

```bash
go install github.com/stackup-wallet/stackup-bundler@latest
```

Alternatively, if you're looking for an older version:

```bash
# See github.com/stackup-wallet/stackup-bundler/releases for version releases
go install github.com/stackup-wallet/stackup-bundler@vX.Y.Z
```

### Running the bundler

:::info

Running a bundler requires access to a Geth node with debug API enabled for custom tracing. Most RPC providers do not support this.

:::

Run an instance in `private` mode:

```bash
stackup-bundler start --mode private
```

For a description on the CLI commands:

```bash
stackup-bundler start --help
```

---
sidebar_position: 2
title: Installing an ERC-4337 bundler
sidebar_label: Install
description: How to get started with self-hosting a production grade ERC-4337 bundler with Stackup's open source implementation.
---

# Install

A guide to spinning up a bundler and RPC client to handle ops.

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

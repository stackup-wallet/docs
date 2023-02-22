---
sidebar_position: 2
title: Installing an ERC-4337 bundler
sidebar_label: Install
description: How to get started with self-hosting a production grade ERC-4337 bundler with Stackup's open source implementation.
---

# Install

A quick guide to spinning up an ERC-4337 bundler for handling UserOperations. This package is implemented in Go and is open source at [github.com/stackup-wallet/stackup-bundler](https://github.com/stackup-wallet/stackup-bundler).

:::tip

**Looking for a fully managed instance for your project instead?**

Use our [hosted services](https://app.stackup.sh/sign-in) to get set up with a bundler in 2 minutes 🚀

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

Running a bundler requires access to a full-node with debug API enabled for [custom JS tracing](https://geth.ethereum.org/docs/developers/evm-tracing/custom-tracer#custom-javascript-tracing). Most RPC providers do not support this.

:::

Run an instance in `private` mode:

```bash
stackup-bundler start --mode private
```

For a description on the CLI commands and other supported [modes](./introduction#modes):

```bash
stackup-bundler start --help
```

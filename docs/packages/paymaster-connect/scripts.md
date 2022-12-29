---
sidebar_position: 5
---

# Scripts

CLI commands for managing your paymaster on-chain.

All commands can be ran with the following format:

```bash
yarn run PackageName <command> --flag=value
```

## Managing stake

A `Paymaster Contract` must stake a blockchain's native token (usually ETH) to the `EntryPoint` contract in order to sponsor a wallet's `UserOperation`. These commands are used to help manage the stake on a supported `EntryPoint`.

### `addStake`

Adds stake to a `Paymaster Contract`.

In order to consent to being a paymaster, a `Paymaster Contract` will need to send and lock an amount of ETH to the `EntryPoint` to be staked. It can only be unlocked after a given time set by `unstakeDelaySec`. This action will also cancel any pending unlock.

:::tip

Use this command to initialize your contract as a `Paymaster Contract`. If you are topping up your balance, use `depositTo` instead.

:::

```bash
yarn run PackageName addStake
```

| Flags             | Description                                                                                                                            | Default                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `value`           | Amount in ETH to send and stake. Must be more than or equal to the minimum set by the `EntryPoint`.                                    | The minimum set by the `EntryPoint` (1 ETH).         |
| `unstakeDelaySec` | The amount in seconds to wait before a stake can be fully unlocked. Must be more than or equal to the minimum set by the `EntryPoint`. | The minimum set by the `EntryPoint` (86400 seconds). |
| `entryPoint`      | The supported `EntryPoint` address to target.                                                                                          | The first `EntryPoint` address in the configuration. |

### `unlockStake`

Sets the stake to be unlocked. The staked funds can be withdrawn after the time specified by `unstakeDelaySec`.

```bash
yarn run PackageName unlockStake
```

| Flags        | Description                                   | Default                                              |
| ------------ | --------------------------------------------- | ---------------------------------------------------- |
| `entryPoint` | The supported `EntryPoint` address to target. | The first `EntryPoint` address in the configuration. |

### `withdrawStake`

Withdraws the `Paymaster Contract`'s stake if the delay period set by `unstakeDelaySec` has ended.

```bash
yarn run PackageName withdrawStake
```

| Flags             | Description                                   | Default                                              |
| ----------------- | --------------------------------------------- | ---------------------------------------------------- |
| `withdrawAddress` | The address to send the withdrawn stake to.   | The `Paymaster Contract` address.                    |
| `entryPoint`      | The supported `EntryPoint` address to target. | The first `EntryPoint` address in the configuration. |

## Managing deposit

When sponsoring a `UserOperation`, the `EntryPoint` will charge the transaction fee from the paymaster's deposit (not the stake value). These commands are used to help manage the deposit on a supported `EntryPoint`.

### `balanceOf`

Gets the current deposit balance for a `Paymaster Contract`.

```bash
yarn run PackageName balanceOf
```

| Flags        | Description                                   | Default                                              |
| ------------ | --------------------------------------------- | ---------------------------------------------------- |
| `account`    | The address of the account to retrieve.       | The `Paymaster Contract` address.                    |
| `entryPoint` | The supported `EntryPoint` address to target. | The first `EntryPoint` address in the configuration. |

### `depositTo`

Adds to the current deposit of a given `Paymaster Contract`.

```bash
yarn run PackageName depositTo
```

| Flags        | Description                                   | Default                                              |
| ------------ | --------------------------------------------- | ---------------------------------------------------- |
| `value`      | Amount in ETH to deposit.                     | 1 ETH.                                               |
| `account`    | The address of the account to top up.         | The `Paymaster Contract` address.                    |
| `entryPoint` | The supported `EntryPoint` address to target. | The first `EntryPoint` address in the configuration. |

### `withdrawTo`

Withdraws a specified amount from the sender's deposit.

```bash
yarn run PackageName withdrawTo
```

| Flags             | Description                                   | Default                                              |
| ----------------- | --------------------------------------------- | ---------------------------------------------------- |
| `withdrawAddress` | The address to send the withdrawn deposit to. | The `Paymaster Contract` address.                    |
| `withdrawAmount`  | The amount to withdraw.                       | The sender's max deposit.                            |
| `entryPoint`      | The supported `EntryPoint` address to target. | The first `EntryPoint` address in the configuration. |

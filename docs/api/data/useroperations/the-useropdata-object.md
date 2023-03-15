---
sidebar_position: 1
title: The UserOperation data object
sidebar_label: The UserOperation data object
description: The UserOperation data object
---

The UserOperation data describes a bundled user operation.

#### Endpoints

| Endpoint                            | Description            |
| ----------------------------------- | ---------------------- |
| GET /v1/useroperations              | List userop data       |
| GET /v1/useroperations/:userop_hash | Retrieve a userop data |

#### The UserOperation data object

```json
{
  "network": "ethereum_goerli",
  "userOperation": {
    "sender": "0x3C003eEA3F17f8ae53d3358563D9820E9b05602D",
    "nonce": "0x0",
    "initCode": "0x",
    "callData": "0xb61d27f6000000000000000000000000d4e5aa212d7b9cd781e0708b5a3764c949e4ce9500000000000000000000000000000000000000000000000000005af3107a400000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000",
    "callGasLimit": "0x9a7f",
    "verificationGasLimit": "0x186a0",
    "preVerificationGas": "0xb708",
    "maxFeePerGas": "0x4a16acc2",
    "maxPriorityFeePerGas": "0x4a16aca4",
    "paymasterAndData": "0x",
    "signature": "0x41b6d45c2ffcc7c798095fa71fcab913ff20a183d730946283f1d3584c3fb76b12c985888560e0dbeea7fcfbf174f8326c0f28544e2cbdd203bddd3a0bc70adf1b"
  },
  "userOpHash": "0xb3ce4f1fdcfb62026400600ed22f765eed4e10dad6fd2e98bcc9448eca38b31b",
  "sender": "0x3c003eea3f17f8ae53d3358563d9820e9b05602d",
  "paymaster": "0x0000000000000000000000000000000000000000",
  "nonce": "0x0",
  "success": true,
  "reason": null,
  "actualGasCost": "0x616691280e97",
  "actualGasUsed": "0x1508d",
  "bundler": "0x9c98b1528c26cf36e78527308c1b21d89baed700",
  "blockNumber": 33093730,
  "entryPoint": "0x0576a174D229E3cFA37253523E645A78A0C91B57",
  "blockHash": "0xaacb1ee5d5c36c223fc42d6720ddb5ca0e6771223f18f8421debf71d5c7cdff5",
  "created": 1673961900
}
```

---

#### Attributes

> Note: these are defined in the eip spec. Copy attribute definitions post-draft.

`userOperation`, `userOpHash`, `sender`, `paymaster`, `nonce`, `actualGasCost`, `actualGasCost`, `actualGasUsed`, `blockNumber`, `blockHash`, `success`, `reason`, `entryPoint`

---

##### **`bundler`** - string

Bundler's address.

---

##### **`network`** - enum

Network of the user operation.

---

##### **`created`** - enum

Date in which the user operation was bundled.

---

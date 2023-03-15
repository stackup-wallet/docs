---
sidebar_position: 3
title: Retrieve a UserOperation
sidebar_label: Retrieve a UserOperation
description: Retrieve a UserOperation
---

# Retrieve a UserOperation

Retrieve a useroperation data object.

```
GET /v1/useroperations/:userop_hash
```

### Parameters

---

No parameters.

---

### Returns

Returns a [UserOperation Data](./the-useropdata-object#the-useroperation-data-object) object. If the call fails it returns an `Error` object.

```json
{
  "data": {
    "userOpHash": "0xb3ce4f1fdcfb62026400600ed22f765eed4e10dad6fd2e98bcc9448eca38b31b",
    "sender": "0x3c003eea3f17f8ae53d3358563d9820e9b05602d",
    "paymaster": "0x0000000000000000000000000000000000000000",
    "nonce": "0x0",
    "success": true,
    "reason": null,
    "actualGasCost": "0x616691280e97",
    "actualGasUsed": "0x1508d",
    "receipt": {},
    "logs": [],
    "bundler": "0x9c98b1528c26cf36e78527308c1b21d89baed700",
    "network": "goerli",
    "blockNumber": 33093730,
    "blockHash": "0xaacb1ee5d5c36c223fc42d6720ddb5ca0e6771223f18f8421debf71d5c7cdff5",
    "created": 1673961900
  }
}
```

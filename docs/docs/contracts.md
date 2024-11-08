---
sidebar_position: 9
---

# 🪄 Smart Contracts

A suite of Solidity smart contracts manage the gameplay.

#### There are two (2) Platform Contracts that manage the Casino's platform:

1. CastCasino.sol
2. Proxy.sol

#### There are a suite of Game Contracts that manage the individual gameplay:

1. TexasHoldEm.sol
2. OmahaHiLo.sol
3. FiveCardDraw.sol
4. SevenCardStud.sol


## Platform Contracts

These are the main contracts of the platform.

### CastCasino.sol

The primary contract.

- If the timeout passes and no one joins, their Ante is returned to them.

### Proxy.sol

Responsible for managing the upgrade capabilities to the suite of Casino contracts.


## Game Contracts

Each game has its own Solidity contract.

### TexasHoldEm.sol

TBD...

### OmahaHiLo.sol

TBD...

### FiveCardDraw.sol

TBD...

### SevenCardStud.sol

TBD...

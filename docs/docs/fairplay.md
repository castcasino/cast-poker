---
sidebar_position: 2
---

# 😇 What is Fairplay?

Let's discover how we can be **100% CHEAT-PROOF** in less than 5 minutes.

## Introduction

Here is what you'll need to know in this lesson:
- hash
- pre-image
- hmac-512


## Shuffling

Before each round:
1. A "random" seed is chosen.
2. Cards are shuffled, based on the generated seed.
3. The seed is NOT revealed until AFTER the round has completed.

:::info YOU SHOULD KNOW

__A Trusted Execution Environment (TEE) is planned for deployment in the very near future.__

A TEE is built on a hardware-defined secure enclave, which can be either part of a CPU or a separate chip, strengthening application security by encrypting data in use and enforcing access controls on different memory regions.

You can also find out more by visiting __[Intel’s Software Guard Extensions (SGX) site](https://software.intel.com/en-us/sgx)__.

:::


## Dealing

Each player's hand is represented by a 512-bit hash.

:::danger CRITICAL NOTE

Each player's hashes are public to everyone for the entirety of the round.

:::


## Betting

Each player will send/transfer their antes & raises directly into the __[CastPoker.sol](https://etherscan.io/)__ smart contract.

:::warning IMPORTANT NOTE

The __[Cast Casino Oracle](https://cast.casino)__ is the ONLY party authorized to execute the contract's __`payout()`__ function, based on the final results of each round.

:::


## Payouts

Payout are sent/transferred __IMMEDIATELY__ after each round to the respective recipients.

:::warning IMPORTANT NOTE

ALL Fairplay details are written to the blockchain during the payout phase, to permanently record that each round is in fact provably fair.

:::

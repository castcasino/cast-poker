export default [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tableid",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "id",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "seed",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "int8",
								"name": "hole1",
								"type": "int8"
							},
							{
								"internalType": "int8",
								"name": "hole2",
								"type": "int8"
							}
						],
						"internalType": "struct CastPoker.PlayerCards",
						"name": "cards",
						"type": "tuple"
					}
				],
				"indexed": false,
				"internalType": "struct CastPoker.Player",
				"name": "player",
				"type": "tuple"
			}
		],
		"name": "BuyIn",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tableid",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "flop1",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "flop2",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "flop3",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "turn",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "river",
				"type": "uint8"
			}
		],
		"name": "CommunityCardsDealt",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tableid",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "pot",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Payout",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tableid",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "player",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "int8",
				"name": "hole1",
				"type": "int8"
			},
			{
				"indexed": false,
				"internalType": "int8",
				"name": "hole2",
				"type": "int8"
			}
		],
		"name": "PlayerCardsDealt",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tableid",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "enum CastPoker.GameplayState",
						"name": "state",
						"type": "uint8"
					},
					{
						"internalType": "address",
						"name": "token",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "host",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "seed",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "buyin",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "tts",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "pot",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "paid",
						"type": "uint256"
					},
					{
						"internalType": "uint8",
						"name": "seats",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "fomo",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "theme",
						"type": "uint8"
					},
					{
						"components": [
							{
								"internalType": "uint8",
								"name": "flop1",
								"type": "uint8"
							},
							{
								"internalType": "uint8",
								"name": "flop2",
								"type": "uint8"
							},
							{
								"internalType": "uint8",
								"name": "flop3",
								"type": "uint8"
							},
							{
								"internalType": "uint8",
								"name": "turn",
								"type": "uint8"
							},
							{
								"internalType": "uint8",
								"name": "river",
								"type": "uint8"
							}
						],
						"internalType": "struct CastPoker.CommunityCards",
						"name": "community",
						"type": "tuple"
					},
					{
						"internalType": "address[]",
						"name": "seated",
						"type": "address[]"
					}
				],
				"indexed": false,
				"internalType": "struct CastPoker.Table",
				"name": "table",
				"type": "tuple"
			}
		],
		"name": "TableCreated",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "benches",
		"outputs": [
			{
				"internalType": "enum CastPoker.GameplayState",
				"name": "state",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tableid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_seed",
				"type": "uint256"
			}
		],
		"name": "buyIn",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tableid",
				"type": "uint256"
			}
		],
		"name": "close",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tableid",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_player",
				"type": "address"
			},
			{
				"internalType": "int8",
				"name": "_hole1",
				"type": "int8"
			},
			{
				"internalType": "int8",
				"name": "_hole2",
				"type": "int8"
			}
		],
		"name": "dealCards",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tableid",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "_flop1",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "_flop2",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "_flop3",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "_turn",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "_river",
				"type": "uint8"
			}
		],
		"name": "dealCommunityCards",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_chainid",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_player",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_assetid",
				"type": "address"
			}
		],
		"name": "getChips",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPredecessor",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRevision",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tableid",
				"type": "uint256"
			}
		],
		"name": "getSeated",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getSuccessor",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalTables",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tableid",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_player",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "payout",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "players",
		"outputs": [
			{
				"internalType": "address",
				"name": "id",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "seed",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "int8",
						"name": "hole1",
						"type": "int8"
					},
					{
						"internalType": "int8",
						"name": "hole2",
						"type": "int8"
					}
				],
				"internalType": "struct CastPoker.PlayerCards",
				"name": "cards",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			}
		],
		"name": "setBench",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_newSuccessor",
				"type": "address"
			}
		],
		"name": "setSuccessor",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_seed",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_buyin",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_tts",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "_seats",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "_fomo",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "_theme",
				"type": "uint8"
			}
		],
		"name": "setTable",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tableid",
				"type": "uint256"
			}
		],
		"name": "showdown",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tables",
		"outputs": [
			{
				"internalType": "enum CastPoker.GameplayState",
				"name": "state",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "host",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "seed",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "buyin",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tts",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "pot",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "paid",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "seats",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "fomo",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "theme",
				"type": "uint8"
			},
			{
				"components": [
					{
						"internalType": "uint8",
						"name": "flop1",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "flop2",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "flop3",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "turn",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "river",
						"type": "uint8"
					}
				],
				"internalType": "struct CastPoker.CommunityCards",
				"name": "community",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
] as const

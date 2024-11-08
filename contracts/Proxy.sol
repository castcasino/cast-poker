// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Proxy {
    // Storage slot for the address of the implementation contract
    bytes32 private constant implementationSlot = keccak256("cast.poker.proxy.implementation");
    // Storage slot for the admin address
    bytes32 private constant adminSlot = keccak256("cast.poker.proxy.admin");

    // Modifier to restrict access to admin
    modifier onlyAdmin() {
        require(msg.sender == _admin(), "Caller is not admin");
        _;
    }

    // Constructor to set the initial implementation and admin
    constructor(address _implementation) {
        _setImplementation(_implementation);
        _setAdmin(msg.sender);
    }

    // Fallback function to delegate calls to the implementation
    fallback() external payable {
        _delegate(implementation());
    }

    // Receive function to handle plain Ether transfers
    receive() external payable {
        _delegate(implementation());
    }

    // Internal function to delegate the call to the implementation
    function _delegate(address _implementation) internal {
        assembly {
            // Copy msg.data
            calldatacopy(0, 0, calldatasize())
            // Call the implementation
            let result := delegatecall(gas(), _implementation, 0, calldatasize(), 0, 0)
            // Copy the returned data
            returndatacopy(0, 0, returndatasize())
            // Handle result
            switch result
            case 0 {
                // Revert if the call failed
                revert(0, returndatasize())
            }
            default {
                // Return data if the call succeeded
                return(0, returndatasize())
            }
        }
    }

    // Getter for the implementation address
    function implementation() internal view returns (address impl) {
        bytes32 slot = implementationSlot;
        assembly {
            impl := sload(slot)
        }
    }

    // Getter for the admin address
    function _admin() internal view returns (address adm) {
        bytes32 slot = adminSlot;
        assembly {
            adm := sload(slot)
        }
    }

    // Function to upgrade the implementation contract
    function upgradeTo(address newImplementation) external onlyAdmin {
        _setImplementation(newImplementation);
    }

    // Internal function to set the implementation address
    function _setImplementation(address newImplementation) internal {
        bytes32 slot = implementationSlot;
        assembly {
            sstore(slot, newImplementation)
        }
    }

    // Function to change admin
    function changeAdmin(address newAdmin) external onlyAdmin {
        _setAdmin(newAdmin);
    }

    // Internal function to set the admin address
    function _setAdmin(address newAdmin) internal {
        bytes32 slot = adminSlot;
        assembly {
            sstore(slot, newAdmin)
        }
    }
}

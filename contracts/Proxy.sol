// //SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// import { AxelarExecutableWithToken } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutableWithToken.sol';
// import { IERC20 } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IERC20.sol';
// import { IAxelarGasService } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol';
// import "@aave/core-v3/contracts/interfaces/IPool.sol";

// /**
//  * @title Call Contract With Token
//  * @notice Send a token along with an Axelar GMP message between two blockchains
//  */
// contract CallContractWithToken is AxelarExecutableWithToken {
//     IAxelarGasService public immutable gasService;
//     address public immutable aaveLendingPool; // Aave V3 Lending Pool Address


//     event Executed(bytes32 commandId, string sourceChain, string sourceAddress, bytes payload);
//     event ExecutedWithToken(bytes32 commandId, string sourceChain, string sourceAddress, bytes payload, string tokenSymbol, uint256 amount);
//     event ExecutedWithTokenAddress(address tokenAddress, uint256 amount);

//     /**
//      *
//      * @param _gateway address of axl gateway on deployed chain
//      * @param _gasReceiver address of axl gas service on deployed chain
//      */
//     constructor(address _gateway, address _gasReceiver, address _aaveLendingPool) AxelarExecutableWithToken(_gateway) {
//         gasService = IAxelarGasService(_gasReceiver);
//         aaveLendingPool = _aaveLendingPool;

//     }

//     function _execute(
//         bytes32 commandId,
//         string calldata sourceChain,
//         string calldata sourceAddress,
//         bytes calldata payload
//     ) internal override {
//         emit Executed(commandId, sourceChain, sourceAddress, payload);
//     }

//     /**
//      * @notice logic to be executed on dest chain with token address
//      * @dev this is triggered automatically by relayer
//      * @param tokenAddress address of token sent from src chain
//      * @param amount amount of tokens sent from src chain
//      */
//     function executeWithTokenAddress(
//         address tokenAddress,
//         uint256 amount
//     ) public {
//         require(amount > 0, "Deposit amount must be greater than zero");

//         IERC20(tokenAddress).transfer(address(this), amount); // Transfer tokens from user
//         IERC20(tokenAddress).approve(aaveLendingPool, amount); // Approve Aave Pool

//         IPool(aaveLendingPool).supply(tokenAddress, amount, msg.sender, 0); // Deposit into Aave

//         emit ExecutedWithTokenAddress(tokenAddress, amount);
//     }
//     /**
//      * @notice logic to be executed on dest chain
//      * @dev this is triggered automatically by relayer
//      * @param payload encoded gmp message sent from src chain
//      * @param tokenSymbol symbol of token sent from src chain
//      * @param amount amount of tokens sent from src chain
//      */
//     function _executeWithToken(
//         bytes32 commandId,
//         string calldata sourceChain,
//         string calldata sourceAddress,
//         bytes calldata payload,
//         string calldata tokenSymbol,
//         uint256 amount
//     ) internal override {
//         // address[] memory recipients = abi.decode(payload, (address[]));
//         address tokenAddress = gatewayWithToken().tokenAddresses(tokenSymbol);

//         // uint256 sentAmount = amount / recipients.length;
//         // for (uint256 i = 0; i < recipients.length; i++) {
//             // IERC20(tokenAddress).transfer(recipients[i], sentAmount);
//         // }

//         require(amount > 0, "Deposit amount must be greater than zero");

//         IERC20(tokenAddress).transfer(address(this), amount); // Transfer tokens from user
//         IERC20(tokenAddress).approve(aaveLendingPool, amount); // Approve Aave Pool

//         IPool(aaveLendingPool).supply(tokenAddress, amount, msg.sender, 0); // Deposit into Aave

//         emit ExecutedWithToken(commandId, sourceChain, sourceAddress, payload, tokenSymbol, amount);
   
//     }
// }


pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@aave/core-v3/contracts/interfaces/IPool.sol";

contract AaveProxy is Ownable {
    address public immutable aaveLendingPool; // Aave V3 Lending Pool Address

    constructor(address _aaveLendingPool, address _owner) Ownable(_owner) {
        require(_aaveLendingPool != address(0), "Invalid Aave pool address");
        aaveLendingPool = _aaveLendingPool;
    }

    /**
     * @dev Deposits an asset into Aave on behalf of the user
     * @param asset The ERC20 token address
     * @param amount The amount to deposit
     */
    function deposit(address asset, uint256 amount) external {
        require(amount > 0, "Deposit amount must be greater than zero");

        IERC20(asset).transferFrom(msg.sender, address(this), amount); // Transfer tokens from user
        IERC20(asset).approve(aaveLendingPool, amount); // Approve Aave Pool

        IPool(aaveLendingPool).supply(asset, amount, msg.sender, 0); // Deposit into Aave
    }

    /**
     * @dev Allows the user to borrow an asset from Aave
     * @param asset The ERC20 token address to borrow
     * @param amount The amount to borrow
     * @param interestRateMode 1 for stable, 2 for variable
     */
    function borrow(address asset, uint256 amount, uint256 interestRateMode) external {
        require(amount > 0, "Borrow amount must be greater than zero");

        IPool(aaveLendingPool).borrow(asset, amount, interestRateMode, 0, msg.sender);
    }

    /**
     * @dev Repays the borrowed asset
     * @param asset The ERC20 token address to repay
     * @param amount The amount to repay
     * @param interestRateMode 1 for stable, 2 for variable
     */
    function repay(address asset, uint256 amount, uint256 interestRateMode) external {
        require(amount > 0, "Repay amount must be greater than zero");

        IERC20(asset).transferFrom(msg.sender, address(this), amount);
        IERC20(asset).approve(aaveLendingPool, amount);

        IPool(aaveLendingPool).repay(asset, amount, interestRateMode, msg.sender);
    }
}
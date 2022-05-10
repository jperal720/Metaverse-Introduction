// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// Openzeppelin imports
import "@openzeppelin/contracts@4.4.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.4.2/access/Ownable.sol";
import "@openzeppelin/contracts@4.4.2/utils/Counters.sol";

//Creation of the Metaverse Smart Contract with NFT Tokens
contract Metaverse is ERC721, Ownable {

    //Constructor
    constructor() ERC721("META", "mETAjpg"){

    }


    // Counters to regulate the number of NFT Tokens minted in our Metaverse
    using Counters for Counters.Counter;
    Counters.Counter private supply;

    //Total number of NFT available for creation
    uint256 public maxSupply = 100;

    // Cost to be paid for each NFT Token
    uint256 public cost = 1 ether;

    // Owner and its properties in the Metaverse
    mapping(address => Building[]) NFTOwners;

    //Metaverse buildings
    struct Building{
        string name;
        int8 width;
        int8 height;
        int8 depth;
        int8 posX;
        int8 posY;
        int8 posZ;
    }

    //List of buildings in our Metaverse
    Building[] public buildings;

    // Obtaining buildings made in Metaverse
    function getBuildings() public view returns (Building[] memory){
        return buildings;
    }

    //Current supply of NFT Tokens
    function totalSupply() public view returns(uint256){
        return supply.current();
    }

    // Creation of the Buildings as an NFT Token in the Metaverse
    function mint(string memory buildingName, int8 w, int8 h, int8 d, int8 x, int8 y, int8 z) public payable{
        require(supply.current() <= maxSupply, "Max Supply exceeded!");
        require(msg.value >= cost, "Insufficient Funds!");
        supply.increment();
        _safeMint(msg.sender, supply.current());
        Building memory newBuild = Building(buildingName, w, h, d, x, y, z);
        buildings.push(newBuild);
        NFTOwners[msg.sender].push(newBuild);
    }

    //Extraction of ethers from smart contract to the owner
    function withdraw() external payable onlyOwner {
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }

    //Obtain a user's Metaverse buildings
    function getOwnerBuildings() public view returns(Building [] memory){
        return NFTOwners[msg.sender];
    }
}
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.17 <8.10.0;

import "./DataShare.sol";
import "./Collectible.sol";
import "../client/node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";

contract StreamList is DataShare{
    using SafeMath for uint256;

    address owner;
    Collectible videoCollection;
    mapping(address => uint256) public user_funds;
    mapping(uint256 => mapping(address => bool)) public subscribers;
    mapping(address => uint256[]) public wishList;
    mapping(address => uint256[]) public myList;
    mapping(address => uint256[]) public playList;

    constructor(address collectible) {
        videoCollection = Collectible(collectible);
        owner = Collectible(collectible).owner();
    }

    function playVideo(uint256 _id) public payable {
        (, , uint256 price, , , , ) = videoCollection.videos(_id);
        (, , , , uint256 owner_fees, , ) = videoCollection.videos(_id);
        uint256 creator_fees = price.sub(owner_fees);
        (, , , address creator, , , ) = videoCollection.videos(_id);
        require(msg.value == price, "Error 1");
        require(
            !subscribers[_id][msg.sender] ||
                msg.sender == creator ||
                msg.sender == owner,
            "Error 2"
        );
        videoCollection.setSubscriber(_id, msg.sender);
        playList[msg.sender].push(_id);
        subscribers[_id][msg.sender] = true;
        user_funds[creator] += creator_fees;
        user_funds[owner] += owner_fees;
        payable(creator).transfer(creator_fees);
        payable(owner).transfer(owner_fees);
        videoCollection.setActivity(msg.sender, price, "Play Video");

    }

    function addToWishList(uint256 _id) public {
        wishList[msg.sender].push(_id);
        videoCollection.setActivity(msg.sender, _id, "Added to Wish list");
    }

    function addToMyList(uint256 _id) public {
        myList[msg.sender].push(_id);
        videoCollection.setActivity(msg.sender, _id, "Added to My List");

    }

    function getWishLists(address _address) public view returns(Video[] memory _list){
        uint256 length = wishList[_address].length;
        _list = new Video[](length);
        for (uint256 x = 0; x < length;  x++) {
            (uint256 _id, MetaData memory metData, uint256 _price, address _creator, uint256 _commission, bool approved, uint256 _time) = videoCollection.videos(wishList[_address][x]);
            _list[x]._id = _id;
            _list[x].metData = metData;
            _list[x]._price = _price;
            _list[x]._creator = _creator;
            _list[x]._commission = _commission;
            _list[x].approved = approved;
            _list[x]._time = _time;
        }
    }

    function getPlayList(address _address) public view returns(uint256[] memory _list){
        uint256 length = playList[_address].length;
        _list = new uint256[](length);
        for (uint256 i = 0; i < length; i++) {
            _list[i] = playList[_address][i];
        }
    }
}
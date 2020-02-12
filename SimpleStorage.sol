pragma solidity ^0.5.0;

contract SimpleStorage {

    string storedData;

    event Set(address from, string stored);

    function set(string memory x) public {
        storedData = x;
        emit Set(msg.sender,x);
    }

    function get() public view returns (string memory) {
        return storedData;
    }
}

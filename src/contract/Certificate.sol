// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Certification {
    address owner;
    address publisher;
    address[] admins;
    uint256[] idArray;

    struct Certificate {
        uint256 id;
        string hash;
        string name;
        string details;
        string issuedOn;
        string url;
        address[] accepted;
        address[] rejected;
    }

    mapping(uint256 => string) idToHash;
    mapping(string => Certificate) certificates;
    mapping(address => uint256[]) validations;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can execute this function");
        _;
    }

    modifier onlyPublisher() {
        require(
            msg.sender == publisher,
            "Only Publisher can execute this function"
        );
        _;
    }

    function addAdmin(address admin) public onlyOwner {
        bool flag = false;
        for(uint8 i = 0; i < admins.length; i++) {
            if(admin == admins[i]) {
                flag = true;
                break;
            }
        }

        if(!flag) {
            admins.push(admin);
        }
    }

    function removeAdmin(address admin) public onlyOwner {
        for (uint8 i = 0; i < admins.length; i++) {
            if (admins[i] == admin) {
                admins[i] = admins[admins.length - 1];
                admins.pop();
                break;
            }
        }
    }

    function addPublisher(address publisherAddress) public onlyOwner {
        publisher = publisherAddress;
    }

    function isAdmin(address user) private view returns (bool) {
        for (uint256 i = 0; i < admins.length; i++) {
            if (admins[i] == user) {
                return true;
            }
        }
        return false;
    }

    function addCertificate(
        uint256 _id,
        string memory _hash,
        string memory _name,
        string memory _details,
        string memory _issuedOn,
        string memory _url
    ) public onlyPublisher {
        bytes memory emptyIdCheck = bytes(idToHash[_id]);
        require(emptyIdCheck.length == 0, "Certificate already exists");

        idToHash[_id] = _hash;
        address[] memory _accepted;
        address[] memory _rejected;

        certificates[_hash] = Certificate(
            _id,
            _hash,
            _name,
            _details,
            _issuedOn,
            _url,
            _accepted,
            _rejected
        );
        idArray.push(_id);
    }

    function accept(uint256 _id) public {
        require(isAdmin(msg.sender), "Only admins can execute this function");

        Certificate storage certificate = certificates[idToHash[_id]];
        bool flag = false;

        for (uint256 i = 0; i < certificate.accepted.length; i++) {
            if (msg.sender == certificate.accepted[i]) {
                flag = true;
                break;
            }
        }

        if (flag == false) {
            certificate.accepted.push(msg.sender);
            validations[msg.sender].push(_id);
        }
    }

    function reject(uint256 _id) public {
        require(isAdmin(msg.sender), "Only admins can execute this function");

        Certificate storage certificate = certificates[idToHash[_id]];
        bool flag = false;

        for (uint256 i = 0; i < certificate.rejected.length; i++) {
            if (msg.sender == certificate.rejected[i]) {
                flag = true;
                break;
            }
        }

        if (flag == false) {
            certificate.rejected.push(msg.sender);
            validations[msg.sender].push(_id);
        }
    }

    function searchById(uint256 _id)
        public
        view
        returns (
            uint256,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            uint256,
            uint256,
            uint256
        )
    {
        Certificate storage certificate = certificates[idToHash[_id]];
        return (
            certificate.id,
            certificate.hash,
            certificate.name,
            certificate.details,
            certificate.issuedOn,
            certificate.url,
            certificate.accepted.length,
            certificate.rejected.length,
            admins.length
        );
    }

    function searchByHash(string memory _hash)
        public
        view
        returns (
            uint256,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            uint256,
            uint256,
            uint256
        )
    {
        Certificate storage certificate = certificates[_hash];
        return (
            certificate.id,
            certificate.hash,
            certificate.name,
            certificate.details,
            certificate.issuedOn,
            certificate.url,
            certificate.accepted.length,
            certificate.rejected.length,
            admins.length
        );
    }

    function checkValidations(uint256 _id) private view returns (bool) {
        for (uint256 i = 0; i < validations[msg.sender].length; i++) {
            if (_id == validations[msg.sender][i]) {
                return true;
            }
        }

        return false;
    }

    function getNonValidatedCertificates()
        public
        view
        returns (uint256[] memory)
    {
        require(isAdmin(msg.sender), "Only admins can execute this function");

        uint256[] memory nonValidatedCertificates = new uint256[](
            idArray.length
        );
        uint256 index = 0;

        for (uint256 i = 0; i < idArray.length; i++) {
            if (checkValidations(idArray[i]) == false) {
                nonValidatedCertificates[index] = idArray[i];
                index++;
            }
        }

        return nonValidatedCertificates;
    }
}

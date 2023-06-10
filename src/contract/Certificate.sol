// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Certification {
    address owner; //owner - 1, publisher - 2, admins - 3, else - 0
    address publisher;
    address[] admins;
    string[] idArray;

    struct Certificate {
        string id;
        string hash;
        string name;
        string details;
        uint256 issuedOn;
        string url;
        address[] accepted;
        address[] rejected;
    }

    mapping(string => string) idToHash;
    mapping(string => Certificate) certificates;
    mapping(address => string[]) validations;

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
        for (uint8 i = 0; i < admins.length; i++) {
            if (admin == admins[i]) {
                flag = true;
                break;
            }
        }

        if (!flag) {
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
        string memory _id,
        string memory _hash,
        string memory _name,
        string memory _details,
        uint256 _issuedOn,
        string memory _url
    ) public onlyPublisher {
        bytes memory emptyIdCheck = bytes(idToHash[_id]);
        bytes memory emptyHashCheck = bytes(certificates[_hash].hash);

        require(emptyIdCheck.length == 0, "Certificate already exists");
        require(emptyHashCheck.length == 0, "Certificate already exists");

        idToHash[_id] = _hash;
        address[] memory addr_array;

        certificates[_hash] = Certificate(
            _id,
            _hash,
            _name,
            _details,
            _issuedOn,
            _url,
            addr_array,
            addr_array
        );
        idArray.push(_id);
    }

    function accept(string memory _id) public {
        require(isAdmin(msg.sender), "Only admins can execute this function");

        Certificate storage certificate = certificates[idToHash[_id]];
        bool flag = false;

        for (uint256 i = 0; i < validations[msg.sender].length; i++) {
            if (compare(validations[msg.sender][i], _id)) {
                flag = true;
                break;
            }
        }

        if (flag == false) {
            certificate.accepted.push(msg.sender);
            validations[msg.sender].push(_id);
        }
    }

    function reject(string memory _id) public {
        require(isAdmin(msg.sender), "Only admins can execute this function");

        Certificate storage certificate = certificates[idToHash[_id]];
        bool flag = false;

        for (uint256 i = 0; i < validations[msg.sender].length; i++) {
            if (compare(validations[msg.sender][i], _id)) {
                flag = true;
                break;
            }
        }

        if (flag == false) {
            certificate.rejected.push(msg.sender);
            validations[msg.sender].push(_id);
        }
    }

    function searchById(string memory _id)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            uint256,
            string memory,
            uint256
        )
    {
        Certificate storage certificate = certificates[idToHash[_id]];
        uint256 status = 0; // 1 - accepted, 2 - rejected, 3 - under verification
        if (certificate.accepted.length >= (admins.length / 2) + 1) {
            status = 1;
        } else if (certificate.rejected.length >= (admins.length / 2) + 1) {
            status = 2;
        } else {
            status = 3;
        }
        return (
            certificate.id,
            certificate.hash,
            certificate.name,
            certificate.details,
            certificate.issuedOn,
            certificate.url,
            status
        );
    }

    function searchByHash(string memory _hash)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            uint256,
            string memory,
            uint256
        )
    {
        Certificate storage certificate = certificates[_hash];
        uint256 status = 0; // 1 - accepted, 2 - rejected, 3 - under verification
        if (certificate.accepted.length >= (admins.length / 2) + 1) {
            status = 1;
        } else if (certificate.rejected.length >= (admins.length / 2) + 1) {
            status = 2;
        } else {
            status = 3;
        }
        return (
            certificate.id,
            certificate.hash,
            certificate.name,
            certificate.details,
            certificate.issuedOn,
            certificate.url,
            status
        );
    }

    function compare(string memory str1, string memory str2)
        private
        pure
        returns (bool)
    {
        if (bytes(str1).length != bytes(str2).length) {
            return false;
        }
        return
            keccak256(abi.encodePacked(str1)) ==
            keccak256(abi.encodePacked(str2));
    }

    function checkValidations(string memory _id) private view returns (bool) {
        for (uint256 i = 0; i < validations[msg.sender].length; i++) {
            string memory value = validations[msg.sender][i];
            if (compare(_id, value) == true) {
                return true;
            }
        }

        return false;
    }

    function getNonValidatedCertificates()
        public
        view
        returns (string[] memory)
    {
        require(isAdmin(msg.sender), "Only admins can execute this function");

        string[] memory nonValidatedCertificates = new string[](idArray.length);
        uint256 index = 0;

        for (uint256 i = 0; i < idArray.length; i++) {
            if (checkValidations(idArray[i]) == false) {
                nonValidatedCertificates[index] = idArray[i];
                index++;
            }
        }

        return nonValidatedCertificates;
    }

    function removeFromValidation(string memory _id, address admin) private {
        for (uint256 i = 0; i < validations[admin].length; i++) {
            if (compare(validations[admin][i], _id)) {
                validations[admin][i] = validations[admin][
                    validations[admin].length - 1
                ];
                validations[admin].pop();
                return;
            }
        }
    }

    function edit(
        string memory _id,
        string memory _name,
        string memory _details
    ) public onlyPublisher {
        bytes memory emptyIdCheck = bytes(idToHash[_id]);
        require(
            emptyIdCheck.length > 0,
            "Certificate does not exists with this id"
        );

        bytes memory name_bytes = bytes(_name);
        bytes memory details_bytes = bytes(_details);

        Certificate storage certificate = certificates[idToHash[_id]];
        if (name_bytes.length > 0) {
            certificate.name = _name;
        }

        if (details_bytes.length > 0) {
            certificate.details = _details;
        }

        address[] memory addr_array;

        certificate.accepted = addr_array;
        certificate.rejected = addr_array;

        removeFromValidation(_id, admins[0]);
        removeFromValidation(_id, admins[1]);
        removeFromValidation(_id, admins[2]);
    }

    function login() public view returns (uint256) {
        if (msg.sender == owner) {
            return 1;
        } else if (msg.sender == publisher) {
            return 2;
        } else if (isAdmin(msg.sender)) {
            return 3;
        } else {
            return 0;
        }
    }
}

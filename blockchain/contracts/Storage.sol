// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Storage {
    uint256 private fileCounter;

    struct FileData {
        uint256 id;
        string fileName;
        string ipfsHash;
        address owner;
        uint256 timestamp;
    }

    struct StorageStats {
        uint256 totalFiles;
        uint256 myFiles;
    }

    mapping(uint256 => FileData) private files;

    mapping(address => uint256[]) private userFiles;

    mapping(uint256 => mapping(address => bool)) private accessControl;

    mapping(address => uint256[]) private sharedFiles;

    mapping(uint256 => address[]) private sharedUsers;

    event FileUploaded(
        uint256 indexed fileId,
        string fileName,
        string ipfsHash,
        address indexed owner,
        uint256 timestamp
    );

    event AccessGranted(uint256 indexed fileId, address indexed user);

    event AccessRevoked(uint256 indexed fileId, address indexed user);

    modifier fileExists(uint256 fileId) {
        require(fileId > 0 && fileId <= fileCounter, "File does not exist");
        _;
    }

    modifier onlyOwner(uint256 fileId) {
        require(files[fileId].owner == msg.sender, "Not file owner");
        _;
    }

    function uploadFile(
        string memory _fileName,
        string memory _ipfsHash
    ) public {
        require(bytes(_fileName).length > 0, "File name required");

        require(bytes(_ipfsHash).length > 0, "IPFS hash required");

        fileCounter++;

        files[fileCounter] = FileData(
            fileCounter,
            _fileName,
            _ipfsHash,
            msg.sender,
            block.timestamp
        );

        userFiles[msg.sender].push(fileCounter);

        accessControl[fileCounter][msg.sender] = true;

        emit FileUploaded(
            fileCounter,
            _fileName,
            _ipfsHash,
            msg.sender,
            block.timestamp
        );
    }

    function getMyFiles() public view returns (FileData[] memory) {
        uint256[] memory fileIds = userFiles[msg.sender];

        FileData[] memory result = new FileData[](fileIds.length);

        for (uint256 i = 0; i < fileIds.length; i++) {
            result[i] = files[fileIds[i]];
        }

        return result;
    }

    function getFile(
        uint256 _fileId
    ) public view fileExists(_fileId) returns (FileData memory) {
        require(accessControl[_fileId][msg.sender], "Access denied");

        return files[_fileId];
    }

    function shareAccess(
        uint256 _fileId,
        address _user
    ) public fileExists(_fileId) onlyOwner(_fileId) {
        require(_user != address(0), "Invalid address");

        require(_user != msg.sender, "Cannot share with yourself");

        require(!accessControl[_fileId][_user], "User already has access");

        accessControl[_fileId][_user] = true;

        sharedFiles[_user].push(_fileId);

        sharedUsers[_fileId].push(_user);

        emit AccessGranted(_fileId, _user);
    }

    function revokeAccess(
        uint256 _fileId,
        address _user
    ) public fileExists(_fileId) onlyOwner(_fileId) {
        require(_user != msg.sender, "Owner access cannot be revoked");

        require(accessControl[_fileId][_user], "User does not have access");

        accessControl[_fileId][_user] = false;

        uint256[] storage userSharedFiles = sharedFiles[_user];

        for (uint256 i = 0; i < userSharedFiles.length; i++) {
            if (userSharedFiles[i] == _fileId) {
                userSharedFiles[i] = userSharedFiles[
                    userSharedFiles.length - 1
                ];
                userSharedFiles.pop();
                break;
            }
        }

        address[] storage users = sharedUsers[_fileId];

        for (uint256 i = 0; i < users.length; i++) {
            if (users[i] == _user) {
                users[i] = users[users.length - 1];
                users.pop();
                break;
            }
        }

        emit AccessRevoked(_fileId, _user);
    }

    function verifyAccess(
        uint256 _fileId,
        address _user
    ) public view fileExists(_fileId) returns (bool) {
        return accessControl[_fileId][_user];
    }

    function getTotalFiles() public view returns (uint256) {
        return fileCounter;
    }

    function getSharedFiles() public view returns (FileData[] memory) {
        uint256[] memory fileIds = sharedFiles[msg.sender];

        FileData[] memory result = new FileData[](fileIds.length);

        for (uint256 i = 0; i < fileIds.length; i++) {
            result[i] = files[fileIds[i]];
        }

        return result;
    }

    function getSharedUsers(
        uint256 _fileId
    )
        public
        view
        fileExists(_fileId)
        onlyOwner(_fileId)
        returns (address[] memory)
    {
        return sharedUsers[_fileId];
    }

    function getStorageStats() public view returns (StorageStats memory) {
        return StorageStats(fileCounter, userFiles[msg.sender].length);
    }

    function version() public pure returns (string memory) {
        return "1.0.0";
    }
}

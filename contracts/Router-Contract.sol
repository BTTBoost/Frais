// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Router {
    struct Module {
        string name;
        string description;
        string materialsHash;
        string questionsHash;
    }

    struct Request {
        string name;
        string description;
        address author;
        bool confirmed;
        uint256 tokens;
        uint256 approvers;
        uint256 baseVersion;
    }

    uint256 public index;
    uint256 public requestIndex;
    uint256 public numOfMaintainers;

    mapping(uint256 => address) tokenHolders;
    uint256 tokenHoldersCounter;

    Request[] public listOfRequests;
    Module[] public modulesToPush;
    Module[] public currentModules;
    mapping(uint256 => Module[]) public requestModules;
    mapping(uint256 => Module[]) public moduleVersions;
    mapping(uint256 => mapping(address => bool)) public maintainerVotes;

    function pushModules(
        //takes in arrays of module detailes, pushes them onto an array and stores that array in version controlled modules mapping.
        string[] memory _name,
        string[] memory _description,
        string[] memory _mHash,
        string[] memory _qHash
    ) internal {
        for (uint256 i = 0; i < _name.length; i++) {
            Module memory newModule = Module({
                name: _name[i],
                description: _description[i],
                materialsHash: _mHash[i],
                questionsHash: _qHash[i]
            });
            modulesToPush.push(newModule);
        }
        moduleVersions[index] = modulesToPush;
        delete (modulesToPush);
        index++;
    }

    function returnModules(uint256 _version)
        external
        view
        returns (
            //returns all of the modules stored in version controlled modules mapping at _version
            //returns as an array of names, descs,materials,and questions.
            string[] memory _name,
            string[] memory _desc,
            string[] memory _materials,
            string[] memory questions
        )
    {
        Module[] memory modulesToReturn = moduleVersions[_version];

        uint256 length = modulesToReturn.length;

        string[] memory names = new string[](length);
        string[] memory descriptions = new string[](length);
        string[] memory mHashes = new string[](length);
        string[] memory qHashes = new string[](length);

        for (uint256 i = 0; i < length; i++) {
            Module memory module = modulesToReturn[i];
            names[i] = module.name;
            descriptions[i] = module.description;
            mHashes[i] = module.materialsHash;
            qHashes[i] = module.questionsHash;
        }
        return (names, descriptions, mHashes, qHashes);
    }

    function createRequest(
        //creates a request with all of the modules, including past modules, edited modules and new modules.
        //array of modules are stored at request index in request modules mappings.
        string memory _nameReq,
        string memory _descriptionReq,
        uint256 _tokens,
        string[] memory _moduleNames,
        string[] memory _moduleDescriptions,
        string[] memory _materialsHash,
        string[] memory _questionsHash,
        uint256 _baseVersion
    ) external {
        Request memory newRequest = Request({
            name: _nameReq,
            description: _descriptionReq,
            author: msg.sender,
            confirmed: false,
            tokens: _tokens,
            approvers: 0,
            baseVersion: _baseVersion
        });

        listOfRequests.push(newRequest);

        for (uint256 i = 0; i < _moduleNames.length; i++) {
            Module memory newModule = Module({
                name: _moduleNames[i],
                description: _moduleDescriptions[i],
                materialsHash: _materialsHash[i],
                questionsHash: _questionsHash[i]
            });
            modulesToPush.push(newModule);
        }
        requestModules[requestIndex] = modulesToPush;
        delete (modulesToPush);
        requestIndex++;
    }

    function voteRequest(uint256 ID)
        external
        returns (address _author, uint256 _tokens)
    {
        require(maintainerVotes[ID][msg.sender] != true);
        maintainerVotes[ID][msg.sender] = true;
        Request storage request = listOfRequests[ID];
        request.approvers++;
        if (request.approvers >= numOfMaintainers) {
            return (approveRequest(ID));
        }
    }

    function approveRequest(uint256 ID) internal returns (address, uint256) {
        //Approves a request at index ID in list of requests array,
        //changes the approver address and confirmed boolean,
        //pushes all the new modules stored in request module mapping, into current modules array mapping.

        Request storage request = listOfRequests[ID];
        require(request.confirmed != true);
        request.confirmed = true;

        Module[] memory modules = requestModules[ID];

        uint256 length = modules.length;

        string[] memory names = new string[](length);
        string[] memory descriptions = new string[](length);
        string[] memory materialHashes = new string[](length);
        string[] memory questionHashes = new string[](length);

        for (uint256 i = 0; i < length; i++) {
            Module memory module = modules[i];
            names[i] = module.name;
            descriptions[i] = module.description;
            materialHashes[i] = module.materialsHash;
            questionHashes[i] = module.questionsHash;
        }

        pushModules(names, descriptions, materialHashes, questionHashes);
        tokenHolders[tokenHoldersCounter] = request.author;
        tokenHoldersCounter++;
        return (request.author, request.tokens);
    }
}

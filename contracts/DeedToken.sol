pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC721/IERC721Full.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract DeedToken is IERC721Full {
    
    using SafeMath for uint256;
    using Address for address;

    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    address payable public owner;
    mapping(bytes4 => bool) supportedInterfaces;
    
    mapping(uint256 => address) tokenOwners;
    mapping(address => uint256) balances;
    mapping(uint256 => address) allowance;
    // delegation available? middleman specified required
    mapping(address => mapping(address => bool)) operators;

    mapping(uint256 => string) tokenURIs;

    struct asset {
        uint8 x; // face
        uint8 y; // eyes
        uint8 z; // mouth
    }

    asset[] public allTokens;
    
    // enumeration
    // index to tokenId
    uint256[] public allValidTokenIds;
    // tokenId to Index
    mapping(uint256 => uint256) private allValidTokenIndex;

    constructor() public {

        owner = msg.sender;
        supportedInterfaces[0x01ffc9a7] = true; //ERC165
        supportedInterfaces[0x80ac58cd] = true; //ERC721
        supportedInterfaces[0x5b5e139f] = true; //ERC721Metadata
    }

    function supportsInterface(bytes4 interfaceID) external view returns (bool) {
        return supportedInterfaces[interfaceID];
    }

    function balanceOf(address _owner) public view returns (uint256) {
        return balances[_owner];
    }

    function ownerOf(uint256 _tokenId) public view returns (address) {
        address addr_owner = tokenOwners[_tokenId];
        require(addr_owner != address(0), "Token is not available to use for some reasons.");
        return addr_owner;
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) public {
        address addr_owner = tokenOwners[_tokenId];
        require(addr_owner == _from, "_from is not the owner of the token");
        require(_to != address(0), "_to is invalid address 0x0!");
        address addr_allowed = allowance[_tokenId];
        bool isOp = operators[addr_owner][msg.sender];
        require(addr_owner == msg.sender || addr_allowed == msg.sender || isOp, "not allowed");

        tokenOwners[_tokenId] = _to;
        balances[_from] = balances[_from].sub(1);
        balances[_to] = balances[_to].add(1);

        // reset approved address
        if (allowance[_tokenId] != address(0)) {
            delete allowance[_tokenId];
        }

        emit Transfer(_from, _to, _tokenId);
    }

    function _checkOnERC721Received(address from, address to, uint256 tokenId, bytes memory _data)
            private returns (bool)
        {
            if (!to.isContract()) {
                return true;
            }
            (bool success, bytes memory returndata) = to.call(abi.encodeWithSelector(
                IERC721Receiver(to).onERC721Received.selector,
                msg.sender,
                from,
                tokenId,
                _data
            ));
            if (!success) {
                revert("ERC721: transfer to non ERC721Receiver implementer");
            }
            bytes4 retval = abi.decode(returndata, (bytes4));
            return (retval == _ERC721_RECEIVED);
        }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes memory _data) public {
        require(_checkOnERC721Received(_from, _to, _tokenId, _data), "ERC721 not receivable contract");
        transferFrom(_from, _to, _tokenId);
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId) public {
        safeTransferFrom(_from, _to, _tokenId, "");
    }

    function approve(address _approved, uint256 _tokenId) public {
        address addr_owner = ownerOf(_tokenId);
        bool isOp = operators[addr_owner][msg.sender];
        require(addr_owner == msg.sender || isOp, "not approved by owner");

        allowance[_tokenId] = _approved;

        emit Approval(addr_owner, _approved, _tokenId);
    }

    function setApprovalForAll(address _operator, bool _approved) public {
        operators[msg.sender][_operator] = _approved;
        emit ApprovalForAll(msg.sender, _operator, _approved);
    }

    function isApprovedForAll(address _owner, address _operator) public view returns (bool) {
        return operators[_owner][_operator];
    }

    // non-ERC721 standard
    function mint(uint8 _x, uint8 _y, uint8 _z) external payable {
        
        asset memory newAsset = asset(_x, _y, _z);
        uint tokenId = allTokens.push(newAsset) - 1;
        tokenOwners[tokenId] = msg.sender;
        balances[msg.sender] = balances[msg.sender].add(1);

        // allValidTokenIds is yet to update, thus able to use as new index w/o decrement by 1
        // Index to Token
        allValidTokenIndex[tokenId] = allValidTokenIds.length;
        allValidTokenIds.push(tokenId);

        // newly minted, thus specify to is null address(0)
        emit Transfer(address(0), msg.sender, tokenId);
    }

    function burn(uint256 _tokenId) external {
        address addr_owner = ownerOf(_tokenId);
        require(addr_owner == msg.sender, "msg.sender is not the owner of the token");
        
        // nullify delegates to the tokens
        if (allowance[_tokenId] != address(0)) {
            delete allowance[_tokenId];
        }

        tokenOwners[_tokenId] = address(0);
        balances[msg.sender] = balances[msg.sender].sub(1);

        // re-indexing
        removeInvalidToken(_tokenId);

        emit Transfer(addr_owner, address(0), _tokenId);
    }

    function removeInvalidToken(uint256 _tokenId) private {
        uint256 lastIndex = allValidTokenIds.length.sub(1);
        uint256 lastTokenId = allValidTokenIds[lastIndex];
        uint256 removeIndex = allValidTokenIndex[_tokenId];

        // swap -> move last one to removable one
        allValidTokenIds[removeIndex] = lastTokenId;
        allValidTokenIndex[lastTokenId] = removeIndex;

        allValidTokenIds.length = allValidTokenIds.length.sub(1);
        allValidTokenIndex[_tokenId] = 0; // no meaning
    }

    // ERC721 Enumerable
    function totalSupply() public view returns (uint) {
        return allValidTokenIds.length;
    }

    function tokenByIndex(uint256 index) public view returns (uint) {
        require(index < totalSupply());
        return allValidTokenIds[index];
    }

    // ERC721 Metadata
    function name() external view returns (string memory) {
        return "EMOJI TOKEN";
    }

    function symbol() external view returns (string memory) {
        return "EMJ";
    }

    function tokenURI(uint256 tokenId) external view returns (string memory) {
        return "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.cnet.com%2Fnews%2Fthe-shiba-inu-dog-behind-the-doge-meme-turns-16%2F&psig=AOvVaw1r9YGOypdtGTky4NFVsVI-&ust=1643788109651000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCIC78YWC3vUCFQAAAAAdAAAAABAD";
    }

}

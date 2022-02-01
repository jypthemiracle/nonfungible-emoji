pragma solidity ^0.5.0;

import "../installed_contracts/oraclizeAPI_0.5.sol";

contract UrlRequest is usingOraclize {
    
    string public title;
    event LogNewProvableQuery(string description);
    event LogResult(string result);

    constructor() public {
        // provable_setProof(proofType_Android | proofStorage_IPFS);
        OAR = OraclizeAddrResolverI(0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475);
    }

    function __callback(bytes32 _myid, string memory _result) public {
        require (msg.sender == oraclize_cbAddress());
        emit LogResult(_result);
        title = _result;
    }

    function request() public payable returns (string memory) {
        // if (oraclize_getPrice("URL") > address(this).balance) {
        //     emit LogNewProvableQuery("Provable query has not sent.. show me more ETH..");
        //     return;
        // }
        emit LogNewProvableQuery("Provable query was sent, standing by for the answer...");
        oraclize_query("URL", "xml(http://rss.cnn.com/rss/cnn_topstories.rss).rss.channel.item.0.title");
        return title;
    }
}
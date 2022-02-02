import Web3 from "web3";
import DeedToken from "./contracts/DeedToken.json";

const options = {
  web3: {
    block: false,
    // customProvider: new Web3("ws://ethereum-ropsten-rpc.allthatnode.com/" + process.env.DSRV_API_KEY),
    fallback: {
      type: "ws",
      url: "ws://ethereum-ropsten-rpc.allthatnode.com/" + process.env.DSRV_API_KEY
    }
  },
  contracts: [DeedToken],
  events: {
    DeedToken: ["Transfer", "Approval", "ApprovalForAll", "Log"]
  },
  polls: {
    accounts: 1500
  }
};

export default options;

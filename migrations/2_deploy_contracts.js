// https://ethereum.stackexchange.com/questions/20750/error-calling-a-function-from-another-contract-member-not-found-or-not-visi

const SimpleStorage = artifacts.require("SimpleStorage");
const TutorialToken = artifacts.require("TutorialToken");
const ComplexStorage = artifacts.require("ComplexStorage");
const deedToken = artifacts.require("DeedToken");
const urlRequest = artifacts.require("UrlRequest")

module.exports = async (deployer) => {
  // deployer.deploy(SimpleStorage);
  // deployer.deploy(TutorialToken);
  // deployer.deploy(ComplexStorage)
  await deployer.deploy(urlRequest);
  // https://stackoverflow.com/questions/49785667/truffle-migrate-success-but-contract-address-is-not-displayed
  // You need to return the the deployed contract from the Promise to have the contract object be injected by Truffle.
  return deployer.deploy(deedToken, urlRequest.address);
};

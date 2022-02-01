const deedToken = artifacts.require('DeedToken');

contract("DeedToken", (accounts) => {
    const zeroAddr = '0x0000000000000000000000000000000000000000';

    it("should have NFT symbol", async() => {
        const instance = await deedToken.deployed();
        const symbol = await instance.symbol();
        assert.equal(symbol, "EMJ", "symbol is not the same!");
    })
})
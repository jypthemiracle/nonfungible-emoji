const deedToken = artifacts.require('DeedToken');

contract("DeedToken", (accounts) => {
    const zeroAddr = '0x0000000000000000000000000000000000000000';

    it("should have NFT symbol", async() => {
        const instance = await deedToken.deployed();
        const symbol = await instance.symbol();
        assert.equal(symbol, "EMJ", "symbol is not the same!");
    })

    it('correctly checks all the supported interfaces', async() => {
        const instance = await deedToken.deployed();
        const bERC721 = await instance.supportsInterface('0x80ac58cd');
        assert.equal(bERC721, true, "does not support ERC721 standard.");
    })

    it('correctly mints a NFT', async() => {
        const instance = await deedToken.deployed();
        const tx = await instance.mint(1, 1, 1);

        const eventName = tx.receipt.logs[0].event;
        const tokenId = tx.receipt.logs[0].args.tokenId.negative;

        assert.equal(eventName, "Transfer", "does not emit proper event");
        assert.equal(tokenId, 0, "Token ID is wrong. It should start from 0");
    })

    it('correctly mints many NFTs', async() => {
        const instance = await deedToken.deployed();
        for (let i = 1; i < 10; i++) {
            await instance.mint(1, 1, i);
        }
        const totalSupply = await instance.totalSupply();
        assert.equal(totalSupply, 10, "total supply of NFT is wrong");
    })

    it('returns correct balance', async() => {
        const instance = await deedToken.deployed();
        const balance = await instance.balanceOf(accounts[0]);
        assert.equal(balance.toNumber(), 10, "wrong balance");
    })

    it('returns correct owner', async() => {
        const instance = await deedToken.deployed();
        const owner = await instance.ownerOf(0);
        assert.equal(owner, accounts[0], "Owner of the NFT is wrong.");
    })

    it("throws when trying to transfer token to address 0x0", async() => {
        const instance = await deedToken.deployed();
        try {
            await instance.transferFrom(
                accounts[0],
                zeroAddr,
                0
            );
        } catch (e) {
            var err = e;
        }
        assert.isOk(err instanceof Error, "Address 0x0 takes the token");
    })

    it("Total supply of valid NFTs", async() => {
        const instance = await deedToken.deployed();
        await instance.burn(5);
        const totalSupply = await instance.totalSupply();
        assert.equal(totalSupply, 9, "Total supply of NFT is wrong.");
    })

    it("should have last token at index 5", async() => {
        const instance = await deedToken.deployed();
        const lastTokenId = 9;
        const tokenId = await instance.tokenByIndex(5);
        assert.equal(tokenId.toNumber(), lastTokenId, "Last token wrong index");
    })

    // it("correctly gets the price of ETHUSD", async() => {
    //     const instance = await deedToken.deployed();
    //     assert.equal()
    // })
})
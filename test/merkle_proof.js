const MerkleProof = artifacts.require('MerkleProof')
const MerkleTree = require('merkletreejs')
const keccak256 = require('keccak256')

async function main() {
    const contract = await MerkleProof.new()

    const leaves = ['a', 'b', 'c', 'd'].map(v => keccak256(v))
    const tree = new MerkleTree(leaves, keccak256, { sort: true })
    const root = tree.getHexRoot()
    const leaf = keccak256('a')
    const proof = tree.getHexProof(leaf)
    console.log(await contract.verify.call(root, leaf, proof)) // true

    const badLeaves = ['a', 'b', 'x', 'd'].map(v => keccak256(v))
    const badTree = new MerkleTree(badLeaves, keccak256, { sort: true })
    const badProof = badTree.getHexProof(leaf)
    console.log(await contract.verify.call(root, leaf, badProof)) // false
}

main();
const Token = artifacts.require("MyToken");
const TokenSale = artifacts.require("MyTokenSale");

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("TokenSale", async (accounts) => {
const [deployerAccount, recipient, anotherAccount ] = accounts;

it("there shouldnt be any coins in my account", async () => {
    let instance = await Token.deployed();
    return expect(instance.balanceOf.call(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    });

it("all Token should be in the Token Sale Smart Contract by default", async () => {
    let instance = await Token.deployed();
    let balanceOfTokenSaleSmartContract = await instance.balanceOf(TokenSale.address);
    let totalSupply = await instance.totalSupply();
    return expect(balanceOfTokenSaleSmartContract).to.be.a.bignumber.equal(totalSupply);
});

it("should be possible to buy token", async () => {
    let tokenInstance = await Token.deployed();
    let tokenSaleInstance = await TokenSale.deployed();
    let balanceBefore = await tokenInstance.balanceOf(deployerAccount);
    expect(tokenSaleInstance.sendTransaction({from: deployerAccount, value: web3.utils.toWei("1", "wei") })).to.be.fulfilled;
    expect(tokenInstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceBefore.add(new BN(1)));
})
});
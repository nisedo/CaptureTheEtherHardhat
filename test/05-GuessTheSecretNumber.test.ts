import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { Contract } from 'ethers';
import { ethers } from 'hardhat';
const { utils } = ethers;

describe('GuessTheSecretNumberChallenge', () => {
  let target: Contract;
  let deployer: SignerWithAddress;
  let attacker: SignerWithAddress;

  before(async () => {
    [attacker, deployer] = await ethers.getSigners();

    target = await (
      await ethers.getContractFactory('GuessTheSecretNumberChallenge', deployer)
    ).deploy({
      value: utils.parseEther('1'),
    });

    await target.deployed();

    target = target.connect(attacker);
  });

  it('exploit', async () => {
    /**
     * YOUR CODE HERE
     * */
    
    // Call the guess function with the number 170 and send 1 ether
    
    let answerHash = "0xdb81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365";

    function testNumbers() {
      for (let i = 0; i <= 256; i++) {
        let tempHash = ethers.utils.keccak256(ethers.utils.arrayify(i));
        if (tempHash === answerHash) {
          console.log(`Found match: ${i}`);
          return i;
        }
      }
    }
    
    let hash = testNumbers();
    await target.guess(hash, { value: utils.parseEther('1') });

    expect(await target.isComplete()).to.equal(true);
  });
});

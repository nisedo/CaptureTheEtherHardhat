import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { Contract } from 'ethers';
import { ethers } from 'hardhat';
import { utils } from 'ethers';

describe('DeployAContract', () => {
  let deployer: SignerWithAddress;
  let attacker: SignerWithAddress;
  let captureTheEther: Contract;
  let target: Contract;

  before(async () => {
    [attacker, deployer] = await ethers.getSigners();

    captureTheEther = await (
      await ethers.getContractFactory('CaptureTheEther', attacker)
    ).deploy(attacker.address);

    await captureTheEther.deployed();

    target = await (
      await ethers.getContractFactory('NicknameChallenge')
    ).attach(await captureTheEther.playerNicknameContract(attacker.address));

    target = target.connect(attacker);
  });

  it('exploit', async () => {
    /**
     * YOUR CODE HERE
     * */
    // await target.CaptureTheEther(attacker);
    const inBytes = utils.formatBytes32String("nisedo");
    await captureTheEther.setNickname(inBytes);

    expect(await target.isComplete()).to.equal(true);
  });
});

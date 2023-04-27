/* -----------------------------------------------------------------------------------------
    THSI FILE CONTAINS THE CONTRACTS DEPLOYMENT CONFIGS. CHANGE ONLY WHAT WE OUTLINE
----------------------------------------------------------------------------------------- */

'use strict';
const Collectible = artifacts.require('Collectible');
const StreamList = artifacts.require('StreamList');

module.exports = async function (deployer) {
    const name = 'Video Streaming';
    const symbol = 'VST';

    /* OWNER FEES PERCENTAGE ON EVERY VIDEO SUBSCRIPTION - 10 IS 10% - CHANGE TO YOUR DESIREABLE PERCENTAGE */
    const comission = 10;

    /* THE DEPLOYER - DON'T CHANGE THIS */
    await deployer.deploy(Collectible, name, symbol, comission);
    const videoCollection = await Collectible.deployed();
    await deployer.deploy(StreamList, videoCollection.address);
};

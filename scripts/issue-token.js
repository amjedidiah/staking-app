const TokenFarm = artifacts.require("TokenFarm");

module.exports = async function(callback) {
  try {
    let tokenFarm = await TokenFarm.deployed();
    await tokenFarm.issueTokens();

    console.log("Tokens issued");
    
    callback();
  } catch (e) {
    callback(e);
  }
};

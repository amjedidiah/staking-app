import React, { Component } from "react";
import Web3 from "web3";
import DaiToken from "../abis/DaiToken.json";
import DappToken from "../abis/DappToken.json";
import TokenFarm from "../abis/TokenFarm.json";
import Navbar from "./Navbar";
import "./App.css";

class App extends Component {
  state = {
    account: "",
    daiToken: {},
    dappToken: {},
    tokenFarm: {},
    daiTokenBalance: "0",
    dappTokenBalance: "0",
    stakingBalance: "0",
    loading: true,
  };

  async loadWeb3() {

    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    // Non-dapp browsers...
    else {
      alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;

    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const networkId = await web3.eth.net.getId();

    // Load DaiToken
    const daiTokenData = DaiToken.networks[networkId];
    if (daiTokenData) {
      const daiToken = new web3.eth.Contract(
        DaiToken.abi,
        daiTokenData.address
      );
      this.setState({ daiToken });
      const daiTokenBalance = await daiToken.methods.balanceOf(accounts[0]).call();
      this.setState({ daiTokenBalance: daiTokenBalance+"" });
    } else {
      window.alert("DaiToken contract not deployed to detected network.");
    }

    // Load DappToken
    const dappTokenData = DappToken.networks[networkId];
    if (dappTokenData) {
      const dappToken = new web3.eth.Contract(
        DappToken.abi,
        dappTokenData.address
      );
      this.setState({ dappToken });
      const dappTokenBalance = await dappToken.methods.balanceOf(accounts[0]).call();
      this.setState({ dappTokenBalance: dappTokenBalance+"" });
    } else {
      window.alert("DaiToken contract not deployed to detected network.");
    }

    // Load TokenFarm
    const tokenFarmData = TokenFarm.networks[networkId];
    if(tokenFarmData) {
      const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address)
      this.setState({tokenFarm})
      let stakingBalance = await tokenFarm.methods.stakingBalance(accounts[0]).call();
      this.setState({stakingBalance: stakingBalance+""})
    } else {
      window.alert("TokenFarm contract not deployed to detected network.");
    }

    this.setState({loading: false})
  }

  componentDidMount() {
    this.loadWeb3();
    this.loadBlockchainData();
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main
              role="main"
              className="col-lg-12 ml-auto mr-auto"
              style={{ maxWidth: "600px" }}
            >
              <div className="content mr-auto ml-auto">
                <h1>Hello, World!</h1>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

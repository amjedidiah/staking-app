import React from "react";
import dai from "../dai.png";

export default function Main({
  stakingBalance,
  dappTokenBalance,
  daiTokenBalance,
  stakeTokens,
  unstakeTokens,
}) {
  const [amount, setAmount] = React.useState(0);

  const handleStake = (event) => {
    event.preventDefault();
    stakeTokens(window.web3.utils.toWei(amount + "", "Ether"));
  };

  const handleUnstake = (event) => {
    event.preventDefault();
    unstakeTokens(window.web3.utils.toWei(amount + "", "Ether"));
  };

  return (
    <div id="content" className="mt-3">
      <table className="table table-borderless text-muted text-center">
        <thead>
          <tr>
            <th scope="col">Staking Balance</th>
            <th scope="col">Reward Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{window.web3.utils.fromWei(stakingBalance, "Ether")} mDAI</td>
            <td>{window.web3.utils.fromWei(dappTokenBalance, "Ether")} DAPP</td>
          </tr>
        </tbody>
      </table>

      <div className="card mb-4">
        <div className="card-body">
          <form className="mb-3">
            <div>
              <label htmlFor="amount" className="float-left fw-bold">
                Stake Tokens
              </label>
              <span className="float-right text-muted">
                Balance: {window.web3.utils.fromWei(daiTokenBalance, "Ether")}
              </span>
            </div>

            <div className="input-group mb-4">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="0"
                onChange={(event) => {
                  setAmount(event.target.value);
                }}
                value={amount}
                required
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <img src={dai} height="32" alt="" />
                  &nbsp;&nbsp;&nbsp; mDAI
                </div>
              </div>
            </div>

            <button type="button" className="btn btn-primary btn-block btn-lg"  onClick={handleStake}>
              STAKE!
            </button>

            <button
              type="button"
              className="btn btn-link btn-block btn-sm"
              onClick={handleUnstake}
            >
              UN-STAKE...
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

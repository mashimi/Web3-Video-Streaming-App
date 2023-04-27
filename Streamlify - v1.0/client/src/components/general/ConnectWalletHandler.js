import React from 'react';
import Web3 from 'web3';
import { appSettings } from '../../helpers/settings';
import useWeb3 from '../../hooks/useWeb3';

function ConnectWalletHander({ customClass }) {
    const { loadAccount, networkId } = useWeb3();

    /* ------------------------------------------------ */
    //      CONNECT WALLET & LOAD ACCOUNT
    /* ------------------------------------------------ */
    const connectWalletHandler = async () => {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
            console.error(error);
        }
        loadAccount(new Web3(window.ethereum));
    };

    return (
        <>
            {window.ethereum && networkId === appSettings.networkId ? (
                <>
                    <button
                        type='button'
                        className={`btn btn-primary z-index-20 ${customClass}`}
                        onClick={connectWalletHandler}
                    >
                        Connect Wallet
                    </button>
                </>
            ) : (
                <a
                    href='https://metamask.io/download'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='btn btn-primary z-index-20 mb-2'
                >
                    Get MetaMask
                </a>
            )}
        </>
    );
}

export default ConnectWalletHander;

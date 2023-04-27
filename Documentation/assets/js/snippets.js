// HEADER SNIPPET
const headerSnippet = `
<pre> <code class="hljs js">
/* -------------------------------------------------------------------------------------------------------------------
    THSI FILE CONTAINS THE TRUFFLE CONFIGS FOR NETWORK DEPLOYMEN - CHANGE ONLY WHAT WE'VE OUTLINED
------------------------------------------------------------------------------------------------------------------- */

const path = require('path');
const HDWalletProvider = require('truffle-hdwallet-provider');

/* ADD YOUR METAMASK SECRET PASSPHRASE */
// const mnemonic = 'change this with MetaMask 12 secret passphrase';
const mnemonic = '';

module.exports = {
    contracts_build_directory: path.join(__dirname, 'client/src/contracts'),

    /* SUPPORTED NETWORKS BY OUR APP [BOTH MAINNET AND TESTNET] */
    networks: {
        /* LOCAL DEVELOPMENT NETWORK - REQUIRES GANACHE:
            - To deploy contracts on this network, run this command in the root directory:
                truffle migrate --reset
        */
        development: {
            host: '127.0.0.1',
            port: 7545,
            network_id: '*',
        },

        /* BINANCE SMART CHAING TEST NETWORK:
            - To deploy contracts on this network, run this command in the root directory:
                truffle migrate --network bsctest --reset
        */
        bsctest: {
            provider: () =>
                /* the following line config is
                    new HDWalletProvider(Metamask-secret-passphrase, RPC-URL, index-of-depolyer-account-in-Metamask, i.e. 0 means the first acoount)
                */
                new HDWalletProvider(mnemonic, 'https://data-seed-prebsc-2-s1.binance.org:8545', 0),
            network_id: 97,
            confirmations: 10,
            timeoutBlocks: 2000,
            skipDryRun: true,
            gas: 5500000,
            networkCheckTimeout: 999999,
        },

        /* MUMBAI TEST NETWORK FOR POLYGON:
            - To deploy contracts on this network, run this command in the root directory:
                truffle migrate --network bsctest --reset
        */
        mumbai: {
            provider: () =>
                /* the following line config is
                    new HDWalletProvider(Metamask-secret-passphrase, RPC-URL, index-of-depolyer-account-in-Metamask, i.e. 0 means the first acoount)
                */
                new HDWalletProvider(mnemonic, 'https://matic-mumbai.chainstacklabs.com', 0),
            network_id: 80001,
            confirmations: 10,
            timeoutBlocks: 2000,
            skipDryRun: true,
            gas: 5500000,
            networkCheckTimeout: 999999,
        },

        /* POLYGON MAINNET:
            - To deploy contracts on this network, run this command in the root directory:
                truffle migrate --network polygon --reset
        */
        polygon: {
            /* the following line config is
                    new HDWalletProvider(Metamask-secret-passphrase, RPC-URL, index-of-depolyer-account-in-Metamask, i.e. 0 means the first acoount)
                */
            provider: () => new HDWalletProvider(mnemonic, 'https://polygon-rpc.com'),
            network_id: 137,
            confirmations: 2,
            timeoutBlocks: 2000,
            skipDryRun: true,
        },

        /* BINANCE SMART CHAING MAINNET:
            - To deploy contracts on this network, run this command in the root directory:
                truffle migrate --network bsc --reset
        */
        bsc: {
            provider: () =>
                /* the following line config is
                    new HDWalletProvider(Metamask-secret-passphrase, RPC-URL, index-of-depolyer-account-in-Metamask, i.e. 0 means the first acoount)
                */
                new HDWalletProvider(mnemonic, 'https://bsc-dataseed1.binance.org'),
            network_id: 56,
            confirmations: 10,
            timeoutBlocks: 200,
            skipDryRun: true,
        },

        /* CELO MAINNET:
            - To deploy contracts on this network, run this command in the root directory:
                truffle migrate --network celo --reset
        */
        celo: {
            provider: function () {
                /* the following line config is
                    new HDWalletProvider(Metamask-secret-passphrase, RPC-URL, index-of-depolyer-account-in-Metamask, i.e. 0 means the first acoount)
                */
                return new HDWalletProvider(mnemonic, 'https://forno.celo.org');
            },
            network_id: 42220,
            gas: 4000000,
        },

        /* CELO ALFAJORES TEST NETWORK: 
            - To deploy contracts on this network, run this command in the root directory: 
                truffle migrate --network celotestnet --reset
        */
        celotestnet: {
            provider: function () {
                /* the following line config is 
                    new HDWalletProvider(Metamask-secret-passphrase, RPC-URL, index-of-depolyer-account-in-Metamask, i.e. 0 means the first acoount)
                */
                return new HDWalletProvider(mnemonic, 'https://alfajores-forno.celo-testnet.org', 0);
            },
            network_id: 44787,
            gas: 2000000,
            confirmations: 10,
            timeoutBlocks: 200,
            skipDryRun: true,
            networkCheckTimeout: 999999,
        },
    },

    // SOLIDITY COMPILER CONFFIGURATION - don't miss with this please unless you know what you're doing
    compilers: {
        solc: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
            version: '^0.8.0',
        },
    },
};
</code></pre>
`;

$('.header-snippet').append(headerSnippet);

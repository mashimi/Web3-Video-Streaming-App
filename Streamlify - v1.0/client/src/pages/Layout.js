import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/general/Header';
import Footer from '../components/general/Footer';
import useVideos from '../hooks/useVideos';
import useWeb3 from '../hooks/useWeb3';
import useStream from '../hooks/useStream';
import ScrollToTop from '../components/general/ScrollToTop';
import { appSettings } from '../helpers/settings';
import { uniqueNamesGenerator, starWars } from 'unique-names-generator';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import VideosAbi from '../contracts/Collectible.json';
import StreamAbi from '../contracts/StreamList.json';

import Web3 from 'web3';
import AOS from 'aos';

import MetaMaskLoader from '../components/general/MetaMaskLoader';
import NetworkAlert from '../components/general/NetworkAlert';
import PreviewModal from '../components/general/PreviewModal';
import ViewOnlyAlert from '../components/general/ViewOnlyAlert';
import PageHolder from '../components/general/PageHolder';

function Layout() {
    const { account, loadNetworkId, loadAccount, setUsername } = useWeb3();
    const {
        loadContract,
        loadBlockchainVideos,
        loadAppOwner,
        loadActivities,
        transactionLoading,
        previewModal,
        loadAppProfits,
        videos,
    } = useVideos();
    const { streamContract, loadStreamContract, loadUserWatchlist, loadUserVideos } = useStream();

    useEffect(() => {
        if (!localStorage.getItem('moviex_username')) {
            setUsername(
                uniqueNamesGenerator({
                    dictionaries: [starWars],
                    seed: account,
                }).replace('_', ' ')
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (streamContract && account) {
            loadAppProfits(streamContract, account);
            loadUserWatchlist(streamContract, account);
            loadUserVideos(streamContract, account);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [streamContract, account]);

    const [networkId, setNetworkId] = useState(4);
    // const [networkType, setNetworkType] = useState();
    const [web3Provider, setWeb3Provider] = useState(
        window.ethereum ? new Web3(window.ethereum) : new Web3(appSettings.rpcUrl)
    );

    /*** =============================================== */
    //      GET ACTIVE NETWORK ID
    /*** =============================================== */
    useEffect(() => {
        async function getNetworkId() {
            if (window.ethereum) {
                const networkId = await loadNetworkId(new Web3(window.ethereum));
                setNetworkId(networkId);
            }
        }
        getNetworkId();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /*** =============================================== */
    //      TOGGLE WEB3 PROVIDER
    /*** =============================================== */
    useEffect(() => {
        if (window.ethereum && networkId === appSettings.networkId) {
            setWeb3Provider(new Web3(window.ethereum));
        } else {
            setWeb3Provider(new Web3(appSettings.rpcUrl));
        }
    }, [networkId]);

    /* -------------------------------------------------- */
    //      AOS ANIMATION
    /* -------------------------------------------------- */
    useEffect(() => {
        AOS.init({
            duration: 700,
            disable: 'mobile',
            once: true,
        });
    }, []);

    useEffect(() => {
        /*** =============================================== */
        //      GET BLOCKCHAIN DATA
        /*** =============================================== */
        const calclateInitialSettings = async () => {
            // Request accounts acccess if needed

            // Load account
            await loadAccount(web3Provider);

            // Load Network ID
            const networkId = await loadNetworkId(web3Provider);

            // Load Contracts
            const videoDeployedNetwork = VideosAbi.networks[networkId];
            const videosContract = loadContract(web3Provider, VideosAbi, videoDeployedNetwork);
            const streamDeployedNetwork = StreamAbi.networks[networkId];
            loadStreamContract(web3Provider, StreamAbi, streamDeployedNetwork);

            if (videosContract) {
                loadBlockchainVideos(videosContract);
                loadAppOwner(videosContract);
                loadActivities(videosContract);
            } else {
                return;
            }

            if (window.ethereum && networkId === appSettings.networkId) {
                // Metamask Event Subscription - Account changed
                window.ethereum.on('accountsChanged', (accounts) => {
                    loadAccount(web3Provider);
                    setUsername(
                        uniqueNamesGenerator({
                            dictionaries: [starWars],
                        }).replace('_', ' ')
                    );
                });

                // Metamask Event Subscription - Network changed
                window.ethereum.on('chainChanged', (chainId) => {
                    window.location.reload();
                });
            }
        };

        calclateInitialSettings();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className='app'>
                {window.ethereum && networkId !== appSettings.networkId && <NetworkAlert />}
                <Header />
                <div id='main' className='layout-horizontal z-index-20 position-relative'>
                    <div className='content-wrapper'>
                        <ScrollToTop />
                        {videos ? <Outlet /> : <PageHolder />}
                    </div>
                </div>
                <Footer />
            </div>
            <ToastContainer position='top-center' autoClose={1500} />
            {previewModal && <PreviewModal />}
            {transactionLoading && <MetaMaskLoader />}
            {(window.ethereum && networkId === appSettings.networkId) || <ViewOnlyAlert />}
        </>
    );
}

export default Layout;

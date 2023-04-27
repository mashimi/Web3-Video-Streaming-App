import React, { useReducer } from 'react';
import { secondsToHms } from '../helpers/utils';
import Web3 from 'web3';

import StreamContext from './stream-context';

const defaultStreamState = {
    streamContract: null,
    watchList: [],
    userVideos: [],
};

const streamReducer = (state, action) => {
    if (action.type === 'CONTRACT') {
        return {
            ...state,
            streamContract: action.streamContract,
        };
    }
    if (action.type === 'LOAD_WATCHLIST') {
        return {
            ...state,
            watchList: action.watchList?.map((vid) => {
                return {
                    id: vid[0],
                    metadata: {
                        title: vid[1][0],
                        description: vid[1][1],
                        category: vid[1][2],
                        genre: vid[1][3],
                        type: vid[1][4],
                        video: vid[1][5],
                        preview: vid[1][6],
                        poster: vid[1][7],
                        duration: secondsToHms(Web3.utils.fromWei(vid[1][8], 'ether')),
                    },
                    price: Number(Web3.utils.fromWei(vid[2], 'ether')),
                    creator: vid[3],
                    approved: vid[5],
                    createdAt: Number(vid[6]) * 1000,
                };
            }),
        };
    }
    if (action.type === 'GET_USER_VIDEOS') {
        return {
            ...state,
            userVideos: action.userVideos,
        };
    }

    return defaultStreamState;
};

const StreamProvider = (props) => {
    const [streamState, dispatchStreamAction] = useReducer(streamReducer, defaultStreamState);

    const loadContractHandler = (web3, VideoAbi, deployedNetwork) => {
        const streamContract = deployedNetwork ? new web3.eth.Contract(VideoAbi.abi, deployedNetwork.address) : '';
        dispatchStreamAction({ type: 'CONTRACT', streamContract: streamContract });
        return streamContract;
    };

    const loadUserWatchlistHandler = async (contract, address) => {
        const watchList = await contract.methods.getWishLists(address).call();
        dispatchStreamAction({ type: 'LOAD_WATCHLIST', watchList: watchList });
        return watchList;
    };

    const loadUserVideosHandler = async (contract, address) => {
        const userVideos = await contract.methods.getPlayList(address).call();
        dispatchStreamAction({ type: 'GET_USER_VIDEOS', userVideos: userVideos });
        return userVideos;
    };

    const streamContext = {
        streamContract: streamState.streamContract,
        watchList: streamState.watchList,
        userVideos: streamState.userVideos,
        loadStreamContract: loadContractHandler,
        loadUserVideos: loadUserVideosHandler,
        loadUserWatchlist: loadUserWatchlistHandler,
    };

    return <StreamContext.Provider value={streamContext}>{props.children}</StreamContext.Provider>;
};

export default StreamProvider;

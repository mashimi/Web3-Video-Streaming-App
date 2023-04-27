import React, { useReducer } from 'react';
import { secondsToHms } from '../helpers/utils';
import { uniqueNamesGenerator, starWars } from 'unique-names-generator';
import Web3 from 'web3';

import VideosContext from './videos-context';

const defaultVideosState = {
    videos: [],
    blockchainVideos: [],
    activities: [],
    contract: null,
    owner: '',
    mintUploadProgress: 0,
    previewModal: false,
    preview: {},
    subscribers: [],
    transactionLoading: false,
    uploadingProgress: false,
    userVideos: [],
    appProfits: '0',
};

const videosReducer = (state, action) => {
    if (action.type === 'LOAD_VIDEOS') {
        return {
            ...state,
            videos: action.videos,
        };
    }
    if (action.type === 'GET_VIDEOS') {
        return {
            ...state,
            blockchainVideos: action.videos.map((vid) => {
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
                        rawDuration: Number(Web3.utils.fromWei(vid[1][8], 'ether')),
                        duration: secondsToHms(Web3.utils.fromWei(vid[1][8], 'ether')),
                    },
                    price: Number(Web3.utils.fromWei(vid[2], 'ether')),
                    creator: vid[3],
                    userGenName: uniqueNamesGenerator({
                        dictionaries: [starWars],
                        seed: vid[3],
                    }).replace('_', ' '),
                    approved: vid[5],
                    createdAt: Number(vid[6]) * 1000,
                };
            }),
        };
    }
    if (action.type === 'GET_SUBSCRIBERS') {
        return {
            ...state,
            subscribers: action.subscribers.map((subscriber) => {
                return subscriber[0];
            }),
        };
    }
    if (action.type === 'CONTRACT') {
        return {
            ...state,
            contract: action.contract,
        };
    }
    if (action.type === 'LOADING') {
        return {
            ...state,
            transactionLoading: action.loading,
        };
    }
    if (action.type === 'UPLOADING_PROGRESS') {
        return {
            ...state,
            uploadingProgress: action.loading,
        };
    }
    if (action.type === 'SET_PREVIEW_MODAL') {
        return {
            ...state,
            previewModal: action.status,
        };
    }
    if (action.type === 'GET_PROFITS') {
        return {
            ...state,
            appProfits: Web3.utils.fromWei(action.profits, 'ether'),
        };
    }
    if (action.type === 'GET_UPLOAD_PROGRESS') {
        return {
            ...state,
            mintUploadProgress: action.progress,
        };
    }
    if (action.type === 'LOAD_ACTIVITIES') {
        return {
            ...state,
            activities: action.activities.map((el) => {
                return {
                    user: el[0],
                    time: Number(el[2]) * 1000,
                    action: el[3],
                };
            }),
        };
    }
    if (action.type === 'SET_PRIVEW_SRC') {
        return {
            ...state,
            preview: {
                src: action.preview.src,
                id: action.preview.id,
                subscribers: action.preview.subscribers,
                price: action.preview.price,
                creator: action.preview.creator,
            },
        };
    }
    if (action.type === 'GET_OWNER') {
        return {
            ...state,
            owner: action.owner,
        };
    }

    return defaultVideosState;
};

const VideosProvider = (props) => {
    const [videosState, dispatchVideosAction] = useReducer(videosReducer, defaultVideosState);

    const loadVideosHandler = (videos) => {
        dispatchVideosAction({ type: 'LOAD_VIDEOS', videos: videos });
        return videos;
    };

    const setTransactionLoadingHandler = (loading) => {
        dispatchVideosAction({ type: 'LOADING', loading: loading });
    };

    const setUploadingProgressHandler = (loading) => {
        dispatchVideosAction({ type: 'UPLOADING_PROGRESS', loading: loading });
    };

    const setPreviewModalHandler = (status) => {
        dispatchVideosAction({ type: 'SET_PREVIEW_MODAL', status: status });
    };

    const setPreviewSrcHandler = (src, subscribers, id, price, creator) => {
        dispatchVideosAction({ type: 'SET_PRIVEW_SRC', preview: { src, id, subscribers, price, creator } });
    };

    const loadContractHandler = (web3, VideoAbi, deployedNetwork) => {
        const contract = deployedNetwork ? new web3.eth.Contract(VideoAbi.abi, deployedNetwork.address) : '';
        dispatchVideosAction({ type: 'CONTRACT', contract: contract });
        return contract;
    };

    const loadBlockchainVideosHandler = async (contract) => {
        const videos = await contract.methods.getVideos().call();
        dispatchVideosAction({ type: 'GET_VIDEOS', videos: videos });
        if (videos.find((vid) => vid[3] === '0x0000000000000000000000000000000000000000')) {
            dispatchVideosAction({ type: 'LOAD_VIDEOS', videos: null });
        }
        return videos;
    };

    const loadVideoSubscribersHandler = async (contract, id) => {
        const subscribers = await contract.methods.getSubscribers(id).call();
        dispatchVideosAction({ type: 'GET_SUBSCRIBERS', subscribers: subscribers });
        return subscribers;
    };

    const loadAppOwnerHandler = async (contract) => {
        const owner = await contract.methods.owner().call();
        dispatchVideosAction({ type: 'GET_OWNER', owner: owner });
        if (owner === '0x0000000000000000000000000000000000000000') {
            dispatchVideosAction({ type: 'LOAD_VIDEOS', videos: null });
        }
        return owner;
    };

    const loadAppProfitsHandler = async (contract, address) => {
        const profits = await contract.methods.user_funds(address).call();
        dispatchVideosAction({ type: 'GET_PROFITS', profits: profits });
        return profits;
    };

    const loadMintUploadProgressHandler = (progress) => {
        dispatchVideosAction({ type: 'GET_MINT_PROGRESS', progress: progress });
        return progress;
    };

    const loadActivitiesHandler = async (contract) => {
        const activities = await contract.methods.get_activities().call();
        dispatchVideosAction({ type: 'LOAD_ACTIVITIES', activities: activities });
        return activities;
    };

    const videosContext = {
        videos: videosState.videos,
        blockchainVideos: videosState.blockchainVideos,
        contract: videosState.contract,
        subscribers: videosState.subscribers,
        owner: videosState.owner,
        appProfits: videosState.appProfits,
        previewModal: videosState.previewModal,
        mintUploadProgress: videosState.mintUploadProgress,
        preview: videosState.preview,
        transactionLoading: videosState.transactionLoading,
        uploadingProgress: videosState.uploadingProgress,
        activities: videosState.activities,
        loadContract: loadContractHandler,
        loadVideos: loadVideosHandler,
        loadBlockchainVideos: loadBlockchainVideosHandler,
        loadVideoSubscribers: loadVideoSubscribersHandler,
        loadAppOwner: loadAppOwnerHandler,
        setTransactionLoading: setTransactionLoadingHandler,
        setPreviewModal: setPreviewModalHandler,
        loadMintUploadProgress: loadMintUploadProgressHandler,
        setPreviewSrc: setPreviewSrcHandler,
        loadAppProfits: loadAppProfitsHandler,
        setUploadingProgress: setUploadingProgressHandler,
        loadActivities: loadActivitiesHandler,
    };

    return <VideosContext.Provider value={videosContext}>{props.children}</VideosContext.Provider>;
};

export default VideosProvider;

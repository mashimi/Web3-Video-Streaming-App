import React from 'react';

const VideosContext = React.createContext({
    videos: [],
    blockchainVideos: [],
    contract: null,
    owner: '',
    appProfits: '0',
    previewModal: false,
    mintUploadProgress: 0,
    preview: '',
    subscribers: [],
    transactionLoading: false,
    uploadingProgress: false,
    activities: [],
    loadVideos: () => {},
    loadContract: () => {},
    loadBlockchainVideos: () => {},
    loadVideoSubscribers: () => {},
    loadAppOwner: () => {},
    setTransactionLoading: () => {},
    setPreviewSrc: () => {},
    setPreviewModal: () => {},
    loadMintUploadProgress: () => {},
    loadAppProfits: () => {},
    setUploadingProgress: () => {},
    loadActivities: () => {},
});

export default VideosContext;

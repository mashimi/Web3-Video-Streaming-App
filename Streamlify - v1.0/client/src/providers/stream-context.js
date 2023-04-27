import React from 'react';

const StreamContext = React.createContext({
    streamContract: null,
    watchList: null,
    userVideos: [],
    loadStreamContract: () => {},
    loadUserWatchlist: () => {},
    loadUserVideos: () => {},
});

export default StreamContext;

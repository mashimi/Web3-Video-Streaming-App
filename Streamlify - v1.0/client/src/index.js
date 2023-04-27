import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Web3Provider from './providers/Web3Provider';
import VideosProvider from './providers/VideosProvider';
import StreamProvider from './providers/StreamProvider';

ReactDOM.render(
    <React.StrictMode>
        <Web3Provider>
            <VideosProvider>
                <StreamProvider>
                    <App />
                </StreamProvider>
            </VideosProvider>
        </Web3Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

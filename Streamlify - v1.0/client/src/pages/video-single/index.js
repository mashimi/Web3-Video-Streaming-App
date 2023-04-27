import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useVideos from '../../hooks/useVideos';
import Hero from './Hero';

function VideoSinglePage() {
    const { id } = useParams();
    const { blockchainVideos } = useVideos();

    const vidDetails = useMemo(() => {
        if (blockchainVideos.length > 0) {
            return blockchainVideos.filter((vid) => vid.id === id)[0];
        } else {
            return null;
        }
    }, [blockchainVideos, id]);

    return <>{vidDetails ? <Hero {...vidDetails} /> : <p>Loading Video</p>}</>;
}

export default VideoSinglePage;

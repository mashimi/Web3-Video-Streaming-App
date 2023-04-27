import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsPlayCircle } from 'react-icons/bs';
import { CgTimer } from 'react-icons/cg';
import useVideos from '../../hooks/useVideos';
import { Jazzicon } from '@ukstv/jazzicon-react';
import { appSettings } from '../../helpers/settings';

function MovieBox({ id, metadata, price, creator }) {
    const { contract, loadVideoSubscribers, blockchainVideos, setPreviewModal, setPreviewSrc } = useVideos();
    const [vidSubscribers, setVidSubscribers] = useState(null);

    /* ------------------------------------------------ */
    //      CHECK IF CONNECTED ACCOUNT HAS ACCESS
    /* ------------------------------------------------ */
    useEffect(() => {
        let cancelled = false;
        if (contract && blockchainVideos.length > 0) {
            async function getVidSubscribers() {
                const subs = await loadVideoSubscribers(contract, Number(id));
                const formattedSubs = subs.map((subscriber) => subscriber[0]);
                setVidSubscribers([...new Set(formattedSubs)]);
            }
            if (!cancelled) {
                getVidSubscribers();
            }
        }

        // CLEANUP ----------------------------
        return () => (cancelled = true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contract, blockchainVideos]);

    return (
        <div data-aos='fade-up'>
            <div className='movie-box w-100'>
                <div className='movie-box-poster-holder'>
                    <Link to={`/videos/${id}`}>
                        <BsPlayCircle className='play-icon text-white z-index-20' size='2.5rem' />
                    </Link>
                    <div className='movie-box-poster' style={{ backgroundImage: `url(${metadata.poster})` }}></div>
                    <div className='movie-box-cta w-100 pt-3'>
                        <button
                            className='btn btn-primary btn-sm w-100 py-2'
                            style={{ borderRadius: '0.5rem' }}
                            onClick={() => {
                                setPreviewModal(true);
                                setPreviewSrc(metadata.preview, vidSubscribers, id, price, creator);
                            }}
                        >
                            <BsPlayCircle className='me-2' />
                            Watch Trailer
                        </button>
                    </div>
                </div>

                <div className='d-flex align-items-center justify-content-between mb-2'>
                    <h6 className='mb-0 title'>
                        <Link className='text-reset' to={`/videos/${id}`}>
                            {metadata.title}
                        </Link>
                    </h6>
                    <div className='ms-2'>
                        <div className='text-xxs badge fw-normal bg-secondary'>
                            {price} {appSettings.currency}
                        </div>
                    </div>
                </div>
                <div className='d-flex align-items-center info justify-content-between'>
                    <div className='small my-1 text-muted me-3 d-flex align-items-center'>
                        {metadata.genre}
                        {vidSubscribers && (
                            <ul className='list-unstyled avatars avatars-sm avatars-with-transition mb-0 ms-2'>
                                {vidSubscribers.slice(0, 4).map((subscriber, i) => {
                                    return (
                                        <li className='avatar avatar-md2' key={i}>
                                            <div style={{ width: '25px', height: '25px' }}>
                                                <Jazzicon address={subscriber || ''} />
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                    <span className='small ms-2'>
                        <CgTimer className='text-warning me-2' size='1.4rem' /> {metadata.duration}
                    </span>
                </div>

                {vidSubscribers && (
                    <ul className='list-unstyled avatars avatars-sm mb-0'>
                        {vidSubscribers.slice(0, 3).map((subscriber, i) => {
                            return (
                                <li className='avatar avatar-md2' key={i}>
                                    <div style={{ width: '25px', height: '25px' }}>
                                        <Jazzicon address={subscriber || ''} />
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default MovieBox;

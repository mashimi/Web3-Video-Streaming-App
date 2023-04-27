import React, { useState, useEffect } from 'react';
import { truncateStart } from '../../helpers/utils';
import { BsFillPlayFill, BsFillCalendar2MinusFill } from 'react-icons/bs';
import { CgTimer } from 'react-icons/cg';
import { formatSimpleDate } from '../../helpers/utils';
import useVideos from '../../hooks/useVideos';
import useWeb3 from '../../hooks/useWeb3';
import useStream from '../../hooks/useStream';
import { Jazzicon } from '@ukstv/jazzicon-react';
import { appSettings } from '../../helpers/settings';
import { toast } from 'react-toastify';
import WatchListAction from '../../components/general/WatchListAction';
import Web3 from 'web3';
import ConnectWalletHandler from '../../components/general/ConnectWalletHandler';
import ReactPlayer from 'react-player';
import 'react-h5-audio-player/lib/styles.css';
import 'html5-device-mockups/dist/device-mockups.min.css';

function Hero({ createdAt, metadata, creator, price, id, approved }) {
    const { contract, loadVideoSubscribers, blockchainVideos, loadBlockchainVideos, setTransactionLoading } =
        useVideos();
    const { streamContract } = useStream();
    const { account } = useWeb3();
    const [vidSubscribers, setVidSubscribers] = useState(null);
    const [isSubscriber, setIsSubscriber] = useState(false);

    function subscribeToVideo() {
        streamContract.methods
            .playVideo(Number(id))
            .send({ from: account, value: Web3.utils.toWei(price.toString(), 'ether') })
            .once('sending', () => {
                setTransactionLoading(true);
            })
            .on('receipt', () => {
                setTransactionLoading(false);
                loadBlockchainVideos(contract);
                toast.success('Great! You have access now');
            })
            .on('error', () => {
                setTransactionLoading(false);
                toast.error('Oops! Something went error');
            });
    }

    useEffect(() => {
        if (contract && blockchainVideos.length > 0) {
            async function getVidSubscribers() {
                const subs = await loadVideoSubscribers(contract, Number(id));
                const formattedSubs = subs.map((subscriber) => subscriber[0]);
                setVidSubscribers([...new Set(formattedSubs)]);
            }
            getVidSubscribers();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contract, blockchainVideos]);

    useEffect(() => {
        if (account && contract) {
            const checkSubscriber = vidSubscribers?.includes(account);
            setIsSubscriber(checkSubscriber);
        }
    }, [account, contract, vidSubscribers]);

    return (
        <div className='video-single-hero hero-slide py-5 overflow-hidden'>
            <div className='hero-slide-bg' style={{ backgroundImage: `url(${metadata.poster})` }}></div>
            <div className='container z-index-20 py-5 mt-5 text-center'>
                <div className='row gy-5 align-items-center'>
                    <div className='col-lg-7 mx-auto'>
                        <ul className='list-inline' data-aos='fade-up'>
                            <li className='list-inline-item'>
                                <div className='badge bg-green fw-normal rounded-0'>{metadata.genre}</div>
                            </li>
                        </ul>
                        <h2 className='h1 text-xxl text-shadow' data-aos='fade-up' data-aos-delay='100'>
                            {metadata.title}
                        </h2>
                        <div className='d-block' data-aos='fade-up' data-aos-delay='300'>
                            {approved || (
                                <div className='bg-danger px-2 text-white d-inline-block mb-4 fw-light'>
                                    <strong className='me-2 headings-font-family'>Pending!</strong>
                                    This Video is waiting for admin approval
                                </div>
                            )}
                        </div>
                        <ul
                            className='list-inline d-flex align-items-center justify-content-center'
                            data-aos='fade-up'
                            data-aos-delay='200'
                        >
                            <li className='list-inline-item'>
                                <span className='small ms-2'>
                                    <BsFillCalendar2MinusFill className='text-warning me-2' size='1.2rem' />{' '}
                                    {formatSimpleDate(createdAt)}
                                </span>
                            </li>
                            <li className='list-inline-item ms-2 lh-1' style={{ fontSize: '0.7rem' }}>
                                |
                            </li>
                            <li className='list-inline-item'>
                                <span className='small ms-2'>
                                    <CgTimer className='text-warning me-2' size='1.4rem' /> {metadata.duration}
                                </span>
                            </li>
                        </ul>
                        <p className='text-gray-500 lead fw-light mb-4' data-aos='fade-up' data-aos-delay='300'>
                            {truncateStart(metadata.description, 200, '....')}
                        </p>
                        {account ? (
                            <ul className='list-inline' data-aos='fade-up' data-aos-delay='400'>
                                {isSubscriber || creator === account ? (
                                    <></>
                                ) : (
                                    <li className='list-inline-item'>
                                        <button type='button' className='btn btn-primary' onClick={subscribeToVideo}>
                                            <BsFillPlayFill className='mb-1 me-2' size='1.35rem' />
                                            Access Now
                                        </button>
                                    </li>
                                )}
                                <WatchListAction id={id} creator={creator} />
                            </ul>
                        ) : (
                            <ConnectWalletHandler customClass='my-3' />
                        )}

                        {isSubscriber ? (
                            <p className='small' data-aos='fade-up' data-aos-delay='500'>
                                You already have access to this video
                            </p>
                        ) : (
                            <p className='small' data-aos='fade-up' data-aos-delay='500'>
                                Access this video for only{' '}
                                <span className='text-primary'>
                                    {price} {appSettings.currency}
                                </span>
                            </p>
                        )}
                        {vidSubscribers && (
                            <>
                                <ul className='list-unstyled avatars mt-4' data-aos='fade-up' data-aos-delay='400'>
                                    {vidSubscribers.slice(0, 3).map((subscriber, i) => {
                                        return (
                                            <li className='avatar avatar-md2' key={i}>
                                                <div style={{ width: '40px', height: '40px' }}>
                                                    <Jazzicon address={subscriber || ''} />
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </>
                        )}
                    </div>
                </div>

                {(isSubscriber || creator === account) && (
                    <div className='px-5 mt-5' data-aos='fade-up'>
                        <div className='video-mockup'>
                            <ReactPlayer url={metadata.video} controls={true} width='100%' height='auto' />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Hero;

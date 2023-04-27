import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useVideos from '../../hooks/useVideos';
import ReactPlayer from 'react-player';
import 'react-h5-audio-player/lib/styles.css';
import useWeb3 from '../../hooks/useWeb3';
import { BsFillPlayFill } from 'react-icons/bs';
import { appSettings } from '../../helpers/settings';
import { toast } from 'react-toastify';
import useStream from '../../hooks/useStream';
import Web3 from 'web3';
import WatchListAction from './WatchListAction';
import ConnectWalletHander from './ConnectWalletHandler';

function PreviewModal() {
    const { contract, preview, setPreviewModal, setTransactionLoading, loadBlockchainVideos } = useVideos();
    const { account } = useWeb3();
    const { streamContract } = useStream();
    const navigate = useNavigate();

    function subscribeToVideo() {
        streamContract.methods
            .playVideo(Number(preview.id))
            .send({ from: account, value: Web3.utils.toWei(preview.price.toString(), 'ether') })
            .once('sending', () => {
                setTransactionLoading(true);
            })
            .on('receipt', () => {
                setTransactionLoading(false);
                loadBlockchainVideos(contract);
                setPreviewModal(false);
                navigate(`/videos/${preview.id}`);
                toast.success('Great! You have access now');
            })
            .on('error', () => {
                setTransactionLoading(false);
                toast.error('Oops! Something went error');
            });
    }

    return (
        <div className='fullscreen-loader' data-aos='zoom-in-up' data-aos-duration='100'>
            <div className='fullscreen-loader-inner p-4'>
                <div className='container'>
                    <div className='row mt-4'>
                        <div className='col-xl-6 col-lg-7 mx-auto text-center'>
                            <div className='card shadow position-relative'>
                                <div className='position-absolute m-3 top-0 end-0'>
                                    <button
                                        className='btn btn-dark btn-sm z-index-20'
                                        type='button'
                                        onClick={() => setPreviewModal(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                                <div className='card-body p-4 p-lg-5'>
                                    <h2 className='h1 mb-2'>Video Trailer</h2>
                                    <p className='text-muted mb-5'>Short preview from the original video</p>
                                    <ReactPlayer url={preview.src} controls={true} width='100%' height='auto' />

                                    {account ? (
                                        <div className='row g-3 mt-2 mb-3'>
                                            <div className='col-lg-6'>
                                                {preview.subscribers.includes(account) ? (
                                                    <div onClick={() => setPreviewModal(false)}>
                                                        <Link
                                                            className='btn btn-primary w-100'
                                                            to={`/videos/${preview.id}`}
                                                        >
                                                            <BsFillPlayFill className='mb-1 me-2' size='1.35rem' />
                                                            Watch Now
                                                        </Link>
                                                    </div>
                                                ) : (
                                                    // ADD CONDITION HERE
                                                    <button
                                                        type='button'
                                                        className='btn btn-primary w-100'
                                                        onClick={subscribeToVideo}
                                                    >
                                                        <BsFillPlayFill className='mb-1 me-2' size='1.35rem' />
                                                        Access Now
                                                    </button>
                                                )}
                                            </div>

                                            <div className='col-lg-6 d-flex'>
                                                <WatchListAction id={preview.id} creator={preview.creator} />
                                            </div>
                                        </div>
                                    ) : (
                                        <ConnectWalletHander customClass='my-3' />
                                    )}

                                    {preview.subscribers.includes(account) ? (
                                        <p className='small'>You already have access to this video</p>
                                    ) : (
                                        <p className='small'>
                                            Access this video for only{' '}
                                            <span className='text-primary'>
                                                {preview.price} {appSettings.currency}
                                            </span>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PreviewModal;

import React, { useState, useContext } from 'react';
import Select from 'react-select';
import VideosContext from '../../providers/videos-context';
import Web3Context from '../../providers/web3-context';
import Web3 from 'web3';
import useVideos from '../../hooks/useVideos';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { appSettings } from '../../helpers/settings';
import { AxiosDefault } from '../../api/axios';
import ConnectWalletHander from '../../components/general/ConnectWalletHandler';
import UploadProgress from '../../components/general/UploadProgress';
import { toast } from 'react-toastify';

function MintVideo() {
    const [genre, setGenre] = useState({ label: 'General', value: 'General' });
    const [video, setVideo] = useState('');
    const [preview, setPreview] = useState('');
    const [poster, setPoster] = useState('');
    const [type, setType] = useState('');
    const videosCtx = useContext(VideosContext);
    const web3Ctx = useContext(Web3Context);
    const { contract, loadBlockchainVideos, setTransactionLoading, setUploadingProgress, uploadingProgress } =
        useVideos();
    const navigate = useNavigate();
    const [duration, setDuration] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [uploadedPercentage, setUploadPercentage] = useState(0);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // CATCH INPUT VIDEO ----------------------------------
    const onSelectVideo = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setVideo(undefined);
            return;
        }
        setVideo(e.target.files[0]);
        setType(e.target.files[0].type);
        var files = e.target.files[0];
        var video = document.createElement('video');
        video.preload = 'metadata';

        video.onloadedmetadata = function () {
            window.URL.revokeObjectURL(video.src);
            setDuration((prev) => video.duration);
        };
        video.src = URL.createObjectURL(files);
    };

    // CATCH INPUT PREVIEW ----------------------------------
    const onSelectPreview = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setPreview(undefined);
            return;
        }
        setPreview(e.target.files[0]);
    };

    // CATCH INPUT POSTER ----------------------------------
    const onSelectPoster = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setPoster(undefined);
            return;
        }
        setPoster(e.target.files[0]);
    };

    function handleMediaInputsSubmit() {
        setSubmitted(true);
    }

    const config = {
        onUploadProgress: (progressEvent) => {
            let percent = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
            console.log(`${percent}%`);
            setUploadPercentage((prev) => percent);
        },
    };

    // SUBMIT MINT FORM ----------------------------------
    function handleFormSubmit(data) {
        if (video !== '' && poster !== '' && preview !== '') {
            setUploadingProgress(true);
        }
        console.log(data.price);
        async function mintVideo() {
            try {
                if (video !== '' && poster !== '' && preview !== '') {
                    const uploadRes = await AxiosDefault.post(
                        appSettings.APIURL,
                        { url: video, preview, poster },
                        config
                    );
                    const resVideo = await uploadRes?.data?.url;
                    const resPreview = await uploadRes?.data?.preview;
                    const resPoster = await uploadRes?.data?.poster;
                    setUploadingProgress(false);
                    setUploadPercentage(0);

                    if (resVideo && resPreview && resPoster) {
                        videosCtx.contract.methods
                            .MintToken(
                                [
                                    data.title,
                                    data.description,
                                    'Fixed Category',
                                    genre.label,
                                    type,
                                    resVideo,
                                    resPreview,
                                    resPoster,
                                    Web3.utils.toWei(duration.toString(), 'ether'),
                                ],
                                Web3.utils.toWei(data.price.toString(), 'ether')
                            )
                            .send({ from: web3Ctx.account })
                            .on('sending', () => {
                                setTransactionLoading(true);
                            })
                            .on('receipt', () => {
                                setTransactionLoading(false);
                                loadBlockchainVideos(contract);
                                navigate('/account');
                                toast.success('Great! You have successfully minted a video');
                            })
                            .on('error', () => {
                                setTransactionLoading(false);
                                toast.error('Oops! Something went error');
                            });
                    } else {
                        setUploadingProgress(false);
                        setTransactionLoading(false);
                    }
                }
            } catch (error) {
                setUploadingProgress(false);
                setTransactionLoading(false);
                toast.error(error?.message.includes('413') ? 'Files are too large' : error?.message);
                console.log(error);
            }
        }

        mintVideo();
    }

    return (
        <>
            {uploadingProgress && <UploadProgress percentage={uploadedPercentage} />}
            <section className='py-5'>
                <div className='container py-5 mt-5'>
                    <div className='row'>
                        <div className='col-xl-8 mx-auto'>
                            <h1 className='mb-5 text-center'>Upload your Video</h1>
                            <div className='card'>
                                <div className='card-body p-lg-5'>
                                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                                        <div className='row gy-3'>
                                            <div className='col-12'>
                                                <label className='form-label'>Title</label>
                                                <input
                                                    type='text'
                                                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                                    placeholder='Enter your video title'
                                                    name='title'
                                                    {...register('title', { required: true })}
                                                />
                                                {errors.title && (
                                                    <span className='invalid-feedback'>
                                                        Please enter your video title
                                                    </span>
                                                )}
                                            </div>
                                            <div className='col-12'>
                                                <label className='form-label'>Description</label>
                                                <textarea
                                                    rows='4'
                                                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                                    placeholder='Add a cool description about your video'
                                                    {...register('description', { required: true })}
                                                />
                                                {errors.description && (
                                                    <span className='invalid-feedback'>
                                                        Please enter your video description
                                                    </span>
                                                )}
                                            </div>
                                            <div className='col-12'>
                                                <label className='form-label'>Genre</label>
                                                <Select
                                                    options={appSettings.genresOptions}
                                                    className='border-0 shadow-sm'
                                                    classNamePrefix='select'
                                                    placeholder='Select a genre'
                                                    onChange={setGenre}
                                                    isSearchable={false}
                                                    defaultValue={genre}
                                                />
                                            </div>
                                            <div className='col-12'>
                                                <label className='form-label'>Price</label>
                                                <input
                                                    type='number'
                                                    min='0'
                                                    step='0.0001'
                                                    className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                                    placeholder={`Enter your video desired price in ${appSettings.currency}`}
                                                    {...register('price', { required: true })}
                                                />
                                                {errors.price && (
                                                    <span className='invalid-feedback'>
                                                        Please enter your video price
                                                    </span>
                                                )}
                                            </div>
                                            <div className='col-12'>
                                                <label className='form-label'>Upload your video</label>
                                                <input
                                                    type='file'
                                                    className={`form-control ${
                                                        submitted && video === '' ? 'is-invalid' : ''
                                                    }`}
                                                    placeholder='Upload your Video'
                                                    onChange={onSelectVideo}
                                                    accept='.mp4, .mpeg, .mov'
                                                />
                                                <p className='form-text mb-0 fst-italic'>
                                                    For demo purpose, Please select a file less than{' '}
                                                    <span className='text-white'>90</span> mb
                                                </p>
                                                {submitted && video === '' && (
                                                    <span className='invalid-feedback'>Please upload your video</span>
                                                )}
                                            </div>
                                            <div className='col-12'>
                                                <label className='form-label'>Upload video Preview</label>
                                                <input
                                                    type='file'
                                                    className={`form-control ${
                                                        submitted && preview === '' ? 'is-invalid' : ''
                                                    }`}
                                                    placeholder='Upload video preview'
                                                    onChange={onSelectPreview}
                                                    accept='.mp4, .mpeg, .mov'
                                                />
                                                <p className='form-text mb-0 fst-italic'>
                                                    For demo purpose, Please select a file less than{' '}
                                                    <span className='text-white'>10</span> mb
                                                </p>
                                                {submitted && preview === '' && (
                                                    <span className='invalid-feedback'>
                                                        Please upload your video preview
                                                    </span>
                                                )}
                                            </div>
                                            <div className='col-12'>
                                                <label className='form-label'>Upload video Poster</label>
                                                <input
                                                    type='file'
                                                    className={`form-control ${
                                                        submitted && poster === '' ? 'is-invalid' : ''
                                                    }`}
                                                    placeholder='Upload video poster'
                                                    onChange={onSelectPoster}
                                                    accept='.jpg, .png'
                                                />
                                                {submitted && poster === '' && (
                                                    <span className='invalid-feedback'>
                                                        Please upload your video poster
                                                    </span>
                                                )}
                                            </div>
                                            <div className='col-12'>
                                                {web3Ctx.account ? (
                                                    <button
                                                        type='submit'
                                                        className='btn btn-primary px-5'
                                                        onClick={handleMediaInputsSubmit}
                                                    >
                                                        Upload your Video
                                                    </button>
                                                ) : (
                                                    <ConnectWalletHander />
                                                )}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default MintVideo;

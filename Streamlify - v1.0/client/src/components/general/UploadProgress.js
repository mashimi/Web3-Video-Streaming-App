import React from 'react';

function NetworkAlert({ percentage }) {
    return (
        <div className='fullscreen-loader' data-aos='zoom-in-up' data-aos-duration='100'>
            <div className='fullscreen-loader-inner'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-7 mx-auto text-center'>
                            <div className='card shadow'>
                                <div className='card-body p-4 p-lg-5'>
                                    <span className='loader-spinner mb-3'></span>
                                    <h2 className='h4 fw-normal mb-1'>Uploading your assets</h2>
                                    <p className='text-muted fw-normal mb-4'>
                                        This could take some time until we save your assets to our servers...
                                    </p>
                                    <div className='row'>
                                        <div className='col-lg-7 mx-auto'>
                                            <div
                                                className='progress mb-3'
                                                role='progressbar'
                                                aria-label='Animated striped example'
                                                aria-valuenow={percentage}
                                                aria-valuemin='0'
                                                aria-valuemax='100'
                                                style={{ height: '4px' }}
                                            >
                                                <div
                                                    className='progress-bar progress-bar-striped progress-bar-animated'
                                                    style={{ width: `${percentage}%` }}
                                                ></div>
                                            </div>
                                            <p className='h6 mb-0'>{percentage}%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NetworkAlert;

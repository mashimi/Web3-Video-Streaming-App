import React, { useEffect } from 'react';
import { AiFillVideoCamera } from 'react-icons/ai';
import DataTable from 'react-data-table-component';
import { formatDate, truncate, truncateStart } from '../../helpers/utils';
import { Jazzicon } from '@ukstv/jazzicon-react';
import { appSettings } from '../../helpers/settings';
import { configEtherScanUrl } from '../../helpers/utils';
import useStream from '../../hooks/useStream';
import useWeb3 from '../../hooks/useWeb3';
import { Link } from 'react-router-dom';
import useVideos from '../../hooks/useVideos';

function UserApprovedVideosTable({ setIds }) {
    const { streamContract, loadUserVideos, userVideos } = useStream();
    const { account, username, networkId } = useWeb3();
    const { blockchainVideos } = useVideos();

    useEffect(() => {
        if (streamContract && account) {
            loadUserVideos(streamContract, account);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [streamContract, account]);

    /*** =============================================== */
    //      PERIODS TABLE COLUMNS
    /*** =============================================== */
    const columns = [
        {
            name: 'Video',
            selector: (row) => row?.metadata?.title,
            sortable: true,
            minWidth: '300px',
            cell: (row) => (
                <div row={row}>
                    <Link className='text-reset' to={`/videos/${row.id}`}>
                        <div className='d-flex align-items-center'>
                            <div
                                className='flex-shrink-0'
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    background: `url(${row?.metadata?.poster})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center center',
                                    borderRadius: '0.5rem',
                                }}
                            ></div>
                            <div className='ms-3'>
                                <h6 className='mb-1'>{row?.metadata?.title}</h6>
                                <p className='text-muted small mb-0'>
                                    {truncateStart(row?.metadata?.description, 30, '...')}
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            ),
        },
        {
            name: 'Creator',
            minWidth: '200px',
            selector: (row) => row?.creator,
            cell: (row) => (
                <div row={row}>
                    <a
                        href={configEtherScanUrl(networkId, row?.creator)}
                        rel='noopener noreferrer'
                        className='text-reset'
                        target='_blank'
                    >
                        <div className='d-flex align-items-center'>
                            <div className='avatar avatar-md2'>
                                <div style={{ width: '30px', height: '30px' }}>
                                    <Jazzicon address={row?.creator || ''} />
                                </div>
                            </div>
                            <div className='ms-3'>
                                <h6 className='mb-1' style={{ fontSize: '0.9rem' }}>
                                    {row?.creator !== account ? row?.userGenName : username}
                                </h6>
                                <p className='text-muted small mb-0'>{truncate(row?.creator, 15, '.....')}</p>
                            </div>
                        </div>
                    </a>
                </div>
            ),
        },
        {
            name: 'Created At',
            minWidth: '200px',
            selector: (row) => row?.createdAt,
            cell: (row) => (
                <div row={row}>
                    <small>{formatDate(row.createdAt)}</small>
                </div>
            ),
        },
        {
            name: 'Price',
            selector: (row) => row?.price,
            cell: (row) => (
                <div row={row}>
                    <small>
                        {row?.price} {appSettings.currency}
                    </small>
                </div>
            ),
        },
        {
            name: 'Duration',
            selector: (row) => row?.price,
            cell: (row) => (
                <div row={row}>
                    <small>{row?.metadata?.duration}</small>
                </div>
            ),
        },
    ];

    return (
        <div className='card shadow-lg mb-0' data-aos='fade-up' data-aos-delay='200'>
            <div className='card-body p-lg-5'>
                <div className='d-flex a;ign-items-center mb-5'>
                    <div className='stats-icon solid-cyan'>
                        <AiFillVideoCamera size='1.4rem' />
                    </div>
                    <div className='ms-3'>
                        <h2 className='mb-0 h4'>My Purchased Videos</h2>
                        <p className='text-muted fw-normal mb-0'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                    </div>
                </div>

                {blockchainVideos?.filter((video) =>
                    userVideos?.some((userVideo) => Number(video.id) === Number(userVideo))
                ).length > 0 ? (
                    <DataTable
                        columns={columns}
                        data={blockchainVideos
                            ?.filter((video) => userVideos?.some((userVideo) => Number(video.id) === Number(userVideo)))
                            ?.sort((a, b) => {
                                return new Date(b.createdAt) - new Date(a.createdAt);
                            })}
                        pagination={userVideos.length >= 1 && true}
                        responsive
                        theme='solarized'
                    />
                ) : (
                    <p className='mb-0'>There're no purchased videos to display</p>
                )}
            </div>
        </div>
    );
}

export default UserApprovedVideosTable;

import React from 'react';
import { AiFillVideoCamera } from 'react-icons/ai';
import DataTable from 'react-data-table-component';
import { formatDate, truncateStart } from '../../helpers/utils';
import { appSettings } from '../../helpers/settings';
import useVideos from '../../hooks/useVideos';
import useWeb3 from '../../hooks/useWeb3';
import { Link } from 'react-router-dom';

function UserApprovedVideosTable({ setIds }) {
    const { blockchainVideos } = useVideos();
    const { account } = useWeb3();

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
                    <div className='stats-icon solid-turquoise'>
                        <AiFillVideoCamera size='1.4rem' />
                    </div>
                    <div className='ms-3'>
                        <h2 className='mb-0 h4'>Videos I've Uploaded</h2>
                        <p className='text-muted fw-normal mb-0'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                    </div>
                </div>

                {blockchainVideos?.filter((vid) => vid.creator === account)?.filter((vid) => vid.approved).length >
                0 ? (
                    <DataTable
                        columns={columns}
                        data={blockchainVideos
                            ?.filter((vid) => vid.creator === account)
                            ?.filter((vid) => vid.approved)
                            .sort((a, b) => {
                                return new Date(b.createdAt) - new Date(a.createdAt);
                            })}
                        pagination={blockchainVideos.length >= 1 && true}
                        responsive
                        theme='solarized'
                    />
                ) : (
                    <p className='mb-0'>There're no uploaded videos to display</p>
                )}
            </div>
        </div>
    );
}

export default UserApprovedVideosTable;

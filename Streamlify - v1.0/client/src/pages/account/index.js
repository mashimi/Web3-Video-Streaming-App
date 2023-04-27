import React from 'react';
import { Link } from 'react-router-dom';
import UserApprovedVideosTable from './UserApprovedVideosTable';
import UserPendingVideosTable from './UserPendingVideosTable';
import UserPurchasedVideos from './UserPurchasedVideos';
import PageBanner from '../../components/general/PageBanner';
import useWeb3 from '../../hooks/useWeb3';
import ConnectWalletHander from '../../components/general/ConnectWalletHandler';

function UserPage() {
    const { account } = useWeb3();

    return (
        <>
            <PageBanner
                heading='My Account'
                text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, similique pariatur et corporis cum vero minus exercitationem veritatis.'
            >
                {account ? (
                    <Link className='btn btn-primary' to='/mint'>
                        Mint a new Video
                    </Link>
                ) : (
                    <ConnectWalletHander customClass='my-3' />
                )}
            </PageBanner>
            <section className='py-5'>
                <div className='container py-5'>
                    <div className='mb-5'>
                        <UserApprovedVideosTable />
                    </div>
                    <div className='mb-5'>
                        <UserPendingVideosTable />
                    </div>
                    <div className='mb-5'>
                        <UserPurchasedVideos />
                    </div>
                </div>
            </section>
        </>
    );
}

export default UserPage;

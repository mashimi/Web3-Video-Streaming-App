import React from 'react';
import useStream from '../../hooks/useStream';
import PageBanner from '../../components/general/PageBanner';
import MovieBox from '../../components/general/MovieBox';

function MyListPage() {
    const { watchList } = useStream();

    return (
        <>
            <PageBanner
                heading='My Watchlist'
                text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, similique pariatur et corporis cum vero minus exercitationem veritatis.'
            ></PageBanner>
            <section className='py-5'>
                <div className='container py-5'>
                    <div className='row gy-4 justify-content-center'>
                        {watchList.map((video, i) => {
                            return (
                                <div className='col-lg-3 col-md-4 col-sm-6' key={i}>
                                    <MovieBox {...video} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}

export default MyListPage;

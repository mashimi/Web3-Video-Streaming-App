import React, { useState, useMemo } from 'react';
import PageBanner from '../../components/general/PageBanner';
import useVideos from '../../hooks/useVideos';
import Select from 'react-select';
import { appSettings } from '../../helpers/settings';
import MovieBox from '../../components/general/MovieBox';

function DiscoverPage() {
    const { blockchainVideos } = useVideos();
    const [genreFilter, setGenreFilter] = useState({ label: 'All', value: 'All' });
    const [dateFilter, setDateFilter] = useState({ label: 'Newest First', value: 'newest' });
    const [priceFilter, setPriceFilter] = useState({ label: 'Select', value: 'Select' });
    const [durationFilter, setDurationFilter] = useState({ label: 'Select', value: 'Select' });
    const [vidsPerView, setVidsPerView] = useState(4);

    function showMoreHandler() {
        setVidsPerView((prev) => prev + 4);
    }

    const filteredResult = useMemo(() => {
        if (genreFilter?.value === 'All') {
            return blockchainVideos.filter((vid) => vid.approved);
        } else if (genreFilter?.value !== 'All') {
            return blockchainVideos
                .filter((vid) => vid.approved)
                .filter((vid) => vid.metadata.genre === genreFilter?.value);
        } else {
            return blockchainVideos.filter((vid) => vid.approved);
        }
        // eslint-disable-next-line
    }, [genreFilter, dateFilter, priceFilter, durationFilter, blockchainVideos]);

    function handlePriceFilter(val) {
        setPriceFilter(val);
        setDateFilter({ label: 'Newest First', value: 'newest' });
        setDurationFilter({ label: 'Select', value: 'Select' });
    }

    function handleDateFilter(val) {
        setDateFilter(val);
        setPriceFilter({ label: 'Select', value: 'Select' });
        setDurationFilter({ label: 'Select', value: 'Select' });
    }

    function handleDurationFilter(val) {
        setDurationFilter(val);
        setPriceFilter({ label: 'Select', value: 'Select' });
        setDateFilter({ label: 'Newest First', value: 'newest' });
    }

    return (
        <>
            <PageBanner
                heading='Discover All Videos'
                text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, similique pariatur et corporis cum vero minus exercitationem veritatis.'
            ></PageBanner>
            <section className='pt-5 z-index-20'>
                <div className='container py-5'>
                    <div className='row'>
                        <div className='col-lg-8 mx-auto' data-aos='fade-up'>
                            <ul className='list-inline d-flex justify-content-center flex-wrap z-index-20'>
                                <li className='list-inline-item me-3 my-2 flex-fill'>
                                    <label htmlFor='categoryFilter' className='form-label'>
                                        Filter by Genre
                                    </label>

                                    <Select
                                        options={[{ label: 'All', value: 'All' }, ...appSettings.genresOptions]}
                                        className='border-0 shadow-sm'
                                        classNamePrefix='select'
                                        placeholder='Select'
                                        onChange={setGenreFilter}
                                        isSearchable={false}
                                        value={genreFilter}
                                        autosize={true}
                                    />
                                </li>
                                <li className='list-inline-item me-3 my-2 flex-fill'>
                                    <label htmlFor='dateSort' className='form-label'>
                                        Sort by Date
                                    </label>

                                    <Select
                                        options={[
                                            { label: 'Newest First', value: 'newest' },
                                            { label: 'Oldest First', value: 'oldest' },
                                        ]}
                                        className='border-0 shadow-sm'
                                        classNamePrefix='select'
                                        placeholder='Select'
                                        onChange={(value) => handleDateFilter(value)}
                                        isSearchable={false}
                                        value={dateFilter}
                                        autosize={true}
                                    />
                                </li>
                                <li className='list-inline-item me-3 my-2 flex-fill'>
                                    <label htmlFor='priceSort' className='form-label'>
                                        Sort by Price
                                    </label>

                                    <Select
                                        options={[
                                            { label: 'Price: High to Low', value: 'heighPrice' },
                                            { label: 'Price: Low to High', value: 'lowPrice' },
                                        ]}
                                        className='border-0 shadow-sm'
                                        classNamePrefix='select'
                                        placeholder='Select'
                                        onChange={(value) => handlePriceFilter(value)}
                                        isSearchable={false}
                                        value={priceFilter}
                                        autosize={true}
                                    />
                                </li>
                                <li className='list-inline-item me-3 my-2 flex-fill'>
                                    <label htmlFor='priceSort' className='form-label'>
                                        Sort by Duration
                                    </label>

                                    <Select
                                        options={[
                                            { label: 'Longest First', value: 'longest' },
                                            { label: 'Shortest First', value: 'shortest' },
                                        ]}
                                        className='border-0 shadow-sm'
                                        classNamePrefix='select'
                                        placeholder='Select'
                                        onChange={(value) => handleDurationFilter(value)}
                                        isSearchable={false}
                                        value={durationFilter}
                                        autosize={true}
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className='pb-5'>
                <div className='container pb-5'>
                    <div className='row justify-content-center gy-4'>
                        {filteredResult?.length > 0 ? (
                            filteredResult
                                .sort((a, b) => {
                                    if (dateFilter.value === 'newest') {
                                        return b.createdAt - a.createdAt;
                                    } else {
                                        return a.createdAt - b.createdAt;
                                    }
                                })
                                .sort((a, b) => {
                                    if (priceFilter.value === 'heighPrice') {
                                        return b.price - a.price;
                                    } else if (priceFilter.value === 'lowPrice') {
                                        return a.price - b.price;
                                    }
                                    return a - b;
                                })
                                .sort((a, b) => {
                                    if (durationFilter.value === 'longest') {
                                        return b.metadata.rawDuration - a.metadata.rawDuration;
                                    } else if (durationFilter.value === 'shortest') {
                                        return a.metadata.rawDuration - b.metadata.rawDuration;
                                    }
                                    return a - b;
                                })
                                .slice(0, vidsPerView)
                                .map((vid) => {
                                    return (
                                        <div className='col-xxl-3 col-lg-4 col-md-6' key={vid.id}>
                                            <MovieBox {...vid} />
                                        </div>
                                    );
                                })
                        ) : (
                            <p className='lead mb-0 text-center'>No Videos at the moment</p>
                        )}
                    </div>

                    {filteredResult.length > vidsPerView && (
                        <div className='text-center pt-5'>
                            <button className='btn btn-primary px-5' onClick={showMoreHandler}>
                                Show More
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default DiscoverPage;

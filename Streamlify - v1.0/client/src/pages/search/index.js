import React, { useState } from 'react';
import useVideos from '../../hooks/useVideos';
import PageBanner from '../../components/general/PageBanner';
import MovieBox from '../../components/general/MovieBox';
import { BiSearchAlt } from 'react-icons/bi';

function SearchPage() {
    const { blockchainVideos } = useVideos();
    const [searchInputVal, setSearchInputVal] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [resultsPerView, setResultsPerView] = useState(8);
    const [searchResults, setSearchResults] = useState([]);

    function handleSearchSubmit(e) {
        e.preventDefault();
        setSearchQuery((prev) => searchInputVal);
        setSearchResults((prev) =>
            blockchainVideos
                ?.filter((vid) => vid?.approved)
                .filter((vid) => vid?.metadata?.title.toLowerCase().includes(searchInputVal.replace(/\s/g, '')))
        );
    }

    function handleSearchInput(val) {
        if (val === '') {
            setSearchQuery('');
            setSearchInputVal(val);
        }
        setSearchInputVal(val);
    }

    function handleResultsPerView() {
        setResultsPerView((prev) => prev + 4);
    }

    return (
        <>
            <PageBanner
                heading="What you're looking for? "
                text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, similique pariatur et corporis cum vero minus exercitationem veritatis.'
            >
                <form onSubmit={handleSearchSubmit}>
                    <div className='form-floating position-relative'>
                        <input
                            id='searchInput'
                            type='text'
                            className='form-control'
                            placeholder='Search for vidoes'
                            value={searchInputVal}
                            onChange={(e) => handleSearchInput(e.target.value)}
                            autoComplete='off'
                        />
                        <label htmlFor='searchInput'>Search for videos</label>
                        <button
                            className='btn btn-primary search-inner-btn'
                            type='submit'
                            disabled={searchInputVal.length < 3}
                        >
                            <BiSearchAlt className='me-1' size='1.3rem' style={{ transfrom: 'translateY(-3px)' }} />{' '}
                            Search
                        </button>
                    </div>

                    <div className='mt-4'>
                        {searchQuery === '' && searchResults.length === 0 ? (
                            <p className='text-muted'>
                                Your Search results will appear below, minimum search query length is 3 characters
                            </p>
                        ) : searchResults.length > 0 ? (
                            <p className='lead text-muted'>
                                We've found
                                <strong className='fw-bold text-white px-2'>
                                    {searchResults.length} {searchResults.length < 2 ? 'Item' : 'Items'}
                                </strong>
                                {searchResults.length < 2 ? 'matches' : 'match'} the search term{' '}
                                <strong className='fw-bold text-white'>{searchQuery}</strong>
                            </p>
                        ) : (
                            searchResults.length === 0 &&
                            searchQuery !== '' && (
                                <p className='lead'>Sorry! We've not found any records matches your search</p>
                            )
                        )}
                    </div>
                </form>
            </PageBanner>
            <section className='py-5'>
                <div className='container py-5'>
                    <div className='row gy-4 justify-content-center'>
                        {searchResults?.slice(0, resultsPerView).map((video, i) => {
                            return (
                                <div className='col-lg-3 col-md-4 col-sm-6' key={i}>
                                    <MovieBox {...video} />
                                </div>
                            );
                        })}
                    </div>

                    {searchResults.length > resultsPerView && (
                        <div className='mt-4 text-center'>
                            <button className='btn btn-primary' type='button' onClick={handleResultsPerView}>
                                Load More
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default SearchPage;

import React, { useEffect } from 'react';
import HeroSlider from './HeroSlider';
import RecentlyAdded from './RecentlyAdded';
import MovieBox from '../../components/general/MovieBox';
import MovieBoxMock from '../../mock-components/MovieBoxMock';
import useVideos from '../../hooks/useVideos';
import { Swiper, SwiperSlide } from 'swiper/react';
import { appSettings } from '../../helpers/settings';
import TopTrending from './TopTrending';

function HomePage() {
    const { blockchainVideos } = useVideos();
    const sliderVids = blockchainVideos?.filter((vid) => vid.approved)?.slice(0, 8);
    const fallbackVids = [1, 2, 3, 4, 5, 6, 7, 8];

    useEffect(() => {
        document.title = `${appSettings.brandName} | ${appSettings.brandDescription}`;
    }, []);

    return (
        <section>
            <HeroSlider data={sliderVids} />
            <RecentlyAdded />
            <TopTrending />

            {appSettings.genresOptions
                .filter((genre) => genre.value !== 'General')
                .map((genre, i) => {
                    return (
                        <section className='pb-5' key={i}>
                            <div className='container pb-5'>
                                <h2 className='text-lg lh-1 mb-4 d-flex align-items-center'>
                                    {genre?.icon}
                                    <div className='ms-2'>{genre.label}</div>
                                </h2>

                                <div className='swiper-slow swiper-wrapper-padding'>
                                    <Swiper
                                        spaceBetween={30}
                                        breakpoints={{
                                            640: {
                                                slidesPerView: 1,
                                            },
                                            768: {
                                                slidesPerView: 2,
                                            },
                                            991: {
                                                slidesPerView: 3,
                                            },
                                            1200: {
                                                slidesPerView: 4,
                                            },
                                        }}
                                    >
                                        {blockchainVideos
                                            ?.filter((vid) => vid.approved)
                                            .filter((vid) => vid?.metadata?.genre === genre.value).length > 0 ? (
                                            blockchainVideos
                                                .filter((vid) => vid.approved)
                                                .filter((vid) => vid?.metadata?.genre === genre.value)
                                                .slice(0, 8)
                                                .map((vid) => {
                                                    return (
                                                        <SwiperSlide key={vid.id}>
                                                            <MovieBox {...vid} />
                                                        </SwiperSlide>
                                                    );
                                                })
                                        ) : blockchainVideos.length === 0 ? (
                                            fallbackVids.map((vid, i) => {
                                                return (
                                                    <SwiperSlide key={i}>
                                                        <MovieBoxMock />
                                                    </SwiperSlide>
                                                );
                                            })
                                        ) : (
                                            <p className='lead'>There're no videos match this genre</p>
                                        )}
                                    </Swiper>
                                </div>
                            </div>
                        </section>
                    );
                })}
        </section>
    );
}

export default HomePage;

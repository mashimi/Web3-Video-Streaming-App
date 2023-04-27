import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { RiTimerFlashFill } from 'react-icons/ri';
import useVideos from '../../hooks/useVideos';
import MovieBox from '../../components/general/MovieBox';
import MovieBoxMock from '../../mock-components/MovieBoxMock';

function RecentlyAdded() {
    const { blockchainVideos } = useVideos();
    const fallbackVids = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <section style={{ marginTop: '-8rem', zIndex: '30', position: 'relative' }} className='pb-5 '>
            <div className='container pb-5'>
                <h2 className='text-lg lh-1 mb-4 d-flex align-items-center'>
                    <RiTimerFlashFill size='3.5rem' className='text-primary' />
                    <div className='ms-2'>Recently Added</div>
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
                        {blockchainVideos?.filter((vid) => vid.approved)?.length > 0
                            ? blockchainVideos
                                  .filter((vid) => vid.approved)
                                  .sort((a, b) => b.createdAt - a.createdAt)
                                  .slice(0, 8)
                                  .map((vid) => {
                                      return (
                                          <SwiperSlide key={vid.id}>
                                              <MovieBox {...vid} />
                                          </SwiperSlide>
                                      );
                                  })
                            : fallbackVids.map((vid, i) => {
                                  return (
                                      <SwiperSlide key={i}>
                                          <MovieBoxMock />
                                      </SwiperSlide>
                                  );
                              })}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}

export default RecentlyAdded;

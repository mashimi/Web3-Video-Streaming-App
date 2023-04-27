import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { HiPresentationChartLine } from 'react-icons/hi';
import useVideos from '../../hooks/useVideos';
import MovieBox from '../../components/general/MovieBox';
import MovieBoxMock from '../../mock-components/MovieBoxMock';

function TopTrending() {
    const { contract, loadVideoSubscribers, blockchainVideos } = useVideos();
    const fallbackVids = [1, 2, 3, 4, 5, 6, 7, 8];
    const [vidSubscribers, setVidSubscribers] = useState([]);

    /* ------------------------------------------------ */
    //      GET VIDEO WITH MOST SUBSCRIBERS
    /* ------------------------------------------------ */
    useEffect(() => {
        let cancelled = false;
        if (contract && blockchainVideos.length > 0) {
            async function getVidSubscribers() {
                let vidsWithSubs = [];
                for (let i = 0; i < blockchainVideos.length; i++) {
                    const subs = await loadVideoSubscribers(contract, Number(i + 1));
                    vidsWithSubs.push({ ...blockchainVideos[i], subscribers: [...subs?.map((sub) => sub[0])] });
                }
                setVidSubscribers(vidsWithSubs);
            }
            if (!cancelled) {
                getVidSubscribers();
            }
        }

        // CLEANUP ----------------------------
        return () => (cancelled = true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contract, blockchainVideos]);

    console.log('SUBS', vidSubscribers);

    return (
        <section className='pb-5 '>
            <div className='container pb-5'>
                <h2 className='text-lg lh-1 mb-4 d-flex align-items-center'>
                    <HiPresentationChartLine size='3.5rem' className='text-primary' />
                    <div className='ms-2'>Top Trending</div>
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
                            ? vidSubscribers
                                  .filter((vid) => vid.approved)
                                  .sort((a, b) => b?.subscribers?.length - a?.subscribers?.length)
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

export default TopTrending;

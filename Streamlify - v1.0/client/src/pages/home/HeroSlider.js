import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper';

import HeroSlide from './HeroSlide';
import HeroSlideMock from '../../mock-components/HeroSlideMock';

function HeroSlider({ data }) {
    return (
        <section>
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                effect={'fade'}
                modules={[EffectFade]}
                onSlideChange={() => console.log('slide change')}
                // onSwiper={(swiper) => console.log(swiper)}
            >
                {data?.length > 0 ? (
                    data.map((vid) => {
                        return (
                            <SwiperSlide key={vid.id}>
                                <HeroSlide {...vid} />
                            </SwiperSlide>
                        );
                    })
                ) : (
                    <SwiperSlide>
                        <HeroSlideMock />
                    </SwiperSlide>
                )}
            </Swiper>
        </section>
    );
}

export default HeroSlider;

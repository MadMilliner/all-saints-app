'use client'
import React from 'react'
import { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import Slide1 from 'public/img/slideshow/Photo4-22-2023_95914AM.jpg'
import Slide2 from 'public/img/slideshow/Photo7-27-2025_60708PM.jpg'
import Slide3 from 'public/img/slideshow/Photo3-30-2025_54941PM.jpg'
import Slide4 from 'public/img/slideshow/Photo8-25-2024_51911PM.jpg'
import Slide5 from 'public/img/slideshow/Photo4-09-2023_100501AM.jpg'

export default function Slideshow() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()])

//   const goToPrev = () => emblaApi?.goToPrev()
//   const goToNext = () => emblaApi?.goToNext()

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.plugins().autoplay?.play()
  }, [emblaApi])

  return (
    <div className="embla" id='slideshow'>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide"><Image src={Slide1} alt=''/></div>
          <div className="embla__slide"><Image src={Slide2} alt=''/></div>
          <div className="embla__slide"><Image src={Slide3} alt=''/></div>
          <div className="embla__slide"><Image src={Slide4} alt=''/></div>
          <div className="embla__slide"><Image src={Slide5} alt=''/></div>
        </div>
      </div>

      {/* <button className="embla__prev">Scroll to prev</button>
      <button className="embla__next">Scroll to next</button> */}
    </div>
  )
}
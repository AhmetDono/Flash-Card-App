import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { IoIosArrowForward } from "react-icons/io";

function FlashCard() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const flash = useSelector((state) => state.flashCard.QAs.find(QAs => QAs._id === id));

  const [isQuestionVisible, setIsQuestionVisible] = useState(true);
  const [aktifSoruIndex, setAktifSoruIndex] = useState(0);

  const toggleQuestionVisibility = () => {
    setIsQuestionVisible(!isQuestionVisible);
  };

  const sonrakiSoruyaGec = () => {
    setIsQuestionVisible(true); // Ensure question is visible when moving to the next question
    setAktifSoruIndex((prevIndex) =>
      prevIndex === flash.QA.length - 1 ? 0 : prevIndex + 1
    );
  };

  const oncekiSoruyaGec = () => {
    setIsQuestionVisible(true); // Ensure question is visible when moving to the previous question
    setAktifSoruIndex((prevIndex) =>
      prevIndex === 0 ? flash.QA.length - 1 : prevIndex - 1
    );
  };
  

  return (
    <>
    <div className='bg-koyuyesil' >
    <Header />
        <div className='row mt-4 flex align-items-center justify-content-center' >
        <div className='col-1' >  
          <button onClick={oncekiSoruyaGec} className='bg-koyumavis text-white h-screen w-full'><IoIosArrowForward className='h-16 w-16 transform rotate-180' /></button>
          </div>
          <div onClick={toggleQuestionVisibility} className=' col-10 h-screen bg-blue-200 cursor-pointer p-4 border-solid border-black border-1 d-flex align-items-center justify-content-center' >
            {/* Toggle between displaying question and answer */}
            <div>
              <strong className='text-xl'>{isQuestionVisible ? 'Soru:' : 'Cevap:'}</strong>{' '}
              {isQuestionVisible ? flash.QA[aktifSoruIndex].question : flash.QA[aktifSoruIndex].answer}
            </div>
          </div>
          <div className='col-1' >  
          <button onClick={sonrakiSoruyaGec} className='bg-koyumavis text-white h-screen w-full'><IoIosArrowForward className='h-16 w-16' /></button>
          </div>
        </div>
      <Footer />
    </div>
    </>
  );
}

export default FlashCard;

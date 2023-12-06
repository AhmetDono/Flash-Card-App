import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

function FlashCards() {
  const dispacth = useDispatch();
  const navigate = useNavigate();

  const [allCard,setAllCard] = useState([])
  const flashCards = useSelector((state) => state.flashCard.QAs) || [];

  useEffect(()=>{
    setAllCard(flashCards)
  },[flashCards])

  const handleDivClick = (id) => {
    navigate(`/flashCard/${id}`);
  };

  return (
    <>
    <div className='bg-koyuyesil' >
    <Header/>
      <div className='mt-12' >
            <div className='text-center font-bold text-white text-3xl' >TUM CARD'LAR</div>
            <div className='row h-screen mt-2 flex items-center justify-between' >
            {allCard.map((flashCard) => (
              <div key={flashCard._id} onClick={() => handleDivClick(flashCard._id)} className='col-3 cursor-pointer bg-acikmavis h-48 w-64 ml-5 mr-5 rounded-sm shadow-lg d-flex flex-column justify-content-center align-items-center'>
                <span className='font-bold'>Card Adi: {flashCard.cartName}</span>
                <span className='font-bold'>Soru Sayisi: {flashCard.QA.length}</span>
                <span className='font-bold'>Etiketler:{flashCard.cat.map(cat => cat.catName).join(', ')}</span>
                <span className='font-bold'>Tıklanma Sayısı: {flashCard.click}</span>
                <span className='font-bold'>Olusturan: {flashCard.userID.name}</span>
              </div>
            ))}
            </div>
      </div>
    <Footer/>
    </div>
    </>
  )
}

export default FlashCards
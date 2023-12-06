import React, { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getAllFlashCards } from '../store/apiCalls';

function Home() {
  const dispacth = useDispatch();
  const navigate = useNavigate();
  //!POPULER CARDS
  const flashCards = useSelector((state) => state.flashCard.QAs) || [];

  useEffect(()=>{
    getAllFlashCards(dispacth)
  },[dispacth])
  
  // Click sayısına göre sırala
  const sortedFlashCards = [...flashCards].sort((a, b) => b.click - a.click);
  // İlk 4 veriyi almak için slice kullanılıyor
  const topFourClickedFlashCards = sortedFlashCards.slice(0, 4);
  //!POPULER CARDS

  const handleDivClick = (id) => {
    navigate(`/flashCard/${id}`);
  };


  return (
    <>
    <div className='bg-koyuyesil' >
    <Header/>
      <div className='mt-12 mb-10 justify-center'>
        <div className='row'>
          <div className='col-6'>
            <div className='ml-6 h-64 bg-acikmavis p-4 p-4 flex flex-col justify-center items-center'>
            <NavLink to={'/flashcards'}>
                      <h5 class="mb-2 text-2xl font-bold tracking-tight">BUTUN FLASHLARI GOR</h5>
            </NavLink>
            </div>
          </div>
          <div className='col-6'>
            <div className='mr-6 h-64 bg-acikmavis p-4 p-4 flex flex-col justify-center items-center'>
            <NavLink to={'/createFlashCard'}>
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">KENDIN FLASH OLUSTUR</h5>
            </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8  ' >
      <div className='text-center font-bold text-white text-3xl' >KATEGORILER</div>
        <div className='row mt-2 flex items-center justify-between' >
          <div className='col-2 h-12 w-32 ml-10 flex justify-center items-center'>
          <button type="button"  class="focus:outline-none font-bold text-white bg-koyumavis hover:koyuyesil focus:ring-4 focus:koyuyesil font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-koyuyesil dark:hover:bg-koyuyesil dark:focus:ring-koyuyesil">Purple</button>
          </div>
          <div className='col-2 h-12 w-32 flex justify-center items-center'>
          <button type="button" class="focus:outline-none font-bold text-white bg-koyumavis hover:koyuyesil focus:ring-4 focus:koyuyesil font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-koyuyesil dark:hover:bg-koyuyesil dark:focus:ring-koyuyesil">Purple</button>
          </div>
          <div className='col-2 h-12 w-32 flex justify-center items-center'>
          <button type="button" class="focus:outline-none font-bold text-white bg-koyumavis hover:koyuyesil focus:ring-4 focus:koyuyesil font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-koyuyesil dark:hover:bg-koyuyesil dark:focus:ring-koyuyesil">Purple</button>
          </div>
          <div className='col-2 h-12 w-32 flex justify-center items-center'>
          <button type="button" class="focus:outline-none font-bold text-white bg-koyumavis hover:koyuyesil focus:ring-4 focus:koyuyesil font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-koyuyesil dark:hover:bg-koyuyesil dark:focus:ring-koyuyesil">Purple</button>
          </div>
          <div className='col-2 h-12 w-32 flex justify-center items-center'>
          <button type="button" class="focus:outline-none font-bold text-white bg-koyumavis hover:koyuyesil focus:ring-4 focus:koyuyesil font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-koyuyesil dark:hover:bg-koyuyesil dark:focus:ring-koyuyesil">Purple</button>
          </div>
          <div className='col-2 h-12 w-32 flex justify-center items-center'>
          <button type="button" class="focus:outline-none font-bold text-white bg-koyumavis hover:koyuyesil focus:ring-4 focus:koyuyesil font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-koyuyesil dark:hover:bg-koyuyesil dark:focus:ring-koyuyesil">Purple</button>
          </div>
          <div className='col-2 h-12 w-32 mr-10 flex justify-center items-center'>
          <button type="button" class="focus:outline-none font-bold text-white bg-koyumavis hover:koyuyesil focus:ring-4 focus:koyuyesil font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-koyuyesil dark:hover:bg-koyuyesil dark:focus:ring-koyuyesil">Purple</button>
          </div>
        </div>
      </div>
      <div className='mt-8' >
          <div className='text-center font-bold text-white text-3xl' >POPULER CARD'LAR</div>
          <div className='row h-56 mt-2 flex items-center justify-between' >
          {topFourClickedFlashCards.map((flashCard) => (
            <div key={flashCard._id} onClick={() => handleDivClick(flashCard._id)} className='col-3 cursor-pointer bg-acikmavis h-48 w-64 ml-5 mr-5 rounded-sm shadow-lg d-flex flex-column justify-content-center align-items-center'>
              <span className='font-bold'>Card Adi: {flashCard.cartName}</span>
              <span className='font-bold'>Soru Sayisi: {flashCard.QA.length}</span>
              <span className='font-bold'>Etiketler:{flashCard.cat.map(cat => cat.catName).join(', ')}</span>
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

export default Home
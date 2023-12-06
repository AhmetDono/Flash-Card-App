import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { createFlashCard } from "../store/apiCalls";
import { useDispatch, useSelector } from "react-redux";

function CreateFlashCard() {
  const userID = useSelector((state)=>state.auth.currentUser._id);
  const dispatch= useDispatch();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [catInput, setCatInput] = useState("");
  const [cats, setCats] = useState([]);
  const [QAs, setQAs] = useState([]);
  const [cardName,setCardName] = useState('')
  const [flashcards,setFlashCards]=useState({
    cartName:cardName,
    QA: [],
    cat: [],
    userID:userID,
  })

  useEffect(() => {
    console.log("flashcard has been updated");
  }, [QAs]);

  useEffect(() => {
    console.log("cats has been updated");
  }, [cats]);

  //!sorulari ekleme
  const handleClick = () => {
    if (question === "" || answer === "") {
      alert("Soru veya cevap bos birakilamaz");
    } else {
      const newQAs = {
        question: question.trim(),
        answer: answer.trim(),
      };
      setQAs((prevQAs) => [...prevQAs, newQAs]);
      setQuestion("");
      setAnswer("");
    }
  };
  //!sorulari silme
  const handleDelete = (index) => {
    setQAs((prevFlashcards) => {
      const updatedFlashcards = [...prevFlashcards];
      updatedFlashcards.splice(index, 1);
      return updatedFlashcards;
    });
  };
  //!kategorileri ekleme
  const handleCatClick = () => {
    if (catInput === "") {
      alert("Kategori kısmı boş bırakılamaz");
    } else {
      if (cats.length >= 5) {
        alert("En fazla 5 kategori ekleyebilirsiniz");
      } else {
        const newCat = {
          catName: catInput.trim(),
        };
        setCats((prevCat) => [...prevCat, newCat]);
        setCatInput("");
      }
    }
  };
  //! kategorileri silme
  const handleDeleteCat = (index) => {
    setCats((prevCats) => {
      const updatedCat = [...prevCats];
      updatedCat.splice(index, 1);
      return updatedCat;
    });
  };
  //!sorulari ve kategoriyi kaydetme
  const [createFlashCardFlag, setCreateFlashCardFlag] = useState(false);

  const handleSave = () => {
    if (QAs.length === 0 || cats.length === 0 || cardName==='') {
      alert("Soru ,Kategori veya Card ismi Bos Olamaz")
    }
    else{
      setFlashCards({
        cartName: cardName,
        QA: QAs,
        cat: cats,
        userID:userID
      });
      // createFlashCard'ı bir kere çağırmak için bayrağı ayarla
      setCreateFlashCardFlag(true);
    }
  };

  // Bayrak değiştiğinde çalışacak useEffect
  useEffect(() => {
    if (createFlashCardFlag) {
      createFlashCard(dispatch, flashcards);
      // Bayrağı sıfırla, tekrar çağrılmasını engelle
      setCreateFlashCardFlag(false);
    }
  }, [createFlashCardFlag, dispatch, flashcards]);

  useEffect(() => {
    if (createFlashCardFlag) {
      window.location.href = `/profile/${userID}`; // "/profile" yerine hedeflenen sayfa rotasını belirtin
    }
  }, [createFlashCardFlag]);
  
  console.log(QAs,cats)
  return (
    <>
    <div className="bg-koyuyesil" >
    <Header />
        <div className="flex justify-center items-center ">
          <div className="text-center col-12 h-full w-full">
            <div className="row" >
              <div className=" col-8 mt-12 d-flex flex-column justify-content-center align-items-center ">
                <span className="mt-16 mb-8 text-white text-bold text-2xl">SORU EKLE</span>
                <input
                  type="text"
                  onChange={(e) => setQuestion(e.target.value)}
                  value={question}
                  className="block mb-8 w-3/4 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Soru Gir"
                ></input>
                <input
                  type="text"
                  onChange={(e) => setAnswer(e.target.value)}
                  value={answer}
                  className="block mb-8 w-3/4 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Cevap Gir"
                ></input>
                <button
                  type="button"
                  onClick={() => handleClick()}
                  class="focus:outline-none font-bold text-white bg-koyumavis hover:bg-koyumavis focus:ring-4 focus:koyumavis font-medium rounded-lg text-sm px-5 py-2.5 mb-8 dark:bg-koyumavis dark:hover:bg-blue-700 dark:focus:koyumavis"
                >
                  Ekle
                </button>
              </div>
              <div className=" col-4 mt-12 d-flex flex-column justify-content-center align-items-center ">
                <div className="col-6 d-flex flex-column justify-content-center align-items-center" >
                <span className="mt-16 mb-8 text-white text-bold text-2xl">Card Ismi</span>
                <input
                  type="text"
                  onChange={(e)=>setCardName(e.target.value)}
                  value={cardName}
                  className="block mb-8 w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Card Ismi"
                ></input>
                </div>
                <div className="col-6 d-flex flex-column justify-content-center align-items-center" >
                <span className="mt-16 mb-8 text-white text-bold text-2xl">KATEGORI EKLE</span>
                <input
                  type="text"
                  value={catInput}
                  onChange={(e) => setCatInput(e.target.value)}
                  className="block mb-8 w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Kategori Gir"
                ></input>
                <button
                  type="button"
                  onClick={() => handleCatClick()}
                  class="focus:outline-none font-bold text-white bg-koyumavis hover:bg-koyumavis focus:ring-4 focus:koyumavis font-medium rounded-lg text-sm px-5 py-2.5 mb-8 dark:bg-koyumavis dark:hover:bg-blue-700 dark:focus:koyumavis"
                >
                  Ekle
                </button>
                </div>
              </div>
            </div>
            <div  className="row">
              <div className="col-8 mb-8 mt-8 d-flex flex-column justify-content-center align-items-center">
                {QAs.map((QA, index) => (
      <div
        key={index}
        className="mb-2 w-full d-flex justify-content-between"
      >
                      <div className="w-3/4">
                        <span>
                          Soru {index + 1}: {QA.question}. Cevap:{" "}
                          {QA.answer}.{" "}
                        </span>
                      </div>
                      <div className="w-1/4 ">
                        <button
                          type="button"
                          onClick={() => handleDelete(index)}
                          className="focus:outline-none font-bold text-white bg-koyumavis hover:bg-koyumavis focus:ring-4 focus:koyumavis font-medium rounded-lg text-sm px-4 py-1 mb-1 ml-4 dark:bg-koyumavis dark:hover:bg-koyumavis dark:focus:koyumavis"
                        >
                          Sil
                        </button>
                      </div>
                    </div>
                ))}
              </div>
              <div className="col-4 mb-8 mt-8 d-flex flex-column justify-content-center align-items-center">
                {cats.map((cat, index) => (
      <div
        key={index}
        className="mb-2 w-full d-flex justify-content-between"
      >
                      <div className="w-3/4">
                        <span>
                          Kategori {index + 1}: {cat.catName}.
                        </span>
                      </div>
                      <div className="w-1/4 ">
                        <button
                          type="button"
                          onClick={() => handleDeleteCat(index)}
                          className="focus:outline-none font-bold text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-1 mb-1 ml-4 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        >
                          Sil
                        </button>
                      </div>
                    </div>
                ))}
              </div>
              <div>
              <button
                  type="button"
                  onClick={() => handleSave()}
                  class="focus:outline-none w-96 font-bold text-white bg-koyumavis hover:bg-koyumavis focus:ring-4 focus:koyumavis font-medium rounded-lg text-sm px-5 py-2.5 mb-8 dark:bg-koyumavis dark:hover:bg-blue-700 dark:focus:koyumavis"
                >
                  Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
      <Footer />
    </div>
    </>
  );
}

export default CreateFlashCard;

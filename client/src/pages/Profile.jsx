import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { FaTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router";
import axios from "axios";

function Profile() {
  const user = useSelector((state) => state.auth.currentUser);
  const [usersFlash, setUsersFlash] = useState([]);
  const navigate = useNavigate();
  const flashCards = useSelector((state) => state.flashCard.QAs || []);
  console.log(flashCards);
  const filteredFlashCards = flashCards.filter(
    (flashCard) => flashCard.userID._id === user._id
  );
  useEffect(() => {
    setUsersFlash(filteredFlashCards);
  }, [flashCards, filteredFlashCards]);

  const handleDivClick = (id) => {
    navigate(`/flashCard/${id}`);
  };

  const handleDelete = (id) => {
    // Make an HTTP request with Axios
    axios
      .delete(`http://localhost:5000/api/flash/flashCard/${id}`)
      .then((response) => {
        // Handle the response
        console.log(response.data);
        
        // Filter out the deleted flashCard from usersFlash
        const updatedUsersFlash = usersFlash.filter((flashCard) => flashCard._id !== id);
        
        // Update the state with the filtered list
        setUsersFlash(updatedUsersFlash);
      })
      .catch((error) => {
        // Check if the request was cancelled
        if (axios.isCancel(error)) {
          console.log("Request cancelled", error.message);
        } else {
          // Handle other errors
          console.log("Error:", error.message);
        }
      });
  };

  return (
    <>
      <div className="bg-koyuyesil">
        <Header />
        <div>
          <div className="row mt-12">
            <div className="col-12 h-36 w-full ">
              <div className="row">
                <div className="col-5 ml-8 bg-blue-300  h-36 flex items-center">
                  <div>
                    <span className="font-bold text-2xl ">
                      Kullanici Adi: {user.name}
                    </span>
                    <br />
                    <span className="font-bold">
                      Kullanici Maili: {user.email}
                    </span>
                    <br />
                    <span className="font-bold">
                      Toplam Flash: {filteredFlashCards.length}
                    </span>
                    <br />
                    <span className="font-bold">
                      Toplam Click: !TODO
                    </span>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-12">
            <div className="text-center font-bold text-white text-3xl">
              CARD'LARIN
            </div>
            <div className="row h-screen flex items-center justify-between">
              {usersFlash.map((flashCard) => (
                <div className="col-3 cursor-pointer bg-blue-300 h-48 w-64 ml-5 mr-5 rounded-sm shadow-lg d-flex flex-column justify-content-center align-items-center">
                  <div
                    key={flashCard._id}
                    onClick={() => handleDivClick(flashCard._id)}
                    className="d-flex flex-column justify-content-center align-items-center"
                  >
                    <span className="font-bold">
                      Card Adi: {flashCard.cartName}
                    </span>
                    <span className="font-bold">
                      Soru Sayisi: {flashCard.QA.length}
                    </span>
                    <span className="font-bold">
                      Etiketler:
                      {flashCard.cat.map((cat) => cat.catName).join(", ")}
                    </span>
                    <span className="font-bold">
                      Tıklanma Sayısı: {flashCard.click}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(flashCard._id)}
                    className="mt-2 bg-koyumavis h-6 w-32 text-white flex justify-center items-center"
                  >
                    <FaTrashCan />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Profile;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NoteModal from "./NoteModal";
import { FaArrowAltCircleRight } from "react-icons/fa";


const Home = () => {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const navigate = useNavigate();

  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); 
      return;
    }

    try {
      const { data } = await axios.get("http://localhost:5000/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(data);
    } catch (err) {
      console.error("Error fetching notes", err);
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotes(); // Refresh notes after deletion
    } catch (err) {
      console.error("Error deleting note", err);
    }
  }; 

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="">
      <button
        onClick={() => setShowModal(true)}
        className=" fixed right-10 bottom-10 font-extrabold bg-blue-600 p-4 rounded outline-none"
      >
        +
      </button>
      <div className="mt-6 mx-5  grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {notes.map((note) => (
          <div
            key={note._id}
            className="bg-white border border-gray-200 rounded-lg shadow-md p-4 transition-transform duration-300 hover:scale-105 hover:shadow-gray-800"
          >
            <div className="flex bg-blue-500 rounded-md px-1">
            <FaArrowAltCircleRight className="mt-1 mr-1"/>
            <p className="font-bold  text-gray-800 mb-2 bg-transparent">
              {note.title}
            </p>
            </div>
            <p className="text-gray-600 mb-4">{note.content}</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setSelectedNote(note);
                  setShowModal(true);
                }}
                className="bg-blue-600 hover:scale-105 text-white px-3 py-1 rounded-lg shadow transition-all duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(note._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow transition-all duration-300 hover:scale-105 "
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <NoteModal
          showModal={showModal}
          setShowModal={setShowModal}
          fetchNotes={fetchNotes}
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
        />
      )}
    </div>
  );
};

export default Home;

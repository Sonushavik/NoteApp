import { useState, useEffect } from "react";
import axios from "axios";

const NoteModal = ({ showModal, setShowModal, fetchNotes, selectedNote, setSelectedNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
    }
  }, [selectedNote]);

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (selectedNote) {
      await axios.put(
        `http://localhost:5000/api/notes/${selectedNote._id}`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } else {
      await axios.post(
        "http://localhost:5000/api/notes",
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
    fetchNotes();
    setShowModal(false);
    setSelectedNote(null);
    setTitle("");
    setContent("");
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${!showModal && "hidden"}`}>
      <div className="bg-[#f0f0f0] p-5 rounded-md shadow-2xl ">
        <h2 className="text-center text-blue-900 font-bold mb-2 ">{selectedNote ? "Edit Note" : "Add Note"}</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-1 rounded-md text-gray-500 mb-4 outline-none"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows="4"
          className="w-full p-1 rounded-md text-gray-500 mb-4 outline-none"
        />
        <div className="flex justify-end">
          <button
            onClick={() => setShowModal(false)}
            className="bg-gray-500 text-white p-2 rounded mr-2"
          >
            Cancel
          </button>
          <button onClick={handleSave} className="bg-green-500 text-white p-2 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;

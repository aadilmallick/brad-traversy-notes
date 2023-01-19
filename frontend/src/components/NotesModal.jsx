import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import noteService from "../utils/noteService";
import { addNotes, setLoading } from "../features/notes/notesSlice";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const NotesModal = ({ id, token }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.notes);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const response = await noteService.createNote(text, id, token);
      console.log("note back:", response);
      dispatch(addNotes(response));
      dispatch(setLoading(false));

      setIsOpen(false);
      toast.success("created note!!!");
    } catch (e) {
      toast.error(e);
    }
  };
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open notes modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="example modal"
      >
        <h2>Hello!! This is a modal!</h2>
        <form onSubmit={onSubmit}>
          <textarea
            value={text}
            cols="30"
            rows="10"
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
          <button>submit</button>
        </form>
      </Modal>
    </div>
  );
};

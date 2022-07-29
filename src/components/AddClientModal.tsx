import { FC, useState } from 'react';
import Modal from '../shared/Modal';

const AddClientModal: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClickModal = () => setIsOpen(!isOpen);
  return (
    <div className="mt-7">
      <button
        onClick={handleClickModal}
        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        click
      </button>
      {isOpen && <Modal handleClickModal={handleClickModal} />}
    </div>
  );
};

export default AddClientModal;

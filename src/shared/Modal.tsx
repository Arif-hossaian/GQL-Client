import { useMutation } from '@apollo/client';
import { FC, ReactNode, useState } from 'react';
import { ADD_CLIENT } from '../mutation/ClientMutation';
import { GET_CLIENTS } from '../queries/ClientQueries';
import Input from './Input';

interface ModalProps {
  modalTitle?: string;
  children?: ReactNode;
  handleClickModal: any;
}

const Modal: FC<ModalProps> = ({ modalTitle, handleClickModal }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [addClient] = useMutation<any>(ADD_CLIENT);

  const handleAddClient = (name: string, email: string, phone: string) => {
    addClient({
      variables: { name, email, phone },
      update(cache, { data: { addClient } }) {
        const { clients }: any = cache.readQuery({ query: GET_CLIENTS });

        cache.writeQuery({
          query: GET_CLIENTS,
          data: { clients: [...clients, addClient] },
        });
      },
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (name === '' || email === '' || phone === '') {
      return alert('Please fill in all fields');
    }
    handleAddClient(name, email, phone);
    setName('');
    setEmail('');
    setPhone('');
  };
  return (
    <div
      id="defaultModal"
      className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center  flex bg-black bg-opacity-50"
      aria-modal="true"
      role="dialog"
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {modalTitle}
            </h3>
            <button
              onClick={handleClickModal}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-6 space-y-6">
            <form onSubmit={handleSubmit}>
              <Input
                name="name"
                label="Enter Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                name="email"
                label="Enter Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                name="phone"
                label="Enter Phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <div className=" dark:border-gray-600">
                <button
                  type="submit"
                  data-modal-toggle="defaultModal"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

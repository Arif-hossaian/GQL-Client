import { useMutation } from '@apollo/client';
import { FC } from 'react';
import DeleteIcon from '../icons/DeleteIcon';
import { DELETE_CLIENT } from '../mutation/ClientMutation';
import { GET_CLIENTS } from '../queries/ClientQueries';

interface ClientProps {
  client?: any;
}

const TableRow: FC<ClientProps> = ({ client }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT);

  const handleDelete = () => {
    deleteClient({
      variables: {
        id: client.id,
      },
      refetchQueries: [{ query: GET_CLIENTS }],
      // update(cache, { data: { deleteClient } }) {
      //   const { clients } = cache.readQuery({ query: GET_CLIENTS });
      //   cache.writeQuery({
      //     query: GET_CLIENTS,
      //     data: {
      //       clients: clients.filter((client) => client.id !== deleteClient.id),
      //     },
      //   });
      // },
    });
  };
  return (
    <tbody className="divide-y divide-gray-100">
      <tr>
        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
          {client?.name}
        </td>
        <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
          {' '}
          {client?.email}
        </td>
        <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
          {' '}
          {client?.phone}
        </td>
        <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
          {' '}
          <button onClick={handleDelete as any}>
            <DeleteIcon />
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default TableRow;

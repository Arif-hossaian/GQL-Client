import { FC, Key } from 'react';
import { useQuery } from '@apollo/client';
import Spinner from './Spinner';
import TableRow from '../shared/TableRow';
import Table from '../shared/Table';
import TableColumn from '../shared/TableColumn';
import { GET_CLIENTS } from '../queries/ClientQueries';

const Clients: FC = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  if (loading) return <Spinner />;
  if (error)
    return <p className="text-red-500 text-center">Something went wrong</p>;
  return (
    <div className="mt-10">
      {!loading && !error && (
        <div className="overflow-hidden overflow-x-auto border border-gray-100 rounded">
          <Table>
            <TableColumn />
            {data?.clients?.map((client: any, id: Key) => (
              <TableRow key={id} client={client} />
            ))}
          </Table>
        </div>
      )}
    </div>
  );
};

export default Clients;

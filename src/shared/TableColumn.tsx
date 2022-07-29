import { FC } from 'react';
import { tableColumns } from '../constants/data';

const TableColumn: FC = () => {
  return (
    <thead>
      <tr className="bg-gray-50">
        {tableColumns.map((content, id) => (
          <th
            key={id}
            className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap"
          >
            {content.name}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableColumn;

import { FC } from 'react';
interface TableChildrenProps {
  children: React.ReactNode;
}

const Table: FC<TableChildrenProps> = ({ children }) => {
  return (
    <table className="min-w-full text-sm divide-y divide-gray-200">
      {children}
    </table>
  );
};

export default Table;

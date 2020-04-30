import React from 'react';
import classnames from 'classnames';

export interface TableColumn {
    header: string;
    headerClassName?: string;
    renderCell: (data?: any, index?: number) => any;
    cellClassName?: string;
}

type TableProps = {
    columns: TableColumn[];
    data: any;
    keySelector: string;
    className?: string;
}

const Table = ({ columns, data, keySelector, className }: TableProps): JSX.Element => {
    return <table className={classnames('table', className)}>
        <thead>
            <tr>
                {columns &&
                    columns.map(column =>
                            <th key={column.header} className={column.headerClassName}>
                                {column.header}
                            </th>
                        )}
            </tr>
        </thead>
        <tbody>
            {data &&
                data.map((row, index) =>
                        <tr key={row[keySelector]}>
                            {columns.map((column, cIndex) =>
                                <td key={`${index}_${cIndex}`} className={column.cellClassName}>
                                    {column.renderCell(row, index)}
                                </td>)}
                        </tr>
                    )
            }
        </tbody>
    </table>
}

export default Table;
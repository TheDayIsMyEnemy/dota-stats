import React from 'react';
import classnames from 'classnames';

export type TableHeaderConfig = {
    name: string;
    className?: string;
}

export type TableDataConfig = {
    render: (data?: any, index?: number) => any;
    className?: string;
}

export interface TableConfig {
    keyId: string;
    tableHeaders: TableHeaderConfig[];
    tableData: TableDataConfig[];
    className?: string;
}

type TableProps = {
    config: TableConfig;
    data: any;
}

const Table = ({ config, data }: TableProps): JSX.Element => {
    return <table className={classnames('table', config.className)}>
        <thead>
            <tr>
                {config.tableHeaders &&
                    config.tableHeaders
                        .map(column =>
                            <th key={column.name} className={column.className}>
                                {column.name}
                            </th>
                        )}
            </tr>
        </thead>
        <tbody>
            {data &&
                data
                    .map((row, rowIndex) =>
                        <tr key={row[config.keyId]}>
                            {config.tableData.map((column, columnIndex) =>
                                <td key={`${rowIndex}_${columnIndex}`} className={column.className}>
                                    {column.render(row, rowIndex)}
                                </td>)}
                        </tr>
                    )
            }
        </tbody>
    </table>
}

export default Table;
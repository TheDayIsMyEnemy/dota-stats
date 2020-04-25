import React from 'react';
import { Table } from 'reactstrap';

export type TableHeader = {
    name: string;
    className?: string;
}

export type TableData = {
    render: (props?: Object, index?: number) => any;
    className?: string;
}

export interface TableConfig {
    renderTableRowKey: (props?: Object) => string;
    tableHeaders: TableHeader[];
    tableData: TableData[];
    className?: string;
}

type CommonTableProps = {
    config: TableConfig;
    data: any;
}

const CommonTable = ({ config, data }: CommonTableProps): JSX.Element => {
    return <Table className={config.className}>
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
                    .map((item, i) =>
                        <tr key={config.renderTableRowKey(item)}>
                            {config.tableData.map((cell, j) =>
                                <td key={j} className={cell.className}>
                                    {cell.render(item, i)}
                                </td>)}
                        </tr>
                    )
            }
        </tbody>
    </Table>
}

export default CommonTable;
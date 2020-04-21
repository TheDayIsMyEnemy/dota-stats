import React from 'react';
import { Table } from 'reactstrap';

export type TableHeader = {
    title: string;
    className?: string;
}

export type TableRow = {
    key: any;
    renderItem: any;
    className?: string;
}

type CommonTableProps = {
    headers: TableHeader[];
    data: TableRow[];
}

const CommonTable = ({ headers, data }: CommonTableProps): JSX.Element => {
    // console.log(headers)
    // console.log(data)
    return <Table>
        <thead>
            <tr>
                {headers && headers.map(h => <th className={h.className}>{h.title}</th>)}
            </tr>
        </thead>
        <tbody>
            {data && data.map(r => <tr key={r.key} className={r.className}>
                {r.renderItem()}
            </tr>)}
        </tbody>
    </Table>
}

export default CommonTable;
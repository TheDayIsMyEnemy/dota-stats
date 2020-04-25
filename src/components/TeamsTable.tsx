import React from 'react';
import { Progress } from 'reactstrap';
import CommonTable, { TableHeader } from './CommonTable';
import { getOrdinal } from '../utilities/utilities';

type Team = {
    team_id: number;
    rating: number;
    wins: number;
    losses: number;
    last_match_time: number;
    name: string;
    tag: string;
    logo_url: string;
}

type TeamsTableProps = {
    teams: Team[];
}

const TeamsTable = ({ teams }: TeamsTableProps) => {
    let config = {
        renderTableRowKey: ({ team_id }) => team_id,
        tableHeaders: [
            { name: "Rank" },
            { name: "Name" },
            { name: "Rating" },
            { name: "Wins" },
            { name: "Losses" }
        ],
        tableData: [
            { render: (_, index) => getOrdinal(++index) },
            { render: ({ tag, logo_url, name }) => <><img key={tag} src={logo_url} alt={tag} />{name}</> },
            { render: ({ rating }) => Math.floor(rating) },
            { render: ({ wins }) => wins },
            { render: ({ losses }) => losses, }
        ],
    }

    return <CommonTable config={config} data={teams && teams.slice(0, 100)} />
}

export default TeamsTable;
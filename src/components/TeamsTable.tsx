import React from 'react';
import { Progress } from 'reactstrap';
import Table from './Table';
import { getOrdinal, getPercentage } from '../utilities/utilities';

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
    const { rating: maxRating, wins: maxWins, losses: maxLosses } = teams !== undefined && teams[0];

    let config = {
        keyId: "team_id",
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
            {
                render: ({ rating }) => {
                    rating = Math.floor(rating);
                    return <>{rating}<Progress value={getPercentage(maxRating, rating)} color="success" /></>
                }
            },
            { render: ({ wins }) => <>{wins}<Progress value={getPercentage(maxWins, wins)} color="success" /></> },
            { render: ({ losses }) => <>{losses}<Progress value={getPercentage(maxLosses, losses)} color="success" /></>, }
        ],
    }

    return <Table config={config} data={teams && teams.slice(0, 100)} />
}

export default TeamsTable;
import React from 'react';
import { Progress } from 'reactstrap';
import Table from './Table';
import { getOrdinal, getPercentage } from '../utilities/utilities';
import moment from 'moment';
import { Link } from 'react-router-dom';

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
    const { rating: maxRating, wins: maxWins, losses: maxLosses } = (teams !== undefined && teams.length > 0) && teams[0];

    let columns = [
        {
            header: "Rank",
            renderCell: (_, index) => getOrdinal(++index)
        },
        {
            header: "Name",
            renderCell: ({ last_match_time, name, tag, logo_url }) =>
                <>
                    <img key={tag} src={logo_url} alt={tag} />
                    <span>{name}</span>
                    <div>{moment.unix(last_match_time).fromNow()}</div>

                </>
        },
        {
            header: "Rating",
            renderCell: ({ rating }) => {
                rating = Math.floor(rating);
                return <>
                    {rating}
                    <Progress value={getPercentage(Math.floor(maxRating), rating)} color="success" />
                </>
            }
        },
        {
            header: "Wins",
            renderCell: ({ wins }) => <>{wins}<Progress value={getPercentage(maxWins, wins)} color="success" /></>
        },
        {
            header: "Losses",
            renderCell: ({ losses }) => <>{losses}<Progress value={getPercentage(maxLosses, losses)} color="success" /></>
        }
    ];

    return <Table columns={columns} data={teams && teams.sort((a, b) => {
        if (a.rating == b.rating) {
            return b.last_match_time - a.last_match_time
        }
        return b.rating - a.rating;
    }).slice(0, 100)} keySelector="team_id" />
}

export default TeamsTable;
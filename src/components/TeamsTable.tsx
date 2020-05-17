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
                    <div className="d-inline-block align-middle ml-2">
                        <Link to="">{name}</Link>
                        <div className="text-sm">{moment.unix(last_match_time).fromNow()}</div>
                    </div>
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

    let currentYear = new Date().getFullYear();
    teams = teams && teams.filter(t => moment.unix(t.last_match_time).year() == currentYear).slice(0, 100);

    return <Table columns={columns} data={teams} keySelector="team_id" />
}

export default TeamsTable;
import React from 'react';
import { toMMSS } from '../utilities/utilities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import Table from './Table';
import { Link } from 'react-router-dom';

export interface ProMatch {
    match_id: number;
    duration: number;
    start_time: number;
    radiant_team_id: number;
    radiant_name: string;
    dire_team_id: number;
    dire_name: string;
    leagueid: number;
    league_name: string;
    series_id: number;
    series_type: number;
    radiant_score: number;
    dire_score: number;
    radiant_win: true;
    radiant: true
}

type ProMatchesTableProps = {
    matches: ProMatch[];
}

const ProMatchesTable = ({ matches }: ProMatchesTableProps) => {
    const columns = [
        {
            header: "Match Id",
            renderCell: ({ match_id, league_name, start_time, duration }) =>
                <>
                    <Link to="">{match_id}</Link>
                    <div className="text-sm">{moment.unix(start_time + duration).fromNow()}/{league_name}</div>
                </>
        },
        {
            header: "Duration",
            renderCell: ({ duration }) => toMMSS(duration), cellClassName: "align-middle"
        },
        {
            header: "Radiant", headerClassName: "text-success",
            renderCell: ({ radiant_win, radiant_name }) => <>
                {radiant_win && <FontAwesomeIcon icon={faTrophy} size="sm" className="mr-1" />}
                <span className="text-success">{radiant_name}</span>
            </>
        },
        {
            header: "Dire", headerClassName: "text-danger",
            renderCell: ({ radiant_win, dire_name }) => <>
                {!radiant_win && <FontAwesomeIcon icon={faTrophy} size="sm" className="mr-1" />}
                <span className="text-danger ">{dire_name}</span>
            </>
        },
    ];

    return <Table columns={columns} data={matches} keySelector="match_id"/>
}

export default ProMatchesTable;
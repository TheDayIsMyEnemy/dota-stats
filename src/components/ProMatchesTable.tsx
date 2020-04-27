import React from 'react';
import { toMMSS } from '../utilities/utilities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import Table from './Table';

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
    const config = {
        keyId: "match_id",
        tableHeaders: [
            { name: "League" }, { name: "Match Id" }, { name: "Duration" },
            { name: "Radiant", className: "text-success" }, { name: "Dire", className: "text-danger" }, { name: "Finished" }]
        ,
        tableData: [
            { render: ({ league_name }) => league_name, },
            { render: ({ match_id }) => match_id, },
            { render: ({ duration }) => toMMSS(duration), className: "text-center" },
            {
                render: ({ radiant_win, radiant_name }) => <>
                    {radiant_win && <FontAwesomeIcon icon={faTrophy} size="sm" className="mr-1" />}
                    <span className="text-success">{radiant_name}</span>
                </>,
            },
            {
                render: ({ radiant_win, dire_name }) => <>
                    {!radiant_win && <FontAwesomeIcon icon={faTrophy} size="sm" className="mr-1" />}
                    <span className="text-danger ">{dire_name}</span>
                </>,
            },
            { render: ({ start_time, duration }) => moment.utc(new Date((start_time + duration) * 1000)).fromNow(), }
        ]
    }

    return <Table config={config} data={matches} />
}

export default ProMatchesTable;
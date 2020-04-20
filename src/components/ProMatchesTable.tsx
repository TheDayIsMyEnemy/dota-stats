import React from 'react';
import { Table } from 'reactstrap';
import { toMMSS } from '../utilities/utilities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

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
    proMatchesList: ProMatch[];
}

const ProMatchesTable = ({ proMatchesList }: ProMatchesTableProps) => {
    let colPadding = "py-4";

    return <Table>
        <thead>
            <tr>
                <th className="text-info">League</th>
                <th className="text-info">Match Id</th>
                <th className="text-info">Duration</th>
                <th className="text-success">Radiant</th>
                <th className="text-danger">Dire</th>
                <th className="text-info">Finished</th>
            </tr>
        </thead>
        {proMatchesList &&
            <tbody>
                {proMatchesList && proMatchesList.map(match => {
                    let dateFromNow = moment.utc(new Date((match.start_time + match.duration) * 1000)).fromNow();
                    return <tr key={match.match_id}>
                        <td className={`text-info ${colPadding}`}>{match.league_name}</td>
                        <td className={`text-info ${colPadding}`}>{match.match_id}</td>
                        <td className={`text-info text-center ${colPadding}`}>{toMMSS(match.duration)}</td>
                        <td className={`text-warning ${colPadding}`}>{match.radiant_win && <FontAwesomeIcon icon={faTrophy} size="sm" />} <span className="text-success">{match.radiant_name}</span></td>
                        <td className={`text-warning ${colPadding}`}>{!match.radiant_win && <FontAwesomeIcon icon={faTrophy} size="sm" />} <span className="text-danger">{match.dire_name}</span></td>
                        <td className={`text-info ${colPadding}`}>{dateFromNow}</td>
                    </tr>
                })}
            </tbody>
        }
    </Table>
}

export default ProMatchesTable;
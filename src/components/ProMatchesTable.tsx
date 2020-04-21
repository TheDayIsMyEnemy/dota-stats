import React from 'react';
import { toMMSS } from '../utilities/utilities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import CommonTable, { TableHeader } from './CommonTable';

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

const headers: TableHeader[] = [
    { title: "League" }, { title: "Match Id" }, { title: "Duration" },
    { title: "Radiant", className: "text-success" }, { title: "Dire", className: "text-danger" }, { title: "Finished" }]


const ProMatchesTable = ({ matches }: ProMatchesTableProps) => {
    let colPadding = "py-3";

    let data = matches && matches.map(match => {
        let dateFromNow = moment.utc(new Date((match.start_time + match.duration) * 1000)).fromNow();
        return {
            key: `${match.match_id}`,
            renderItem: () => {
                return <>
                    <td className={colPadding}>{match.league_name}</td>
                    <td className={colPadding}>{match.match_id}</td>
                    <td className={`text-center ${colPadding}`}>{toMMSS(match.duration)}</td>
                    <td className={colPadding}>{match.radiant_win && <FontAwesomeIcon icon={faTrophy} size="sm" />} <span className="text-success">{match.radiant_name}</span></td>
                    <td className={colPadding}>{!match.radiant_win && <FontAwesomeIcon icon={faTrophy} size="sm" />} <span className="text-danger">{match.dire_name}</span></td>
                    <td className={colPadding}>{dateFromNow}</td>
                </>
            }
        }
    })

    return <CommonTable headers={headers} data={data} />
}

export default ProMatchesTable;
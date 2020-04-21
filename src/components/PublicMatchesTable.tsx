import React from 'react';
import MatchesTable, { TableHeader } from './MatchesTable';
import heroes from 'dotaconstants/build/heroes.json';
import settings from '../config';
import { toMMSS } from '../utilities/utilities';

export interface PublicMatch {
    match_id: number;
    match_seq_num: number;
    radiant_win: boolean;
    start_time: number;
    duration: number;
    avg_mmr?: number | null;
    num_mmr?: number | null;
    lobby_type: number;
    game_mode: number;
    avg_rank_tier: number;
    num_rank_tier: number;
    cluster: number;
    radiant_team: string;
    dire_team: string;
}

type PublicMatchesTableProps = {
    matches: PublicMatch[];
}

const headers: TableHeader[] = [{ title: "Match Id", }, { title: "Duration" }, { title: "Radiant", }, { title: "Dire" }]

const renderHeroImages = (team: string) => {
    return team && team.split(',').map(heroId =>
        heroes[heroId] ? (
            <img
                key={heroId}
                style={{ width: '50px' }}
                src={settings.ODOTA_URL + heroes[heroId].img}
                alt=""
            />) : null);
}

const PublicMatchesTable = ({ matches }: PublicMatchesTableProps) => {
    let colPadding = "py-1";
    console.log(heroes)
    console.log(matches);
    let data = matches && matches.map(match => {
        return {
            key: `${match.match_id}`,
            renderItem: () => {
                return <>
                    <td className={colPadding}>{match.match_id}</td>
                    <td className={colPadding}>{toMMSS(match.duration)}</td>
                    <td>
                        {renderHeroImages(match.radiant_team)}
                    </td>
                    <td>
                        {renderHeroImages(match.dire_team)}
                    </td>
                </>
            }
        }
    })

    return <MatchesTable headers={headers} data={data} />
}

export default PublicMatchesTable;
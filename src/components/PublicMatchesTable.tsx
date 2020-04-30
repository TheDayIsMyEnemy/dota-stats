import React from 'react';
import Table from './Table';
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

const renderHeroImages = (team: string) => {
    return team && team.split(',').map(heroId =>
        heroes[heroId] ? (
            <img
                key={heroId}
                src={settings.ODOTA_URL + heroes[heroId].img}
                alt={heroes[heroId].localized_name}
            />) : null);
}

const PublicMatchesTable = ({ matches }: PublicMatchesTableProps) => {
    const columns = [
        {
            header: "Match Id",
            renderCell: ({ match_id }) => match_id
        },
        {
            header: "Duration",
            renderCell: ({ duration }) => toMMSS(duration)
        },
        {
            header: "Radiant",
            renderCell: ({ radiant_team }) => renderHeroImages(radiant_team)
        },
        {
            header: "Dire",
            renderCell: ({ dire_team }) => renderHeroImages(dire_team)
        }
    ];

    return <Table columns={columns} data={matches} keySelector="match_id" />
}

export default PublicMatchesTable;
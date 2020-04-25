import React, { useEffect, useState } from 'react';
import settings from '../config';
import TeamsTable from '../components/TeamsTable';

const Teams = () => {
    const [teams, setTeams] = useState();

    useEffect(() => {
        fetch(`${settings.API_URL}/teams`)
            .then(res => res.json())
            .then(json => setTeams(json))
            .catch(er => console.log(er));
    }, [])

    return <TeamsTable teams={teams} />
}

export default Teams;
import React, { useState, useEffect } from 'react';
import ProMatchesTable, { ProMatch } from '../components/ProMatchesTable';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';
import classnames from 'classnames';
import settings from '../config';
import { enumIsDefined } from '../utilities/utilities';
import heroes from 'dotaconstants/build/heroes.json';
import wretcher from 'wretch';

export enum MatchType {
    Pro = 'pro',
    HighMmr = 'highMmr'
}

const resources = {
    pro: 'proMatches',
    highMmr: 'publicMatches?mmr_descending=1'
}

const Matches = (): JSX.Element => {
    let matchType = useLocation().pathname.split('/').pop();
    let tab = enumIsDefined(MatchType, matchType) ? matchType : MatchType.Pro;
    const [matches, setMaches] = useState<ProMatch[]>(null);
    const [activeTab, setActiveTab] = useState(tab);
    console.log(heroes);
    const toggle = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    }

    useEffect(() => {
        fetch(`${settings.API_URL}/${resources[activeTab]}`)
            .then(res => res.json())
            .then(json => setMaches(json))
            .catch(error => console.log(error))
    }, [activeTab])

    return <>
        <Nav tabs className="mb-5">
            <NavItem>
                <NavLink
                    className={classnames({ active: activeTab === MatchType.Pro })}
                    onClick={() => toggle(MatchType.Pro)}
                    to="/matches/pro"
                    tag={Link}
                >
                    PROFESSIONAL
          </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    className={classnames({ active: activeTab === MatchType.HighMmr })}
                    onClick={() => toggle(MatchType.HighMmr)}
                    to="/matches/highMmr"
                    tag={Link}
                >
                    TOP PUBLIC
          </NavLink>
            </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
            <TabPane tabId="pro">
                <ProMatchesTable proMatchesList={matches} />
            </TabPane>
            <TabPane tabId="highMmr">

            </TabPane>
        </TabContent>
    </>
}

export default Matches;
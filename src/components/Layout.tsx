import React, { Suspense } from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';

type LayoutProps = {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
    return <>
        <NavMenu />
        <Container className="content-page">
            <Suspense fallback={<div>Loading</div>}>
                {children}
            </Suspense>
        </Container>
    </>
}

export default Layout;
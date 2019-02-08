import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import App from 'component/nomad_movie/main_app/App';
import EventApp from './component/event_ex/root/EventApp';

const RootRouter = () => (
    <Fragment>
        <Route exact path="/" component={App} />
        <Route exact path="/event" component={EventApp} />
    </Fragment>
);

export default RootRouter;
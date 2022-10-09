import React from 'react';

import { Content, Header, HeaderMenuItem, HeaderName, HeaderNavigation } from'carbon-components-react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Graph from "./components/graph/Graph"
import Status from "./components/status/status";
import Test from "./components/test/Test"
import NewGraph from "./components/graph_new/Graph"
import FullTextSearch from "./components/fulltextsearch/Search"
import AboutUs from './components/about_us/AboutUs'

import 'carbon-components/css/carbon-components.min.css';

function App() {
  return (
      <div>
        <Router>
          <div className="container">
            <Header aria-label="IBM Knowledge Graph">
              <HeaderName prefix="">
                PubMed Knowledge Tool
              </HeaderName>
              <HeaderNavigation aria-label="IBM Knowledge Graph">
                {/*<HeaderMenuItem element={Link} to="/graph">Knowledge Test</HeaderMenuItem>*/}
                <HeaderMenuItem element={Link} to="/new-graph">Graph</HeaderMenuItem>
                <HeaderMenuItem element={Link} to="/full-text-search">Full-Text Search</HeaderMenuItem>
                <HeaderMenuItem element={Link} to="/about-us">About Us</HeaderMenuItem>
                {/*<HeaderMenuItem element={Link} to="/status">PubMed Status</HeaderMenuItem>
                {/*<HeaderMenuItem element={Link} to="#">Settings</HeaderMenuItem>*/}
                {/*<HeaderMenuItem element={Link} to="/test">Test</HeaderMenuItem>*/}
              </HeaderNavigation>
            </Header>
            <Content id="main-content">
              <Route path="/graph" component={Graph} />
              <Route path="/status" component={Status} />
              <Route path="/test" component={Test} />
              <Route path="/new-graph" component={NewGraph} />
              <Route path="/full-text-search" component={FullTextSearch} />
              <Route path="/about-us" component={AboutUs} />
            </Content>
          </div>
        </Router>
      </div>
  );
}

export default App;

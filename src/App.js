import React from 'react';

import { Content, Header, HeaderMenuItem, HeaderName, HeaderNavigation } from'carbon-components-react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Graph from "./components/graph/Graph"
import FullTextSearch from "./components/fulltextsearch/Search"
import AboutUs from './components/about_us/AboutUs'

import 'carbon-components/css/carbon-components.min.css';

function App() {
  return (
      <div>
        <Router>
          <div className="container">
            <Header aria-label="PubMed Knowledge Tool">
              <HeaderName prefix="">
                PubMed Knowledge Tool
              </HeaderName>
              <HeaderNavigation aria-label="PubMed Knowledge Tool">
                <HeaderMenuItem element={Link} to="/graph">Graph</HeaderMenuItem>
                <HeaderMenuItem element={Link} to="/full-text-search">Full-Text Search</HeaderMenuItem>
                <HeaderMenuItem element={Link} to="/about-us">About Us</HeaderMenuItem>
              </HeaderNavigation>
            </Header>
            <Content id="main-content">
              <Route path="/graph" component={Graph} />
              <Route path="/full-text-search" component={FullTextSearch} />
              <Route path="/about-us" component={AboutUs} />
            </Content>
          </div>
        </Router>
      </div>
  );
}

export default App;

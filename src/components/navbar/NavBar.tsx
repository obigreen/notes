import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

export const NavBar = () => {
    return (
        <Header>
            <Nav>
                <Ul>
                    <Li><Link to="/javascript">JavaScript</Link></Li>
                    <Li><Link to="/js-syntax">Syntax</Link></Li>
                    <Li><Link to="/js-functions">Functions</Link></Li>
                    <Li><Link to="/js-objects">Objects</Link></Li>
                    <Li><Link to="/js-operators">Operators</Link></Li>
                    <Li><Link to="/js-conditions">Conditions</Link></Li>
                    <Li><Link to="/js-loops">Loops</Link></Li>
                    <Li><Link to="/js-nested">Nested Data</Link></Li>
                    <Li><Link to="/js-types">Types</Link></Li>
                    <Li><Link to="/js-errors">Errors</Link></Li>
                    <Li><Link to="/typescript">TypeScript</Link></Li>
                    <Li><Link to="/js-async">Async</Link></Li>
                    <Li><Link to="/js-dom">DOM</Link></Li>
                    <Li><Link to="/js-network">Network</Link></Li>
                    <Li><Link to="/rest-api">REST API</Link></Li>
                    <Li><Link to="/js-modules">Modules</Link></Li>
                    <Li><Link to="/hooks">Hooks</Link></Li>
                    <Li><Link to="/methods">Methods</Link></Li>
                    <Li><Link to="/properties">Properties</Link></Li>
                    <Li><Link to="/events">Events</Link></Li>
                    <Li><Link to="/regex">Regex</Link></Li>
                </Ul>
            </Nav>
        </Header>
    );
};

const Header = styled.header`
    display: flex;
    margin: 50px auto;
    max-width: 900px;
`

const Nav = styled.nav`
    padding: 15px;
    background-color: #f7f7f7;
    border-radius: 12px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin: 10px 0;
    position: relative;
    width: 100%;
`

const Ul = styled.ul`
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
`

const Li = styled.li`
    border-radius: 10px;
    padding: 8px 10px;
    border: none;
    background-color: #1e1f22;
    color: white;
    font-style: normal;
    font-size: 17px;
    cursor: pointer;

    a {
        font-size: 17px;
        color: white;
        text-decoration: none;
    }
`

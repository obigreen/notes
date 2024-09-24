import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

export const NavBar = () => {
    return (
        <Header>
            <Nav>
                <Ul>
                    <Li><Link to="/methods">Methods</Link></Li>
                    <Li><Link to="/hooks">Hooks</Link></Li>
                    <Li><Link to="/propertys">Properties</Link></Li>
                    <Li><Link to="/events">Events</Link></Li>
                    <Li><Link to="/bot-questions">Bot Questions</Link></Li>
                    <Li><Link to="/interview-questions">Interview Questions</Link></Li>
                    <Li><Link to="/my-list">My List</Link></Li>
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
    padding: 10px;
    border: none;
    background-color: #1e1f22;
    color: white;
    font-style: normal;
    font-size: 20px;
    cursor: pointer;

    a {
        font-size: 20px;
        color: white;
        text-decoration: none;
    }
`

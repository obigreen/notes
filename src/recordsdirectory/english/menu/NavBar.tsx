import React from 'react';
import {Link} from 'react-router-dom';
import styled from "styled-components";

export const NavBar = () => {
    return (
        <Header>
            <Nav>
                <Ul>
                    <Li><Link to="/verbs">Verbs</Link></Li>
                    <Li><Link to="/nouns">Nouns</Link></Li>
                    <Li><Link to="/adjectives">Adjectives</Link></Li>
                    <Li><Link to="/questions">Questions</Link></Li>
                    <Li><Link to="/pronouns">Pronouns</Link></Li>
                    <Li><Link to="/prepositions">Prepositions</Link></Li>
                    <Li><Link to="/conjunctions">Conjunctions and Particle</Link></Li>
                    <Li><Link to="/adverbs">Adverbs</Link></Li>
                    <Li><Link to="/phrases">Phrases</Link></Li>
                    <Li><Link to="/day-and-time">Day and Time</Link></Li>
                    <Li><Link to="/programming-translate">Programming Language Translate</Link></Li>
                    <Li><Link to="/theory-eng">Theory Eng</Link></Li>
                </Ul>
            </Nav>
        </Header>

    );
};

const Header = styled.header`
    display: flex;
    margin-bottom: 50px;
`

const Nav = styled.nav`
    padding: 15px;
    background-color: #f7f7f7;
    border-radius: 12px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin: 10px 0;
    position: relative;
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
    }
`

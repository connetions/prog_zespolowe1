import React, {Component} from 'react'
import { signOut } from '@firebase/auth';
import './Login.css';
import {auth, db} from "../firebase-config"
import {collection, getDocs, addDoc, updateDoc, deleteDoc, doc} from "firebase/firestore";
import styled from "styled-components"
import photo from '../staticresources/assets/rower.jpg';

const Container = styled.div`
    // background-color: aqua;
    margin: auto;
    box-sizing: border-box;
    //text-align: center;
`
const LogoContainer = styled.div`
    // background-color:bisque;
    margin: 20px auto 80px;
    display: flex;
    justify-content: center;
    max-width: 800px; 
    
    a {
      color: #eee;
      text-transform: uppercase;
      padding: 10px;
      background-color: #15172b;
      border-radius: 10px;
      z-index: 1;
      
      :hover {
        cursor: pointer;
        background-color: #123456;
      }
    }
  
  span {
    display: flex;
    justify-content: center;
    flex: 1;
    transform: translateX(45px);
  }
`
const ContentContainer = styled.div`
  // background-color:darkgreen;
    margin: auto auto 150px;
    background-color: #15172b;
    border-radius: 20px;
    box-sizing: border-box;
    padding: 20px;
    //height: 500px
    max-width: 800px;
`
const Form = styled.div`
    margin: auto auto 20px;
    background-color: #123456;
    border-radius: 20px;
    box-sizing: border-box;
    padding: 20px;
    width: 400px;
    height: 150px;
    display: flex;

    :last-child {
    margin-bottom: 0;
    }
`
const Title = styled.div`
    color: #eee;
    font-family: sans-serif;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
  
`
const Header = styled.div`
    color: #eee;
    font-family: sans-serif;
    font-size: 16px;
    font-weight: 600;
    
`
const Subtitle = styled.div`
    color: #eee;
    font-family: sans-serif;
    font-size: 16px;
    font-weight: 500;
    margin-top: 5px;
    margin-bottom: 20px;
    
    :last-child {
      margin-bottom: 0;
    }
`

const SubtitleSeller = styled.div`
    color: #eee;
    font-family: sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 32px;
    
`
const Photo = styled.div`
    margin-bottom: 20px;
    img {
      max-width: 100%;
    }
`
const InfoContainer = styled.div`
    padding: 20px;
    background-color: #123456;
    border-radius: 20px;
    margin-right: 20px;
    box-sizing: border-box;
`

const UserInfo = styled.div`
    padding: 20px;
    background-color: #123456;
    border-radius: 20px;
    box-sizing: border-box;
    margin-bottom: 20px;

`

let Col2;
const Col1 = Col2 = styled.div`
    width: 50%;
    box-sizing: border-box;
    
`

const Announcement = styled.div`
    display: flex;
    :first-child {
      margin-right: 20px;
    }
`

const Buttons = styled.div`
    padding: 20px;
    background-color: #123456;
    border-radius: 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
`

const Send = styled.a`
    color: #eee;
    text-transform: uppercase;
    padding: 10px;
    font-weight: 600;
    background-color: #15172b;
    border-radius: 10px;
    flex: 0 0 47%;
    text-align: center;
    box-sizing: border-box;
    :hover {
        cursor: pointer;
        background-color: #eee;
        color: #15172b;
    }
`

const BottomBar = styled.div`
    height: 80px;
    background-color: #15172b;
    color: #eee;
    position: fixed;
    width: 100%;
    z-index: 1000;
    bottom: 0;
`

const Flexbox = styled.div`
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    height: 100%;
  
    a {
      text-align: center;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 10px;

      :hover {
        background-color: #123456;
      }
    }
  
    a, a:visited {
      color: inherit;
    }
`


class Offer extends Component {

    logout = async () => {
        await signOut(auth)

    };

    render(){
        return (
            <Container>
                <LogoContainer>
                    <span>Logo</span>
                    <a onClick = {this.logout}> Sign Out </a>
                </LogoContainer>

                <ContentContainer>
                    <Photo>
                        <img src={photo}/>
                    </Photo>

                    <Announcement>
                        <Col1>
                            <InfoContainer>
                                <Title>
                                    Rower górski
                                </Title>
                                <Header>
                                    Opis:
                                </Header>
                                <Subtitle>
                                    Krótki opis rzeczy która jest do oddania.
                                    Krótki opis rzeczy która jest do oddania.
                                    Krótki opis rzeczy która jest do oddania.
                                    Krótki opis rzeczy która jest do oddania.

                                </Subtitle>
                                <Header>
                                    Parametry:
                                </Header>
                                <Subtitle>
                                    Wielkość kół: 26"
                                </Subtitle>

                            </InfoContainer>
                        </Col1>

                        <Col2>
                            <UserInfo>
                                <Title>
                                    Jan Kowalski
                                </Title>
                                <SubtitleSeller>
                                    20.10.2021
                                </SubtitleSeller>
                                <SubtitleSeller>
                                    Katowice, Polska
                                </SubtitleSeller>
                            </UserInfo>

                            <Buttons>
                                <Send>
                                    <a>Zadzwoń</a>
                                </Send>
                                <Send>
                                    <a>Napisz</a>
                                </Send>
                            </Buttons>
                        </Col2>

                    </Announcement>

                </ContentContainer>

                <BottomBar>
                    <Flexbox>
                        <a href={'/mainapp'}>Strona główna</a>
                        <a>Szukaj</a>
                        <a>Kategoria</a>
                        <a>Moje konto</a>
                    </Flexbox>
                </BottomBar>

            </Container>
        )
    }
}

export default Offer

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
    max-width: 800px;
    box-sizing: border-box;
    //text-align: center;
`
const LogoContainer = styled.div`
    // background-color:bisque;
    margin: 20px auto 80px;
    display: flex;
    justify-content: center;
    
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
    margin: auto;
    background-color: #15172b;
    border-radius: 20px;
    box-sizing: border-box;
    padding: 20px;
    //height: 500px
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
    font-size: 36px;
    font-weight: 600;
  
`
const Subtitle = styled.div`
    color: #eee;
    font-family: sans-serif;
    font-size: 16px;
    font-weight: 600;
    
`
const Photo = styled.div`
    margin-right: 20px;
    background-color: red;
    width: 100px;
    height: 100px;
    
    img {
      max-width: 100%;
    }
`
const InfoContainer = styled.div`
    //width: 100px;
  
`

class MainApp extends Component {

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
                    <Form>
                        <Photo>
                            <img src={photo}/>
                        </Photo>
                        <InfoContainer>
                            <Title>Rower</Title>
                            <Subtitle>Kto</Subtitle>
                            <Subtitle>Gdzie</Subtitle>
                            <Subtitle>Opis</Subtitle>
                        </InfoContainer>
                    </Form>

                    <Form>
                        <Photo>
                            <img src={photo}/>
                        </Photo>
                        <InfoContainer>
                            <Title>Rower</Title>
                            <Subtitle>Kto</Subtitle>
                            <Subtitle>Gdzie</Subtitle>
                            <Subtitle>Opis</Subtitle>
                        </InfoContainer>
                    </Form>

                    <Form>
                        <Photo>
                            <img src={photo}/>
                        </Photo>
                        <InfoContainer>
                            <Title>Rower</Title>
                            <Subtitle>Kto</Subtitle>
                            <Subtitle>Gdzie</Subtitle>
                            <Subtitle>Opis</Subtitle>
                        </InfoContainer>
                    </Form>
                </ContentContainer>

            </Container>
        )
    }
}

export default MainApp

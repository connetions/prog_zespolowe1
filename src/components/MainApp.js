import React, {Component} from 'react'
import { signOut } from '@firebase/auth';
import './Login.css';
import {auth, db} from "../firebase-config"
import {collection, getDocs, addDoc, updateDoc, deleteDoc, doc} from "firebase/firestore";
import styled from "styled-components"

const Container = styled.div`
    // background-color: aqua;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
`
const LogoContainer = styled.div`
    // background-color:bisque;
    height: 100px;
    width: 800px;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
`
const ContentContainer = styled.div`
    // background-color:darkgreen;
    width: 800px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2%;
    background-color: #15172b;
    border-radius: 20px;
    box-sizing: border-box;
    padding: 20px 0;
    height: 500px
`
const Form = styled.div`
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    background-color: #123456;
    border-radius: 20px;
    box-sizing: border-box;
    // height: 500px;
    padding: 20px;
    width: 400px;
    height: 150px;
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
    float: left;
    background-color: red;
    width: 100px;
    height: 100px;
`
const InfoContainer = styled.div`width: 100px;

    float:left;
`

class MainApp extends Component {

    logout = async () => {
        await signOut(auth)
    
    };

    render(){
        return (
            <Container>
                <LogoContainer>
                    Logo<button onClick = {this.logout}> Sign Out </button>
                </LogoContainer>

                <ContentContainer>
                    <Form>
                        <Photo>

                        </Photo>
                        <InfoContainer>
                            <Title>Rower</Title>
                            <Subtitle></Subtitle>
                            <Subtitle>Kto</Subtitle>
                            <Subtitle>Gdzie</Subtitle>
                            <Subtitle>Opis</Subtitle>
                        </InfoContainer>
                    </Form>

                    <Form>
                        <Photo>

                        </Photo>
                        <InfoContainer>
                            <Title>Rower</Title>
                            <Subtitle></Subtitle>
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

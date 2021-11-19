import React, {Component, useState} from 'react'
import {signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import './Login.css';
import {auth} from "../firebase-config"
import { Link } from 'react-router-dom';
import MainApp from "./MainApp";
import styled from "styled-components"
import logo from '../logo.png';

const Container = styled.div`
    color: #444444;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
`
const LogoContainer = styled.div`
    height: 100px;
    width: 800px;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
`
const ContentContainer = styled.div`
    width: 800px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2%;
`
const Form = styled.div`
    border-radius: 4px;
    box-shadow: 0 0 5px 1px #333;
    margin: 0 auto;
    background-color: #DDDDDD;
    padding: 20px;
    width: 400px;
`
const Title = styled.div`
    font-family: sans-serif;
    font-size: 36px;
    font-weight: 600;
    margin-top: 30px;
`
const Subtitle = styled.div`
    font-family: sans-serif;
    font-size: 16px;
    font-weight: 600;
    margin-top: 10px;
`
const InputContainer = styled.div`
    height: 50px;
    position: relative;
    width: 100%;
    margin-top:15px
` 
const Input = styled.input`
    background-color: #ffffff;
    border-radius: 12px;
    border: 0;
    box-sizing: border-box;
    font-size: 18px;
    height: 100%;
    outline: 0;
    padding: 4px 20px 0;
    width: 100%;
    &:focus{
        border: 2px solid #27ae60;
    }
`
const Button = styled.div`
    cursor: pointer;
    background-color: #27ae60;
    border-radius: 12px;
    border: 0;
    box-sizing: border-box;
    color: #eee;
    cursor: pointer;
    font-size: 18px;
    height: 50px;
    margin-top: 16px;
    text-align: center;
    padding: 12px 0;
    vertical-align: middle;
    width: 100%;
    &:focus, &:hover{
        background-color: #1a8f4b;
    }

`

const Img = styled.img`
    width: 80px;
    margin-left:4%;
`



const Login = () =>{

    const [loginEmail, setLoginEmail] = useState();
    const [loginPassword, setLoginPassword] = useState();
    const [user, setUser] = useState({});


    const login = async () => {
        try {
            await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
                );
        } catch (error) {
            console.log(error.message);
        }
        
    };

    onAuthStateChanged(auth, (currentUser) =>{
        setUser(currentUser)    
    })
    
    if(user){
        return <MainApp />     
    } else{
        return (
            <Container>
                <LogoContainer>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Img src={logo} alt="Logo" />
                    </Link>
                </LogoContainer>

                <ContentContainer>
                
                    <Form>
                        <Title> Welcome </Title>

                        <Subtitle> Let's go sign in! </Subtitle>

                        <InputContainer>
                            <Input
                                placeholder="Email..." 
                                onChange = {event => setLoginEmail(event.target.value)}
                            />
                        </InputContainer>

                        <InputContainer>
                            <Input
                                placeholder="Password..." 
                                type="password"
                                onChange = {event => setLoginPassword(event.target.value)}
                            />
                        </InputContainer>

                        <Button onClick = {login}> Login </Button>

                        <Subtitle> <hr></hr> </Subtitle>
                        
                        <Link to="/register" style={{ textDecoration: 'none' }}>
                            <Button > Sign up </Button>
                        </Link>
                    </Form>
                </ContentContainer>
            </Container>
        )
    }
    
}

export default Login
import React, {Component, useState} from 'react'
import { signOut } from '@firebase/auth';
import './Login.css';
import {auth, db} from "../firebase-config"
import {collection, getDocs} from "firebase/firestore";
import styled from "styled-components"
import logo from '../logo.png';
import { Link } from 'react-router-dom';

const Container = styled.div`
    background-color: #DDDDDD;
    color: #444444;
    margin: auto;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
`
const LogoContainer = styled.div`
    background-color: #444444;
    width:100%;
    display:flex;
    justify-content: space-between;
    padding: 5px 20px;
    box-sizing: border-box;
`
const SearchBar = styled.div`
    display: flex;
    padding: 20px 0;
    justify-content: center;
`
const ContentContainer = styled.div`
    background-color:white;
    padding-top:5%;
    margin: auto;
    width: 100%;
    height: 80%;
    clear:both;
`

const Form = styled.div`
    margin-left: auto;
    margin-right: auto;
    background-color: #123456;
    border-radius: 20px;
    box-sizing: border-box;
    padding: 20px;
    width: 600px;
    min-height: 100px;
    overflow: hidden;
    margin-top: 20px
`
const Title = styled.div`
    margin-bottom: 20px;
    color: black;
    text-align:center;
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
    width: 35%;
    min-height: 100px;
    overflow: hidden;
`
const InfoContainer = styled.div`
    width: 35%;
    float:left;
  
`
const Button = styled(Link)`
    cursor: pointer;
    background-color: #27ae60;
    border-radius: 12px;
    box-sizing: border-box;
    color: #eee;
    font-size: 15px;
    padding: 20px;
    text-decoration: none;
    &:focus, &:hover{
        background-color: #1a8f4b;
    }
`
const ButtonLogo = styled(Link)`
    cursor: pointer;
    color: #eee;
    border-radius: 12px;
    border: solid 2px #27ae60;
    &:focus, &:hover{
    transform: scale(1.1)}
`
const Buttonlogout = styled.a`
    cursor: pointer;
    background-color: #27ae60;
    border-radius: 12px;
    box-sizing: border-box;
    color: #eee;
    font-size: 15px;
    padding: 20px;
    &:focus, &:hover{
        background-color: #1a8f4b;
    }
`

const Buttons = styled.div`
    align-self: center; 
    flex: 0 0 30%;
    justify-content: space-between;
    display: flex;

`


const Select = styled.select`
    background-color: #ffffff;
    border-radius: 12px;
    color: #757575;
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

const InputContainer = styled.div`
    margin-right: 20px;
    &:last-child{margin-right: 0}
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
const CategoryContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    padding: 0 50px ;
    box-sizing: border-box;
  
`

const ButtonCategory = styled(Link)`
    cursor: pointer;
    background-color: #27ae60;
    border-radius: 12px;
    box-sizing: border-box;
    color: #eee;
    font-size: 25px;
    padding: 75px 20px;
    flex: 0 0 30%;
    margin-bottom: 20px;
    text-align: center;
    text-decoration: none;
    &:focus, &:hover{
        background-color: #1a8f4b;
    }
`

const Img = styled.img`
    width: 80px;
`

const MainApp = () => {

    const [voivodeship, setVoivodeship] = useState('Dolnośląskie');
    const [search, setSearch] = useState();
    const voivodeshipList = ["Dolnośląskie", "Kujawsko-Pomorskie", "Lubelskie", "Lubuskie", "Łódzkie", "Małopolskie",
                    "Mazowieckie", "Opolskie", "Podkarpackie", "Podlaskie", "Pomorskie", "Śląskie", "Świętokrzyskie",
                    "Warmińsko-Mazurskie", "Wielkopolskie", "Zachodniopomorskie"]; 
    const categoryList = ["Sport", "Electronics", "House", "Garden", "Automotive", "Kids", "Clothes", "Animals", "Music", "Education" , "All", "Other"];
 
    const logout = async () => {
        await signOut(auth)
    
    };
   
    return (
        <Container>
            <LogoContainer>
                <ButtonLogo to="/" >
                    <Img src={logo} alt="Logo" />
                </ButtonLogo>
                <Buttons>

                    <Buttonlogout onClick = {logout}> Sign Out </Buttonlogout>

                    <Button to="/addgoods" >
                        Add Goods
                    </Button>

                    <Button to="/myaccount" >
                         My Account
                    </Button>
                </Buttons>

            </LogoContainer>

            <SearchBar>
                <InputContainer>
                    <Input 
                        placeholder="What are you looking for..." 
                        onChange = {event => setSearch(event.target.value)}
                    />
                </InputContainer>

                <InputContainer>
                    <Select 
                        onChange = {event => setVoivodeship(event.target.value)}>
                        {voivodeshipList.map((voivodeship) => (
                        <option value={voivodeship}>{voivodeship}</option>
                        ))}
                    </Select>
                </InputContainer>
                
                <Button to={{pathname:'/searchgoods/' + search + '/' + voivodeship}}>
                      Search
                </Button>
            </SearchBar>

            <ContentContainer>
                <Title>Category</Title>

                <CategoryContainer>
                    {categoryList.map((category) => (
                        <ButtonCategory to={{pathname:'/categoryoffert/' + category}}>
                             {category}
                        </ButtonCategory>
                    ))}
                </CategoryContainer>
            </ContentContainer>

        </Container>
    )
}

export default MainApp

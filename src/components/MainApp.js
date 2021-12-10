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
    height:10%;
    clear:both;
`
const SearchBar = styled.div`
    margin-left: auto;
    margin-right: auto;
    width:70%;
    height:10%;
    text-align: center;
    clear:both;
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
const Button = styled.div`
    margin-left:4px;
    cursor: pointer;
    background-color: #27ae60;
    margin-top:12px;
    border-radius: 12px;
    border: 0;
    box-sizing: border-box;
    color: #eee;
    cursor: pointer;
    font-size: 15px;
    padding: 20px;
    float:right;
    &:focus, &:hover{
        background-color: #1a8f4b;
    }
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
    height: 70%;
    width: 40%;
    margin-top:1%;
    margin-left:1%;
    float:left;
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
    margin-left: 50px;
    margin-right: 50px;  
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
`

const ButtonCategory = styled(Link)`
    cursor: pointer;
    background-color: #27ae60;
    border-radius: 12px;
    box-sizing: border-box;
    color: #eee;
    cursor: pointer;
    font-size: 18px;
    padding: 30px 20px;
    flex: 0 0 30%;
    margin-bottom: 20px;
    text-align: center;
    &:focus, &:hover{
        background-color: #1a8f4b;
    }
`

const Img = styled.img`
    width: 80px;
    margin-left:4%;
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
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Img src={logo} alt="Logo" />
                </Link>

                <Button onClick = {logout}> Sign Out </Button>

                <Link to="/addgoods" style={{ textDecoration: 'none' }}>
                    <Button > Add Goods </Button>
                </Link>

                <Link to="/myaccount" style={{ textDecoration: 'none' }}>
                    <Button > My Account </Button>
                </Link>

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
                
                <Link to={{pathname:'/searchgoods/' + search + '/' + voivodeship, style:{ textDecoration: 'none' }}}>
                    <Button style={{}}> Search </Button>
                </Link>
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

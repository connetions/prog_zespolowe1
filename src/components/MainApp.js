import React, {useState} from 'react'
import './Login.css';
import styled from "styled-components"
import { Link } from 'react-router-dom';
import Header from "./Header"

const Container = styled.div`
    background-color: #DDDDDD;
    color: #444444;
    margin: auto;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
`

const ContentContainer = styled.div`
    background-color:white;
    padding-top:5%;
    margin: auto;
    width: 100%;
    height: 80%;
    clear:both;
`

const Title = styled.div`
    margin-bottom: 20px;
    color: black;
    text-align:center;
    font-family: sans-serif;
    font-size: 36px;
    font-weight: 600;
`

const SearchBar = styled.div`
    display: flex;
    padding: 20px 0;
    justify-content: center;
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

const MainApp = () => {

    const [voivodeship, setVoivodeship] = useState('Dolnośląskie');
    const [search, setSearch] = useState();
    const voivodeshipList = ["Dolnośląskie", "Kujawsko-Pomorskie", "Lubelskie", "Lubuskie", "Łódzkie", "Małopolskie",
                    "Mazowieckie", "Opolskie", "Podkarpackie", "Podlaskie", "Pomorskie", "Śląskie", "Świętokrzyskie",
                    "Warmińsko-Mazurskie", "Wielkopolskie", "Zachodniopomorskie"];
    const categoryList = ["Sport", "Electronics", "House", "Garden", "Automotive", "Kids", "Clothes", "Animals", "Music", "Education" , "All", "Other"];

    return (
        <Container>
            <Header/>
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

import React, {useState, useEffect} from 'react'
import './Login.css';
import {auth, db} from "../firebase-config"
import {collection, getDocs, where, query} from "firebase/firestore";
import styled from "styled-components"
import { Link, useParams } from 'react-router-dom';
import Header from "./Header";


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

const Form = styled.div`
    margin-left: auto;
    margin-right: auto;
    background-color: #DDDDDD;
    border-radius: 20px;
    box-sizing: border-box;
    padding: 20px;
    width: 80%;
    min-height: 200px;
    overflow: hidden;
    margin-top: 20px
`
const Title = styled.div`
    color: #444444;

    text-align:center;
    font-family: sans-serif;
    font-size: 36px;
    font-weight: 600;
`
const Subtitle = styled.div`
    color: #444444;

    font-family: sans-serif;
    font-size: 16px;
    font-weight: 600;
`
const Photo = styled.div`
    float: left;
    background-color: red;
    width: 35%;
    min-height: 200px;
    overflow: hidden;
`
const InfoContainer = styled.div`
    width: 35%;
    float:left;
  
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
const Good = (props) =>{
    return(
        <Link to={"/offer" 
        
        } style={{ textDecoration: 'none' }}>
            <Form>
                <Photo>
                    {props.photo}
                </Photo>
                <InfoContainer>
                    <Title>{props.title}</Title>
                    <Subtitle>{props.who}</Subtitle>
                    <Subtitle>{props.where}</Subtitle>
                </InfoContainer>
            </Form>
        </Link>
    )
}

const SearchGoods = () =>{
    
    const { searchName, voivodeshipName } = useParams()
    const [goods, setGoods] = useState([]);
    const voivodeshipList = ["Dolno??l??skie", "Kujawsko-Pomorskie", "Lubelskie", "Lubuskie", "????dzkie", "Ma??opolskie",
                "Mazowieckie", "Opolskie", "Podkarpackie", "Podlaskie", "Pomorskie", "??l??skie", "??wi??tokrzyskie",
                "Warmi??sko-Mazurskie", "Wielkopolskie", "Zachodniopomorskie"];
    const [voivodeship, setVoivodeship] = useState(voivodeshipName);
    const [search, setSearch] = useState(searchName);
    
    const goodsList = goods.map( (good) => (  
        <Good 
            title = {good.title}
            who = {good.who}
            description = {good.description}
            where = {good.where}
            photo = {good.photo}
        />   
    )) 
    
    useEffect(() => {
    
        const fetchGoods = async () =>{
            const querySnapshot = await getDocs(query(collection(db, "goods"), where("voivodeship", "==", voivodeshipName)));
            querySnapshot.forEach((doc) => {
                if(doc.data().title.toUpperCase().includes(searchName.toUpperCase())){
                    setGoods(goods => [...goods, doc.data()])
                }
            console.log(doc.id, " => ", doc.data().title);
            });
        } 
        fetchGoods()
    
      }, [])

    
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
                {goodsList}

                
            </ContentContainer>

        </Container>
    );
    
}

export default SearchGoods

import React, {Component} from 'react'
import { onAuthStateChanged, signOut } from '@firebase/auth';
import './Login.css';
import { auth, db } from "../firebase-config"
import { Navigate } from 'react-router-dom';
import {collection,  addDoc, } from "@firebase/firestore";
import styled from "styled-components"
import { Link } from 'react-router-dom';
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
const Img = styled.img`
    width: 80px;
    margin-left:4%;
`

class AfterAdd extends Component{

    state = {
        cnt: 5
    }

    componentDidMount = () =>{
        const intervalId = setInterval(this.countDown, 1000)
        this.setState({intervalId})
    }

    countDown = () => this.setState({cnt: this.state.cnt - 1})

    componentWillUnmount = () => clearInterval(this.state.intervalId)

    render(){
        return(
            <Container>
                <LogoContainer>
                    Logo
                </LogoContainer>
            
                <ContentContainer>
                    <Form>
                        <Title> Thank you for add good! </Title>
                        <Subtitle>For {this.state.cnt} second you will navigate to Main </Subtitle>
                        {this.state.cnt === 0 && <Navigate to ='/' />}
                        </Form>
                </ContentContainer>
                
            </Container>
        )
    }
}

class AddGoods extends Component {

    state = {
        goodsName: '',
        description: '',
        photo: '',
        where: '',
        name: '',
        surname: '',
        user: {},
        userid: '',
        flag: false,
        voivodeshipList: ["Dolnośląskie", "Kujawsko-Pomorskie", "Lubelskie", "Lubuskie", "Łódzkie", "Małopolskie",
                    "Mazowieckie", "Opolskie", "Podkarpackie", "Podlaskie", "Pomorskie", "Śląskie", "Świętokrzyskie",
                    "Warmińsko-Mazurskie", "Wielkopolskie", "Zachodniopomorskie"],
        voivodeship: 'Dolnośląskie',
        categoryList: ["Sport", "Electronics", "House", "Garden", "Automotive", "Kids", "Clothes", "Animals", "Music", "Education" , "Other"],
        category: 'Sport'
    }

    componentWillMount(){
        onAuthStateChanged(auth, (currentUser) =>{
                this.setState({user: currentUser}) 
                // this.setState({userid: currentUser.uid})   
        })
    }

    addGoods = async () => {
        try{           
            this.setState({flag: true})
            console.log(this.state.user.uid);
            try{
                const docRef = await addDoc(collection(db, "goods"), {
                        photo:this.state.photo,
                        title:this.state.goodsTitle,
                        where: this.state.where,
                        description: this.state.description,
                        voivodeship: this.state.voivodeship,
                        who: this.state.user.email,
                        category: this.state.category
                    });
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
            console.error("Error adding document: ", e);
            }

        } catch (error) {
            console.log(error.message);
        }
    };

    logout = async () => {
        await signOut(auth)
    };

    

    render(){
        if(this.state.flag){
            return <AfterAdd />
        }
        else{
            return (
                <Container>
                    <LogoContainer>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                            <Img src={logo} alt="Logo" />
                        </Link>
                    </LogoContainer>

                    <ContentContainer>
                        <Form>
                            <Title> Add Good </Title>
                            <InputContainer>
                                <Input  placeholder="Photo" 
                                    onChange = {event => this.setState({photo: event.target.files[0]})}
                                />
                            </InputContainer>

                            <InputContainer>
                                <Input placeholder="Title"  
                                    onChange = {event => this.setState({goodsTitle: event.target.value})}
                                />
                            </InputContainer>

                            <InputContainer>
                                <Select onChange = {event => this.setState({category: event.target.value})}>
                                    {this.state.categoryList.map((category) => (
                                    <option value={category}>{category}</option>
                                    ))}
                                </Select>
                            </InputContainer>

                            <InputContainer>
                                <Select onChange = {event => this.setState({voivodeship: event.target.value})}>
                                    {this.state.voivodeshipList.map((voivodeship) => (
                                    <option value={voivodeship}>{voivodeship}</option>
                                    ))}
                                </Select>
                            </InputContainer>

                            <InputContainer>
                                <Input placeholder="Where"  
                                    onChange = {event => this.setState({where: event.target.value})}
                                />
                            </InputContainer>

                            <InputContainer>
                                <Input placeholder="Description"  
                                    onChange = {event => this.setState({description: event.target.value})}
                                />
                            </InputContainer>

                            <Button onClick = {this.addGoods}> Add goods</Button>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                            <Button > Back to Main </Button>
                            </Link>
                       

                        {/* <h4> User Logged In: </h4> */}
                        {/* {this.state.user?.email} */}
                        {/* <button onClick = {this.logout}> Sign Out </button> */}
                        </Form>
                    </ContentContainer>
                </Container>
            )
        }
    }
}

export default AddGoods
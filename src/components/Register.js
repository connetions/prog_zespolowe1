import React, {Component, useState, useEffect} from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import './Login.css';
import { auth, db } from "../firebase-config"
import { Navigate } from 'react-router-dom';
import { setDoc, doc} from "@firebase/firestore";
import styled from "styled-components"
import { Link } from 'react-router-dom';


const Container = styled.div`
    color: #444444;
    margin: auto;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
`
const LogoContainer = styled.div`
    background-color: white;
    width:100%;
    height:10%;
    clear:both;
`
const ContentContainer = styled.div`
    background-color:white;
    width: 100%;
    height: 100%;
    margin: 84px auto 0;
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
    text-align: center;
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

class AfterRegister extends Component{

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
        
                </LogoContainer>
            
                <ContentContainer>
                    <Form>
                        <Title> Thank you for sing up! </Title>
                        
                        <Subtitle>For {this.state.cnt} second you will navigate to Login </Subtitle>
                        {this.state.cnt === 0 && <Navigate to ='/' />}

                    </Form>
                </ContentContainer>
                
            </Container>
        )
    }
}

const Register = () => {
    
    const [registerEmail, setRegisterEmail] = useState();
    const [registerPassword, setRegisterPassword] = useState();
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [userR, setUser] = useState();
    const [phone, setPhone] = useState();
    const [flag, setFlag] = useState(false);


    
    onAuthStateChanged(auth, (currentUser) =>{
        setUser(currentUser) 
    })
    
    
    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            ).then( data => {
                setFlag(true)

                const userData = {
                        email:registerEmail,
                        name: name,
                        surname: surname,
                        phone: phone,
                        uid: data.user.uid
                    }

                setDoc(doc(db, "users", data.user.uid), userData);
            });
            
        } catch (error) {
            console.log(error.message);
        }
    };

    if (flag) {
        return <AfterRegister/>
    }
    else {
        return (
            <Container>
                {/*<LogoContainer>*/}
                {/*            */}
                {/*</LogoContainer>*/}

                <ContentContainer>
                    <Form>
                        <Title> Register User </Title>
                        
                        <InputContainer>
                            <Input 
                                placeholder="Email..." 
                                onChange = {event => setRegisterEmail(event.target.value)}
                            />
                        </InputContainer>

                        <InputContainer>
                            <Input 
                                placeholder="Password..."  
                                type = "password"
                                onChange = {event => setRegisterPassword(event.target.value)}
                            />
                        </InputContainer>

                        <InputContainer>
                            <Input 
                                placeholder="Name..."  
                                onChange = {event => setName(event.target.value)}
                            />
                        </InputContainer>

                        <InputContainer>
                            <Input 
                                placeholder="Surname..."  
                                onChange = {event => setSurname(event.target.value)}
                            />
                        </InputContainer>

                        <InputContainer>
                            <Input 
                                placeholder="Phone number..."  
                                onChange = {event => setPhone(event.target.value)}
                            />
                        </InputContainer>

                        <Button onClick = {register}> Create User</Button>

                        <Subtitle> <hr></hr> </Subtitle>

                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <Button> Back to login </Button>
                        </Link>

                    </Form>
                </ContentContainer>
            </Container>
        )
    }
    
}

export default Register

import React, {Component, useState, useEffect} from 'react'
import { onAuthStateChanged, signOut } from '@firebase/auth';
import './Login.css';
import { auth, db, storage} from "../firebase-config"
import { Navigate } from 'react-router-dom';
import {doc,collection,  addDoc, updateDoc, arrayUnion, getDoc,  } from "@firebase/firestore";
import styled from "styled-components"
import { Link } from 'react-router-dom';
import logo from '../logo.png';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const Container = styled.div`
    color: #444444;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
`
const LogoContainer = styled.div`
    height: 100px;
    width: 800px;
    margin: 20px auto 0;
`
const ContentContainer = styled.div`
    margin: 100px auto 0;
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

const AddGoods = () =>{

    let imgUrl = ""
    const [goodsName, setGoodsName] = useState();
    const [description, setDescription] = useState();
    const [img, setImg] = useState(null);
    const [where, setWhere] = useState();
    const [user, setUser] = useState({});
    const [flag, setFlag] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [category, setCategory] = useState('Sport');
    const [voivodeship, setVoivodeship] = useState('Dolnośląskie');
    const voivodeshipList = ["Dolnośląskie", "Kujawsko-Pomorskie", "Lubelskie", "Lubuskie", "Łódzkie", "Małopolskie",
                "Mazowieckie", "Opolskie", "Podkarpackie", "Podlaskie", "Pomorskie", "Śląskie", "Świętokrzyskie",
                "Warmińsko-Mazurskie", "Wielkopolskie", "Zachodniopomorskie"];
    const categoryList = ["Sport", "Electronics", "House", "Garden", "Automotive", "Kids", "Clothes", "Animals", "Music", "Education" , "Other"];
    
    onAuthStateChanged(auth, (currentUser) =>{
        setUser(currentUser) 
    })

    const formHandler = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setImg(file);
    };

    useEffect(() => {
        const fetchUser = async () =>{
            if (typeof user.uid !== "undefined"){
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef); 
                if (docSnap.exists() && typeof user.uid !== "undefined") {
                    const userData = docSnap.data();
                    setUserInfo(userData)
                    console.log("Document data:", userData); 
                } 
                else{
                    console.log("No such docsument!");
                }
            }
        }
        fetchUser();
      }, [user])

    const uploadFiles = () => {
        setFlag(true);
        const storage = getStorage();
        const storageRef = ref(storage, 'images/' +img.name );
        const uploadTask = uploadBytesResumable(storageRef, img);
        uploadTask.on('state_changed', 
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at'+ downloadURL); 
                imgUrl = downloadURL;
                console.log('File ddd available at'+ imgUrl); 
                addGoods();
            });
        }
        );
    }

    const addGoods = async () => {
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;
        try{           
            try{
                const docRef = await addDoc(collection(db, "goods"), {
                        photo:imgUrl,
                        title:goodsName,
                        where: where,
                        description: description,
                        voivodeship: voivodeship,
                        who: user.email,
                        category: category,
                        uid:user.uid,
                        date: dateTime,
                        name: userInfo.name,
                        surname: userInfo.surname,
                        phone: userInfo.phone,
                        email: userInfo.email
                        
                    });

                console.log("Document written with ID: ", docRef.id);

                const goodRef = doc(db, "goods", docRef.id);
                await updateDoc(goodRef, {
                    goodid: docRef.id
                });
            } catch(error) {
                console.error("Error adding document: ", error);
            }
        } catch(error) {
            console.log(error.message);
        }
    };

    if(flag){
        return <AfterAdd />
    }
    else{
        return (
            <Container>
                {/*<LogoContainer>*/}

                {/*    <Link to="/" style={{ textDecoration: 'none' }}>*/}
                {/*        <Img src={logo} alt="Logo" />*/}
                {/*    </Link>*/}

                {/*</LogoContainer>*/}

                <ContentContainer>
                    <Form>
                        <Title> Add Good </Title>
                        
                        <InputContainer>
                            <Input 
                                type="file"
                                placeholder="Photo" 
                                onChange = {formHandler}
                            />
                        </InputContainer>

                        <InputContainer>
                            <Input 
                                placeholder="Title"  
                                onChange = {event => setGoodsName(event.target.value)}
                            />
                        </InputContainer>

                        <InputContainer>
                            <Select 
                                onChange = {event => setCategory(event.target.value)}>
                                {categoryList.map((category) => (
                                <option value={category}>{category}</option>
                                ))}
                            </Select>
                        </InputContainer>

                        <InputContainer>
                            <Select 
                                onChange = {event => setVoivodeship(event.target.value)}>
                                {voivodeshipList.map((voivodeship) => (
                                <option value={voivodeship}>{voivodeship}</option>
                                ))}
                            </Select>
                        </InputContainer>

                        <InputContainer>
                            <Input 
                                placeholder="Where"  
                                onChange = {event => setWhere(event.target.value)}
                            />
                        </InputContainer>

                        <InputContainer>
                            <Input 
                                placeholder="Description"  
                                onChange = {event => setDescription(event.target.value)}
                            />
                        </InputContainer>

                        <Button onClick = {uploadFiles}> Add goods </Button>

                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <Button > Back to Main </Button>
                        </Link>

                    </Form>
                </ContentContainer>
            </Container>
        )
    }
    
}

export default AddGoods

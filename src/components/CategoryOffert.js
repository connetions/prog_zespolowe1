import React, {Component, useState, useEffect} from 'react'
import './Login.css';
import {auth, db, app} from "../firebase-config"
import {collection, getDocs, where, query} from "firebase/firestore";
import { Link, useLocation, useParams } from 'react-router-dom';
import Header from "./Header";
import '../index.css'
import './CategoryOffert.css'

const Good = (props) =>{
    return(
        <Link className='offer-link' to={"/offer/" + props.IDgoods}>
            <div className='form'>
                <div className='photo-container'>
                    <img className='photo' src={props.photo} />
                </div>
                <div className='info-container'>
                    <h1>{props.title}</h1>
                    <h2>Kontakt: {props.who}</h2>
                    <h2>Lokalizacja: {props.where}</h2>
                </div>
            </div>
        </Link>
    )
}

const CategoryOffert = () =>{
    const { category } = useParams()
    const [goods, setGoods] = useState([]);
    const voivodeshipList = ["Dolnośląskie", "Kujawsko-Pomorskie", "Lubelskie", "Lubuskie", "Łódzkie", "Małopolskie",
                "Mazowieckie", "Opolskie", "Podkarpackie", "Podlaskie", "Pomorskie", "Śląskie", "Świętokrzyskie",
                "Warmińsko-Mazurskie", "Wielkopolskie", "Zachodniopomorskie"];
    const [voivodeship, setVoivodeship] = useState('');
    const [search, setSearch] = useState('');
    
    const goodsList = goods.map( (good) => (  
        <Good 
            title = {good.title}
            who = {good.who}
            description = {good.description}
            where = {good.where}
            photo = {good.photo}
            IDgoods = {good.goodid}
        />   
    )) 

    useEffect(() => {
        if(category == "All"){
            const fetchGoods = async () =>{
                const querySnapshot = await getDocs(query(collection(db, "goods")));
                querySnapshot.forEach((doc) => {
                    setGoods(goods => [...goods, doc.data()])
                console.log(doc.id, " => ", doc.data());
                });
            }
            fetchGoods()
        }else{
           const fetchGoods = async () =>{
                const querySnapshot = await getDocs(query(collection(db, "goods"), where("category", "==", category)));
                querySnapshot.forEach((doc) => {
                    setGoods(goods => [...goods, doc.data()])
                console.log(doc.id, " => ", doc.data());
                });
            } 
            fetchGoods()
        }
      }, [])

    
    return (
        <div className="categoryoffert-container">
            <Header/>
            <div className="search-bar">
                <div className="input-container">
                    <input
                        placeholder="What are you looking for..."
                        onChange = {event => setSearch(event.target.value)}
                    />
                </div>

                <div className="input-container">
                    <select
                        onChange = {event => setVoivodeship(event.target.value)}>
                        {voivodeshipList.map((voivodeship) => (
                            <option value={voivodeship}>{voivodeship}</option>
                        ))}
                    </select>
                </div>

                <Link className="button" to={{pathname:'/searchgoods/' + search + '/' + voivodeship}}>
                    Search
                </Link>
            </div>
            <div className="categoryoffert-content-container">
                {goodsList}

            </div>
        </div>
    );
    
}

export default CategoryOffert

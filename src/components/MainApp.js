import React, {useState} from 'react'
import './Login.css';
import { Link } from 'react-router-dom';
import Header from "./Header"
import './MainApp.css'
import '../index.css'

const MainApp = () => {
    const [voivodeship, setVoivodeship] = useState('Dolnośląskie');
    const [search, setSearch] = useState();
    const voivodeshipList = ["Dolnośląskie", "Kujawsko-Pomorskie", "Lubelskie", "Lubuskie", "Łódzkie", "Małopolskie",
                    "Mazowieckie", "Opolskie", "Podkarpackie", "Podlaskie", "Pomorskie", "Śląskie", "Świętokrzyskie",
                    "Warmińsko-Mazurskie", "Wielkopolskie", "Zachodniopomorskie"];
    const categoryList = ["Sport", "Electronics", "House", "Garden", "Automotive", "Kids", "Clothes", "Animals", "Music", "Education" , "All", "Other"];

    return (
        <div className="container">
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
            <div className="content-container">
                <h1 className="title">Category</h1>
                <div className="category-container">
                    {categoryList.map((category) => (

                        <Link className="button-category" to={{pathname:'/categoryoffert/' + category}}>
                             {category}
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default MainApp

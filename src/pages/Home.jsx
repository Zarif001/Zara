import Card from "../components/Card"
import React from "react";
import ReactPlayer from "react-player";


function Home({ searchValue, setSearchValue, onChangeInput, items, addToCart, isLoading }) {



    const renderItems = () => {
        const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()),);
        return (isLoading ? [...Array(10)] : filteredItems).map((item, index) => (
            <Card
                key={index}
                onPlus={(obj) => addToCart(obj)}
                loading={isLoading}
                {...item}
            />
        ))
    }
    const menItems = () => {
        const filterItem = items.filter((item, index) => index < 4)

        return filterItem.map((item, index) => (
            <Card
                key={index}
                onPlus={(obj) => addToCart(obj)}
                loading={isLoading}
                {...item}
            />
        ))
    }
    const womenItems = () => {
        const filterItem = items.filter((item, index) => index > 3 && index < 8)

        return filterItem.map((item, index) => (
            <Card
                key={index}
                onPlus={(obj) => addToCart(obj)}
                loading={isLoading}
                {...item}
            />
        ))
    }
    const kidsItems = () => {
        const filterItem = items.filter((item, index) => index > 7 && index < 12)

        return filterItem.map((item, index) => (
            <Card
                key={index}
                onPlus={(obj) => addToCart(obj)}
                loading={isLoading}
                {...item}
            />
        ))
    }
    const parfumeItems = () => {
        const filterItem = items.filter((item, index) => index > 11 && index < 16)

        return filterItem.map((item, index) => (
            <Card
                key={index}
                onPlus={(obj) => addToCart(obj)}
                loading={isLoading}
                {...item}
            />
        ))
    }





    return (
        <div className="content p-40">
            <div className="mb-30">
                <ReactPlayer
                    url='video\ZARA _ Woman Campaign Fall Winter 2020.mp4'
                    width='100%'
                    controls={true}

                />
            </div>
            <div className="searchContent">
                <div>
                    <h1 className='mb-10'> {searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все товары'} </h1>

                </div>
                <div className="search-block d-flex mb-15">
                    <img src="/images/search.svg" alt="" />
                    {searchValue && <img onClick={() => setSearchValue('')} src="/images/crossX.svg " alt="" className="cross cu-p" />}
                    <input onChange={onChangeInput} value={searchValue} placeholder="Поиск..." type="text" />
                </div>
            </div>


            <div className="card-item">
                {renderItems()}
            </div>

            <>
                <h2 id="men">Мужские</h2>
                <div className="card-item">
                    {menItems()}
                </div>
            </>
            <>
                <h2 id="women">Женские</h2>
                <div className="card-item">
                    {womenItems()}
                </div>
            </>
            <>
                <h2 id="kids">Детские</h2>
                <div className="card-item">
                    {kidsItems()}
                </div>
            </>
            <>
                <h2 id="parfume">Духи</h2>
                <div className="card-item">
                    {parfumeItems()}
                </div>
            </>



        </div>

    )
}
export default Home

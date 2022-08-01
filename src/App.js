import React from "react";
import { Route, Routes } from 'react-router-dom';
import axios from 'axios'
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home.jsx";
import AppContext from "./context"
import Orders from "./pages/Orders";




function App() {

  // Все товары
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [addCart, setCart] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchData() {

      try {
        const [itemsResponse, cartResponse ] = await Promise.all([
          axios.get('https://62d14da4dccad0cf1764cae4.mockapi.io/Items'),
          axios.get('https://62d14da4dccad0cf1764cae4.mockapi.io/cart'),
        ]);


        setIsLoading(false)
        setItems(itemsResponse.data);
        setCartItems(cartResponse.data)

      } catch (error) {
        alert('Ошибка при запросе данных')
      }
    }
    fetchData()
  }, [])
  



  const onChangeInput = (event) => {
    setSearchValue(event.target.value);

  }

  const addToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
      if (findItem) {
        setCartItems((prev) => prev.filter(item => Number(item.parentId) !== Number(obj.id)))
        await axios.delete(`https://62d14da4dccad0cf1764cae4.mockapi.io/cart/${findItem.id}`)
      } else {
        setCartItems(prev => [...prev, obj])
        const {data} = await axios.post('https://62d14da4dccad0cf1764cae4.mockapi.io/cart', obj)
        setCartItems(prev => prev.map(item =>{
          if(item.parentId === data.parentId){
            return{
              ...item,
              id: data.id
            }
          }
          return item 
        }))
      }

    } catch (error) {
      console.log('Eroor with carts');
    }
  }

  const onRemoveCart = (id) => {
    try {
      setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)))
      axios.delete(`https://62d14da4dccad0cf1764cae4.mockapi.io/cart/${id}`)
    } catch (error) {
      alert('Ошибка при удалении из  корзины')
    }

  }


  const isItemsAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id))
  }


  return (
    <AppContext.Provider value={
      { items, cartItems,  isItemsAdded,  setCart, setCartItems, addToCart }
    }>
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCart(false)}
          onRemove={onRemoveCart}
          opened={addCart}
        />
        <Header onClickCart={() => setCart(true)} />

       
     
  

        <Routes>
          <Route path="/" element={
            <Home
              searchValue={searchValue}
              cartItems={cartItems}
              setSearchValue={setSearchValue}
              onChangeInput={onChangeInput}
              items={items}
              addToCart={addToCart}
              isLoading={isLoading}

            />
          }
          />



          <Route path="/orders" element={<Orders />} />

        </Routes>

      

      </div>
    </AppContext.Provider>
  )
}

export default App;

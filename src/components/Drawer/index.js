import styles from "./Drawer.module.scss";
import React from "react"
import Info from "../Info/Info";
import axios from "axios";
import { useCart } from "../../hooks/useCart";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Drawer({onClose,onRemove, items = [], opened}) {
    const {cartItems, setCartItems, totalPrice} = useCart()
    const [isOrder, setIsOrder] = React.useState(false)
    const [orderId, setOrderId] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)


    const onClickOrder = async () =>{
        try {
            setIsLoading(true)
            const { data } = await axios.post('https://62d14da4dccad0cf1764cae4.mockapi.io/orders', {items:cartItems})
            setOrderId(data.id)
            setIsOrder(true)
            setCartItems([])

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://62d14da4dccad0cf1764cae4.mockapi.io/cart/' + item.id)
                await delay(1000)
            }
            
        } catch (error) {
            alert('Не удалось сделать заказ')
        }
        setIsLoading(false)
    }
    
    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayHid : ''}`}>
        <div className={styles.drawer}>
            <h2 className="mb-30 d-flex justify-between ">Корзина
                    <img onClick={onClose}  className="cu-p" src="/images/crossX.svg" alt="" /></h2>
                {
                    items.length > 0 ?
                    <div className="d-flex flex-column flex">
                            <div className={styles.items}>
                                {items.map((obj) => (
                                    <div key={obj.id} className={styles.cartItem}>
                                        <div className={styles.cartItemImg} style={{ backgroundImage: `url(${obj.img})` }}></div>
                                        <div className="mr-20 flex">
                                            <p className="mb-5">{obj.name}</p>
                                            <b>{obj.price} руб</b>
                                        </div>
                                        <img onClick={() => onRemove(obj.id)} className="cu-p" src="/images/crossX.svg" alt="" />
                                    </div>

                                ))}
                            </div>
                            <div className={styles.cartTotalBlock}>
                                <ul>
                                    <li>
                                        <span>Итого:</span>
                                        <div></div>
                                        <b>{totalPrice}руб. </b>
                                    </li>
                                </ul>
                                <button disabled={isLoading} onClick={onClickOrder} className={styles.greenButton}>
                                    Оформить заказ

                                    <img src="/images/arrow.svg" alt="" />
                                </button>
                            </div>
                    </div>
                    :
                    <Info 
                    name={isOrder ? "Заказ оформлен" :  "Корзина пустая" }
                            describtion={isOrder ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы один товар, чтобы сделать заказ." }
                    image={isOrder? "/images/img/order.png" : "/images/img/empty-cart.png"}
                    />
                }   

                
            


        </div>
        </div>
    )
}
export default Drawer
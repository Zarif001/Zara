import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import React from 'react'
import { useCart } from "../../hooks/useCart";

function Header(props) {
    const { totalPrice } = useCart()


    return (
        
        <header className={styles.header}>
            <Link to='/'>
            <div className={styles.logo}>
                <div>
                    <img width={180} src="/favicon.ico" alt="" />
                </div>
            </div>
            </Link>
            <ul className="d-flex align-center">
                <li className="mr-30 cu-p" onClick={props.onClickCart}>
                    <img className="mr-10" width={18} height={18} src="/images/cart.svg" alt="" />

                    <span>{totalPrice} руб</span>
                </li>
                <Link to="/orders">
                <li>
                    <img className="cu-p"   width={18} height={18} src="/images/user.svg" alt="" />

                </li>
                </Link>
            </ul>
        </header>
    )
}
export default Header
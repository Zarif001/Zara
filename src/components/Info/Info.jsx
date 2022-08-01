import React from 'react'
import styles from './Info.module.scss';
import AppContext from "../../context";
const Info = ({image, name, describtion}) => {
    const { setCart } = React.useContext(AppContext);
    


  return (
      <div className={styles.cartEmpty}>
          <img width={120} src={image} alt="" />
          <h2>{name}</h2>
          <p>{describtion}</p>
          <button onClick={() => setCart(false)} className={styles.greenButton}>
              <img className={styles.img} src="/images/arrow.svg" alt="" />
              Вернуться назад
          </button>

      </div>
  )
}

export default Info
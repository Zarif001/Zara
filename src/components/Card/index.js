import styles from './Card.module.scss';
import ContentLoader from "react-content-loader";
import React from "react";
import AppContext from '../../context';

function Card({ id, name, price, img, onPlus, loading = false }) {
    const { isItemsAdded } = React.useContext(AppContext)
    const itemObj = { id, parentId: id, name, price, img }

    const handle = () => {
        onPlus(itemObj)
    }



    return (
        <div className={styles.card}>
            {
                loading ? (
                    <ContentLoader
                        speed={2}
                        width={155}
                        height={250}
                        viewBox="0 0 155 265"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb">
                        <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
                        <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
                        <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
                        <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
                        <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
                    </ContentLoader>
                ) : (
                    <>
                        <img className="img"  src={img} alt="" />
                        <h5>{name}</h5>
                        <div className="d-flex justify-between">
                            <div className="d-flex flex-column ">
                                <span>Цена:</span>
                                <b>{price} руб</b>
                            </div>
                            <div>
                                   {onPlus && <img className={styles.plus} onClick={handle} src={isItemsAdded(id) ? '/images/checked.svg' : '/images/plus.svg'} alt="" />}
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}
export default Card
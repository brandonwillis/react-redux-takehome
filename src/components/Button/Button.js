import styles from './Button.module.scss'

function Button({ onClickHandler, type, text, btnStyle }) {
    return <button className={styles.btn} onClick={onClickHandler} type={type}>{text}</button>
}

Button.defaultProps = {
    onClickHandler: () => { },
    type: '',
    text: '',
    btnStyle: 'primary'
}

export default Button;
import styles from './Input.module.scss';

function Input({ title, type, value, onChangeHandler, errorMessage }) {
    return (
        <div className={styles.container}>
            <label>{title}</label>
            <input
                type={type}
                onChange={onChangeHandler}
                value={value}
            />
            <div className={styles.errorTextContainer}>{errorMessage}</div>
        </div>
    )
}

export default Input;
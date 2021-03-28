import styles from './Input.module.scss';

function Input({ title, type, value, onChangeHandler, errorMessage, id }) {
    return (
        <div className={styles.container}>
            <label className={styles.title} id={`${id}-input`}>{title}</label>
            <input
                type={type}
                onChange={onChangeHandler}
                value={value}
                aria-labelledby={`${id}-input`}
            />
            <div className={styles.errorTextContainer}>{errorMessage}</div>
        </div>
    )
}

Input.defaultProps = {
    title: '',
    type: '',
    value: '',
    onChangeHandler: () => { },
    errorMessage: '',
    id: ''
}

export default Input;
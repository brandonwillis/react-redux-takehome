import styles from './Dropdown.module.scss';

function Dropdown({ title, value, onChangeHandler, options, errorMessage }) {
    return (
        <div className={styles.container}>
            <label>{title}</label>
            <select onChange={onChangeHandler} value={value}>
                {options.map(option => (
                    <option key={option.key} value={option.key}>{option.value}</option>
                ))}
            </select>
            <div className={styles.errorTextContainer}>{errorMessage}</div>
        </div>
    )
}

export default Dropdown;
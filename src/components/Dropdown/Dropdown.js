import styles from './Dropdown.module.scss';

function Dropdown({ title, value, onChangeHandler, options, errorMessage, id }) {
    return (
        <div className={styles.container}>
            <label className={styles.title} id={`${id}-select`}>{title}</label>
            <select onChange={onChangeHandler} value={value} aria-labelledby={`${id}-select`}>
                {options.map(option => (
                    <option key={option.key} value={option.key}>{option.value}</option>
                ))}
            </select>
            <div className={styles.errorTextContainer}>{errorMessage}</div>
        </div>
    )
}

Dropdown.defaultProps = {
    title: '',
    value: '',
    onChangeHandler: () => { },
    options: [],
    errorMessage: '',
    id: ''
}

export default Dropdown;
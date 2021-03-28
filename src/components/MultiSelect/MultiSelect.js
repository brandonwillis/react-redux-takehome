import styles from './MultiSelect.module.scss'

function MultiSelect({ title, options, onChangeHandler, selected, errorMessage, id }) {
    return (
        <div className={styles.container}>
            <label className={styles.title} id={`${id}-multiselect`}>{title}</label>
            <div className={styles.multiSelect} aria-labelledby={`${id}-multiselect`}>
                {
                    options.map(option => (
                        <div key={`${option.key}-${option.value}`} className={styles.row}>
                            <input type="checkbox" value={option.key} checked={selected[option.key] || false} onChange={onChangeHandler(option)} />
                            <label onClick={onChangeHandler(option)}>{option.value}</label>
                        </div>
                    ))
                }
                {/* {
                    Object.entries(options).sort((x, y) => x[1].name.localeCompare(y[1].name)).map(([key, value]) => {
                        return (
                            <div key={value.name} className={styles.row}>
                                <input type="checkbox" value={key} checked={selected[key] || false} onChange={onChangeHandler(value)} />
                                <label onClick={onChangeHandler(value)}>{value.name}</label>
                            </div>
                        )
                    })
                } */}
            </div>
            <div className={styles.errorTextContainer}>{errorMessage}</div>
        </div>
    )
}

MultiSelect.defaultProps = {
    title: '',
    options: [],
    onChangeHandler: () => { },
    selected: {},
    errorMessage: '',
    id: ''
}

export default MultiSelect;
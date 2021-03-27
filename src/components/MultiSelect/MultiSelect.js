import styles from './MultiSelect.module.scss'

function MultiSelect({ title, options, onChangeHandler, selected, errorMessage }) {
    return (
        <div className={styles.container}>
            <label>{title}:</label>
            <div className={styles.multiSelect}>
                {
                    Object.entries(options).sort((x, y) => x[1].name.localeCompare(y[1].name)).map(([key, value]) => {
                        return (
                            <div key={value.name} className={styles.row}>
                                <input type="checkbox" value={key} checked={selected[key] || false} onChange={onChangeHandler} />
                                <label>{value.name}</label>
                            </div>
                        )
                    })
                }
            </div>
            <div className={styles.errorTextContainer}>{errorMessage}</div>
        </div>
    )
}

export default MultiSelect;
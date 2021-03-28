import styles from './ReviewText.module.scss'

function ReviewText({ title, value }) {
    return <div className={styles.container}>
        <p>{title}:<span>{value}</span></p>
    </div>
}

export default ReviewText;
import {
    reviewPageSelector
} from './reviewSlice'
import { useSelector } from 'react-redux'
import ReviewText from '../../components/ReviewText/ReviewText'
import Button from '../../components/Button/Button'
import styles from './Review.module.scss'

function Review({ handleGoBackPageClicked }) {
    const reviewInfo = useSelector(reviewPageSelector);
    const { 
        name, 
        email, 
        phoneNumber, 
        hasBeenToTherapy, 
        reasons, 
        hasPreferredTherapistGender, 
        preferredTherapistGender, 
        city, 
        state 
    } = reviewInfo

    const handleSubmit = (event) => {
        event.preventDefault();
        /* hit some api with reviewInfo.request and route to success screen */
    } 

    return (
        <section className={styles.container}>
            <h2>Review Your Submission</h2>
            <ReviewText 
                title="Name"
                value={name}
            />
            <ReviewText
                title="Email"
                value={email}
            />
            <ReviewText
                title="Phone Number"
                value={phoneNumber}
            />
            <ReviewText
                title="Have you been to therapy before?"
                value={hasBeenToTherapy}
            />
            <ReviewText
                title="Reason(s) for Seeking Therapy"
                value={reasons}
            />
            <ReviewText
                title="Do you have a preferred therapist gender?"
                value={hasPreferredTherapistGender}
            />
            <ReviewText
                title="Preferred Gender"
                value={preferredTherapistGender}
            />
            <ReviewText
                title="City"
                value={city}
            />
            <ReviewText
                title="State"
                value={state}
            />
            <div className={styles.btnToolbar}>
                <Button 
                    onClickHandler={handleGoBackPageClicked}
                    text="Back"
                />
                <Button
                    onClickHandler={handleSubmit}
                    text="Submit"
                />
            </div>
        </section>
    )
}

export default Review;
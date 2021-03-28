import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    biologicalInfoSelector,
    updateBiographicalInfo
} from './biologicalInfoSlice';
import {
    confirmationOptionsSelector,
} from '../clientInfo/clientInfoSlice'
import Input from '../../components/Input/Input'
import Dropdown from '../../components/Dropdown/Dropdown'
import Button from '../../components/Button/Button'
import styles from './BiologicalInfo.module.scss'

function BiologicalInfo({ handleNextPageClicked }) {
    const biologicalInfo = useSelector(biologicalInfoSelector);
    const {
        name,
        email,
        phoneNumber,
        hasBeenToTherapy,
    } = biologicalInfo

    const confirmationOptions = useSelector(confirmationOptionsSelector)
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const handleInputChanged = (fieldName) => (event) => dispatch(updateBiographicalInfo({ fieldName, value: event.target.value }))

    function validateBiologicalInfo() {
        const validationErrors = {}

        if (!name) {
            validationErrors.name = 'Please enter your Name';
        }

        if (!email) {
            validationErrors.email = 'Please enter your Email'
        }

        if (email) {
            let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            if (!email.match(emailRegex)) {
                validationErrors.email = 'Please enter a valid Email'
            }
        }

        if (!phoneNumber) {
            validationErrors.phoneNumber = 'Please enter your Phone Number'
        }

        if (phoneNumber) {
            const phoneNumberRegex = /[^\w\s]/gi
            const stripped = phoneNumber.replace(phoneNumberRegex, "")

            if (isNaN(stripped) && stripped.length !== 10) {
                validationErrors.phoneNumber = 'Please enter a valid Phone Number'
            }
        }

        if (!hasBeenToTherapy) {
            validationErrors.hasBeenToTherapy = 'Please select an option'
        }

        validationErrors.hasErrors = Object.keys(validationErrors).length > 0
        return validationErrors
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let validationErrors = validateBiologicalInfo();
        if (validationErrors.hasErrors) {
            setErrors((err) => ({ ...err, ...validationErrors }))
        } else {
            handleNextPageClicked();
        }
    }

    return (
        <section className={styles.container}>
            <h2>Biological Info</h2>
            <form onSubmit={handleSubmit}>
                <Input
                    onChangeHandler={handleInputChanged('name')}
                    title='Name'
                    type='text'
                    value={name}
                    errorMessage={errors.name}
                    id="name"
                />
                <Input
                    onChangeHandler={handleInputChanged('email')}
                    title='Email'
                    type='text'
                    value={email}
                    errorMessage={errors.email}
                    id="email"
                />
                <Input
                    onChangeHandler={handleInputChanged('phoneNumber')}
                    title='Phone Number'
                    type='text'
                    value={phoneNumber}
                    errorMessage={errors.phoneNumber}
                    id="phoneNumber"
                />
                <Dropdown
                    onChangeHandler={handleInputChanged('hasBeenToTherapy')}
                    title='Have you been to therapy before?'
                    options={confirmationOptions}
                    value={hasBeenToTherapy}
                    errorMessage={errors.hasBeenToTherapy}
                    id="has-been-to-therapy"
                />
                <div className={styles.btnToolbar}>
                    <Button
                        type="submit"
                        text="Next"
                        btnStyle="primary"
                    />
                </div>
            </form>
        </section>
    )
}

export default BiologicalInfo
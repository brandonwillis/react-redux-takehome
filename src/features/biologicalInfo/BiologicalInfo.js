import { useState } from 'react'
import Input from '../../components/Input/Input'
import Dropdown from '../../components/Dropdown/Dropdown'
import { useSelector, useDispatch } from 'react-redux'
import {
    nameSelector,
    emailSelector,
    phoneNumberSelector,
    hasBeenToTherapySelector,
    updateBiographicalInfo
} from './biologicalInfoSlice';
import {
    confirmationOptionsSelector,
} from '../clientInfo/clientInfoSlice'

function BiologicalInfo({ handleNextPageClicked }) {
    const name = useSelector(nameSelector);
    const email = useSelector(emailSelector);
    const phoneNumber = useSelector(phoneNumberSelector);
    const hasBeenToTherapy = useSelector(hasBeenToTherapySelector);
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
            const stripped = phoneNumber.replaceAll(/\D+/g, "")

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

    return <div>
        <h1>Biological Info</h1>
        <form onSubmit={handleSubmit}>
            <Input
                onChangeHandler={handleInputChanged('name')}
                title='Name'
                type='text'
                value={name}
                errorMessage={errors.name}
            />
            <Input
                onChangeHandler={handleInputChanged('email')}
                title='Email'
                type='email'
                value={email}
                errorMessage={errors.email}
            />
            <Input
                onChangeHandler={handleInputChanged('phoneNumber')}
                title='Phone Number'
                type='text'
                value={phoneNumber}
                errorMessage={errors.phoneNumber}

            />
            <Dropdown
                onChangeHandler={handleInputChanged('hasBeenToTherapy')}
                title='Have you been to therapy before?'
                options={confirmationOptions}
                value={hasBeenToTherapy}
                errorMessage={errors.hasBeenToTherapy}
            />
            <div>
                <div>
                    <button type="submit">Next</button>
                </div>
            </div>
        </form>
    </div>
}

export default BiologicalInfo
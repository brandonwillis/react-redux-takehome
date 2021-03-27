import { useState, onEffect, useEffect } from 'react'
import Input from '../../components/Input/Input'
import Dropdown from '../../components/Dropdown/Dropdown'
import MultiSelect from '../../components/MultiSelect/MultiSelect'
import { useSelector, useDispatch } from 'react-redux'
import {
    reasonsSelector,
    hasPreferredTherapistGenderSelector,
    preferredTherapistGenderSelector,
    citySelector,
    stateSelector,
    updateMatchingCriteria,
    reasonSelected
} from './matchingCriteriaSlice'
import {
    acceptingCriteriaSelector,
    confirmationOptionsSelector,
    preferredTherapistGendersSelector,
    statesSelector
} from '../clientInfo/clientInfoSlice'
import styles from './MatchingCriteria.module.scss'

function MatchingCriteria({ handleGoBackPageClicked, handleNextPageClicked }) {
    const reasons = useSelector(reasonsSelector);
    const acceptingCriteria = useSelector(acceptingCriteriaSelector);
    const confirmationOptions = useSelector(confirmationOptionsSelector);
    const hasPreferredTherapistGender = useSelector(hasPreferredTherapistGenderSelector);
    const preferredTherapistGendersOptions = useSelector(preferredTherapistGendersSelector);
    const preferredTherapistGender = useSelector(preferredTherapistGenderSelector);
    const stateOptions = useSelector(statesSelector);
    const city = useSelector(citySelector)
    const state = useSelector(stateSelector)
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const handleInputChanged = (fieldName) => (event) => dispatch(updateMatchingCriteria({ fieldName, value: event.target.value }))
    const handleReasonSelected = (event) => dispatch(reasonSelected(event.target.value))
    debugger

    function validateMatchingCriteria() {
        const validationErrors = {};

        if(!reasons.length) {
            validationErrors.reasons = 'Please select a reason for seeking therapy'
        }

        if(!hasPreferredTherapistGender) {
            validationErrors.hasPreferredTherapistGender = 'Please select an option'
        }

        if (!preferredTherapistGender) {
            validationErrors.preferredTherapistGender = 'Please select a therapist gender'
        }

        if (!city) {
            validationErrors.city = 'Please enter your city'
        }

        if (!state) {
            validationErrors.state = 'Please select a state'
        }

        validationErrors.hasErrors = Object.keys(validationErrors);
        return validationErrors;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let validationErrors = validateMatchingCriteria();
        debugger
        if (validationErrors.hasErrors) {
            setErrors((err) => ({ ...err, ...validationErrors }))
        } else {
            handleNextPageClicked();
        }
    }

    return <div>
        <h1>Matching Criteria</h1>
        <form onSubmit={() => { }}>
            <MultiSelect
                onChangeHandler={handleReasonSelected}
                title='Reason(s) for Seeking Therapy'
                selected={reasons}
                options={acceptingCriteria}
                errorMessage={errors.reasons}
            />
            <div className={styles.splitContainer}>
                <Dropdown
                    onChangeHandler={handleInputChanged('hasPreferredTherapistGender')}
                    title='Do you have a preferred therapist gender?'
                    options={confirmationOptions}
                    value={hasPreferredTherapistGender}
                    errorMessage={errors.hasPreferredTherapistGender}
                />
                {hasPreferredTherapistGender === '1' &&
                    <Dropdown
                        onChangeHandler={handleInputChanged('preferredTherapistGender')}
                        title='Preferred Gender'
                        options={preferredTherapistGendersOptions}
                        value={preferredTherapistGender}
                        errorMessage={errors.preferredTherapistGender}
                    />
                }
            </div>
            <div className={styles.splitContainer}>
                <Input
                    onChangeHandler={handleInputChanged('city')}
                    title='City'
                    type='text'
                    value={city}
                    errorMessage={errors.city}
                />
                <Dropdown
                    onChangeHandler={handleInputChanged('state')}
                    title='State'
                    options={stateOptions}
                    value={state}
                    errorMessage={errors.state}
                />
            </div>
            <div className={styles.btnToolbar}>
                <div>
                    <button onClick={handleGoBackPageClicked}>Back</button>
                </div>
                <div>
                    <button type="submit">Next</button>
                </div>
            </div>
        </form>
    </div>
}

export default MatchingCriteria
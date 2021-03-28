import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    matchingCriteriaSelector,
    updateMatchingCriteria,
    reasonSelected
} from './matchingCriteriaSlice'
import {
    acceptingCriteriasSelector,
    confirmationOptionsSelector,
    preferredTherapistGendersSelector,
    statesSelector
} from '../clientInfo/clientInfoSlice'
import Input from '../../components/Input/Input'
import Dropdown from '../../components/Dropdown/Dropdown'
import MultiSelect from '../../components/MultiSelect/MultiSelect'
import Button from '../../components/Button/Button'
import styles from './MatchingCriteria.module.scss'

function MatchingCriteria({ handleGoBackPageClicked, handleNextPageClicked }) {
    const matchingCriteria = useSelector(matchingCriteriaSelector)
    const confirmationOptions = useSelector(confirmationOptionsSelector);
    const preferredTherapistGendersOptions = useSelector(preferredTherapistGendersSelector);
    const acceptingCriterias = useSelector(acceptingCriteriasSelector);
    const stateOptions = useSelector(statesSelector);
    const {
        reasons,
        hasPreferredTherapistGender,
        preferredTherapistGender,
        city,
        state
    } = matchingCriteria
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const handleInputChanged = (fieldName) => (event) => dispatch(updateMatchingCriteria({ fieldName, value: event.target.value }))
    const handleReasonSelected = (value) => () => dispatch(reasonSelected(value))

    function validateMatchingCriteria() {
        const validationErrors = {};

        if (!Object.keys(reasons).length) {
            validationErrors.reasons = 'Please select a reason for seeking therapy'
        }

        if (!hasPreferredTherapistGender) {
            validationErrors.hasPreferredTherapistGender = 'Please select an option'
        }

        if (!preferredTherapistGender && hasPreferredTherapistGender !== '2') {
            validationErrors.preferredTherapistGender = 'Please select a therapist gender'
        }

        if (!city) {
            validationErrors.city = 'Please enter your city'
        }

        if (!state) {
            validationErrors.state = 'Please select a state'
        }

        validationErrors.hasErrors = Object.keys(validationErrors).length > 0;

        return validationErrors;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validateMatchingCriteria();

        if (validationErrors.hasErrors) {
            setErrors((err) => ({ ...err, ...validationErrors }))
        } else {
            handleNextPageClicked();
        }
    }

    return (
        <section className={styles.container}>
            <h2>Matching Criteria</h2>
            <form onSubmit={handleSubmit}>
                <MultiSelect
                    onChangeHandler={handleReasonSelected}
                    title='Reason(s) for Seeking Therapy'
                    selected={reasons}
                    options={acceptingCriterias}
                    errorMessage={errors.reasons}
                    id="reasons"
                />
                <div className={styles.inputsContainer}>
                    <Dropdown
                        onChangeHandler={handleInputChanged('hasPreferredTherapistGender')}
                        title='Do you have a preferred therapist gender?'
                        options={confirmationOptions}
                        value={hasPreferredTherapistGender}
                        errorMessage={errors.hasPreferredTherapistGender}
                        id='has-preferred-therapist'
                    />
                    {hasPreferredTherapistGender === '1' &&
                        <Dropdown
                            onChangeHandler={handleInputChanged('preferredTherapistGender')}
                            title='Preferred Gender'
                            options={preferredTherapistGendersOptions}
                            value={preferredTherapistGender}
                            errorMessage={errors.preferredTherapistGender}
                            id='preferred-gender'
                        />
                    }
                </div>
                <div className={styles.inputsContainer}>
                    <Input
                        onChangeHandler={handleInputChanged('city')}
                        title='City'
                        type='text'
                        value={city}
                        errorMessage={errors.city}
                        id="city"
                    />
                    <Dropdown
                        onChangeHandler={handleInputChanged('state')}
                        title='State'
                        options={stateOptions}
                        value={state}
                        errorMessage={errors.state}
                        id="state"
                    />
                </div>
                <div className={styles.btnToolbar}>
                    <Button
                        onClickHandler={handleGoBackPageClicked}
                        text="Back"
                    />
                    <Button
                        type="submit"
                        text="Next"
                    />
                </div>
            </form>
        </section>
    )
}

export default MatchingCriteria
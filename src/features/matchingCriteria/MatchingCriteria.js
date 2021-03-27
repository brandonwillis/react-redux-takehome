import { Fragment, useState, onEffect, useEffect } from 'react'
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
    const dispatch = useDispatch();
    const reasons = useSelector(reasonsSelector);
    const acceptingCriteria = useSelector(acceptingCriteriaSelector);
    const confirmationOptions = useSelector(confirmationOptionsSelector);
    const hasPreferredTherapistGender = useSelector(hasPreferredTherapistGenderSelector);
    const preferredTherapistGendersOptions = useSelector(preferredTherapistGendersSelector);
    const preferredTherapistGender = useSelector(preferredTherapistGenderSelector);
    const stateOptions = useSelector(statesSelector);
    const city = useSelector(citySelector)
    const state = useSelector(stateSelector)

    const handleInputChanged = (fieldName) => (event) => dispatch(updateMatchingCriteria({ fieldName, value: event.target.value }))
    const handleReasonSelected = (event) => dispatch(reasonSelected(event.target.value))
    debugger
    return <div>
        <h1>Matching Criteria</h1>
        <form onSubmit={() => { }}>
            <MultiSelect
                onChangeHandler={handleReasonSelected}
                title='Reason(s) for Seeking Therapy'
                selected={reasons}
                options={acceptingCriteria}
            />
            <div className={styles.splitContainer}>
                <Dropdown
                    onChangeHandler={handleInputChanged('hasPreferredTherapistGender')}
                    title='Do you have a preferred therapist gender?'
                    options={confirmationOptions}
                    value={hasPreferredTherapistGender}
                // errorMessage={errors.hasBeenToTherapy}
                />
                {hasPreferredTherapistGender === '1' &&
                    <Dropdown
                        onChangeHandler={handleInputChanged('preferredTherapistGender')}
                        title='Select a Gender'
                        options={preferredTherapistGendersOptions}
                        value={preferredTherapistGender}
                    />
                }
            </div>
            <div className={styles.splitContainer}>
                <Input
                    onChangeHandler={handleInputChanged('city')}
                    title='City'
                    type='text'
                    value={city}
                />
                <Dropdown
                    onChangeHandler={handleInputChanged('state')}
                    title='State'
                    options={stateOptions}
                    value={state}
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
import { createSlice } from '@reduxjs/toolkit'

export const matchingCriteriaSlice = createSlice({
    name: 'matchingCriteria',
    initialState: {
        reasons: {},
        hasPreferredTherapistGender: undefined,
        preferredTherapistGender: '',
        city: '',
        state: ''
    },
    reducers: {
        updateMatchingCriteria: (state, action) => {
            const { fieldName, value } = action.payload;
            state[fieldName] = value;
        },
        reasonSelected: (state, action) => {
            const { payload } = action;
            if (state.reasons[payload]) {
                delete state.reasons[payload]
            } else {
                state.reasons = { ...state.reasons, [payload]: true }
            }
        }
    }
})

export const { updateMatchingCriteria, reasonSelected } = matchingCriteriaSlice.actions

export const reasonsSelector = state => state.matchingCriteria.reasons
export const hasPreferredTherapistGenderSelector = state => state.matchingCriteria.hasPreferredTherapistGender
export const preferredTherapistGenderSelector = state => state.matchingCriteria.preferredTherapistGender
export const citySelector = state => state.matchingCriteria.city
export const stateSelector = state => state.matchingCriteria.state

export default matchingCriteriaSlice.reducer
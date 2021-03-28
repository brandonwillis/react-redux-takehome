import { createSlice } from '@reduxjs/toolkit'

export const matchingCriteriaSlice = createSlice({
    name: 'matchingCriteria',
    initialState: {
        reasons: {},
        hasPreferredTherapistGender: undefined,
        preferredTherapistGender: undefined,
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
            if (state.reasons[payload.key] !== undefined) {
                delete state.reasons[payload.key]
            } else {
                state.reasons = { ...state.reasons, [payload.key]: payload.value }
            }
        }
    }
})

export const { updateMatchingCriteria, reasonSelected } = matchingCriteriaSlice.actions

export const matchingCriteriaSelector = state => state.matchingCriteria

export default matchingCriteriaSlice.reducer
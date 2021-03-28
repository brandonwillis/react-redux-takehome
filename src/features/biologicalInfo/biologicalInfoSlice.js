import { createSlice } from '@reduxjs/toolkit'

export const biologicalInfoSlice = createSlice({
    name: 'biologicalInfo',
    initialState: {
        name: '',
        email: '',
        phoneNumber: '',
        hasBeenToTherapy: '',
    },
    reducers: {
        updateBiographicalInfo: (state, action) => {
            const { fieldName, value } = action.payload
            state[fieldName] = value
        },
    }
})

export const { updateBiographicalInfo } = biologicalInfoSlice.actions

export const biologicalInfoSelector = state => state.biologicalInfo

export default biologicalInfoSlice.reducer
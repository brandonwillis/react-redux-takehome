import { createSlice } from '@reduxjs/toolkit'

export const biologicalInfoSlice = createSlice({
    name: 'biologicalInfo',
    initialState: {
        catalogs: {
            therapyOptions: [
                { key: '', value: 'Select one' },
                { key: 'yes', value: 'Yes' },
                { key: 'no', value: 'No' },
            ]
        },
        name: '',
        email: '',
        phoneNumber: '',
        hasBeenToTherapy: '',
        errors: {},
    },
    reducers: {
        updateBiographicalInfo: (state, action) => {
            const { fieldName, value } = action.payload
            state[fieldName] = value
        }
    }
})

export const { updateBiographicalInfo } = biologicalInfoSlice.actions

export const nameSelector = state => state.biologicalInfo.name
export const emailSelector = state => state.biologicalInfo.email
export const phoneNumberSelector = state => state.biologicalInfo.phoneNumber
export const hasBeenToTherapySelector = state => state.biologicalInfo.hasBeenToTherapy
export const therapyOptionsSelector = state => state.biologicalInfo.catalogs.therapyOptions

export default biologicalInfoSlice.reducer
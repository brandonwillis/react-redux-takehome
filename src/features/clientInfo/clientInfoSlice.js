import { createSlice } from '@reduxjs/toolkit'

export const clientInfoSlice = createSlice({
    name: 'clientInfo',
    initialState: {
        catalogs: {
            confirmationOptions: [
                { key: '', value: 'Select one' },
                { key: '1', value: 'Yes' },
                { key: '2', value: 'No' },
            ],
            preferredTherapistGenders: [
                { key: '1', value: 'Female' },
                { key: '2', value: 'Male' },
                { key: '3', value: 'Non-Binary' }
            ],
            acceptingCriteria: {},
            states: [],
        },
        currentPage: 2
    },
    reducers: {
        catalogValuesReceived: (state, action) => {
            state.catalogs = { ...state.catalogs, ...action.payload }
        },
        nextPage: (state) => {
            if (state.currentPage < 3) {
                state.currentPage += 1;
            }
        },
        goBackPage: (state) => {
            if (state.currentPage > 1) {
                state.currentPage -= 1;
            }
        }
    }
})

export const { nextPage, goBackPage, catalogValuesReceived } = clientInfoSlice.actions

export const currentPageSelector = state => state.clientInfo.currentPage
export const confirmationOptionsSelector = state => state.clientInfo.catalogs.confirmationOptions
export const preferredTherapistGendersSelector = state => state.clientInfo.catalogs.preferredTherapistGenders
export const acceptingCriteriaSelector = state => state.clientInfo.catalogs.acceptingCriteria
export const statesSelector = state => state.clientInfo.catalogs.states

export default clientInfoSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from "reselect"
import { matchingCriteriaSelector } from '../matchingCriteria/matchingCriteriaSlice'
import { biologicalInfoSelector } from '../biologicalInfo/biologicalInfoSlice'
import { catalogsSelector } from '../clientInfo/clientInfoSlice'

export const reviewSlice = createSlice({
    name: 'review',
    initialState: {},
    reducers: {
        nextPage: (state) => {
            state.currentPage += 1;
        },
        goBackPage: (state) => {
            state.currentPage -= 1;
        }
    }
})

export const { updateBiographicalInfo, updateMatchingCriteria, nextPage, goBackPage } = reviewSlice.actions

export const currentPageSelector = state => state.review.currentPage
export const reviewPageSelector = createSelector(
    biologicalInfoSelector,
    matchingCriteriaSelector,
    catalogsSelector,
    (biologicalInfo, matchingCriteria, catalogs) => {
        const confirmationOptionsHash = generateHash(catalogs.confirmationOptions)
        const statesHash = generateHash(catalogs.states)
        const preferredTherapistGenders = generateHash(catalogs.preferredTherapistGenders)

        const values = {
            ...biologicalInfo,
            ...matchingCriteria,
            hasBeenToTherapy: confirmationOptionsHash[biologicalInfo.hasBeenToTherapy],
            reasons: Object.values(matchingCriteria.reasons).join(", "),
            hasPreferredTherapistGender: confirmationOptionsHash[matchingCriteria.hasPreferredTherapistGender] === 'Yes' ? confirmationOptionsHash[matchingCriteria.hasPreferredTherapistGender] : 'N/A',
            preferredTherapistGender: matchingCriteria.preferredTherapistGender ? preferredTherapistGenders[matchingCriteria.preferredTherapistGender] : 'N/A',
            state: statesHash[matchingCriteria.state]
        }

        return values
    }
)

export const reviewRequestSelector = createSelector(
    biologicalInfoSelector,
    matchingCriteriaSelector,
    (biologicalInfo, matchingCriteria) => {
        const phoneNumberRegex = /[^\w\s]/gi
        let phoneNumber = biologicalInfo.phoneNumber.replace(phoneNumberRegex, "")
        
        return {
            ...biologicalInfo,
            ...matchingCriteria,
            phoneNumber, 
            reasons: Object.keys(matchingCriteria.reasons),
            preferredTherapistGender: matchingCriteria.preferredTherapistGender || null
        }
    }
)

export default reviewSlice.reducer

function generateHash(arr) {
    return arr.reduce((map, curr) => {
        map[curr.key] = curr.value
        return map
    }, {});
}
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
    nextPage,
    goBackPage,
    catalogValuesReceived,
    currentPageSelector,
} from './clientInfoSlice'

import BiologicalInfo from '../biologicalInfo/BiologicalInfo'
import MatchingCriteria from '../matchingCriteria/MatchingCriteria'

function fetchAcceptingCriteria() {
    return fetch('https://api.tryframe.com/common/accepting-criteria')
        .then(response => response.json())
        .then(res => res.data)
}

function fetchStates() {
    return fetch('https://api.tryframe.com/common/states')
        .then(response => response.json())
        .then(res => res.data)
}

export function ClientInfo() {
    const currentPage = useSelector(currentPageSelector)
    const dispatch = useDispatch();

    const handleNextPageClicked = () => dispatch(nextPage());
    const handleGoBackPageClicked = () => dispatch(goBackPage())

    useEffect(() => {
        Promise.all([
            fetchAcceptingCriteria(),
            fetchStates()
        ]).then(values => {
            const [acceptingCriteriasResult, statesResult] = values;

            const acceptingCriteria = acceptingCriteriasResult.reduce((map, curr) => {
                map[curr.id] = curr
                return map
            }, {})

            const states = statesResult.map(state => ({ key: state.id, value: state.description }))

            dispatch(catalogValuesReceived({ acceptingCriteria, states }));
        })
    }, [dispatch])

    return <div>
        {currentPage === 1 && <BiologicalInfo handleNextPageClicked={handleNextPageClicked} />}
        {currentPage === 2 && <MatchingCriteria handleGoBackPageClicked={handleGoBackPageClicked} handleNextPageClicked={handleNextPageClicked} />}
    </div>
}
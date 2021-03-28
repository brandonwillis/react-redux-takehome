import store from '../../app/store'
import { nextPage, goBackPage } from './clientInfoSlice'

test('Does not go to page 0 from page 1 when goBackPage action is dispatched', () => {
    let currentPage = store.getState().clientInfo.currentPage;
    expect(currentPage).toBe(1);

    store.dispatch(goBackPage());
    currentPage = store.getState().clientInfo.currentPage;
    expect(currentPage).toBe(1)
});

test('Changes page when nextPage action dispatched', () => {
    let currentPage = store.getState().clientInfo.currentPage;
    expect(currentPage).toBe(1);

    store.dispatch(nextPage());
    currentPage = store.getState().clientInfo.currentPage;
    expect(currentPage).toBe(2)
});
import {
    render,
    screen,
    fireEvent,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import BiologicalInfo from './BiologicalInfo'
import store from '../../app/store'

const renderBiologicalInfo = (handleNextPageClicked) => {
    render(
        <Provider store={store}>
            <BiologicalInfo handleNextPageClicked={handleNextPageClicked} />
        </Provider>
    )
}

test('Renders Matching Criteria', () => {
    renderBiologicalInfo();

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Have you been to therapy before?')).toBeInTheDocument();
})

test('Clicking Next button with empty fields will show validation errors', () => {
    renderBiologicalInfo();

    let submitButton = screen.getByRole('button', { type: /submit/i });
    fireEvent.click(submitButton)

    expect(screen.getByText('Please enter your Name')).toBeInTheDocument();
    expect(screen.getByText('Please enter your Email')).toBeInTheDocument();
    expect(screen.getByText('Please enter your Phone Number')).toBeInTheDocument();
    expect(screen.getByText('Please select an option')).toBeInTheDocument();
})

test('Updating Phone Number input with incorrect string should display validaiton error', () => {
    renderBiologicalInfo();

    let phoneNumberInput = screen.getByLabelText('Phone Number');
    fireEvent.change(phoneNumberInput, { target: { value: 'Test' } });
    let phoneNumber = store.getState().biologicalInfo.phoneNumber;
    expect(phoneNumberInput).toHaveValue('Test');
    expect(phoneNumber).toEqual('Test');

    let submitButton = screen.getByRole('button', { type: /submit/i });
    fireEvent.click(submitButton)

    expect(screen.getByText('Please enter a valid Phone Number')).toBeInTheDocument();
})


test('Clicking Next button with correct fields will go to next page', () => {
    const handleNextPageClicked = jest.fn();
    renderBiologicalInfo(handleNextPageClicked);

    let nameInput = screen.getByLabelText('Name');
    fireEvent.change(nameInput, { target: { value: 'Test' } });

    let phoneNumberInput = screen.getByLabelText('Phone Number');
    fireEvent.change(phoneNumberInput, { target: { value: '(123)-456-7890' } });

    let emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });

    let beenToTherapyInput = screen.getByLabelText('Have you been to therapy before?');
    fireEvent.change(beenToTherapyInput, { target: { value: '1' } });

    let submitButton = screen.getByRole('button', { type: /submit/i });
    fireEvent.click(submitButton)
    expect(screen.queryByText('Please enter a valid Phone Number')).not.toBeInTheDocument();

    expect(handleNextPageClicked).toBeCalled();
})

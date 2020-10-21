import { fireEvent, render, wait } from '@testing-library/react';
import React from 'react';
import 'styled-components';

import Input from '../../components/Input';

jest.mock('@unform/core', () => {
    return {
        useField() {
            return {
                fieldName: 'email',
                defaultValue: '',
                error: '',
                registerField: jest.fn(),
            };
        },
    };
})

describe('Input component', () => {
    it('should be able to render an input', () => {
        const { getByPlaceholderText } = render(
            <Input name="email" placeholder="E-mail" />
        );

        expect(getByPlaceholderText('E-mail')).toBeTruthy();
    });

    it('should render highlight on input focus', async () => {
        const { getByPlaceholderText, getByTestId } = render(
            <Input name="email" placeholder="E-mail" />
        );

        const inputElement = getByPlaceholderText('E-mail');
        const containerElement = getByTestId('input-container');

        fireEvent.focus(inputElement);

        await wait(() => {
            expect(containerElement).toHaveStyle('border-color: #ff900;');
            expect(containerElement).toHaveStyle('color: #ff900;');
        });

        fireEvent.blur(inputElement);

        await wait(() => {
            expect(containerElement).not.toHaveStyle('border-color: #ff900;');
            expect(containerElement).not.toHaveStyle('color: #ff900;');
        })
    });
});
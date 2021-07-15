import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';

import { server } from '../../../__mocks__/server';
import { errorHandler } from '../../../__mocks__/handlers';

import { CreateAccount } from '../CreateAccount';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('CreateAccount', () => {
  test('вижу форму с полями и кнопку отправки', () => {
    const { getByText, getByAccessibilityLabel } = render(<CreateAccount />);

    expect(getByAccessibilityLabel('Email')).toBeEnabled();
    expect(getByAccessibilityLabel('Password')).toBeEnabled();
    expect(getByAccessibilityLabel('Confirm Password')).toBeEnabled();
    expect(getByText('Submit')).toBeEnabled();
  });

  test('заполняю все поля -> получаю сообщение, что успешно зарегистрирован', async () => {
    const { getByText, getByAccessibilityLabel } = render(<CreateAccount />);
    const emailInput = getByAccessibilityLabel('Email');
    const passwordInput = getByAccessibilityLabel('Password');
    const confirmPasswordInput = getByAccessibilityLabel('Confirm Password');
    const submitButton = getByText('Submit');

    fireEvent.changeText(emailInput, 'test@test.com');
    fireEvent.changeText(passwordInput, 'test');
    fireEvent.changeText(confirmPasswordInput, 'test');
    fireEvent.press(submitButton, 'click');

    await waitFor(() => getByText('Account was successfully created'));
    expect(submitButton).toBeEnabled();
  });

  test('заполняю не все поля -> получаю ошибку валидации', async () => {
    const { getByText, getByAccessibilityLabel } = render(<CreateAccount />);
    const emailInput = getByAccessibilityLabel('Email');
    const passwordInput = getByAccessibilityLabel('Password');
    const submitButton = getByText('Submit');

    fireEvent.changeText(emailInput, 'test@test.com');
    fireEvent.changeText(passwordInput, 'test');
    fireEvent.press(submitButton, 'click');

    await waitFor(() => getByText('Validation error'));
    expect(submitButton).toBeEnabled();
  });

  test('заполняю поле не верно -> получаю ошибку валидации', async () => {
    const { getByText, getByAccessibilityLabel } = render(<CreateAccount />);
    const emailInput = getByAccessibilityLabel('Email');
    const passwordInput = getByAccessibilityLabel('Password');
    const confirmPasswordInput = getByAccessibilityLabel('Confirm Password');
    const submitButton = getByText('Submit');

    fireEvent.changeText(emailInput, 'test@test.com');
    fireEvent.changeText(passwordInput, 'test');
    fireEvent.changeText(confirmPasswordInput, 'error');
    fireEvent.press(submitButton, 'click');

    await waitFor(() => getByText('Password confirmation error'));
    expect(submitButton).toBeEnabled();
  });

  test('заполняю все поля -> приходит ошибка -> показываю сообщение об ошибке', async () => {
    const { getByText, getByAccessibilityLabel } = render(<CreateAccount />);
    const emailInput = getByAccessibilityLabel('Email');
    const passwordInput = getByAccessibilityLabel('Password');
    const confirmPasswordInput = getByAccessibilityLabel('Confirm Password');
    const submitButton = getByText('Submit');

    server.use(errorHandler);

    fireEvent.changeText(emailInput, 'test@test.com');
    fireEvent.changeText(passwordInput, 'test');
    fireEvent.changeText(confirmPasswordInput, 'test');
    fireEvent.press(submitButton, 'click');

    await waitFor(() => getByText('Something went wrong'));
    expect(submitButton).toBeEnabled();
  });
});

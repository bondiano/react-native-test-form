import React from 'react';
import { render } from '@testing-library/react-native';

import { SignIn } from '../SignIn';

describe('SignIn', () => {
  test('вижу форму с полями и кнопку отправки формы', () => {
    const { getByText, getByAccessibilityLabel } = render(<SignIn />);

    expect(getByAccessibilityLabel('Email')).toBeTruthy();
    expect(getByAccessibilityLabel('Password')).toBeTruthy();
    expect(getByText('Submit')).toBeEnabled();
  });
});

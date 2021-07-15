import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import axios from 'axios';

import { TextField, ErrorText } from '../components/Form';
import { Button } from '../components/Button';
import { REQUEST_STATUS } from '../types';

const styles = StyleSheet.create({
  scrollContentContainer: {
    paddingVertical: 20,
  },
  scroll: {
    backgroundColor: '#fff',
  },
  textBlock: {
    marginTop: 20,
  },
  text: {
    fontSize: 18,
    color: '#969696',
    textAlign: 'center',
    marginBottom: 2,
  },
  link: {
    textDecorationLine: 'underline',
  },
  success: {
    color: '#0DFF51',
  },
  error: {
    color: '#FF0202',
  },
});

const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

const isValidRequiredInputs = (state) => {
  const fields = Object.keys(initialValues);

  const validArray = fields.map((field) => state[field] && state[field].length !== 0);

  const validFields = validArray.filter(Boolean);
  return validFields.length === fields.length;
};

const isValidPasswordConfirmation = (state) => state.password === state.confirmPassword;

export const CreateAccount = (props) => {
  const { navigation } = props;
  const [errorMessage, setErrorMessage] = useState(null);
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.IDLE);
  const [values, setValues] = useState(initialValues);

  const onSubmit = async () => {
    if (!isValidRequiredInputs(values)) {
      setErrorMessage('Validation error');

      return;
    }

    if (!isValidPasswordConfirmation(values)) {
      setErrorMessage('Password confirmation error');

      return;
    }

    setErrorMessage(null);
    const { email, password } = values;

    setRequestStatus(REQUEST_STATUS.PENDING);
    try {
      await axios.post('https://postman-echo.com/post', {
        email,
        password,
      });

      setRequestStatus(REQUEST_STATUS.SUCCESS);
    } catch (error) {
      setRequestStatus(REQUEST_STATUS.FAILURE);
    }
  };

  const isSubmitting = requestStatus === REQUEST_STATUS.PENDING;
  const isSuccess = requestStatus === REQUEST_STATUS.SUCCESS;
  const hasStatusText = [REQUEST_STATUS.SUCCESS, REQUEST_STATUS.FAILURE].includes(requestStatus);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContentContainer}
      style={styles.scroll}
    >
      <TextField
        label="Email"
        placeholder="test@test.com"
        value={values.email}
        onChangeText={(email) => setValues((_values) => ({ ..._values, email }))}
      />
      <TextField
        label="Password"
        secureTextEntry
        value={values.password}
        onChangeText={(password) => setValues((_values) => ({ ..._values, password }))}
      />
      <TextField
        label="Confirm Password"
        secureTextEntry
        value={values.confirmPassword}
        onChangeText={(confirmPassword) => (
          setValues((_values) => ({ ..._values, confirmPassword }))
        )}
      />
      <ErrorText
        text={errorMessage}
      />
      <Button text="Submit" onPress={onSubmit} disabled={isSubmitting} />
      {hasStatusText && (
        <View style={styles.textBlock}>
          <Text style={[styles.text, isSuccess ? styles.success : styles.error]}>
            {
              isSuccess
                ? 'Account was successfully created'
                : 'Something went wrong'
            }
          </Text>
        </View>
      )}
      <View style={styles.textBlock}>
        <Text style={styles.text}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={[styles.text, styles.link]}>Sign in.</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

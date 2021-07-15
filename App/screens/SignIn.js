import React, { useState } from 'react';
import {
  ScrollView, Text, View, StyleSheet,
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
};

export const SignIn = () => {
  const [values, setValues] = useState(initialValues);
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.IDLE);

  const handleSubmit = async () => {
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
        onChangeText={(email) => setValues((_values) => ({ ..._values, email }))}
        value={values.email}
      />
      <TextField
        label="Password"
        onChangeText={(password) => setValues((_values) => ({ ..._values, password }))}
        value={values.password}
        secureTextEntry
      />
      <ErrorText text={values.error} />
      <Button text="Submit" onPress={handleSubmit} disabled={isSubmitting} />
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
    </ScrollView>
  );
};

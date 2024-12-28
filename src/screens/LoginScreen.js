import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppColors} from '../utils/AppColors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppButton from '../Components/AppButton';
import fetchApi, {BASEURL} from '../CommonServices/fetch';
import messaging from '@react-native-firebase/messaging';
import {useDispatch} from 'react-redux';
import {
  USER_LOAD_SUCCESS,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_SUCCESS,
} from '../constant/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [type, setType] = useState('LOGIN');
  const [deviceToken, setDeviceToken] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    // get device token from firebase
    const getDeviceToken = async () => {
      const token = await messaging().getToken();
      setDeviceToken(token);
    };
    getDeviceToken();
  }, []);

  useEffect(() => {
    // on reloading app use previous token to login
    const getToken = async () => {
      const value = await AsyncStorage.getItem('Token');
      if (value) {
        const res = await fetchApi(BASEURL + '/me', 'GET');
        if (res?.token) {
          await AsyncStorage.setItem('Token', res?.token);
          dispatch({type: USER_LOAD_SUCCESS, payload: res.user});
          navigation.navigate('AllUser');
        }
      }
    };
    getToken();
  }, []);

  const loginValidataion = () => {
    let valid = true;
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

    if (email.trim() === '') {
      ToastAndroid.show('Please enter a email', ToastAndroid.SHORT);
      valid = false;
    } else if (!emailRegex.test(email)) {
      ToastAndroid.show('Please enter a valid email', ToastAndroid.SHORT);
      valid = false;
    }

    if (password.trim() === '') {
      ToastAndroid.show('Please enter a password', ToastAndroid.SHORT);
      valid = false;
    }

    return valid;
  };

  let registrationValidation = () => {
    let valid = true;

    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    const mobileRegex = /^[6-9]\d{9}$/;

    if (email.trim() === '') {
      ToastAndroid.show('Please enter a email', ToastAndroid.SHORT);
      valid = false;
    } else if (!emailRegex.test(email)) {
      ToastAndroid.show('Please enter a valid email', ToastAndroid.SHORT);
      valid = false;
    }

    if (password.trim() === '') {
      ToastAndroid.show('Please enter a password', ToastAndroid.SHORT);
      valid = false;
    }

    if (name.trim() === '') {
      ToastAndroid.show('Please enter a name', ToastAndroid.SHORT);
      valid = false;
    }

    if (phoneNo === '') {
      ToastAndroid.show('Please enter a phone no.', ToastAndroid.SHORT);
      valid = false;
    } else if (!mobileRegex.test(phoneNo)) {
      ToastAndroid.show('Please enter a valid phone no.', ToastAndroid.SHORT);
      valid = false;
    }

    return valid;
  };

  const handelSubmit = async () => {
    // for login
    if (type === 'LOGIN') {
      if (loginValidataion()) {
        const res = await fetchApi(
          BASEURL + '/login',
          'POST',
          {
            loginEmail: email.trim(),
            loginPassword: password.trim(),
            deviceToken: deviceToken,
          },
          {
            'Content-Type': 'application/json',
          },
        );

        if (res?.token) {
          await AsyncStorage.setItem('Token', res?.token);
          dispatch({type: USER_LOGIN_SUCCESS, payload: res.user});
          navigation.navigate('AllUser');
        } else {
          ToastAndroid.show('Invalid Credentials', ToastAndroid.SHORT);
        }
      }
    }

    // for signup
    if (type === 'SIGNUP') {
      if (registrationValidation()) {
        const res = await fetchApi(
          BASEURL + '/register',
          'POST',
          {
            registerName: name.trim(),
            registerEmail: email.trim(),
            registerPhoneNo: phoneNo,
            registerPassword: password.trim(),
            deviceToken: deviceToken,
          },
          {
            'Content-Type': 'application/json',
          },
        );
        if (res?.token) {
          await AsyncStorage.setItem('Token', res?.token);
          dispatch({type: USER_REGISTER_SUCCESS, payload: res.user});
          navigation.navigate('AllUser');
        } else {
          ToastAndroid('Sign Up failed', ToastAndroid.SHORT);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          {height: type === 'SIGNUP' ? hp(40) : hp(30)},
        ]}>
        <View style={styles.headingContainer}>
          <TouchableOpacity
            onPress={() => [setType('LOGIN'), setEmail(''), setPassword('')]}>
            <Text
              style={[
                styles.heading,
                {color: type === 'LOGIN' ? AppColors.pink : AppColors.black},
              ]}>
              LOGIN
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => [setType('SIGNUP'), setEmail(''), setPassword('')]}>
            <Text
              style={[
                styles.heading,
                {color: type === 'SIGNUP' ? AppColors.pink : AppColors.black},
              ]}>
              SIGN UP
            </Text>
          </TouchableOpacity>
        </View>
        {type === 'SIGNUP' && (
          <TextInput
            style={styles.input}
            placeholder="Enter your Name"
            placeholderTextColor={AppColors.grey}
            value={name}
            onChangeText={text => setName(text)}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor={AppColors.grey}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        {type === 'SIGNUP' && (
          <TextInput
            style={styles.input}
            placeholder="Enter your phoneNo"
            placeholderTextColor={AppColors.grey}
            value={phoneNo}
            onChangeText={text => setPhoneNo(text)}
            keyboardType="numeric"
            maxLength={10}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor={AppColors.grey}
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
        <AppButton
          text={type === 'LOGIN' ? 'Login' : 'Sign up'}
          onPress={handelSubmit}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    backgroundColor: AppColors.white,
    elevation: 10,
    borderRadius: hp(2),
    width: wp(80),
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: hp(3),
    fontWeight: '700',
  },
  input: {
    marginTop: hp(2),
    borderColor: AppColors.black,
    borderWidth: 1,
    width: wp(60),
    borderRadius: hp(1),
    paddingVertical: 0,
    paddingHorizontal: wp(2),
    height: hp(4),
  },
  headingContainer: {
    flexDirection: 'row',
    width: wp(50),
    justifyContent: 'space-between',
  },
});

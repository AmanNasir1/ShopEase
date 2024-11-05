import {View, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {Button, Text, TextInput} from 'react-native-paper';
import {Controller, useForm} from 'react-hook-form';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../../types/navigation.types';
import SEText from '../../../components/atoms/se-text';
import {useMutation} from '@tanstack/react-query';
import api from '../../../ApiService/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import useAuthStore from '../../../store/useAuthStore';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignIn'>;

interface SignInResponse {
  token: string;
}

const SignInScreen = ({navigation}: Props) => {
  const setToken = useAuthStore(state => state.setToken);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: 'aman1@gmail.com',
      password: 'Click123',
    },
  });

  const {mutateAsync: userSignIn, isPending: isLoggedIn} = useMutation({
    mutationFn: api.signIn,
    onSuccess: async response => {
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
      });
      const data = response.data as SignInResponse;

      setToken(data.token);
    },

    onError: error => {
      console.log('error', error);

      Toast.show({
        type: 'error',
        text1: error.message,
      });
    },
  });

  const onSubmit = async (data: {email: string; password: string}) => {
    await userSignIn(data);
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={tw`p-3 flex-1 gap-6 `}>
          <View style={tw`mt-3`}>
            <SEText variant="title" style={tw`text-black font-bold`}>
              Login to your account
            </SEText>
            <SEText variant="subtitle" style={tw`text-[#808080]`}>
              It's great to see you again
            </SEText>
          </View>
          <View style={tw`gap-6 mt-3  `}>
            <View>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Enter a valid email address',
                  },
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    placeholder="Email"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    mode="outlined"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    style={tw`bg-white `}
                    contentStyle={{color: 'black'}}
                    theme={{
                      colors: {primary: 'black', outline: 'silver'},
                    }}
                  />
                )}
              />
              {errors.email && (
                <Text style={tw`text-red-600`}>{errors.email.message}</Text>
              )}
            </View>
            <View>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long',
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                    message:
                      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
                  },
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    placeholder="Password"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    secureTextEntry
                    mode="outlined"
                    autoCapitalize="none"
                    style={tw`bg-white`}
                    contentStyle={{color: 'black'}}
                    theme={{
                      colors: {primary: 'black', outline: 'silver'},
                    }}
                  />
                )}
              />
              {errors.password && (
                <Text style={tw`text-red-600`}>{errors.password.message}</Text>
              )}
              <View style={tw`flex-row mt-2 gap-1`}>
                <Text style={tw`text-black `}>Forgot your password?</Text>
                <Text style={tw` text-black font-bold underline`}>
                  Reset your password
                </Text>
              </View>
            </View>
            <Button
              labelStyle={tw`text-white text-base`}
              style={tw`bg-[#1a1a1a] p-2 rounded-lg `}
              loading={isLoggedIn}
              onPress={handleSubmit(onSubmit)}>
              Login
            </Button>
          </View>

          <Text style={tw`text-center text-lg text-[#808080]`}>Or</Text>
          <View style={tw`gap-3`}>
            <Button
              labelStyle={tw`text-black text-base`}
              style={tw`bg-transparent p-2 rounded-lg border border-gray-300 `}>
              Login with Google
            </Button>
            <Button
              labelStyle={tw`text-black text-base`}
              style={tw`bg-transparent p-2 rounded-lg border border-gray-300 `}>
              Login with Facebook
            </Button>
          </View>
        </View>
        <View style={tw`flex-row gap-1 justify-center mb-5 `}>
          <Text style={tw`text-base text-[#808080]`}>
            Don't have an account?
          </Text>
          <Text
            onPress={() => navigation.navigate('SignUp')}
            style={tw`text-base underline font-bold text-black`}>
            Join
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;

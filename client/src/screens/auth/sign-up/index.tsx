import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {Button, Text, TextInput} from 'react-native-paper';
import {Controller, useForm} from 'react-hook-form';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../../types/navigation.types';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

const SignUpScreen = ({navigation}: Props) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });
  const onSubmit = (data: any) => console.log(data);
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
            <Text variant="headlineLarge" style={tw`text-black font-bold`}>
              Create an account
            </Text>
            <Text variant="bodyLarge" style={tw`text-[#808080]`}>
              Let's create your account
            </Text>
          </View>
          <View style={tw`gap-6  `}>
            <View>
              <Controller
                control={control}
                rules={{
                  required: 'Name is required',
                  minLength: {
                    value: 3,
                    message: 'Name must be at least 3 characters long',
                  },
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <>
                    <Text style={tw`text-black `}>Full Name</Text>
                    <TextInput
                      placeholder="Full Name"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      mode="outlined"
                      autoCapitalize="words"
                      contentStyle={{color: 'black'}}
                      style={tw`bg-white `}
                      theme={{
                        colors: {primary: 'black', outline: 'silver'},
                      }}
                    />
                  </>
                )}
                name="fullName"
              />
              {errors.fullName && (
                <Text style={tw`text-red-600`}>{errors.fullName.message}</Text>
              )}
            </View>
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
                  <>
                    <Text style={tw`text-black `}>Email</Text>
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
                  </>
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
                  <>
                    <Text style={tw`text-black `}>Password</Text>
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
                  </>
                )}
              />
              {errors.password && (
                <Text style={tw`text-red-600`}>{errors.password.message}</Text>
              )}
            </View>
            <Button
              labelStyle={tw`text-white text-base`}
              style={tw`bg-[#1a1a1a] p-2 rounded-lg `}
              onPress={handleSubmit(onSubmit)}>
              Create an account
            </Button>
          </View>
          <Text style={tw`text-center text-lg text-[#808080]`}>Or</Text>
          <View style={tw`gap-3`}>
            <Button
              labelStyle={tw`text-black text-base`}
              style={tw`bg-transparent p-2 rounded-lg border border-gray-300 `}>
              Sign Up with Google
            </Button>
            <Button
              labelStyle={tw`text-black text-base`}
              style={tw`bg-transparent p-2 rounded-lg border border-gray-300 `}>
              Sign Up with Facebook
            </Button>
          </View>
        </View>
        <View style={tw`flex-row gap-1 justify-center mb-3`}>
          <Text style={tw`text-base text-[#808080]`}>
            Already have an account?
          </Text>
          <Text
            onPress={() => navigation.navigate('SignIn')}
            style={tw`text-base underline font-bold text-black`}>
            Login
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

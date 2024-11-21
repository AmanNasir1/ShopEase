import React from 'react';
import {
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import {Text, IconButton, Searchbar, Chip, Card} from 'react-native-paper';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Feather';

const categories = ['All', 'Tshirts', 'Jeans', 'Shoes'];

const products = [
  {
    id: '1',
    name: 'Regular Fit Slogan',
    price: '1,190',
    image: require('../../assets//images/placeholder.png'),
  },
  {
    id: '2',
    name: 'Regular Fit Polo',
    price: '1,100',
    discount: '52%',
    image: require('../../assets//images/placeholder.png'),
  },
  {
    id: '3',
    name: 'Regular Fit Black',
    price: '1,690',
    image: require('../../assets//images/placeholder.png'),
  },
  {
    id: '4',
    name: 'Regular Fit V-Neck',
    price: '1,290',
    image: require('../../assets//images/placeholder.png'),
  },
  {
    id: '5',
    name: 'Regular Fit V-Neck',
    price: '1,290',
    image: require('../../assets//images/placeholder.png'),
  },
  {
    id: '6',
    name: 'Regular Fit V-Neck',
    price: '1,290',
    image: require('../../assets//images/placeholder.png'),
  },
  {
    id: '7',
    name: 'Regular Fit V-Neck',
    price: '1,290',
    image: require('../../assets//images/placeholder.png'),
  },
];

const HomeScreen = () => {
  const {width} = Dimensions.get('window');
  const ITEM_WIDTH = (width - 32) / 2;

  return (
    <KeyboardAvoidingView
      style={tw`flex-1`}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
      <View style={tw`flex-1 p-4 bg-white gap-4`}>
        <View style={tw`flex-row justify-between items-center `}>
          <Text variant="titleLarge" style={tw`font-bold text-black`}>
            Discover
          </Text>
          <View style={tw`flex-row`}>
            <TouchableOpacity>
              <Icon name="bell" color={'#000000'} size={25} />
            </TouchableOpacity>
          </View>
        </View>

        <Searchbar
          value=""
          placeholder="Search for clothes..."
          style={tw` bg-transparent border border-solid border-gray-700 rounded-2xl text-black`}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={tw` pb-2`}>
          {categories.map(category => (
            <Chip
              key={category}
              style={tw` mx-1.5 min-w-[50px] min-h-[30px] bg-white border border-solid border-gray-200   `}>
              <Text style={tw`text-black font-bold text-center `}>
                {category}
              </Text>
            </Chip>
          ))}
        </ScrollView>

        <FlatList
          data={products}
          numColumns={2}
          contentContainerStyle={tw`gap-5 `}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Card style={tw`flex-1 m-1 bg-white `} mode="contained">
              <Card.Cover source={item.image} style={tw`h-40`} />
              <Card.Content>
                <Text variant="bodyMedium" style={tw`font-bold text-black `}>
                  {item.name}
                </Text>
                <Text variant="bodySmall" style={tw`text-gray-500 `}>
                  $ {item.price}
                </Text>
              </Card.Content>
              <IconButton
                icon="heart-outline"
                animated={true}
                iconColor="black"
                size={20}
                style={tw` absolute top-1 right-1 bg-white rounded-md shadow-2xl`}
              />
            </Card>
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

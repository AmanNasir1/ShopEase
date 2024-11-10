import React from 'react';
import {
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
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
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    name: 'Regular Fit Polo',
    price: '1,100',
    discount: '52%',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    name: 'Regular Fit Black',
    price: '1,690',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '4',
    name: 'Regular Fit V-Neck',
    price: '1,290',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '4',
    name: 'Regular Fit V-Neck',
    price: '1,290',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '4',
    name: 'Regular Fit V-Neck',
    price: '1,290',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '4',
    name: 'Regular Fit V-Neck',
    price: '1,290',
    image: 'https://via.placeholder.com/150',
  },
];

const HomeScreen = () => {
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
          placeholder="Search for clothes..."
          value={''}
          style={tw` bg-transparent border border-solid border-gray-700`}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={tw` pb-2`}>
          {categories.map(category => (
            <Chip
              key={category}
              style={tw`mx-1.5 min-w-[50px] min-h-[30px] justify-center items-center bg-white`}>
              {category}
            </Chip>
          ))}
        </ScrollView>

        {/* Product Grid */}
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={item => item.id}
          style={tw`bg-red-300`}
          renderItem={({item}) => (
            <Card style={tw`flex-1 m-1`} mode="outlined">
              <Card.Cover source={{uri: item.image}} style={tw`h-40`} />
              <Card.Content>
                <Text variant="bodyMedium" style={tw`font-semibold `}>
                  {item.name}
                </Text>
                <Text variant="bodySmall" style={tw`text-gray-500 `}>
                  ₹ {item.price}
                </Text>
              </Card.Content>
              <IconButton
                icon="heart-outline"
                style={tw`absolute top-2 right-2`}
              />
            </Card>
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

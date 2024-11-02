import {View, Text, TextProps, StyleSheet} from 'react-native';
import React, {HTMLAttributes} from 'react';

interface SETextProps extends TextProps {
  children: React.ReactNode;
  variant?: 'title' | 'subtitle' | 'body';
}

const SEText = ({children, variant = 'body', style, ...props}: SETextProps) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'title':
        return styles.title;
      case 'subtitle':
        return styles.subtitle;
      default:
        return styles.body;
    }
  };

  return (
    <Text style={[getVariantStyle(), style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
  },
});

export default SEText;

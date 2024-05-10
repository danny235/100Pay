import { View, Text, Pressable } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function TransactionItemLoader() {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <Pressable style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <View style={{gap: 4}}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <View
              style={{
                width: 15,
                height: 15,
                backgroundColor: '#adadad',
                borderRadius: 3,
              }}
            />{' '}
            {/* Placeholder icon */}
            <View
              style={{
                width: '50%',
                height: 10,
                backgroundColor: '#adadad',
                borderRadius: 5,
              }}
            />{' '}
            {/* Placeholder text */}
          </View>
          <View style={{flexDirection: 'row', gap: 10}}>
            <View
              style={{
                width: '50%',
                height: 8,
                backgroundColor: '#adadad',
                borderRadius: 5,
              }}
            />{' '}
            {/* Placeholder text */}
            <View
              style={{
                width: '30%',
                height: 8,
                backgroundColor: '#adadad',
                borderRadius: 5,
              }}
            />{' '}
            {/* Placeholder text */}
          </View>
        </View>
        <View style={{marginLeft: 'auto', justifyContent: 'flex-end'}}>
          <View
            style={{
              width: '30%',
              height: 14,
              backgroundColor: '#adadad',
              borderRadius: 5,
            }}
          />{' '}
          {/* Placeholder text */}
          <View
            style={{
              width: '20%',
              height: 11,
              backgroundColor: '#adadad',
              borderRadius: 5,
              marginTop: 3,
            }}
          />{' '}
          {/* Placeholder text */}
        </View>
      </Pressable>
    </SkeletonPlaceholder>
  );
}
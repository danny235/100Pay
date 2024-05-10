import React from 'react';
import { View, Image, Text, StyleSheet, Pressable } from 'react-native';
import AvatarE from '../../../../assets/images/DashboardEmojis/Avatar-e.png';
import {
  LightText,
  SemiBoldText,
} from '../../../../components/styles/styledComponents';
import { Colors } from '../../../../components/Colors';

interface User {
  id: string;
  username: string;
  avatar: any;
}

interface UserPayListProps {
  renderSingleItem?: boolean;
  onPress?: () => void
}

const UserPayList: React.FC<UserPayListProps> = ({ renderSingleItem, onPress }) => {
  const avatars: User[] = [
    { id: 'ID: 234GH6', username: 'Ugo matt', avatar: AvatarE },
    { id: 'ID: 235GH6', username: 'Brainy Josh', avatar: AvatarE },
    { id: 'ID: 236GH6', username: 'Daniel Barima', avatar: AvatarE },
    { id: 'ID: 237GH6', username: 'Emmanuel GOAT', avatar: AvatarE },
    { id: 'ID: 238GH6', username: 'Ibeneme Ibeneme', avatar: AvatarE },
  ];

  return (
    <View style={styles.container}>
      {renderSingleItem ? (
        <View key={avatars[0].id} style={styles.userContainer}>
          <Image source={avatars[0].avatar} style={styles.avatar} />
          <SemiBoldText style={styles.username}>{avatars[0].username}</SemiBoldText>
          <View style={styles.userInfo}>
            <LightText style={styles.userId}>ID: {avatars[0].id}</LightText>
          </View>
        </View>
      ) : (
        avatars.map(user => (
          <Pressable onPress={onPress} key={user.id} style={styles.userContainer}>
            <Image source={user.avatar} style={styles.avatar} />
            <SemiBoldText style={styles.username}>{user.username}</SemiBoldText>
            <View style={styles.userInfo}>
              <LightText style={styles.userId}>ID: {user.id}</LightText>
            </View>
          </Pressable>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 12,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flexDirection: 'column',
    borderLeftWidth: 1,
    borderLeftColor: Colors.ash,
    paddingLeft: 12,
  },
  username: {
    fontSize: 16,
    color: Colors.balanceBlack,
    paddingRight: 12,
  },
  userId: {
    fontSize: 13,
    color: 'gray',
  },
});

export default UserPayList;

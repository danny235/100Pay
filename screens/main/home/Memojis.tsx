import React from 'react';
import {View, Text, ScrollView, Image, StyleSheet, Pressable} from 'react-native';
import AvatarA from '../../../assets/images/DashboardEmojis/Avatar-a.png';
import AvatarB from '../../../assets/images/DashboardEmojis/Avatar-b.png';
import AvatarC from '../../../assets/images/DashboardEmojis/Avatar-c.png';
import AvatarD from '../../../assets/images/DashboardEmojis/Avatar-d.png';
import AvatarE from '../../../assets/images/DashboardEmojis/Avatar-e.png';
import AvatarF from '../../../assets/images/DashboardEmojis/Avatar-f.png';
import {
  BoldText,
  SemiBoldText,
} from '../../../components/styles/styledComponents';
import {Colors} from '../../../components/Colors';
import {ArrowFrontIcon} from '../../../components/SvgAssets';
import {useWindowDimensions} from 'react-native';

interface User {
  id: number;
  username: string;
  avatar: any;
}

type MemojiT = {
  onPress?: () => void
}

const sampleUsers: User[] = [
  {id: 1, username: 'Oscar .R', avatar: AvatarA},
  {id: 2, username: 'Ikenna .I', avatar: AvatarB},
  {id: 3, username: 'Ibeneme .I', avatar: AvatarC},
  {id: 4, username: 'Daniel .B', avatar: AvatarD},
  {id: 5, username: 'Ikenna', avatar: AvatarE},
  {id: 6, username: 'Ibeneme', avatar: AvatarF},
];

const Memojis: React.FC<MemojiT> = ({onPress}) => {
  const {fontScale} = useWindowDimensions();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.line} />
        <BoldText style={styles.headerText}>Recents</BoldText>
        <ArrowFrontIcon />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {sampleUsers.map(user => (
          <Pressable onPress={onPress}  key={user.id} style={styles.userContainer}>
            <Image source={user.avatar} style={styles.image} />
            <SemiBoldText style={[styles.username, {color: Colors.grayText}]}>
              {user.username}
            </SemiBoldText>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.memojiBackground,
    marginVertical: 24,
    borderRadius: 12,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderLeftColor: Colors.primary,
    borderLeftWidth: 5,
    borderRadius: 20,
    height: 16,
  },
  headerText: {
    fontSize: 17,
    color: Colors.balanceBlack,
  },
  userContainer: {
    marginRight: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 50,
  },
  username: {
    marginTop: 5,
    fontSize: 14,
  },
});

export default Memojis;

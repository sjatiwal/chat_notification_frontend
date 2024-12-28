import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import fetchApi, {BASEURL} from '../CommonServices/fetch';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {AppColors} from '../utils/AppColors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AllUser = ({navigation}) => {
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    // get all user list
    const getAllUser = async () => {
      const res = await fetchApi(BASEURL + '/alluser', 'GET');
      if (res?.users.length) {
        setAllUsers(res?.users);
      }
    };

    getAllUser();
  }, []);

  // render all user list
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ChatScreen', {
          username: item.username,
          phoneNo: item.phoneNo,
        })
      }
      style={styles.container}>
      <Text>{item.username}</Text>
      <Text>{item.phoneNo}</Text>
    </TouchableOpacity>
  );

  const handleLogout = () => {
    // clear asyn storage for login
    AsyncStorage.clear();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>User List</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
        <Text style={styles.logout}>Logout</Text>
      </TouchableOpacity>
      <FlatList
        data={allUsers}
        keyExtractor={item => item.user_id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default AllUser;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: AppColors.white,
    flex: 1,
    alignItems: 'center',
  },
  heading: {
    color: AppColors.black,
  },
  logoutBtn: {
    position: 'absolute',
    right: wp(4),
    top: hp(3),
  },
  logout: {
    color: AppColors.black,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    backgroundColor: AppColors.white,
    elevation: 5,
    borderRadius: wp(2),
    width: wp(90),
    marginHorizontal: 5,
    paddingVertical: wp(2),
  },
  heading: {
    textAlign: 'center',
    marginTop: hp(2),
    fontSize: 24,
    fontWeight: '800',
    color: 'black',
  },
});

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {AppColors} from '../utils/AppColors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AppButton from '../Components/AppButton';
import {useSelector} from 'react-redux';
import fetchApi, {BASEURL, SOCKET_BASEURL} from '../CommonServices/fetch';
import io from 'socket.io-client';
const ChatScreen = ({route}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const {username, phoneNo} = route.params;
  const [socket, setSocket] = useState(null);
  const {user} = useSelector(state => state.user);
  const flatListRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      // fetch all messages store in database for this chat
      if (phoneNo) {
        try {
          const res = await fetchApi(
            BASEURL + '/getusermessage' + `/${phoneNo}`,
            'GET',
          );

          setMessages(res);
        } catch (err) {}
      }
    };
    fetchMessages(phoneNo);
  }, []);

  const initializeSocket = async () => {
    // creating websocket connection
    const newSocket = io(SOCKET_BASEURL);

    setSocket(newSocket);
  };

  useEffect(() => {
    // initializing socket

    initializeSocket();

    // on unmounting
    return () => {
      if (socket) {
        socket.off('connect');
        socket.off('chat message');
        socket.disconnect();
        setSocket(null);
      }
    };
  }, []);

  useEffect(() => {
    if (socket) {
      //on establishing connection
      socket.on('connect', () => {
        if (socket) {
          socket.emit(
            'join',
            username,
            phoneNo,
            user[0]?.phoneNo,
            user[0]?.username,
          );
        }
      });

      // receiving message
      socket.on('chat message', msg => {
        setMessages(prevMessages => {
          const updatedMessages = [...prevMessages, msg];
          return updatedMessages;
        });
      });
    }

    return () => {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    };
  }, [socket, user]);

  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToEnd({animated: true});
    }
  }, [messages, message]);

  const sendMessage = () => {
    if (socket && message.trim() !== '') {
      socket.emit('chat message', message, user[0]?.phoneNo, phoneNo);
      setMessage('');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>{username}</Text>
      <View style={styles.messageContainer}>
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          ref={flatListRef}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'flex-end',
          }}
          renderItem={({item}) => (
            <View
              style={[
                styles.textContainer,
                item.senderPhoneNo === user[0]?.phoneNo
                  ? styles.senderContainer
                  : styles.receiverContainer,
              ]}>
              <View
                style={[
                  styles.textWrapper,
                  item.senderPhoneNo === user[0]?.phoneNo
                    ? {alignSelf: 'flex-end'}
                    : {alignSelf: 'flex-start'},
                ]}>
                <TouchableOpacity>
                  <Text style={[styles.text]}>{item.message}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={text => setMessage(text)}
        />
        <AppButton
          text="Send"
          marginTop={0}
          width={wp(30)}
          onPress={sendMessage}
        />
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, paddingHorizontal: wp(2)},
  heading: {
    color: AppColors.black,
    textAlign: 'center',
    paddingTop: wp(2),
    fontSize: hp(2.5),
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  messageContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: AppColors.black,
    marginVertical: wp(2),
    borderRadius: wp(2),
    padding: wp(1),
    overflow: 'hidden',
  },
  input: {
    borderWidth: 1,
    borderColor: AppColors.grey,
    width: wp(60),
    paddingVertical: 0,
    height: hp(5),
    borderRadius: wp(2),
    color: AppColors.black,
  },
  senderContainer: {
    backgroundColor: AppColors.grey,
    maxWidth: wp(70),
    alignSelf: 'flex-end',
    padding: wp(1),
    marginTop: wp(1),
    borderRadius: wp(2),
    minWidth: wp(6),
    maxHeight: wp(60),
  },
  receiverContainer: {
    backgroundColor: AppColors.orange,
    alignSelf: 'flex-start',
    maxWidth: wp(70),
    padding: wp(1),
    borderRadius: wp(2),
    marginTop: wp(1),
    minWidth: wp(6),
    maxHeight: wp(60),
  },
});

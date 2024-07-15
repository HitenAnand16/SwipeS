import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import {
  PanGestureHandler,
  GestureHandlerRootView,
  State,
} from "react-native-gesture-handler";
import backgroundImage from "../assets/hi.png";
import profileImage from "../assets/profile.png";
import fireIcon from "../assets/fire-icon.png";
import send from "../assets/send.png";
import close from "../assets/close.png";
import like from "../assets/heart.png";

const SCREEN_WIDTH = Dimensions.get("window").width;
const cardWidth = SCREEN_WIDTH * 0.8;

const ARScreen = () => {
  const translateX = useRef(new Animated.Value(0)).current;
  const [rejected, setRejected] = useState(false);
  const [liked, setLiked] = useState(false);
  const [share, setShared] = useState(false);

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const onSwipeEnd = (event) => {
    if (
      event.nativeEvent &&
      event.nativeEvent.translationX !== undefined &&
      Math.abs(event.nativeEvent.translationX) > cardWidth / 2
    ) {
      // Swipe action
      Animated.timing(translateX, {
        toValue: SCREEN_WIDTH,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        // Reset state after animation
        setTimeout(() => translateX.setValue(0), 200);
      });
    } else {
      // Reset if not swiped enough
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  const handlePress = (button) => {
    if (button === "close") {
      setRejected(true);
      setTimeout(() => {
        setRejected(false);
      }, 2000);
    }

    if (button === "send") {
      setShared(true);
      setTimeout(() => {
        setShared(false);
      }, 2000);
    }

    if (button === "like") {
      setLiked(true);
      setTimeout(() => {
        setLiked(false);
      }, 2000);
    }
  };

  // Interpolations for rotation and opacity
  const rotate = translateX.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: "clamp",
  });

  const opacity = translateX.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [0.5, 1, 0.5],
    extrapolate: "clamp",
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.END) {
            onSwipeEnd({ nativeEvent });
          }
        }}
      >
        <Animated.View
          style={[
            styles.animatedContainer,
            {
              transform: [{ translateX: translateX }, { rotate: rotate }],
              opacity: opacity,
            },
          ]}
        >
          <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <View style={styles.overlay}>
              <View style={styles.profileContainer}>
                <Image source={profileImage} style={styles.profileImage} />
                <Text style={styles.username}>@username</Text>
              </View>
              <View style={styles.scoreContainer}>
                <Image source={fireIcon} style={styles.icon} />
                <Text style={styles.score}>40</Text>
              </View>
            </View>

            {rejected && (
              <View style={styles.rejectedContainer}>
                <Text style={styles.rejectedText}>Rejected</Text>
              </View>
            )}

            {liked && (
              <View style={styles.rejectedContainer}>
                <Text style={styles.rejectedText}>Approved</Text>
              </View>
            )}

            {share && (
              <View style={styles.rejectedContainer}>
                <Text style={styles.rejectedText}>Shared</Text>
              </View>
            )}

            <View style={styles.rightIcons}>
              <Text style={{ color: 'white' }}>Share Hello</Text>
            </View>

            <View style={styles.blurBG}>
              <View style={styles.downButtons}>
                <TouchableOpacity onPress={() => handlePress("close")}>
                  <Image source={close} style={styles.buttonIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress("send")}>
                  <Image source={send} style={styles.buttonIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress("like")}>
                  <Image source={like} style={styles.buttonIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  animatedContainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    overflow: "hidden",
  },
  overlay: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 50,
    padding: 7,
    position: "absolute",
    top: "8%",
    width: "70%",
    justifyContent: "space-between",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    color: "white",
    fontSize: 16,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 50,
    padding: 10,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  score: {
    marginLeft: 5,
    color: "white",
    fontSize: 16,
  },
  blurBG: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  downButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 40,
  },
  buttonIcon: {
    width: 30,
    height: 30,
  },
  rejectedContainer: {
    position: "absolute",
    top: "20%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 10,
  },
  rejectedText: {
    color: "white",
    fontSize: 15,
  },
  rightIcons: {
    position: "absolute",
    right: 10,
  },
});

export default ARScreen;

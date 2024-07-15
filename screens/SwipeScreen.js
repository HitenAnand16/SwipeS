import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import pic from "../assets/hi.png";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function SwipeScreen() {
  const translateX1 = useRef(new Animated.Value(0)).current;
  const translateX2 = useRef(new Animated.Value(0)).current;
  const translateX3 = useRef(new Animated.Value(0)).current;
  const cardWidth = wp("80%");
  const cardHeight = hp("90%");

  const [showApproved, setShowApproved] = useState(false);

  const onGestureEvent1 = Animated.event(
    [{ nativeEvent: { translationX: translateX1 } }],
    { useNativeDriver: true }
  );

  const onSwipeEnd1 = (event) => {
    if (
      event.nativeEvent &&
      event.nativeEvent.translationX !== undefined &&
      Math.abs(event.nativeEvent.translationX) > cardWidth / 2
    ) {
      // Swipe right for Card 1
      Animated.timing(translateX1, {
        toValue: SCREEN_WIDTH,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setShowApproved(true);
        setTimeout(() => setShowApproved(false), 2000); // Hide after 4 seconds
      });
    } else {
      // Reset if not swiped enough
      Animated.spring(translateX1, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  const onGestureEvent2 = Animated.event(
    [{ nativeEvent: { translationX: translateX2 } }],
    { useNativeDriver: true }
  );

  const onSwipeEnd2 = (event) => {
    if (
      event.nativeEvent &&
      event.nativeEvent.translationX !== undefined &&
      Math.abs(event.nativeEvent.translationX) > cardWidth / 2
    ) {
      // Swipe right for Card 2
      Animated.timing(translateX2, {
        toValue: SCREEN_WIDTH,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setShowApproved(true);
        setTimeout(() => setShowApproved(false), 2000); // Hide after 4 seconds
      });
    } else {
      // Reset if not swiped enough
      Animated.spring(translateX2, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  const onGestureEvent3 = Animated.event(
    [{ nativeEvent: { translationX: translateX3 } }],
    { useNativeDriver: true }
  );

  const onSwipeEnd3 = (event) => {
    if (
      event.nativeEvent &&
      event.nativeEvent.translationX !== undefined &&
      Math.abs(event.nativeEvent.translationX) > cardWidth / 2
    ) {
      // Swipe right for Card 3
      Animated.timing(translateX3, {
        toValue: SCREEN_WIDTH,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setShowApproved(true);
        setTimeout(() => setShowApproved(false), 2000); // Hide after 4 seconds
      });
    } else {
      // Reset if not swiped enough
      Animated.spring(translateX3, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.cardsContainer}>
          {/* Card 3 (Bottom card) */}
          <PanGestureHandler
            onGestureEvent={onGestureEvent3}
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.END) {
                onSwipeEnd3({ nativeEvent });
              }
            }}
          >
            <Animated.View
              style={[
                styles.card,
                styles.card3,
                {
                  zIndex: 1,
                  transform: [{ translateX: translateX3 }],
                },
              ]}
            >
              <Image source={pic} style={styles.image} resizeMode="cover" />
              <Text style={styles.head}>Card 3</Text>
            </Animated.View>
          </PanGestureHandler>

          {/* Card 2 (Middle card) */}
          <PanGestureHandler
            onGestureEvent={onGestureEvent2}
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.END) {
                onSwipeEnd2({ nativeEvent });
              }
            }}
          >
            <Animated.View
              style={[
                styles.card,
                styles.card2,
                {
                  zIndex: 2,
                  transform: [{ translateX: translateX2 }],
                },
              ]}
            >
              <Image source={pic} style={styles.image} resizeMode="cover" />
              <Text style={styles.head}>Card 2</Text>
            </Animated.View>
          </PanGestureHandler>

          {/* Card 1 (Top card) */}
          <PanGestureHandler
            onGestureEvent={onGestureEvent1}
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.END) {
                onSwipeEnd1({ nativeEvent });
              }
            }}
          >
            <Animated.View
              style={[
                styles.card,
                styles.card1,
                {
                  zIndex: 3,
                  transform: [{ translateX: translateX1 }],
                },
              ]}
            >
              <Image source={pic} style={styles.image} resizeMode="cover" />
              <Text style={styles.head}>Card 1</Text>
            </Animated.View>
          </PanGestureHandler>
        </View>

        {showApproved && (
          <View style={styles.bottomPopUp}>
            <Text style={styles.popUpText}>Approved</Text>
          </View>
        )}
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  card: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
    width: wp("100%"), // 80% of screen width
    height: hp("100%"), // 90% of screen height
    borderRadius: 15,
    position: "absolute",
  },
  head: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  bottomPopUp: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000", // Semi-transparent black background
    paddingVertical: 5,
    zIndex: 10,
    borderRadius: 50,
  },
  popUpText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

import { Image, StyleSheet, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


type Props = {
  item: {
    name: string;
    skill: string;
    rating: number;
    image: any;
  };
};

export const AstrologerCard: React.FC<Props> = ({ item }) => {
  return (
    <View style={styles.astroCardContainer}>
      
     <Image
    source={item.image}
    style={styles.astroProfileImage}
    resizeMode="contain"
  />

      <View style={styles.astroContent}>
        <Text style={styles.astroName}>{item.name}</Text>
        <Text style={styles.astroSpecialization}>
          {item.skill}
        </Text>

        <View style={styles.astroRatingRow}>
          <MaterialCommunityIcons name="star" size={12} color="#FFD700" />
          <Text style={styles.astroRatingText}>
            {item.rating}
          </Text>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
     astroCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // width: moderateScale(220),
    borderRadius: moderateScale(16),
    borderWidth: 1,
    borderColor: '#2E2E5E',
    // padding: moderateScale(12),
    paddingHorizontal:scale(8),
    paddingVertical:scale(14),

    marginRight: scale(12),
  },

  // 🔥 PROFILE IMAGE
  astroProfileImage: {
    width: moderateScale(60),
    height: moderateScale(60),
    // borderRadius: moderateScale(12),
  },

  // 🔥 RIGHT CONTENT
  astroContent: {
    marginLeft: scale(10),
    flex: 1,
  },

  // 🔥 NAME
  astroName: {
    color: '#FFFFFF',
    fontSize: moderateScale(12),
    fontWeight: '500',
  },

  // 🔥 SPECIALIZATION
  astroSpecialization: {
    color: '#989DB5',
    fontSize: moderateScale(12),
    marginTop: verticalScale(2),
    fontWeight:"400"
  },

  // 🔥 RATING ROW
  astroRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(6),
  },
   astroRatingText: {
    color: '#FFFFFF',
    fontSize: moderateScale(12),
    marginLeft: scale(4),
  },

})
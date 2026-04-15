import { StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

export const commonStyle = StyleSheet.create({

     background: {
    flex: 1,
  },
  title1: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },

    cardtitle1:{
        color:"#989DB5",
        fontSize:moderateScale(16),
        fontWeight:"600"


    },
    cardSubTitle1:{
        color:"#7E7EA9",
        fontSize:moderateScale(12),
        fontWeight:"400"


    },
    bgLessButton:{
         borderWidth: 1,
            borderColor: '#FF8C1A',
            borderRadius: moderateScale(16),
            paddingVertical: verticalScale(12),
            alignItems: 'center',
    },
    bgLessButtonTxt:{
        color:"#FF8C1A",
        fontWeight:"500",
        fontSize:moderateScale(14)

    },
      card: {
    backgroundColor: '#0F1230',
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    borderWidth: 1,
    borderColor: '#2A2E5B',
  },
  cardRow:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(16),
      },

     forCastContentHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center', // 👈 important
  paddingVertical: verticalScale(10),
},

foreCastContentHeaderLeft: {
  position: 'absolute', // 👈 key fix
  left: 0,
  width: moderateScale(40),
  justifyContent: 'center',
  alignItems: 'flex-start',
},

foreCastContentHeaderTitle: {
  color: '#fff',
  fontSize: moderateScale(18),
  fontWeight: '600',
  textAlign: 'center',
},
foreCastContentTitle:{
   color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: '600',

},
 forCastContentSubTitle:{color: '#B8B8D0',
    fontSize: moderateScale(14),
    marginTop: verticalScale(10),
    lineHeight: moderateScale(22),
    fontWeight:"400"
 },
   screenContentHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center', // 👈 important
  paddingVertical: verticalScale(10),
},
  

})
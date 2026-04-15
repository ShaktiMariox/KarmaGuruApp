import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { commonStyle } from '../../styles/commonStyles'
import { moderateScale, verticalScale } from 'react-native-size-matters'

interface Props {
    title:string
}

const AshtakvargaChart = (props:Props) => {
  return (
        <View style={[commonStyle.card, styles.savCard]}>
   
     {/* HEADER */}
     <Text style={styles.savTitle}>
       {props.title}
     </Text>
   
     {/* GRID */}
     <View style={styles.savGrid}>
       {[
         { house: 'H1', value: 4 },
         { house: 'H2', value: 5 },
         { house: 'H3', value: 3 },
         { house: 'H4', value: 6 },
         { house: 'H5', value: 4 },
         { house: 'H6', value: 5 },
         { house: 'H7', value: 3 },
         { house: 'H8', value: 4 },
         { house: 'H9', value: 5 },
         { house: 'H10', value: 6 },
         { house: 'H11', value: 3 },
         { house: 'H12', value: 4 },
       ].map((item, index) => (
         <View key={index} style={styles.savBox}>
           
           {/* House */}
           <Text style={styles.houseText}>
             {item.house}
           </Text>
   
           {/* Value */}
           <Text
             style={[
               styles.valueText,
               item.value >= 5 && { color: '#00E0A4' }, // green
               item.value <= 3 && { color: '#F59E0B' }, // yellow/orange
             ]}
           >
             {item.value}
           </Text>
   
         </View>
       ))}
     </View>
   
   </View>
  )
}

export default AshtakvargaChart

const styles = StyleSheet.create({

    savCard: {
  marginTop: verticalScale(16),
},

savTitle: {
  color: '#FFFFFF',
  fontSize: moderateScale(16),
  fontWeight: '600',
  marginBottom: verticalScale(12),
},

savGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
},

savBox: {
  width: '22%', // 4 per row
  backgroundColor: '#1A1A3D',
  borderRadius: moderateScale(10),
  paddingVertical: verticalScale(10),
  alignItems: 'center',
  marginBottom: verticalScale(10),
},

houseText: {
  color: '#7E7EA9',
  fontSize: moderateScale(10),
},

valueText: {
  color: '#FFFFFF',
  fontSize: moderateScale(16),
  fontWeight: '700',
  marginTop: verticalScale(4),
},
})
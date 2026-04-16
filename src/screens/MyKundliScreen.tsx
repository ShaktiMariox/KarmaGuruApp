import { ActivityIndicator, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { commonStyle } from '../styles/commonStyles'
import ScreenWrapper from '../component/ScreenWrapper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color } from '../utils/color'
import Svg, { Line, Rect, Text as SvgText, SvgXml } from 'react-native-svg'
import { SouthChart } from '../component/Chart/SouthChart'
import { fontSize } from '../utils/fontSize'
import AshtakvargaChart from '../component/Chart/AshtakvargaChart'
import { astrologyChart, kundliBasicDetail, kundliPlanetryPosition } from '../api/service'


const MyKundliScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const topTabs = [
    { id: 'basic', label: 'Basic' },
    { id: 'kundli', label: 'Kundli' },
    { id: 'kp', label: 'KP' },
    { id: 'ashtakvarga', label: 'Ashtakvarga' },
    { id: 'chart', label: 'Chart' },
  ];

  const [initialLoading, setInitialLoading] = useState(true);

  const [activeTopTab, setActiveTopTab] = useState('basic');
  const [chartType, setChartType] = useState<'north' | 'south'>('north');
  const [kundliData, setKundliData] = useState([]);
  const [d1Chart, setD1Chart] = useState(null);
  const [d9Chart, setD9Chart] = useState(null);
  const [planets, setPlanets] = useState([]);

  const [charts, setCharts] = useState<{ [key: string]: any }>({});




  const formatKundliData = (data) => {
  if (!data) return [];

  const formatTime = (hour, minute) => {
    const h = parseInt(hour);
    const m = minute.padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 || 12;
    return `${hour12}:${m} ${ampm}`;
  };

  return [
    { label: 'Name', value: data.full_name },
    { label: 'Date of Birth', value: `${data.day}-${data.month}-${data.year}` },
    { label: 'Time of Birth', value: formatTime(data.hour, data.minute) },
    { label: 'Place of Birth', value: data.place },
    { label: 'Latitude', value: data.latitude },
    { label: 'Longitude', value: data.longitude },
    { label: 'Timezone', value: `UTC +${data.timezone}` },
    { label: 'Sunrise', value: new Date(data.sunrise).toLocaleTimeString() },
    { label: 'Sunset', value: new Date(data.sunset).toLocaleTimeString() },
    { label: 'Ayanamsha', value: data.ayanamsha },
  ];
};

  const fetchKundli = async () => {
  try {

    const res = await kundliBasicDetail();

    console.log("API DATA:", res);

    if (res?.success) {
      const formatted = formatKundliData(res.data);
      setKundliData(formatted);
    }

  } catch (error) {
    console.log("ERROR:", error.response);
  } 
};

const loadInitialData = async () => {
  try {
    setInitialLoading(true);

    await fetchKundli(); // 👈 only this

  } catch (err) {
    console.log(err);
  } finally {
    setInitialLoading(false);
  }
};


const formatPlanetData = (planets) => {
  if (!planets) return [];

  return planets.map((item) => ({
    planet: item.name,
    sign: item.sign,
    nak: item.nakshatra,
    deg: `${item.longitude}`, // already formatted like 9:49:22
    house: `${item.house}${getOrdinal(item.house)}`,
  }));
};
const getOrdinal = (n) => {
  if (n === 1) return 'st';
  if (n === 2) return 'nd';
  if (n === 3) return 'rd';
  return 'th';
};
const fetchPlanets = async () => {
  try {

    const res = await kundliPlanetryPosition();

    console.log("PLANET API:", res);

    if (res?.data?.planets) {
      const formatted = formatPlanetData(res.data.planets);
      setPlanets(formatted);
    }

  } catch (error) {
    console.log("ERROR:", error);
  } finally {
  }
};


const fetchCharts = async () => {
  try {
    const [d1Res, d9Res] = await Promise.all([
      astrologyChart("D1"),
      astrologyChart("D9"),
    ]);

    setD1Chart(d1Res.data);
    setD9Chart(d9Res.data);

  } catch (err) {
    console.log("Chart Error:", err);
  }
};

useEffect(() => {
  loadInitialData();
}, []);

useEffect(() => {
  if (!initialLoading) {
    fetchPlanets();
    fetchCharts();
    fetchAllCharts();
  }
}, [initialLoading]);

const makeStyled = (svg?: string) => {
  if (!svg) return '';

  return svg
    // 🔥 REMOVE FIXED SIZE
    .replace(/width="[^"]*"/, '')
    .replace(/height="[^"]*"/, '')

    // 🔥 ADD VIEWBOX FOR SCALING
    .replace(
      '<svg',
      '<svg viewBox="0 0 360 360" preserveAspectRatio="xMidYMid meet"'
    )

    // 🎨 COLOR FIX
    .replace(/#000/g, '#7E7EA9')
    .replace(/fill:#000/g, 'fill:#7E7EA9')
    .replace(/stroke:#000/g, 'stroke:#7E7EA9');
};

const styledD1 = makeStyled(d1Chart?.svg);
const styledD9 = makeStyled(d9Chart?.svg);


const chartList = [
  { title: 'Chalit Chart', sub: 'chalit' },
  { title: 'Sun Chart', sub: 'SUN' },
  { title: 'Moon Chart', sub: 'MOON' },
  { title: 'Lagna / Ascendant', sub: 'D1' },
  { title: 'Hora Chart', sub: 'D2' },
  { title: 'Drekkana Chart', sub: 'D3' },
  { title: 'Chaturthamsa', sub: 'D4' },
  { title: 'Saptamsa', sub: 'D7' },
];


const fetchAllCharts = async () => {
  try {
    const results = await Promise.all(
      chartList.map(item => astrologyChart(item.sub))
    );

    const mappedCharts: any = {};

    results.forEach((res, index) => {
      const key = chartList[index].sub;

      mappedCharts[key] = res?.data?.svg
        ?.replace(/stroke="#000"/g, 'stroke="#7E7EA9"')
        ?.replace(/fill="#000"/g, 'fill="#7E7EA9"');
    });

    setCharts(mappedCharts);

  } catch (error) {
    console.log("Chart error:", error);
  }
};

const normalizeSvg = (svg?: string) => {
  if (!svg) return '';

  return svg
    // remove fixed width/height
    .replace(/width="[^"]*"/, '')
    .replace(/height="[^"]*"/, '')

    // add proper viewBox
    .replace('<svg', '<svg viewBox="0 0 360 360" preserveAspectRatio="xMidYMid meet"')

    // apply your color
    .replace(/stroke="#000"/g, 'stroke="#8A8FA3"')
    .replace(/fill:#000/g, 'fill:#8A8FA3')
    .replace(/fill="#000"/g, 'fill="#8A8FA3');
};
  

  return (

    <ImageBackground
      source={require('../assets/images/onBoardingBg.png')}
      style={commonStyle.background}
      resizeMode="cover"
    >

      {initialLoading ? (
  <View style={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,          // ✅ VERY IMPORTANT
    elevation: 10, // 👈 slight dark overlay
  }}>
    <ActivityIndicator size="large" color="#7E7EA9" />
  </View>
)  :(


      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: verticalScale(20) }}
        >
          <View style={commonStyle.screenContentHeader}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={commonStyle.foreCastContentHeaderLeft}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={moderateScale(22)}
                color="#fff"
              />
            </TouchableOpacity>

            {/* CENTER TITLE */}
            <Text style={commonStyle.foreCastContentHeaderTitle}>
              My Kundli
            </Text>





          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.topTabContainer}
          >
            {topTabs.map((tab) => {
              const isActive = tab.id === activeTopTab;

              return (
                <TouchableOpacity
                  key={tab.id}
                  onPress={() => setActiveTopTab(tab.id)}
                  style={[
                    styles.topTabItem,
                    isActive && styles.activeTopTabItem,
                  ]}
                >
                  <Text
                    style={[
                      styles.topTabText,
                      isActive && styles.activeTopTabText,
                    ]}
                  >
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {activeTopTab === "basic" && (
            <>



              <View style={[commonStyle.card, styles.detailsCard]}>

                {/* HEADER */}
                <View style={styles.headerRow}>
                  <Text style={styles.headerTitle}>
                    Basic Birth Details
                  </Text>

                  <MaterialCommunityIcons
                    name="chevron-up"
                    size={moderateScale(20)}
                    color="#A1A1AA"
                  />
                </View>

                {/* ROWS */}
                {kundliData.map((item, index, arr) => (
                  <View key={index}>

                    <View style={styles.row}>
                      <Text style={styles.label}>{item.label}</Text>
                      <Text style={styles.value}>{item.value}</Text>
                    </View>

                    {/* Divider */}
                    {index !== arr.length - 1 && (
                      <View style={styles.divider} />
                    )}

                  </View>
                ))}

              </View>



              <View style={[commonStyle.card, styles.detailsCard]}>

                {/* HEADER */}
                <View style={styles.headerRow}>
                  <Text style={styles.headerTitle}>
                    Panchang Details
                  </Text>

                  <MaterialCommunityIcons
                    name="chevron-up"
                    size={moderateScale(20)}
                    color="#A1A1AA"
                  />
                </View>

                {/* ROWS */}
                {[
                  { label: 'Tithi', value: 'Shukla Paksha Saptami' },
                  { label: 'Karan', value: 'Bava' },
                  { label: 'Yog', value: 'Vishkambha' },
                  { label: 'Nakshatra', value: 'Ashwini (Pada 2)' },

                ].map((item, index, arr) => (
                  <View key={index}>

                    <View style={styles.row}>
                      <Text style={styles.label}>{item.label}</Text>
                      <Text style={styles.value}>{item.value}</Text>
                    </View>

                    {/* Divider */}
                    {index !== arr.length - 1 && (
                      <View style={styles.divider} />
                    )}

                  </View>
                ))}

              </View>


              <View style={[commonStyle.card, styles.detailsCard]}>

                {/* HEADER */}
                <View style={styles.headerRow}>
                  <Text style={styles.headerTitle}>
                    Avakhada Details
                  </Text>

                  <MaterialCommunityIcons
                    name="chevron-up"
                    size={moderateScale(20)}
                    color="#A1A1AA"
                  />
                </View>

                {/* ROWS */}
                {[
                  { label: 'Varna', value: 'Brahmin' },
                  { label: 'Vashya', value: 'Manav' },
                  { label: 'Yoni', value: 'Ashwa' },
                  { label: 'Gan', value: 'Dev' },
                  { label: 'Nadi', value: 'Adi' },
                  { label: 'Sign', value: 'Aries (Mesa)' },
                  { label: 'Sign Lord', value: 'Mars' },
                  { label: 'Nakshatra-Charan', value: 'Ashwini - 2' },
                  { label: 'Yog', value: 'Vishkambha' },
                  { label: 'Karan', value: 'Bava' },
                  { label: 'Tithi', value: 'Saptami' },
                  { label: 'Yunja', value: 'Gold' },
                ].map((item, index, arr) => (
                  <View key={index}>

                    <View style={styles.row}>
                      <Text style={styles.label}>{item.label}</Text>
                      <Text style={styles.value}>{item.value}</Text>
                    </View>

                    {/* Divider */}
                    {index !== arr.length - 1 && (
                      <View style={styles.divider} />
                    )}

                  </View>
                ))}

              </View>
            </>

          )} 

          {activeTopTab === 'kundli' && (
            <View style={{ marginTop: verticalScale(16) }}>

              {/* HEADER */}
              <View style={styles.kundliHeader}>
                <Text style={styles.kundliTitle}>Birth Chart</Text>

                <View style={styles.toggleContainer}>

                  <TouchableOpacity
                    style={chartType === 'north' ? styles.activeToggle : styles.inactiveToggle}
                    onPress={() => setChartType('north')}
                  >
                    <Text
                      style={chartType === 'north'
                        ? styles.activeToggleText
                        : styles.inactiveToggleText}
                    >
                      North Indian
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={chartType === 'south' ? styles.activeToggle : styles.inactiveToggle}
                    onPress={() => setChartType('south')}
                  >
                    <Text
                      style={chartType === 'south'
                        ? styles.activeToggleText
                        : styles.inactiveToggleText}
                    >
                      South Indian
                    </Text>
                  </TouchableOpacity>

                </View>
              </View>

              {/* LAGNA CHART */}

              {chartType === "north" && (
                <>

          
              <View style={[commonStyle.card, styles.chartCard]}>
                <Text style={styles.chartTitle}>
                  Lagna / Ascendant Chart
                </Text>

                <View style={styles.chartBox}>
                  {/* Replace with your chart image/svg */}
                 <SvgXml  xml={styledD1} width="100%" height="100%" />

                </View>
              </View>


              {/* NAVAMSA CHART */}
              <View style={[commonStyle.card, styles.chartCard]}>
                <Text style={styles.chartTitle}>
                  Navamsa Chart (D9)
                </Text>


                <View style={[styles.chartBox,{
                  
                }]}>
                  {/* Replace with your chart image/svg */}
                 <SvgXml xml={styledD9} width="100%" height="100%" />

                 
                </View>
              </View>
              </>
                  )}


                  {chartType === "south" && (
                    <>
                     <View style={[commonStyle.card, styles.chartCard]}>
                <Text style={styles.chartTitle}>
                  Lagna / Ascendant Chart
                </Text>

                <View style={styles.chartBox}>
                  {/* Replace with your chart image/svg */}
                 <Svg height="100%" width="100%" viewBox="0 0 200 200">
                 
                       {/* Outer Square */}
                       <Rect x="10" y="10" width="180" height="180" stroke="#8A8FA3" strokeWidth="1.5" fill="none" />
                 
                       {/* Grid Lines */}
                       <Line x1="10" y1="70" x2="190" y2="70" stroke="#8A8FA3" strokeWidth="1" />
                       <Line x1="10" y1="130" x2="190" y2="130" stroke="#8A8FA3" strokeWidth="1" />
                 
                       <Line x1="70" y1="10" x2="70" y2="190" stroke="#8A8FA3" strokeWidth="1" />
                       <Line x1="130" y1="10" x2="130" y2="190" stroke="#8A8FA3" strokeWidth="1" />
                 
                       {/* Corner diagonals */}
                       <Line x1="10" y1="10" x2="70" y2="70" stroke="#8A8FA3" strokeWidth="1" />
                       <Line x1="190" y1="10" x2="130" y2="70" stroke="#8A8FA3" strokeWidth="1" />
                       <Line x1="10" y1="190" x2="70" y2="130" stroke="#8A8FA3" strokeWidth="1" />
                       <Line x1="190" y1="190" x2="130" y2="130" stroke="#8A8FA3" strokeWidth="1" />
                 
                       {/* Numbers (dummy) */}
                       <SvgText x="40" y="40" fill="#8A8FA3" fontSize="10">1</SvgText>
                       <SvgText x="100" y="40" fill="#8A8FA3" fontSize="10">2</SvgText>
                       <SvgText x="160" y="40" fill="#8A8FA3" fontSize="10">3</SvgText>
                       <SvgText x="160" y="100" fill="#8A8FA3" fontSize="10">4</SvgText>
                       <SvgText x="160" y="160" fill="#8A8FA3" fontSize="10">5</SvgText>
                       <SvgText x="100" y="160" fill="#8A8FA3" fontSize="10">6</SvgText>
                       <SvgText x="40" y="160" fill="#8A8FA3" fontSize="10">7</SvgText>
                       <SvgText x="40" y="100" fill="#8A8FA3" fontSize="10">8</SvgText>
                 
                     </Svg>
                </View>
              </View>


              {/* NAVAMSA CHART */}
              <View style={[commonStyle.card, styles.chartCard]}>
                <Text style={styles.chartTitle}>
                  Navamsa Chart (D9)
                </Text>


                <View style={styles.chartBox}>
                  {/* Replace with your chart image/svg */}
                 <Svg height="100%" width="100%" viewBox="0 0 200 200">
                 
                       {/* Outer Square */}
                       <Rect x="10" y="10" width="180" height="180" stroke="#8A8FA3" strokeWidth="1.5" fill="none" />
                 
                       {/* Grid Lines */}
                       <Line x1="10" y1="70" x2="190" y2="70" stroke="#8A8FA3" strokeWidth="1" />
                       <Line x1="10" y1="130" x2="190" y2="130" stroke="#8A8FA3" strokeWidth="1" />
                 
                       <Line x1="70" y1="10" x2="70" y2="190" stroke="#8A8FA3" strokeWidth="1" />
                       <Line x1="130" y1="10" x2="130" y2="190" stroke="#8A8FA3" strokeWidth="1" />
                 
                       {/* Corner diagonals */}
                       <Line x1="10" y1="10" x2="70" y2="70" stroke="#8A8FA3" strokeWidth="1" />
                       <Line x1="190" y1="10" x2="130" y2="70" stroke="#8A8FA3" strokeWidth="1" />
                       <Line x1="10" y1="190" x2="70" y2="130" stroke="#8A8FA3" strokeWidth="1" />
                       <Line x1="190" y1="190" x2="130" y2="130" stroke="#8A8FA3" strokeWidth="1" />
                 
                       {/* Numbers (dummy) */}
                       <SvgText x="40" y="40" fill="#8A8FA3" fontSize="10">1</SvgText>
                       <SvgText x="100" y="40" fill="#8A8FA3" fontSize="10">2</SvgText>
                       <SvgText x="160" y="40" fill="#8A8FA3" fontSize="10">3</SvgText>
                       <SvgText x="160" y="100" fill="#8A8FA3" fontSize="10">4</SvgText>
                       <SvgText x="160" y="160" fill="#8A8FA3" fontSize="10">5</SvgText>
                       <SvgText x="100" y="160" fill="#8A8FA3" fontSize="10">6</SvgText>
                       <SvgText x="40" y="160" fill="#8A8FA3" fontSize="10">7</SvgText>
                       <SvgText x="40" y="100" fill="#8A8FA3" fontSize="10">8</SvgText>
                 
                     </Svg>
                </View>
              </View>
              </>
              


                  )}



              <View style={[commonStyle.card, styles.planetCard]}>

                {/* HEADER */}
                <Text style={styles.planetTitle}>
                  Planetary Positions
                </Text>

                {/* TABLE HEADER */}
                <View style={styles.tableHeader}>
                  <Text style={styles.headerText}>Planet</Text>
                  <Text style={styles.headerText}>Sign</Text>
                  <Text style={styles.headerText}>Nakshatra</Text>
                  <Text style={styles.headerText}>Degree</Text>
                  <Text style={styles.headerText}>House</Text>
                </View>

                {/* DATA */}
                {planets.map((item, index) => (
                  <View key={index}>

                    <View style={styles.planetRow}>
                      <Text style={styles.cell}>{item.planet}</Text>
                      <Text style={styles.cell}>{item.sign}</Text>
                      <Text style={styles.cell}>{item.nak}</Text>
                      <Text style={styles.cell}>{item.deg}</Text>
                      <Text style={styles.cell}>{item.house}</Text>
                    </View>

                    {/* Divider */}
                    <View style={styles.planetDivider} />

                  </View>
                ))}

              </View>

              {/* FLOATING BUTTON */}
              {/* <TouchableOpacity style={styles.fab}>
      <MaterialCommunityIcons
        name="chat"
        size={moderateScale(20)}
        color="#fff"
      />
    </TouchableOpacity> */}

            </View>
          )}

          {activeTopTab === "kp" && (
            <>

               <View style={[commonStyle.card, styles.chartCard]}>
                <Text style={styles.chartTitle}>
                  Bhav Chalit Chart
                </Text>

                <View style={styles.chartBox}>
                  {/* Replace with your chart image/svg */}
                  <Svg height="100%" width="100%" viewBox="0 0 200 200">

                    {/* Outer Diamond */}
                    <Line x1="100" y1="10" x2="190" y2="100" stroke="#8A8FA3" strokeWidth="1.5" />
                    <Line x1="190" y1="100" x2="100" y2="190" stroke="#8A8FA3" strokeWidth="1.5" />
                    <Line x1="100" y1="190" x2="10" y2="100" stroke="#8A8FA3" strokeWidth="1.5" />
                    <Line x1="10" y1="100" x2="100" y2="10" stroke="#8A8FA3" strokeWidth="1.5" />

                    {/* Cross Lines */}
                    <Line x1="100" y1="10" x2="100" y2="190" stroke="#8A8FA3" strokeWidth="1" />
                    <Line x1="10" y1="100" x2="190" y2="100" stroke="#8A8FA3" strokeWidth="1" />

                    {/* Diagonal inner lines */}
                    <Line x1="55" y1="55" x2="145" y2="145" stroke="#8A8FA3" strokeWidth="1" />
                    <Line x1="145" y1="55" x2="55" y2="145" stroke="#8A8FA3" strokeWidth="1" />

                    {/* House Numbers */}
                    <SvgText x="100" y="20" fill="#8A8FA3" fontSize="10" textAnchor="middle">1</SvgText>
                    <SvgText x="180" y="100" fill="#8A8FA3" fontSize="10" textAnchor="middle">3</SvgText>
                    <SvgText x="100" y="185" fill="#8A8FA3" fontSize="10" textAnchor="middle">5</SvgText>
                    <SvgText x="20" y="100" fill="#8A8FA3" fontSize="10" textAnchor="middle">7</SvgText>

                    {/* Planets (dummy) */}
                    <SvgText x="100" y="45" fill="#F59E0B" fontSize="12" textAnchor="middle">Su</SvgText>
                    <SvgText x="160" y="105" fill="#00E0A4" fontSize="12">Mo</SvgText>
                    <SvgText x="100" y="165" fill="#EF4444" fontSize="12" textAnchor="middle">Ma</SvgText>

                  </Svg>
                </View>
              </View>

              <View style={[commonStyle.card, styles.rulingCard]}>

  {/* HEADER */}
  <Text style={styles.rulingTitle}>
    Ruling Planets
  </Text>

  {/* TABLE HEADER */}
  <View style={styles.tableHeader}>
    <Text style={styles.headerText}>Planet</Text>
    <Text style={styles.headerText}>Sign Lord</Text>
    <Text style={styles.headerText}>Star Lord</Text>
    <Text style={styles.headerText}>Sub Lord</Text>
  </View>

  {/* DATA */}
  {[
    { planet: 'Ascendant', sign: 'Mars', star: 'Ketu', sub: 'Mercury' },
    { planet: 'Moon', sign: 'Moon', star: 'Saturn', sub: 'Venus' },
    { planet: 'Day Lord', sign: 'Sun', star: 'Sun', sub: 'Mars' },
  ].map((item, index) => (
    <View key={index}>
      
      <View style={styles.planetRow}>
        <Text style={styles.cell}>{item.planet}</Text>
        <Text style={styles.cell}>{item.sign}</Text>
        <Text style={styles.cell}>{item.star}</Text>
        <Text style={styles.cell}>{item.sub}</Text>
      </View>

      {/* Divider */}
      {index !== 2 && <View style={styles.planetDivider} />}

    </View>
  ))}

</View>


<View style={[commonStyle.card, styles.kpCard]}>

  {/* HEADER */}
  <Text style={styles.kpTitle}>
    Planets Table (KP)
  </Text>

  {/* TABLE HEADER */}
  <View style={styles.tableHeader}>
    <Text style={styles.headerText}>Planet</Text>
    <Text style={styles.headerText}>Cusp</Text>
    <Text style={styles.headerText}>Sign</Text>
    <Text style={styles.headerText}>Sign Lord</Text>
    <Text style={styles.headerText}>Star Lord</Text>
  </View>

  {/* DATA */}
  {[
    { planet: 'Sun', cusp: '1', sign: 'Aries', signLord: 'Mars', starLord: 'Ketu' },
    { planet: 'Moon', cusp: '4', sign: 'Cancer', signLord: 'Moon', starLord: 'Saturn' },
    { planet: 'Mars', cusp: '8', sign: 'Scorpio', signLord: 'Mars', starLord: 'Saturn' },
    { planet: 'Mercury', cusp: '3', sign: 'Gemini', signLord: 'Mercury', starLord: 'Rahu' },
    { planet: 'Jupiter', cusp: '9', sign: 'Sagittarius', signLord: 'Jupiter', starLord: 'Ketu' },
  ].map((item, index) => (
    <View key={index}>
      
      <View style={styles.planetRow}>
        <Text style={styles.cell}>{item.planet}</Text>
        <Text style={styles.cell}>{item.cusp}</Text>
        <Text style={styles.cell}>{item.sign}</Text>
        <Text style={styles.cell}>{item.signLord}</Text>
        <Text style={styles.cell}>{item.starLord}</Text>
      </View>

      {/* Divider */}
      {index !== 4 && <View style={styles.planetDivider} />}

    </View>
  ))}

</View>

<View style={[commonStyle.card, styles.cuspsCard]}>

  {/* HEADER */}
  <Text style={styles.cuspsTitle}>
    Cusps Table
  </Text>

  {/* TABLE HEADER */}
  <View style={styles.tableHeader}>
    <Text style={styles.headerText}>Cusp</Text>
    <Text style={styles.headerText}>Degree</Text>
    <Text style={styles.headerText}>Sign</Text>
    <Text style={styles.headerText}>Sign Lord</Text>
    <Text style={styles.headerText}>Star Lord</Text>
  </View>

  {/* DATA */}
  {[
    { cusp: '1', degree: "0° 00'", sign: 'Aries', lord: 'Mars', star: 'Ketu' },
    { cusp: '2', degree: "30° 00'", sign: 'Taurus', lord: 'Venus', star: 'Moon' },
    { cusp: '3', degree: "60° 00'", sign: 'Gemini', lord: 'Mercury', star: 'Rahu' },
    { cusp: '4', degree: "90° 00'", sign: 'Cancer', lord: 'Moon', star: 'Saturn' },
    { cusp: '5', degree: "120° 00'", sign: 'Leo', lord: 'Sun', star: 'Sun' },
    { cusp: '6', degree: "150° 00'", sign: 'Virgo', lord: 'Mercury', star: 'Rahu' },
    { cusp: '7', degree: "180° 00'", sign: 'Libra', lord: 'Venus', star: 'Moon' },
    { cusp: '8', degree: "210° 00'", sign: 'Scorpio', lord: 'Mars', star: 'Saturn' },
    { cusp: '9', degree: "240° 00'", sign: 'Sagittarius', lord: 'Jupiter', star: 'Ketu' },
    { cusp: '10', degree: "270° 00'", sign: 'Capricorn', lord: 'Saturn', star: 'Sun' },
    { cusp: '11', degree: "300° 00'", sign: 'Aquarius', lord: 'Saturn', star: 'Rahu' },
    { cusp: '12', degree: "330° 00'", sign: 'Pisces', lord: 'Jupiter', star: 'Ketu' },
  ].map((item, index, arr) => (
    <View key={index}>
      
      <View style={styles.planetRow}>
        <Text style={styles.cell}>{item.cusp}</Text>
        <Text style={styles.cell}>{item.degree}</Text>
        <Text style={styles.cell}>{item.sign}</Text>
        <Text style={styles.cell}>{item.lord}</Text>
        <Text style={styles.cell}>{item.star}</Text>
      </View>

      {/* Divider */}
      {index !== arr.length - 1 && (
        <View style={styles.planetDivider} />
      )}

    </View>
  ))}

</View>

</>

          )}
          {activeTopTab === "ashtakvarga" && (
            <>
        

          <Text style={[commonStyle.cardSubTitle1,{marginTop:verticalScale(20), fontSize:fontSize.md, color:"#B8B8D0"}]}>
            Ashtakavarga shows the distribution of benefic points for each planet across houses
          </Text>

         <AshtakvargaChart title='SAV (Sarva Ashtakavarga)'/>
         <AshtakvargaChart title='Ascendant'/>

         <AshtakvargaChart title='Jupiter'/>

         <AshtakvargaChart title='Mars'/>

</>
              
          )}


          {activeTopTab === "chart" && (
            <>
            
          <Text style={[commonStyle.cardSubTitle1,{marginTop:verticalScale(20), fontSize:fontSize.md, color:"#B8B8D0"}]}>
            Divisional charts (Vargas) for detailed life analysis
          </Text>


          <View style={styles.chartGrid}>
  {chartList.map((item, index) => (
    
    <View key={index} style={styles.chartItem}>
      
      {/* TITLE */}
      <Text style={styles.chartItemTitle}>
        {item.title}
      </Text>

      {/* SUB TEXT */}
      <Text style={styles.chartItemSub}>
        {item.sub}
      </Text>

      {/* MINI CHART */}
      <View style={styles.miniChartBox}>
        <SvgXml
      xml={normalizeSvg(charts[item.sub])}
      width="100%"
      height="100%"
    />
      </View>

    </View>
  ))}
</View>
            
            </>
          )}

        </ScrollView>
      </SafeAreaView>
      )}
    </ImageBackground>
  )
}

export default MyKundliScreen

const styles = StyleSheet.create({

  topTabContainer: {
    // paddingHorizontal: scale(16),
    marginTop: verticalScale(16),
  },

  topTabItem: {
    marginRight: scale(20),
    paddingBottom: verticalScale(8),
    paddingHorizontal: scale(16),
  },

  activeTopTabItem: {
    borderBottomWidth: 2,
    borderBottomColor: Color.primarButtonBg,
    // paddingHorizontal:scale(10)
  },

  topTabText: {
    fontSize: moderateScale(14),
    color: '#7E7EA9',
  },

  activeTopTabText: {
    color: Color.primarButtonBg,
    fontWeight: '600',
  },

  detailsCard: {
    marginTop: verticalScale(16),
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
  },

  label: {
    color: '#A1A1AA',
    fontSize: moderateScale(13),
  },

  value: {
    color: '#FFFFFF',
    fontSize: moderateScale(13),
    fontWeight: '500',
  },

  divider: {
    height: 1,
    backgroundColor: '#2A2A4A',
  },


  kundliHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  kundliTitle: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },

  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#1A1A3D',
    borderRadius: moderateScale(20),
    padding: scale(4),
  },

  activeToggle: {
    backgroundColor: '#F59E0B',
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(12),
    borderRadius: moderateScale(16),
  },

  inactiveToggle: {
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(12),
  },

  activeToggleText: {
    color: '#000',
    fontSize: moderateScale(12),
    fontWeight: '600',
  },

  inactiveToggleText: {
    color: '#A1A1AA',
    fontSize: moderateScale(12),
  },

  chartCard: {
    marginTop: verticalScale(14),
  },

  chartTitle: {
    color: '#FFFFFF',
    fontSize: moderateScale(14),
    marginBottom: verticalScale(10),
  },

chartBox: {
  width: '100%',
  aspectRatio: 1,
  borderRadius: moderateScale(12),
  backgroundColor: '#1A1A3D',
  padding: 12,
},

  // chartBox: {
  //   height: verticalScale(160),
  //   borderRadius: moderateScale(12),
  //   backgroundColor: '#1A1A3D',
  //   paddingVertical: verticalScale(8),
  //   // justifyContent: 'center',
  //   // alignItems: 'center',
  // },

  fab: {
    position: 'absolute',
    bottom: verticalScale(20),
    right: scale(20),
    backgroundColor: '#F59E0B',
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  planetCard: {
    marginTop: verticalScale(16),
  },

  planetTitle: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginBottom: verticalScale(10),
  },

  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: verticalScale(8),
  },

  headerText: {
    flex: 1,
    color: '#7E7EA9',
    fontSize: moderateScale(12),
    fontWeight: '600',
  },

  planetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(10),
  },

  cell: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: moderateScale(12),
  },

  planetDivider: {
    height: 1,
    backgroundColor: '#2A2A4A',
  },
  rulingCard: {
  marginTop: verticalScale(16),
},

rulingTitle: {
  color: '#FFFFFF',
  fontSize: moderateScale(16),
  fontWeight: '600',
  marginBottom: verticalScale(10),
},
kpCard: {
  marginTop: verticalScale(16),
},

kpTitle: {
  color: '#FFFFFF',
  fontSize: moderateScale(16),
  fontWeight: '600',
  marginBottom: verticalScale(10),
},

cuspsCard: {
  marginTop: verticalScale(16),
},

cuspsTitle: {
  color: '#FFFFFF',
  fontSize: moderateScale(16),
  fontWeight: '600',
  marginBottom: verticalScale(10),
},

chartGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  marginTop: verticalScale(16),
},

chartItem: {
  width: '48%', // 2 columns
  backgroundColor: '#0F1030',
  borderRadius: moderateScale(16),
  padding: scale(12),
  marginBottom: verticalScale(12),
  borderWidth: 1,
  borderColor: '#2A2A4A',
},

chartItemTitle: {
  color: '#FFFFFF',
  fontSize: moderateScale(13),
  fontWeight: '600',
},

chartItemSub: {
  color: '#7E7EA9',
  fontSize: moderateScale(11),
  marginBottom: verticalScale(8),
},

miniChartBox: {
  height: verticalScale(100),
  borderRadius: moderateScale(12),
  backgroundColor: '#1A1A3D',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
},


})
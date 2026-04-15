import Svg, { Line, Rect, Text as SvgText  } from "react-native-svg";

export const SouthChart = () => {
  return (
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
  );
};
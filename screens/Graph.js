import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native"
import { BarChart } from "react-native-chart-kit";
// Colors
import { black, grey, white, brightBlue } from "../styles";

export default function Graph() {

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43]
    }
  ]
};

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: black }}>
            <Text style={{color: white}}>Your graph</Text>
            <BarChart
  data={data}
  width={400}
  height={220}
  yAxisLabel="$"
  verticalLabelRotation={30}
/>
        </SafeAreaView>
    )

}
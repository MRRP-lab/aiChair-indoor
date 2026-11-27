import { View, Text } from "react-native";

export default function ModelLoadingScreen({ progress }: { progress: number }) {
    return (
        <View>
            <Text>
                {"Downloading Vision Model"}
            </Text>
            <Text>
                {"Progress: "}
                {progress}
            </Text>
        </View>
    )
}
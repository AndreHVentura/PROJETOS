import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {View, StyleSheet} from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function ProtectedRoute({ children, navigation }: any) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem("token");
            if (!token) {
                navigation.navigate("Login");
            }
            setLoading(false);
        };
        checkAuth();
    },[]);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator animating={true} size="large" />
            </View>
        );
    }

    return children;
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
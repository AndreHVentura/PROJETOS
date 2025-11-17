import React from "react";
import { Banner } from "react-native-paper";

export default function NotificationBanner({
  visible,
  message,
  onDismiss,
}: any) {
  return (
    <Banner
      visible={visible}
      actions={[
        {
          label: "Fechar",
          onPress: onDismiss,
        },
      ]}
      icon="bell"
    >
      {message}
    </Banner>
  );
}

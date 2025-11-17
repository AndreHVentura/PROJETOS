import React from "react";
import { Appbar } from "react-native-paper";

export default function Header({
  title,
  onLogout,
}: {
  title: string;
  onLogout?: () => void;
}) {
  return (
    <Appbar.Header>
      <Appbar.Content title={title} />
      {onLogout && <Appbar.Action icon="logout" onPress={onLogout} />}
    </Appbar.Header>
  );
}

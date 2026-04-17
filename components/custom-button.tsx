import React from "react";
import {Text} from "react-native";
import { Button, ButtonProps } from "react-native-paper";
import { ACCENT_COLOR, PRIMARY_COLOR } from "@/constants";

export const CustomButton = (props: ButtonProps) => {
  return (
    <Button
    style={{
        borderRadius: 5,
        width: "100%",
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: ACCENT_COLOR,
        opacity: props.disabled ? 0.5 : 1,
    }}
    mode = {props.mode || "contained"}
    onPress = {props.onPress}
    disabled = {props.disabled}
    >
        <Text>{props.children}</Text>
    </Button>
    );
};
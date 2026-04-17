import React from "react";
import { Text } from "react-native-paper";

interface CustomTextProps {
    value: string;
    fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
    fontColor?: string;
    fontSize?: number;
    textAlign?: "left" | "center" | "right";
}

export const CustomText = ({
    value, 
    fontSize = 14, 
    fontWeight = "normal", 
    fontColor = "#000", 
    textAlign = "left"
}: CustomTextProps) => {
    return (
        <Text
        style = {{
            fontSize: fontSize,
            fontWeight: fontWeight,
            color: fontColor,
            textAlign: textAlign,
        }}
        >
            {value}
        </Text>
    );
};
import React from "react";
import { FlexBox } from "@/components/flexbox";
import { CustomText } from "@/components/custom-text";
import { ACCENT_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from "@/constants";
import DataTableTitle from "react-native-paper/lib/typescript/components/DataTable/DataTableTitle";

interface TabTitleProps {
    title: string;
    caption?: string;
}

const TabTitle = (props: TabTitleProps) => {
    return (
        <FlexBox
            gap={3}
        >
            <CustomText
                value={props.title}
                fontSize={25}
                fontWeight="bold"
                fontColor={PRIMARY_COLOR}
            />
            {props.caption && (
                <CustomText
                    value={props.caption}
                    fontSize={14}
                    fontWeight="bold"
                    fontColor={ACCENT_COLOR}
                />
            )}
        </FlexBox>
    );
};

export default TabTitle;

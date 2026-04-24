export const PRIMARY_COLOR = "#13293D";

export const SECONDARY_COLOR = "#E8F1F2";

export const ACCENT_COLOR = "#6C91C2";

export const USER_ROLES = [
    { label : "Customer", value : "customer"},
    { label : "Admin", value : "admin"},
    { label : "Owner", value : "owner"}
];

export const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
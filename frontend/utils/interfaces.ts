export interface iLoyaltyActivity {
    date: string;
    type: "Earned" | "Redeemed" | "Adjusted";
    description: string;
    points: number;
}

export const activityTypes: { [key: string]: "Earned" | "Redeemed" | "Adjusted" } = {
    EARN: "Earned",
    REDEEM: "Redeemed",
    ADJUSTMENT: "Adjusted"
}
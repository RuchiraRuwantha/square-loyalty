export interface iLoyaltyActivity {
    date: string;
    type: "Earned" | "Redeemed" | "Adjusted";
    description: string;
    points: number;
}
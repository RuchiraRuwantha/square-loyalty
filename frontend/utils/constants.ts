export const activityTypes: { [key: string]: "Earned" | "Redeemed" | "Adjusted" } = {
    EARN: "Earned",
    REDEEM: "Redeemed",
    ADJUSTMENT: "Adjusted"
}

export const rewardTiers = [
    { id: 'tier-3', name: 'Bronze', pointsRequired: 500 },
    { id: 'tier-2', name: 'Silver', pointsRequired: 2000 },
    { id: 'tier-1', name: 'Gold', pointsRequired: 5000 }
];
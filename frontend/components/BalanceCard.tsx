import { rewardTiers } from "../utils/constants"

export const BalanceCard: React.FC<{ balance: number }> = ({ balance }) => {

    const currentTier = rewardTiers.find(tier => balance <= tier.pointsRequired) || rewardTiers[1];

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm">
            <p className="text-gray-600">Your current loyalty balance:</p>
            <p className="text-4xl font-bold text-indigo-600 flex items-center gap-2" data-test="balance-value">
                {balance} <span className="text-xl text-gray-500">points</span>
            </p>
            <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
                    <div className="bg-indigo-500 h-3 rounded-full" style={{ width: `${(balance / currentTier.pointsRequired) * 100}%` }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                    Progress to Next Tier:{" "}
                    <span className="font-medium">{currentTier.pointsRequired - balance} points</span> remaining
                </p>
            </div>
        </div>
    )
}
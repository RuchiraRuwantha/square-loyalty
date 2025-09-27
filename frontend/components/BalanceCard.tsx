export const BalanceCard: React.FC<{ balance: number }> = ({ balance }) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm">
            <p className="text-gray-600">Your current loyalty balance:</p>
            <p className="text-4xl font-bold text-indigo-600 flex items-center gap-2">
                {balance} <span className="text-xl text-gray-500">points</span>
            </p>
            <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
                    <div className="bg-indigo-500 h-3 rounded-full" style={{ width: `${(balance / 500) * 100}%` }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                    Progress to Next Tier:{" "}
                    <span className="font-medium">{500 - balance} points</span> remaining
                </p>
            </div>
        </div>
    )
}
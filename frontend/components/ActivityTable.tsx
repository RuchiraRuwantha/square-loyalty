import { Coins } from "lucide-react"
import Loader from "./Loader"
import { iLoyaltyActivity } from "../utils/interfaces";
import { ErrorMessage } from "./ErrorMessage";
import { activityTypes } from "../utils/constants";

type ActivityTableProps = {
    activities: iLoyaltyActivity[];
    loading: boolean;
    error?: string | null;
}

export const ActivityTable: React.FC<ActivityTableProps> = ({ activities, loading, error }) => {
    return (
        <div className="bg-white sm:p-6 p-2 rounded-2xl shadow-sm">
            <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Coins className="w-5 h-5 text-yellow-500" />
                Recent Loyalty Activity
            </h2>
            <div className="max-h-[350px] flex-1 overflow-y-auto">
                {
                    activities.length === 0 ?
                        <div className="py-10 text-center font-bold text-gray-500">
                            No activity found.
                        </div> :
                        <table className="w-full text-sm">
                            <thead className="sticky top-0 bg-white z-10">
                                <tr className="text-left text-gray-600 border-b">
                                    <th className="py-2 sm:pl-2">Date</th>
                                    <th className="md:text-left text-center">Type</th>
                                    <th className="md:text-left text-center">Description</th>
                                    <th>Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading ?
                                        (
                                            <tr>
                                                <td colSpan={4} className="py-4 text-center text-gray-500 justify-items-center">
                                                    <Loader size={36} />
                                                </td>
                                            </tr>
                                        ) :
                                        activities.length > 0 ?
                                            activities.map((a, i) => (
                                                <tr key={i} className="odd:bg-blue-50">
                                                    <td className="sm:pl-2 py-2">{a.date}</td>
                                                    <td className={`py-2 font-medium md:text-left text-right 
                                                ${a.type === activityTypes['EARN'] ? 'text-green-600'
                                                            : (a.type === activityTypes['REDEEM'] ? 'text-red-600'
                                                                : 'text-gray-600')} `}>{a.type}
                                                    </td>
                                                    <td className="py-2 md:text-left text-center">{a.description}</td>
                                                    <td
                                                        className={`p-2 font-medium ${a.points > 0 ? "text-green-600" : "text-red-600"
                                                            }`}
                                                    >
                                                        {a.points > 0 ? `+${a.points}` : a.points}
                                                    </td>
                                                </tr>
                                            ))
                                            :
                                            error &&
                                            (
                                                <tr>
                                                    <td colSpan={4} className="py-4 text-center text-gray-500">
                                                        <ErrorMessage message={error} />
                                                    </td>
                                                </tr>
                                            )
                                }
                            </tbody>
                        </table>
                }
            </div>
        </div>
    )
}
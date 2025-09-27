import { Gift } from "lucide-react";
import { Button } from "./Button";
import Loader from "./Loader";
import { useState } from "react";
import api from "../lib/api";
import { Input } from "./Input";

type RedeemComponentProps = {
    fetchDashboardData: () => void;
}

export const RedeemComponent: React.FC<RedeemComponentProps> = ({ fetchDashboardData }) => {

    const [redeemLoading, setRedeemLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [points, setPoints] = useState<number>(0);
    const accountId = typeof window !== "undefined" ? localStorage.getItem("account_id") : null;

    async function handleRedeemPoints(e: React.FormEvent) {
        e.preventDefault();
        setRedeemLoading(true);
        if (points <= 0) {
            setError("Enter a valid number of points to redeem");
            setRedeemLoading(false);
            return;
        };
        try {
            await api.post(`/accounts/${accountId}/redeem`, { reward_id: 'reward-2', points: points });
            setPoints(0);
            fetchDashboardData();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.response?.data?.error || "Failed to redeem points");
        } finally {
            setRedeemLoading(false);
        }
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5 text-green-500" />
                Redeem Points
            </h2>

            <form onSubmit={handleRedeemPoints} className="flex flex-col gap-2">
                <Input
                    type="number"
                    placeholder="Enter points to redeem"
                    value={points}
                    onChange={(e) => {
                        setPoints(Number(e.target.value))
                        setError(null)
                    }}
                    required
                    error={error || undefined}
                />
                <Button
                    type="submit"
                    className="bg-gradient-to-r from-green-500 to-green-800 text-white font-semibold py-2 rounded-lg hover:opacity-85 transition flex items-center justify-center gap-2"
                >
                    <Gift className="w-5 h-5" />
                    {redeemLoading ? <Loader size={16} /> : 'Redeem'}
                </Button>
            </form>
        </div>
    )
}
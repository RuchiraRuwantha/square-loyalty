import { PlusCircle } from "lucide-react"
import { Button } from "./Button"
import Loader from "./Loader"
import { useState } from "react";
import api from "../lib/api";
import { Input } from "./Input";

type EarnComponentProps = {
    fetchDashboardData: () => void;
}

export const EarnComponent: React.FC<EarnComponentProps> = ({ fetchDashboardData }) => {

    const [earnLoading, setEarnLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [orderId, setOrderId] = useState("");
    const accountId = typeof window !== "undefined" ? localStorage.getItem("account_id") : null;

    async function handleEarnPoints(e: React.FormEvent) {
        e.preventDefault();
        if (orderId.trim() === "") {
            setError("Please enter a valid Order ID");
            return;
        }
        try {
            setEarnLoading(true);
            await api.post(`/accounts/${accountId}/earn`, {
                order_id: orderId || "mock-order-1",
                program_id: "program-1",
            });
            setOrderId("");
            fetchDashboardData();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to earn points");
        } finally {
            setEarnLoading(false);
        }
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-blue-500" />
                Earn Loyalty Points
            </h2>
            <form onSubmit={handleEarnPoints} className="flex flex-col gap-2">
                <Input
                    type="text"
                    placeholder="e.g. ORD-123456"
                    value={orderId}
                    onChange={(e) => {
                        setOrderId(e.target.value)
                        setError(null)
                    }}
                    error={error || undefined}
                />
                <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-400 to-blue-700 text-white font-semibold py-2 rounded-lg hover:opacity-85 transition flex items-center justify-center gap-2"
                >
                    <PlusCircle className="w-5 h-5" />
                    {earnLoading ? <Loader size={16} /> : 'Earn Points'}
                </Button>
            </form>
        </div>
    )
}
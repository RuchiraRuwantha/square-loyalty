/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../lib/api";
import { Coins } from "lucide-react";
import { iLoyaltyActivity } from "../../utils/interfaces";
import { mapActivityArrayToActivityArray } from "../../utils/dataMapper";
import { EarnComponent } from "../../components/EarnComponent";
import { RedeemComponent } from "../../components/RedeemComponent";
import { ActivityTable } from "../../components/ActivityTable";
import { BalanceCard } from "../../components/BalanceCard";
import LogoutButton from "../../components/LogoutButton";

export default function DashboardPage() {

    const [balance, setBalance] = useState<number>(0);
    const [activities, setActivities] = useState<iLoyaltyActivity[]>([]);
    const [dashboardDataloading, setDashboardDataLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const accountId = typeof window !== "undefined" ? localStorage.getItem("account_id") : null;

    // Fetch balance + history
    useEffect(() => {
        if (!accountId) {
            router.push("/");
            return;
        }
        fetchDashboardData();
    }, [accountId, router]);

    async function fetchDashboardData() {
        try {
            setDashboardDataLoading(true);
            const accountId = localStorage.getItem("account_id");
            const [balanceRes, historyRes] = await Promise.all([
                api.get(`/accounts/${accountId}`),
                api.post(`/accounts/${accountId}/history`)
            ]);
            setBalance(balanceRes.data.balance);
            setActivities(mapActivityArrayToActivityArray(historyRes.data || []));
        } catch (err: any) {
            setError(err.response?.data?.error || "Failed to load data");
        } finally {
            setDashboardDataLoading(false);
        }
    }

    return (
        <div className="sm:py-4 sm:px-8 py-10 px-5 space-y-6 bg-gray-50 min-h-screen bg-gradient-to-br from-indigo-100 via-blue-200 to-cyan-100">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="sm:text-2xl text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Coins className="w-7 h-7 text-indigo-600" />
                    Loyalty Overview
                </h1>
                <LogoutButton />
            </div>
            {/* Balance Card */}
            <BalanceCard balance={balance} />

            {/* Actions */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Earn Points */}
                <EarnComponent fetchDashboardData={fetchDashboardData} />

                {/* Redeem Points */}
                <RedeemComponent fetchDashboardData={fetchDashboardData} />
            </div>

            {/* Activity Table */}
            <ActivityTable activities={activities} loading={dashboardDataloading} />
        </div >
    );
}

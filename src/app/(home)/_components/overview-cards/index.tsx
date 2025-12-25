"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getDashboardStats } from "@/store/features/dashboardSlice";
import { OverviewCard } from "./card";
import * as icons from "./icons";

export function OverviewCardsGroup() {
  const dispatch = useAppDispatch();
  const { stats, isLoading } = useAppSelector((state) => state.dashboard);
  console.log(stats, 'stats')
  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  // Loading state skeleton or null?
  // The parent component Suspense might not work for Client Component internal fetching.
  // We can render a simple loading state or just defaults.

  if (isLoading && !stats?.data) {
    return <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">Loading stats...</div>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <OverviewCard
        label="Total Projects"
        data={{
          value: stats?.data?.projects || 0,
          growthRate: 0, // Not provided by API
        }}
        Icon={icons.Product}
      />

      <OverviewCard
        label="Total Blogs"
        data={{
          value: stats?.data?.blogs || 0,
          growthRate: 0,
        }}
        Icon={icons.Views}
      />

      <OverviewCard
        label="Total Contacts"
        data={{
          value: stats?.data?.contacts || 0,
          growthRate: 0,
        }}
        Icon={icons.Users}
      />

      {/* Placeholder for 4th card if needed, or remove */}
      <OverviewCard
        label="Total Users"
        data={{
          value: stats?.data?.users || 0,
          growthRate: 0,
        }}
        Icon={icons.Users}
      />
    </div>
  );
}

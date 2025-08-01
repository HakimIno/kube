"use client";

import React from 'react';
import { MainLayout } from '@/components/MainLayout';

export default function HistoryPage() {
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">History</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add history content here */}
      </div>
    </MainLayout>
  );
} 
"use client"
import { useCategories } from '@/hooks/useCategories';
import React, { useState } from 'react';

export const CategoryMenu: React.FC = () => {
    const { data, isLoading, isError } = useCategories();
    const [searchTerm, setSearchTerm] = useState('');

    if (isLoading) return <div className="text-center py-4">Loading...</div>;
    if (isError) return <div className="text-center py-4 text-red-500">Error loading categories</div>;

    const filteredCategories = Array.isArray(data) 
        ? data.filter((category: any) =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) 
        : [];

    const renderCategories = (categories: any[]) => {
        return (
            <ul className="list-disc pl-5">
                {categories.map((category) => (
                    <li key={category.id} className="py-1">
                        <span className="font-medium">{category.name}</span>
                        {category.children && category.children.length > 0 && (
                            <div className="ml-4">
                                {renderCategories(category.children)}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md bg-white">
            <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <div className="overflow-y-auto max-h-60">
                {renderCategories(filteredCategories)}
            </div>
        </div>
    );
};
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Page as PageType } from '@/types';

interface PagesProviderProps {
    children: ReactNode;
}

const PagesContext = createContext<PageType[]>([]);

export const usePages = () => useContext(PagesContext);

export const PagesProvider = ({ children }: PagesProviderProps) => {
    const [pages, setPages] = useState<PageType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPages = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/pages?populate=*`);
                if (response.ok) {
                    const data = await response.json();
                    if (!data.data) throw new Error('No page data available');
                    const formattedPages: PageType[] = data.data.map((page: any) => formatPageData(page));

                    console.log("formatted pages ", formattedPages);
                    setPages(formattedPages);
                } else {
                    throw new Error('Failed to fetch page titles: ' + response.statusText);
                }
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPages();
    }, []);

    const formatPageData = (data: any): PageType => {
        return {
            id: data.id,
            title: data.attributes.title,
            route: data.attributes.route,
            description: data.attributes.description,
            image: data.attributes.image,
            pageSections: data.attributes.page_sections.data
        };
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <PagesContext.Provider value={pages}>
            {children}
        </PagesContext.Provider>
    );
};
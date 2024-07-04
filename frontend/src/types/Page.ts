export interface Page {
    id: number;
    title: string;
    route: string;
    description?: string;
    imageUrl: string;
    pageSections: {
        attributes: {
            menuName: string;
            oneWordHashtag: string;
        }
    }[];
}
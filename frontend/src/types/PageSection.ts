export interface PageSection {
    id: number,
    attributes: {
        page: string;
        title: string;
        description: string;
        link: string;
        image: {
            data: {
                attributes: {
                    url: string
                }
            }
        };
    }
}
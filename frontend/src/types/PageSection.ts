export interface PageSection {
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
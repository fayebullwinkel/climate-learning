export interface ImageCardType {
    id: number;
    attributes: {
        id: number;
        image: {
            data: {
                attributes: {
                    url: string
                }
            }
        };
        heading: string;
        description: string;
        link: string;
    }
}

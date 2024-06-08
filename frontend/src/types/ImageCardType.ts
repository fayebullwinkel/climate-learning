export interface ImageCardType {
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
    }
}

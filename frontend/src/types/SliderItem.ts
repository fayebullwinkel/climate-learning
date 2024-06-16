export interface SliderItem {
    id: number;
    attributes: {
        heading: string;
        description: string;
        image?: {
            data: {
                attributes: {
                    url: string;
                }
            }
        }
    };
}
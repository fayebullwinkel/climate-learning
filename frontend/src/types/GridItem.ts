export interface GridItem {
    id: number,
    attributes: {
        title: string,
        description: string,
        image: {
            data: {
                attributes: {
                    url: string;
                }
            }
        }
    }
}
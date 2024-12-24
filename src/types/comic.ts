export interface Comic {
  id: number;
  title: string;
  description: string;
  modified: string;
  format: string;
  pageCount: number;
  thumbnail: {
    path: string;
    extension: string;
  };
  prices: [
    {
      type: string;
      price: number;
    },
  ];
  creators: {
    available: number;
    collectionURI: string;
    items: [
      {
        resourceURI: string;
        name: string;
        role: string;
      },
    ];
  };
}

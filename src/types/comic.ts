export interface Comic {
  id: number;
  title: string;
  description: string;
  modified: string;
  format: string;
  pageCount: number;
  urls: [
    {
      type: string;
      url: string;
    },
  ];
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

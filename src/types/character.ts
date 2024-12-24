export interface Character {
  id: number;
  name: string;
  description: string;
  modified: string;
  resourceURI: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: {
    available: number;
    collectionURI: string;
    items: [
      {
        resourceURI: string;
        name: string;
      },
    ];
  };
}

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

export interface CharactersResponse {
  limit: number;
  total: number;
  totalPages: number;
  results: Character[];
}

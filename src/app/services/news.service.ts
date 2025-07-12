export interface News {
  id: number;
  title: string;
  preview: string;
  content: string;
  image: string;
  bigImage?: string;
  created_at: string;
  views: number;
}

export class NewsService {
  private newsList: News[] = [
    {
      id: 1,
      title: 'Sunny Weather Expected Tomorrow',
      preview: 'Meteorologists predict sunny skies',
      content: 'Detailed weather forecast goes here...',
      image: 'https://picsum.photos/400/300?random=1',
      bigImage: 'https://picsum.photos/800/600?random=1',
      created_at: '2024-05-01',
      views: 120
    },
    {
      id: 2,
      title: 'New Electric Car Model Released',
      preview: 'Automaker unveils latest EV',
      content: 'Full article about the new electric car...',
      image: 'https://picsum.photos/400/300?random=2',
      bigImage: 'https://picsum.photos/800/600?random=2',
      created_at: '2024-05-02',
      views: 95
    },
    {
      id: 3,
      title: 'City Council Approves Park Renovation',
      preview: 'Local park to get major facelift',
      content: 'Details about the renovation project...',
      image: 'https://picsum.photos/400/300?random=3',
      bigImage: 'https://picsum.photos/800/600?random=3',
      created_at: '2024-05-03',
      views: 76
    }
  ];

  getNews(): News[] {
    return this.newsList;
  }

  getNewsById(id: number): News | undefined {
    return this.newsList.find(n => n.id === id);
  }
}

export interface News {
  id: number;
  title_short: string;
  desc_short: string;
  title_long: string;
  desc_long: string;
  image: string;
  bigImage?: string;
  created_at: string;
  views: number;
}

export class NewsService {
  private newsList: News[] = [
    {
      id: 1,
      title_short: 'Sunny Weather Expected',
      desc_short: 'Meteorologists predict sunny skies',
      title_long: 'Sunny Weather Expected Tomorrow - Full Forecast',
      desc_long: 'Detailed weather forecast goes here...',
      image: 'https://picsum.photos/400/300?random=1',
      bigImage: 'https://picsum.photos/800/600?random=1',
      created_at: '2024-05-01',
      views: 120
    },
    {
      id: 2,
      title_short: 'New Electric Car Released',
      desc_short: 'Automaker unveils latest EV',
      title_long: 'New Electric Car Model Released - In Depth',
      desc_long: 'Full article about the new electric car...',
      image: 'https://picsum.photos/400/300?random=2',
      bigImage: 'https://picsum.photos/800/600?random=2',
      created_at: '2024-05-02',
      views: 95
    },
    {
      id: 3,
      title_short: 'Park Renovation Approved',
      desc_short: 'Local park to get major facelift',
      title_long: 'City Council Approves Park Renovation Project',
      desc_long: 'Details about the renovation project...',
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

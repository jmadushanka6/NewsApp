export interface News {
  id: number;
  title: string;
  preview: string;
  content: string;
  image: string;
  bigImage?: string;
}

export class NewsService {
  private newsList: News[] = [
    {
      id: 1,
      title: 'Sunny Weather Expected Tomorrow',
      preview: 'Meteorologists predict sunny skies',
      content: 'Detailed weather forecast goes here...',
      image: 'https://source.unsplash.com/random/400x300?sig=1',
      bigImage: 'https://source.unsplash.com/random/800x600?sig=1'
    },
    {
      id: 2,
      title: 'New Electric Car Model Released',
      preview: 'Automaker unveils latest EV',
      content: 'Full article about the new electric car...',
      image: 'https://source.unsplash.com/random/400x300?sig=2',
      bigImage: 'https://source.unsplash.com/random/800x600?sig=2'
    },
    {
      id: 3,
      title: 'City Council Approves Park Renovation',
      preview: 'Local park to get major facelift',
      content: 'Details about the renovation project...',
      image: 'https://source.unsplash.com/random/400x300?sig=3',
      bigImage: 'https://source.unsplash.com/random/800x600?sig=3'
    }
  ];

  getNews(): News[] {
    return this.newsList;
  }

  getNewsById(id: number): News | undefined {
    return this.newsList.find(n => n.id === id);
  }
}

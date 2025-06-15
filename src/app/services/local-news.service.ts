import { Injectable } from '@angular/core';

export interface LocalNewsArticle {
  id: number;
  title: string;
  summary: string;
  image_url: string;
  category: string;
  published_at: string;
  read_more_url: string;
  content: string;
}

@Injectable({ providedIn: 'root' })
export class LocalNewsService {
  private viennaNews: LocalNewsArticle[] = [
    {
      id: 1,
      title: 'Vienna Street Festival Draws Thousands',
      summary: 'Residents flock to the annual street festival in the heart of Vienna.',
      image_url: 'assets/vienna/street-festival.jpg',
      category: 'Culture',
      published_at: '2024-05-10',
      read_more_url: '#',
      content: 'Full article about the vibrant street festival taking place in Vienna...'
    },
    {
      id: 2,
      title: 'New Tram Line Opens in the 7th District',
      summary: 'The city introduces a new tram line improving connectivity.',
      image_url: 'assets/vienna/tram.jpg',
      category: 'Local',
      published_at: '2024-05-12',
      read_more_url: '#',
      content: 'Article covering the inauguration of the new tram line...'
    },
    {
      id: 3,
      title: 'Concert Series Returns to Stephansplatz',
      summary: 'Open-air concerts will resume this summer with local bands.',
      image_url: 'assets/vienna/concert.webp',
      category: 'Entertainment',
      published_at: '2024-05-15',
      read_more_url: '#',
      content: 'Details on the upcoming concert series in Stephansplatz...'
    },
    {
      id: 4,
      title: 'Vienna Zoo Welcomes Baby Panda',
      summary: 'Exciting news as the zoo announces the birth of a panda cub.',
      image_url: 'assets/vienna/panda.jpg',
      category: 'Animals',
      published_at: '2024-05-17',
      read_more_url: '#',
      content: 'More information about the new addition to the Vienna Zoo...'
    },
    {
      id: 5,
      title: 'City Council Approves New Cycling Lanes',
      summary: 'More cycling lanes aim to make Vienna a bike-friendly city.',
      image_url: 'assets/vienna/cycling.jpg',
      category: 'Infrastructure',
      published_at: '2024-05-20',
      read_more_url: '#',
      content: 'Everything about the expansion of cycling infrastructure...'
    },
    {
      id: 6,
      title: 'Local Market Showcases Organic Produce',
      summary: 'Farmers market highlights locally sourced organic goods.',
      image_url: 'assets/vienna/market.jpg',
      category: 'Lifestyle',
      published_at: '2024-05-22',
      read_more_url: '#',
      content: 'Article on the growing trend of organic produce in Vienna...'
    },
    {
      id: 7,
      title: 'Technology Hub Opens Near Donau City',
      summary: 'A new technology hub promises innovation and jobs.',
      image_url: 'assets/vienna/tech-hub.jpg',
      category: 'Business',
      published_at: '2024-05-25',
      read_more_url: '#',
      content: 'Coverage of the opening ceremony of the tech hub...'
    },
    {
      id: 8,
      title: 'Historic Coffee House Gets Renovated',
      summary: 'Beloved coffee house reopens its doors after extensive renovation.',
      image_url: 'assets/vienna/coffee-house.jpg',
      category: 'Culture',
      published_at: '2024-05-27',
      read_more_url: '#',
      content: 'Insights into the renovation and history of the coffee house...'
    },
    {
      id: 9,
      title: 'Rainy Week Ahead, Says Forecast',
      summary: 'Meteorologists predict a wet week for Vienna residents.',
      image_url: 'assets/vienna/rain.jpg',
      category: 'Weather',
      published_at: '2024-05-30',
      read_more_url: '#',
      content: 'Full forecast details and tips for staying dry...'
    }
  ];

  getViennaNews(): LocalNewsArticle[] {
    return this.viennaNews;
  }

  getViennaNewsById(id: number): LocalNewsArticle | undefined {
    return this.viennaNews.find(n => n.id === id);
  }
}

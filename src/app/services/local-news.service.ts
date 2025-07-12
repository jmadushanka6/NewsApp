import { Injectable } from '@angular/core';

export interface LocalNewsArticle {
  id: number;
  title_short: string;
  desc_short: string;
  title_long: string;
  desc_long: string;
  image_url: string;
  category: string;
  published_at: string;
  created_at: string;
  views: number;
  read_more_url: string;
}

@Injectable({ providedIn: 'root' })
export class LocalNewsService {
  private viennaNews: LocalNewsArticle[] = [
    {
      id: 1,
      title_short: 'Vienna Street Festival',
      desc_short: 'Residents flock to the annual street festival in the heart of Vienna.',
      title_long: 'Vienna Street Festival Draws Thousands of Visitors',
      desc_long: 'Full article about the vibrant street festival taking place in Vienna...',
      image_url: 'https://picsum.photos/400/300?random=11',
      category: 'Culture',
      published_at: '2024-05-10',
      created_at: '2024-05-10',
      views: 34,
      read_more_url: '#'
    },
    {
      id: 2,
      title_short: 'New Tram Line in 7th',
      desc_short: 'The city introduces a new tram line improving connectivity.',
      title_long: 'New Tram Line Opens in the 7th District',
      desc_long: 'Article covering the inauguration of the new tram line...',
      image_url: 'https://picsum.photos/400/300?random=12',
      category: 'Local',
      published_at: '2024-05-12',
      created_at: '2024-05-12',
      views: 28,
      read_more_url: '#'
    },
    {
      id: 3,
      title_short: 'Concerts Return to Stephansplatz',
      desc_short: 'Open-air concerts will resume this summer with local bands.',
      title_long: 'Concert Series Returns to Stephansplatz',
      desc_long: 'Details on the upcoming concert series in Stephansplatz...',
      image_url: 'https://picsum.photos/400/300?random=13',
      category: 'Entertainment',
      published_at: '2024-05-15',
      created_at: '2024-05-15',
      views: 19,
      read_more_url: '#'
    },
    {
      id: 4,
      title_short: 'Vienna Zoo Welcomes Panda',
      desc_short: 'Exciting news as the zoo announces the birth of a panda cub.',
      title_long: 'Vienna Zoo Welcomes Baby Panda',
      desc_long: 'More information about the new addition to the Vienna Zoo...',
      image_url: 'https://picsum.photos/400/300?random=14',
      category: 'Animals',
      published_at: '2024-05-17',
      created_at: '2024-05-17',
      views: 52,
      read_more_url: '#'
    },
    {
      id: 5,
      title_short: 'Council Approves Cycling Lanes',
      desc_short: 'More cycling lanes aim to make Vienna a bike-friendly city.',
      title_long: 'City Council Approves New Cycling Lanes',
      desc_long: 'Everything about the expansion of cycling infrastructure...',
      image_url: 'https://picsum.photos/400/300?random=15',
      category: 'Infrastructure',
      published_at: '2024-05-20',
      created_at: '2024-05-20',
      views: 15,
      read_more_url: '#'
    },
    {
      id: 6,
      title_short: 'Market Showcases Organic Produce',
      desc_short: 'Farmers market highlights locally sourced organic goods.',
      title_long: 'Local Market Showcases Organic Produce',
      desc_long: 'Article on the growing trend of organic produce in Vienna...',
      image_url: 'https://picsum.photos/400/300?random=16',
      category: 'Lifestyle',
      published_at: '2024-05-22',
      created_at: '2024-05-22',
      views: 23,
      read_more_url: '#'
    },
    {
      id: 7,
      title_short: 'Technology Hub Opens',
      desc_short: 'A new technology hub promises innovation and jobs.',
      title_long: 'Technology Hub Opens Near Donau City',
      desc_long: 'Coverage of the opening ceremony of the tech hub...',
      image_url: 'https://picsum.photos/400/300?random=17',
      category: 'Business',
      published_at: '2024-05-25',
      created_at: '2024-05-25',
      views: 41,
      read_more_url: '#'
    },
    {
      id: 8,
      title_short: 'Historic Coffee House Renovated',
      desc_short: 'Beloved coffee house reopens its doors after extensive renovation.',
      title_long: 'Historic Coffee House Gets Renovated',
      desc_long: 'Insights into the renovation and history of the coffee house...',
      image_url: 'https://picsum.photos/400/300?random=18',
      category: 'Culture',
      published_at: '2024-05-27',
      created_at: '2024-05-27',
      views: 17,
      read_more_url: '#'
    },
    {
      id: 9,
      title_short: 'Rainy Week Ahead',
      desc_short: 'Meteorologists predict a wet week for Vienna residents.',
      title_long: 'Rainy Week Ahead, Says Forecast',
      desc_long: 'Full forecast details and tips for staying dry...',
      image_url: 'https://picsum.photos/400/300?random=19',
      category: 'Weather',
      published_at: '2024-05-30',
      created_at: '2024-05-30',
      views: 62,
      read_more_url: '#'
    }
  ];

  getViennaNews(): LocalNewsArticle[] {
    return this.viennaNews;
  }

  getViennaNewsById(id: number): LocalNewsArticle | undefined {
    return this.viennaNews.find(n => n.id === id);
  }

  incrementViews(id: number): void {
    const article = this.getViennaNewsById(id);
    if (article) {
      article.views += 1;
    }
  }
}

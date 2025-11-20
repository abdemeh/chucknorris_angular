import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';

export interface ChuckJoke {
  id: string;
  value: string;
  categories: string[];
  icon_url: string;
  url: string;
}

interface ChuckSearchResponse {
  total: number;
  result: ChuckJoke[];
}

@Injectable({
  providedIn: 'root'
})
export class JokesService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://api.chucknorris.io/jokes';

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/categories`);
  }

  getRandom(category?: string | null): Observable<ChuckJoke> {
    if (category && category !== 'all') {
      return this.http.get<ChuckJoke>(
        `${this.baseUrl}/random?category=${encodeURIComponent(category)}`
      );
    }
    return this.http.get<ChuckJoke>(`${this.baseUrl}/random`);
  }

  getManyRandom(count: number, category?: string | null): Observable<ChuckJoke[]> {
    const calls: Observable<ChuckJoke>[] = [];
    for (let i = 0; i < count; i++) {
      calls.push(this.getRandom(category ?? undefined));
    }
    return forkJoin(calls);
  }

  searchJokes(query: string): Observable<ChuckJoke[]> {
    return this.http
      .get<ChuckSearchResponse>(
        `${this.baseUrl}/search?query=${encodeURIComponent(query)}`
      )
      .pipe(map((res) => res.result));
  }
}

import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JokesService, ChuckJoke } from '../../core/services/jokes.service';

@Component({
  selector: 'app-jokes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.scss']
})
export class JokesComponent {
  // data
  readonly jokes = signal<ChuckJoke[]>([]);
  readonly categories = signal<string[]>([]);
  readonly activeCategory = signal<string>('all');

  // ui state
  readonly searchTerm = signal<string>('');
  readonly loading = signal<boolean>(true);
  readonly searching = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  readonly visibleJokes = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const list = this.jokes();
    if (!term) {
      return list;
    }
    return list.filter((j) => j.value.toLowerCase().includes(term));
  });

  constructor(private jokesService: JokesService) {
    this.init();
  }

  private init(): void {
    this.fetchCategories();
    this.loadJokes('all');
  }

  private fetchCategories(): void {
    this.jokesService.getCategories().subscribe({
      next: (cats) => this.categories.set(cats),
      error: () => {
        this.error.set('Could not load joke types, but Chuck still has jokes.');
      }
    });
  }

  loadJokes(category: string = this.activeCategory()): void {
    this.loading.set(true);
    this.searching.set(false);
    this.error.set(null);
    this.activeCategory.set(category);

    const cat = category === 'all' ? null : category;

    this.jokesService.getManyRandom(9, cat).subscribe({
      next: (items) => {
        this.jokes.set(items);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('The server got lassoed. Try again.');
        this.loading.set(false);
      }
    });
  }

  onReload(): void {
    this.searchTerm.set('');
    this.loadJokes(this.activeCategory());
  }

  onCategoryClick(cat: string | 'all'): void {
    if (this.activeCategory() === cat && !this.searchTerm().trim()) {
      this.loadJokes(cat);
      return;
    }
    this.searchTerm.set('');
    this.loadJokes(cat);
  }

  onSubmitSearch(event: Event): void {
    event.preventDefault();
    const term = this.searchTerm().trim();
    if (!term) {
      this.loadJokes('all');
      return;
    }

    this.loading.set(true);
    this.searching.set(true);
    this.error.set(null);
    this.activeCategory.set('all');

    this.jokesService.searchJokes(term).subscribe({
      next: (items) => {
        this.jokes.set(items.slice(0, 20));
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Search failed. Even cowboys miss their shots sometimes.');
        this.loading.set(false);
      }
    });
  }

  trackById(_i: number, joke: ChuckJoke): string {
    return joke.id;
  }
}

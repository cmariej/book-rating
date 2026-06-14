import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Criterion {
  name: string;
  value: number | null;
  description: string;
  expanded: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  genres = [
    'Romantasy',
    'Romance',
    'Fantasy',
    'Roman',
    'Romantic Suspense',
    'Thriller',
    'Ratgeber'
  ];

  selectedGenre = 'Romantasy';

  criteria: Criterion[] = [];

  ngOnInit(): void {
    this.loadCriteria();
  }

  loadCriteria(): void {

    const definitions: Record<string, string[]> = {

      'Fantasy': [
        'Schreibstil',
        'Worldbuilding',
        'Figuren',
        'Handlung',
        'Spannung',
        'Kreativität',
        'Emotionale Wirkung'
      ],

      'Romance': [
        'Schreibstil',
        'Figuren',
        'Chemie',
        'Romantische Entwicklung',
        'Handlung',
        'Emotionale Wirkung',
        'Lesefluss'
      ],

      'Romantasy': [
        'Schreibstil',
        'Worldbuilding',
        'Figuren',
        'Romantik & Chemie',
        'Handlung',
        'Spannung',
        'Kreativität',
        'Emotionale Wirkung'
      ],

      'Roman': [
        'Schreibstil',
        'Figuren',
        'Handlung',
        'Thematische Tiefe',
        'Emotionale Wirkung',
        'Lesefluss'
      ],

      'Romantic Suspense': [
        'Schreibstil',
        'Figuren',
        'Romantik',
        'Spannung',
        'Handlung',
        'Plot-Twists',
        'Lesefluss'
      ],

      'Thriller': [
        'Schreibstil',
        'Handlung',
        'Spannung',
        'Plot-Twists',
        'Figuren',
        'Lesefluss'
      ],

      'Ratgeber': [
        'Verständlichkeit',
        'Struktur',
        'Informationsgehalt',
        'Praxisnutzen',
        'Glaubwürdigkeit',
        'Lesefluss'
      ]
    };

    this.criteria = definitions[this.selectedGenre].map(name => ({
      name,
      value: null,
      expanded: false,
      description: this.getDescription(name)
    }));
  }

  getDescription(name: string): string {

    const descriptions: Record<string, string> = {

      'Schreibstil':
        'Bewerte Sprache, Lesbarkeit, Wortwahl, Atmosphäre und Dialoge.',

      'Worldbuilding':
        'Wie überzeugend und lebendig ist die erschaffene Welt?',

      'Figuren':
        'Wie glaubwürdig, interessant und entwickelt sind die Charaktere?',

      'Handlung':
        'Wie gut sind Aufbau, Logik und Struktur der Geschichte?',

      'Spannung':
        'Wie sehr motiviert das Buch zum Weiterlesen?',

      'Kreativität':
        'Wie originell sind Ideen, Magiesystem oder Konzepte?',

      'Emotionale Wirkung':
        'Wie stark hat dich das Buch emotional berührt?',

      'Chemie':
        'Wie glaubwürdig und mitreißend wirkt die Beziehung?',

      'Romantische Entwicklung':
        'Wie gut entwickelt sich die Liebesgeschichte?',

      'Romantik & Chemie':
        'Wie gut funktionieren Romantik und Chemie zusammen?',

      'Thematische Tiefe':
        'Regt das Buch zum Nachdenken an und behandelt interessante Themen?',

      'Romantik':
        'Wie überzeugend ist die romantische Komponente?',

      'Plot-Twists':
        'Wie überraschend und gelungen sind Wendungen?',

      'Verständlichkeit':
        'Wie klar und verständlich werden Inhalte erklärt?',

      'Struktur':
        'Ist das Buch logisch aufgebaut?',

      'Informationsgehalt':
        'Wie wertvoll und gehaltvoll sind die Inhalte?',

      'Praxisnutzen':
        'Kann das Gelernte im Alltag angewendet werden?',

      'Glaubwürdigkeit':
        'Wirken Inhalte, Quellen und Argumente vertrauenswürdig?',

      'Lesefluss':
        'Wie angenehm und flüssig liest sich das Buch?'
    };

    return descriptions[name] ?? '';
  }

  onGenreChange(): void {
    this.loadCriteria();
  }

  toggleInfo(selected: Criterion): void {

    this.criteria.forEach(c => {
      if (c !== selected) {
        c.expanded = false;
      }
    });

    selected.expanded = !selected.expanded;
  }

  get average(): number | null {

    if (!this.allRated) {
      return null;
    }

    const sum = this.criteria.reduce(
      (acc, criterion) => acc + (criterion.value ?? 0),
      0
    );

    return Number((sum / this.criteria.length).toFixed(1));
  }

  get rating(): string {

    const avg = this.average;

    if (avg === null) {
      return '';
    }

    if (avg >= 4.8) return '⭐⭐⭐⭐⭐';
    if (avg >= 4.3) return '⭐⭐⭐⭐💫';
    if (avg >= 3.8) return '⭐⭐⭐⭐';
    if (avg >= 3.3) return '⭐⭐⭐💫';
    if (avg >= 2.5) return '⭐⭐⭐';
    if (avg >= 1.5) return '⭐⭐';

    return '⭐';
  }

  get ratingText(): string {

    const avg = this.average;

    if (avg === null) {
      return '';
    }

    if (avg >= 4.8) return 'Außergewöhnlich';
    if (avg >= 4.3) return 'Hervorragend';
    if (avg >= 3.8) return 'Sehr gut';
    if (avg >= 3.3) return 'Gut';
    if (avg >= 2.5) return 'Okay';
    if (avg >= 1.5) return 'Enttäuschend';

    return 'Schlecht';
  }

  get allRated(): boolean {
    return this.criteria.every(c => c.value !== null);
  }
}
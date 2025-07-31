export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export interface Card {
  id: string;
  suit: Suit;
  rank: Rank;
  faceUp: boolean;
  color: 'red' | 'black';
}

export interface GameState {
  deck: Card[];
  waste: Card[];
  foundations: Card[][];
  tableau: Card[][];
  selectedCard: Card | null;
  selectedPile: { type: string; index?: number } | null;
  moves: number;
  score: number;
  time: number;
  isWon: boolean;
}

export type PileType = 'deck' | 'waste' | 'foundation' | 'tableau';
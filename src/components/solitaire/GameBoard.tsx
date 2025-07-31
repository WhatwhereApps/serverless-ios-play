import { Card } from './Card';
import { GameState } from '@/types/solitaire';
import { cn } from '@/lib/utils';

interface GameBoardProps {
  gameState: GameState;
  onCardClick: (card: any, pileType: string, pileIndex?: number, cardIndex?: number) => void;
  onEmptyPileClick: (pileType: string, pileIndex?: number) => void;
  onDeckClick: () => void;
}

export const GameBoard = ({ gameState, onCardClick, onEmptyPileClick, onDeckClick }: GameBoardProps) => {
  const { deck, waste, foundations, tableau, selectedCard } = gameState;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Top Row: Deck, Waste, and Foundations */}
      <div className="flex justify-between items-start">
        {/* Left side: Deck and Waste */}
        <div className="flex gap-4">
          {/* Deck */}
          <div
            className={cn(
              "w-16 h-24 rounded-lg border-2 border-dashed cursor-pointer transition-all duration-300",
              deck.length > 0 
                ? "border-transparent" 
                : "border-border bg-game-felt-light hover:bg-muted/50"
            )}
            onClick={onDeckClick}
          >
            {deck.length > 0 && (
              <Card
                card={deck[deck.length - 1]}
                onClick={onDeckClick}
                isSelectable={true}
              />
            )}
          </div>

          {/* Waste */}
          <div className="w-16 h-24 rounded-lg border-2 border-dashed border-border relative">
            {waste.length > 0 ? (
              <Card
                card={waste[waste.length - 1]}
                onClick={() => onCardClick(waste[waste.length - 1], 'waste')}
                isSelected={selectedCard?.id === waste[waste.length - 1]?.id}
                isSelectable={true}
              />
            ) : (
              <div className="w-full h-full bg-game-felt-light rounded-lg" />
            )}
          </div>
        </div>

        {/* Right side: Foundations */}
        <div className="flex gap-4">
          {foundations.map((foundation, index) => (
            <div
              key={index}
              className="w-16 h-24 rounded-lg border-2 border-dashed border-border cursor-pointer transition-all duration-300 relative hover:bg-muted/50"
              onClick={() => onEmptyPileClick('foundation', index)}
            >
              {foundation.length > 0 ? (
                <Card
                  card={foundation[foundation.length - 1]}
                  onClick={() => onCardClick(foundation[foundation.length - 1], 'foundation', index)}
                  isSelected={selectedCard?.id === foundation[foundation.length - 1]?.id}
                  isSelectable={true}
                />
              ) : (
                <div className="w-full h-full bg-game-felt-light rounded-lg flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">A</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row: Tableau */}
      <div className="flex gap-4 justify-center">
        {tableau.map((pile, pileIndex) => (
          <div key={pileIndex} className="flex flex-col relative min-h-32">
            {/* Empty pile placeholder */}
            {pile.length === 0 && (
              <div
                className="w-16 h-24 rounded-lg border-2 border-dashed border-border cursor-pointer transition-all duration-300 hover:bg-muted/50"
                onClick={() => onEmptyPileClick('tableau', pileIndex)}
              >
                <div className="w-full h-full bg-game-felt-light rounded-lg flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">K</span>
                  </div>
                </div>
              </div>
            )}

            {/* Cards in pile */}
            {pile.map((card, cardIndex) => {
              const isLastCard = cardIndex === pile.length - 1;
              const canSelect = card.faceUp && (
                isLastCard || 
                pile.slice(cardIndex).every(c => c.faceUp)
              );

              return (
                <Card
                  key={card.id}
                  card={card}
                  onClick={canSelect ? () => onCardClick(card, 'tableau', pileIndex, cardIndex) : undefined}
                  isSelected={selectedCard?.id === card.id}
                  isSelectable={canSelect}
                  style={{
                    marginTop: cardIndex > 0 ? '-60px' : '0',
                    zIndex: cardIndex,
                  }}
                  className={cn(
                    "relative transition-all duration-300",
                    canSelect && "hover:translate-y-[-4px]",
                    !isLastCard && card.faceUp && "hover:translate-y-[-8px]"
                  )}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
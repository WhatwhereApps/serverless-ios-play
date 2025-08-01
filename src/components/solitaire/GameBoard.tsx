import { Card } from './Card';
import { GameState } from '@/types/solitaire';
import { cn } from '@/lib/utils';

interface GameBoardProps {
  gameState: GameState;
  onCardClick: (card: any, pileType: string, pileIndex?: number, cardIndex?: number) => void;
  onEmptyPileClick: (pileType: string, pileIndex?: number) => void;
  onDeckClick: () => void;
  onCardDrop: (pileType: string, pileIndex?: number) => void;
  onDragStart: (card: any, pileType: string, pileIndex?: number, cardIndex?: number) => void;
  onDragEnd: () => void;
  dragState: {
    isDragging: boolean;
    dragCard: any;
    dragSource: { type: string; index?: number; cardIndex?: number } | null;
  };
}

export const GameBoard = ({ gameState, onCardClick, onEmptyPileClick, onDeckClick, onCardDrop, onDragStart, onDragEnd, dragState }: GameBoardProps) => {
  const { deck, waste, foundations, tableau, selectedCard } = gameState;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, pileType: string, pileIndex?: number) => {
    e.preventDefault();
    onCardDrop(pileType, pileIndex);
  };

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
          <div 
            className={cn(
              "w-16 h-24 rounded-lg border-2 border-dashed border-border relative transition-all duration-300",
              dragState.isDragging && "hover:border-card-highlight hover:bg-muted/20"
            )}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'waste')}
          >
            {waste.length > 0 ? (
              <Card
                card={waste[waste.length - 1]}
                onClick={() => onCardClick(waste[waste.length - 1], 'waste')}
                onDragStart={() => onDragStart(waste[waste.length - 1], 'waste')}
                onDragEnd={onDragEnd}
                isSelected={selectedCard?.id === waste[waste.length - 1]?.id}
                isSelectable={true}
                isDragging={dragState.isDragging && dragState.dragCard?.id === waste[waste.length - 1]?.id}
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
              className={cn(
                "w-16 h-24 rounded-lg border-2 border-dashed border-border cursor-pointer transition-all duration-300 relative hover:bg-muted/50",
                dragState.isDragging && "hover:border-card-highlight hover:bg-muted/20"
              )}
              onClick={() => onEmptyPileClick('foundation', index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'foundation', index)}
            >
              {foundation.length > 0 ? (
                <Card
                  card={foundation[foundation.length - 1]}
                  onClick={() => onCardClick(foundation[foundation.length - 1], 'foundation', index)}
                  onDragStart={() => onDragStart(foundation[foundation.length - 1], 'foundation', index)}
                  onDragEnd={onDragEnd}
                  isSelected={selectedCard?.id === foundation[foundation.length - 1]?.id}
                  isSelectable={true}
                  isDragging={dragState.isDragging && dragState.dragCard?.id === foundation[foundation.length - 1]?.id}
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
          <div 
            key={pileIndex} 
            className={cn(
              "flex flex-col relative min-h-32 transition-all duration-300",
              dragState.isDragging && "hover:bg-muted/10 rounded-lg"
            )}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'tableau', pileIndex)}
          >
            {/* Empty pile placeholder */}
            {pile.length === 0 && (
              <div
                className={cn(
                  "w-16 h-24 rounded-lg border-2 border-dashed border-border cursor-pointer transition-all duration-300 hover:bg-muted/50",
                  dragState.isDragging && "hover:border-card-highlight hover:bg-muted/20"
                )}
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
              const isDragging = dragState.isDragging && dragState.dragCard?.id === card.id;

              return (
                <Card
                  key={card.id}
                  card={card}
                  onClick={canSelect ? () => onCardClick(card, 'tableau', pileIndex, cardIndex) : undefined}
                  onDragStart={canSelect ? () => onDragStart(card, 'tableau', pileIndex, cardIndex) : undefined}
                  onDragEnd={onDragEnd}
                  isSelected={selectedCard?.id === card.id}
                  isSelectable={canSelect}
                  isDragging={isDragging}
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
import { useState } from 'react';
import { useSolitaire } from '@/hooks/useSolitaire';
import { GameHeader } from './GameHeader';
import { GameBoard } from './GameBoard';
import { Card as CardType } from '@/types/solitaire';

export const SolitaireGame = () => {
  const { 
    gameState, 
    dealCards, 
    drawFromDeck, 
    moveCard, 
    selectCard, 
    restartGame 
  } = useSolitaire();

  const [dragState, setDragState] = useState({
    isDragging: false,
    dragCard: null as CardType | null,
    dragSource: null as { type: string; index?: number; cardIndex?: number } | null,
  });

  const handleCardClick = (card: CardType, pileType: string, pileIndex?: number, cardIndex?: number) => {
    if (gameState.selectedCard) {
      // Try to move selected card to clicked location
      const { selectedPile } = gameState;
      if (selectedPile) {
        const fromIndex = selectedPile.index;
        const cardIdx = (gameState as any).cardIndex;
        
        // If clicking on the same card, deselect
        if (gameState.selectedCard.id === card.id) {
          selectCard(card, pileType, pileIndex, cardIndex);
          return;
        }

        // Try to move to this pile
        if (pileType === 'foundation' && pileIndex !== undefined) {
          moveCard(selectedPile.type, fromIndex, 'foundation', pileIndex, cardIdx);
        } else if (pileType === 'tableau' && pileIndex !== undefined) {
          moveCard(selectedPile.type, fromIndex, 'tableau', pileIndex, cardIdx);
        } else {
          // Select new card instead
          selectCard(card, pileType, pileIndex, cardIndex);
        }
      }
    } else {
      // Select card
      selectCard(card, pileType, pileIndex, cardIndex);
    }
  };

  const handleEmptyPileClick = (pileType: string, pileIndex?: number) => {
    if (gameState.selectedCard && gameState.selectedPile) {
      const { selectedPile } = gameState;
      const fromIndex = selectedPile.index;
      const cardIdx = (gameState as any).cardIndex;

      if (pileType === 'foundation' && pileIndex !== undefined) {
        moveCard(selectedPile.type, fromIndex, 'foundation', pileIndex, cardIdx);
      } else if (pileType === 'tableau' && pileIndex !== undefined) {
        moveCard(selectedPile.type, fromIndex, 'tableau', pileIndex, cardIdx);
      }
    }
  };

  const handleDragStart = (card: CardType, pileType: string, pileIndex?: number, cardIndex?: number) => {
    setDragState({
      isDragging: true,
      dragCard: card,
      dragSource: { type: pileType, index: pileIndex, cardIndex },
    });
  };

  const handleDragEnd = () => {
    setDragState({
      isDragging: false,
      dragCard: null,
      dragSource: null,
    });
  };

  const handleCardDrop = (pileType: string, pileIndex?: number) => {
    if (!dragState.dragSource || !dragState.dragCard) return;

    const { type: fromType, index: fromIndex, cardIndex } = dragState.dragSource;
    
    // Use the existing moveCard logic
    moveCard(fromType, fromIndex, pileType, pileIndex, cardIndex);
    
    // Reset drag state
    handleDragEnd();
  };

  return (
    <div className="min-h-screen bg-game-felt p-2 sm:p-4 space-y-3 sm:space-y-6">
      <GameHeader
        score={gameState.score}
        moves={gameState.moves}
        time={gameState.time}
        onNewGame={dealCards}
        onRestart={restartGame}
        isWon={gameState.isWon}
      />
      
      <GameBoard
        gameState={gameState}
        onCardClick={handleCardClick}
        onEmptyPileClick={handleEmptyPileClick}
        onDeckClick={drawFromDeck}
        onCardDrop={handleCardDrop}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        dragState={dragState}
      />

      {gameState.isWon && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center pointer-events-none z-50">
          <div className="text-center space-y-4 animate-victory-pulse">
            <div className="text-8xl font-bold text-victory-glow">
              🎉 VICTORY! 🎉
            </div>
            <div className="text-2xl text-foreground">
              Score: {gameState.score} | Moves: {gameState.moves}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
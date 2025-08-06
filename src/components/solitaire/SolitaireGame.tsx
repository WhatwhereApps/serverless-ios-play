import { useState } from 'react';
import { useSolitaire } from '@/hooks/useSolitaire';
import { GameHeader } from './GameHeader';
import { GameBoard } from './GameBoard';
import { LoadingScreen } from './LoadingScreen';
import { Card as CardType } from '@/types/solitaire';

export const SolitaireGame = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [lastClickedCard, setLastClickedCard] = useState<string | null>(null);
  
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

  // Haptic feedback function
  const triggerHaptic = (type: 'light' | 'medium' | 'heavy' = 'light') => {
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [50]
      };
      navigator.vibrate(patterns[type]);
    }
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleCardClick = (card: CardType, pileType: string, pileIndex?: number, cardIndex?: number) => {
    const currentTime = Date.now();
    const isDoubleClick = lastClickedCard === card.id && currentTime - lastClickTime < 300;
    
    setLastClickTime(currentTime);
    setLastClickedCard(card.id);

    // Haptic feedback for card selection
    triggerHaptic('light');

    if (gameState.selectedCard) {
      // If double-clicking the same selected card, deselect it
      if (isDoubleClick && gameState.selectedCard.id === card.id) {
        selectCard(card, pileType, pileIndex, cardIndex);
        triggerHaptic('medium');
        return;
      }

      // If clicking the same card (single click), deselect
      if (gameState.selectedCard.id === card.id) {
        selectCard(card, pileType, pileIndex, cardIndex);
        return;
      }

      // Try to move selected card to clicked location
      const { selectedPile } = gameState;
      if (selectedPile) {
        const fromIndex = selectedPile.index;
        const cardIdx = (gameState as any).cardIndex;
        
        const originalScore = gameState.score;
        
        // Try to move to this pile
        if (pileType === 'foundation' && pileIndex !== undefined) {
          moveCard(selectedPile.type, fromIndex, 'foundation', pileIndex, cardIdx);
        } else if (pileType === 'tableau' && pileIndex !== undefined) {
          moveCard(selectedPile.type, fromIndex, 'tableau', pileIndex, cardIdx);
        } else {
          // Select new card instead
          selectCard(card, pileType, pileIndex, cardIndex);
          return;
        }
        
        // Check if move was successful by comparing score change
        setTimeout(() => {
          if (gameState.score > originalScore) {
            triggerHaptic('heavy'); // Success haptic
          }
        }, 50);
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
      
      triggerHaptic('light');
      const originalScore = gameState.score;

      if (pileType === 'foundation' && pileIndex !== undefined) {
        moveCard(selectedPile.type, fromIndex, 'foundation', pileIndex, cardIdx);
      } else if (pileType === 'tableau' && pileIndex !== undefined) {
        moveCard(selectedPile.type, fromIndex, 'tableau', pileIndex, cardIdx);
      }
      
      // Success haptic feedback
      setTimeout(() => {
        if (gameState.score > originalScore) {
          triggerHaptic('heavy');
        }
      }, 50);
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

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-game-felt p-2 sm:p-4 pt-8 sm:pt-4 space-y-4 sm:space-y-6">
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
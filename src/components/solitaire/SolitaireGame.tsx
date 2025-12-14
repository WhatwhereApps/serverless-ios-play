import { useState, useCallback } from 'react';
import { useSolitaire } from '@/hooks/useSolitaire';
import { GameHeader } from './GameHeader';
import { GameBoard } from './GameBoard';
import { LoadingScreen } from './LoadingScreen';
import { HomeScreen } from './HomeScreen';
import { Card as CardType } from '@/types/solitaire';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

type Screen = 'home' | 'loading' | 'game';

export const SolitaireGame = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
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

  // Enhanced haptic feedback using Capacitor Haptics
  const triggerHaptic = useCallback(async (type: 'light' | 'medium' | 'heavy' | 'success' | 'error' = 'light') => {
    try {
      if (type === 'success') {
        await Haptics.notification({ type: NotificationType.Success });
      } else if (type === 'error') {
        await Haptics.notification({ type: NotificationType.Error });
      } else {
        const styles = {
          light: ImpactStyle.Light,
          medium: ImpactStyle.Medium,
          heavy: ImpactStyle.Heavy,
        };
        await Haptics.impact({ style: styles[type] });
      }
    } catch {
      // Fallback to navigator.vibrate for web
      if ('vibrate' in navigator) {
        const patterns = { light: [10], medium: [20], heavy: [50], success: [30, 50, 30], error: [100] };
        navigator.vibrate(patterns[type] || [10]);
      }
    }
  }, []);

  const handleLoadingComplete = () => {
    setCurrentScreen('game');
  };

  const handleNewGame = () => {
    dealCards();
    setCurrentScreen('loading');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
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
        
        // Success haptic for card move
        triggerHaptic('success');
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
      
      // Success haptic for pile move
      triggerHaptic('success');
    }
  };

  const handleDragStart = (card: CardType, pileType: string, pileIndex?: number, cardIndex?: number) => {
    triggerHaptic('medium');
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
    triggerHaptic('success');
    
    // Reset drag state
    handleDragEnd();
  };

  if (currentScreen === 'home') {
    return <HomeScreen onNewGame={handleNewGame} />;
  }

  if (currentScreen === 'loading') {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-game-felt p-3 sm:p-6 pt-12 sm:pt-8 space-y-6 sm:space-y-8">
      <GameHeader
        score={gameState.score}
        moves={gameState.moves}
        time={gameState.time}
        onNewGame={handleNewGame}
        onRestart={restartGame}
        onHome={handleBackToHome}
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
import { Card as CardType } from '@/types/solitaire';
import { cn } from '@/lib/utils';

interface CardProps {
  card: CardType;
  onClick?: () => void;
  onDragStart?: (e?: React.DragEvent | React.TouchEvent) => void;
  onDragEnd?: (e?: React.DragEvent | React.TouchEvent) => void;
  isSelected?: boolean;
  isSelectable?: boolean;
  isDragging?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const suitSymbols = {
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
  spades: '♠'
};

export const Card = ({ 
  card, 
  onClick, 
  onDragStart,
  onDragEnd,
  isSelected = false, 
  isSelectable = false,
  isDragging = false,
  style,
  className 
}: CardProps) => {
  const handleDragStart = (e: React.DragEvent) => {
    if (isSelectable && onDragStart) {
      onDragStart(e);
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (onDragEnd) {
      onDragEnd(e);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isSelectable && onDragStart) {
      e.preventDefault();
      onDragStart(e);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (onDragEnd) {
      onDragEnd(e);
    }
  };
  if (!card.faceUp) {
    return (
      <div
        className={cn(
          "w-12 h-18 sm:w-16 sm:h-22 md:w-18 md:h-26 lg:w-20 lg:h-32 rounded-lg border-2 border-border cursor-pointer transition-all duration-300",
          "bg-card-back shadow-card hover:shadow-card-hover",
          "flex items-center justify-center relative overflow-hidden",
          isSelectable && "hover:scale-105",
          isDragging && "opacity-50 scale-95",
          className
        )}
        onClick={onClick}
        draggable={isSelectable}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={style}
      >
        <div className="absolute inset-2 rounded border border-white/20 bg-gradient-to-br from-blue-900/50 to-blue-800/50" />
        <div className="text-white/60 text-xs font-bold">♠</div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-12 h-18 sm:w-16 sm:h-22 md:w-18 md:h-26 lg:w-20 lg:h-32 rounded-lg border-2 transition-all duration-300 cursor-pointer",
        "bg-card text-card-foreground shadow-card relative overflow-hidden",
        "flex flex-col justify-between p-0.5 sm:p-1",
        "transition-all duration-300 transform-gpu",
        isSelected && "border-card-highlight shadow-card-hover scale-105 ring-2 ring-card-highlight animate-pulse",
        !isSelected && "border-border hover:border-card-highlight",
        isSelectable && "hover:scale-105 hover:shadow-card-hover active:scale-95",
        isDragging && "opacity-50 scale-95 rotate-3",
        card.color === 'red' && "text-card-red",
        card.color === 'black' && "text-card-black",
        className
      )}
      onClick={onClick}
      draggable={isSelectable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={style}
    >
      {/* Top left corner */}
      <div className="absolute top-1 left-1 sm:top-1.5 sm:left-1.5 flex flex-col items-center leading-none">
        <span className="text-xs sm:text-sm font-bold">{card.rank}</span>
        <span className="text-sm sm:text-base">{suitSymbols[card.suit]}</span>
      </div>


      {/* Bottom right corner (rotated) */}
      <div className="absolute bottom-1 right-1 sm:bottom-1.5 sm:right-1.5 flex flex-col items-center leading-none rotate-180">
        <span className="text-xs sm:text-sm font-bold">{card.rank}</span>
        <span className="text-sm sm:text-base">{suitSymbols[card.suit]}</span>
      </div>
    </div>
  );
};
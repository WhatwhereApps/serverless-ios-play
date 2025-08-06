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
          "w-10 h-14 sm:w-12 sm:h-16 md:w-14 md:h-20 lg:w-16 lg:h-24 rounded-lg border-2 border-border cursor-pointer transition-all duration-300",
          "bg-card-back shadow-card hover:shadow-card-hover",
          "flex items-center justify-center relative overflow-hidden",
          isSelectable && "hover:scale-105",
          isDragging && "opacity-50 scale-95",
          className
        )}
        onClick={onClick}
        draggable={isSelectable}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
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
        "w-10 h-14 sm:w-12 sm:h-16 md:w-14 md:h-20 lg:w-16 lg:h-24 rounded-lg border-2 transition-all duration-300 cursor-pointer",
        "bg-card text-card-foreground shadow-card relative overflow-hidden",
        "flex flex-col justify-between p-0.5 sm:p-1",
        isSelected && "border-card-highlight shadow-card-hover scale-105 ring-2 ring-card-highlight",
        !isSelected && "border-border hover:border-card-highlight",
        isSelectable && "hover:scale-105 hover:shadow-card-hover",
        isDragging && "opacity-50 scale-95 rotate-3",
        card.color === 'red' && "text-card-red",
        card.color === 'black' && "text-card-black",
        className
      )}
      onClick={onClick}
      draggable={isSelectable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={style}
    >
      {/* Top left corner */}
      <div className="absolute top-0.5 left-0.5 sm:top-1 sm:left-1 flex flex-col items-center leading-none">
        <span className="text-[8px] sm:text-xs font-bold">{card.rank}</span>
        <span className="text-[10px] sm:text-sm">{suitSymbols[card.suit]}</span>
      </div>


      {/* Bottom right corner (rotated) */}
      <div className="absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 flex flex-col items-center leading-none rotate-180">
        <span className="text-[8px] sm:text-xs font-bold">{card.rank}</span>
        <span className="text-[10px] sm:text-sm">{suitSymbols[card.suit]}</span>
      </div>
    </div>
  );
};
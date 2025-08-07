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
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', card.id);
      onDragStart(e);
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (onDragEnd) {
      onDragEnd(e);
    }
  };
  if (!card.faceUp) {
    return (
      <div
        className={cn(
          "w-12 h-18 sm:w-16 sm:h-22 md:w-18 md:h-26 lg:w-20 lg:h-32 rounded-lg border-2 border-border cursor-pointer",
          "bg-card-back shadow-card transition-transform duration-200",
          "flex items-center justify-center relative overflow-hidden",
          isDragging && "opacity-50 scale-105",
          isSelectable && "hover:scale-105",
          className
        )}
        onClick={onClick}
        draggable={isSelectable}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
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
        "w-12 h-18 sm:w-16 sm:h-22 md:w-18 md:h-26 lg:w-20 lg:h-32 rounded-lg border-2 cursor-pointer",
        "bg-card text-card-foreground shadow-card relative overflow-hidden transition-transform duration-200",
        "flex flex-col justify-between p-0.5 sm:p-1",
        isSelected && "border-card-highlight shadow-card-hover ring-2 ring-card-highlight",
        !isSelected && "border-border",
        isDragging && "opacity-50 scale-105",
        isSelectable && "hover:scale-105",
        card.color === 'red' && "text-card-red",
        card.color === 'black' && "text-card-black",
        className
      )}
      onClick={onClick}
      draggable={isSelectable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
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
import { Card as CardType } from '@/types/solitaire';
import { cn } from '@/lib/utils';

interface CardProps {
  card: CardType;
  onClick?: () => void;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
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
  if (!card.faceUp) {
    return (
      <div
        className={cn(
          "w-16 h-24 rounded-lg border-2 border-border cursor-pointer transition-all duration-300",
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
        "w-16 h-24 rounded-lg border-2 transition-all duration-300 cursor-pointer",
        "bg-card text-card-foreground shadow-card relative overflow-hidden",
        "flex flex-col justify-between p-1",
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
      style={style}
    >
      {/* Top left corner */}
      <div className="flex flex-col items-center leading-none">
        <span className="text-xs font-bold">{card.rank}</span>
        <span className="text-sm">{suitSymbols[card.suit]}</span>
      </div>

      {/* Center symbol */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl opacity-20">{suitSymbols[card.suit]}</span>
      </div>

      {/* Bottom right corner (rotated) */}
      <div className="flex flex-col items-center leading-none self-end rotate-180">
        <span className="text-xs font-bold">{card.rank}</span>
        <span className="text-sm">{suitSymbols[card.suit]}</span>
      </div>
    </div>
  );
};
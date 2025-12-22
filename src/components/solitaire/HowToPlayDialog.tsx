import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Layers, Target, MousePointer, RotateCcw } from 'lucide-react';

interface HowToPlayDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const HowToPlayDialog = ({ open, onOpenChange }: HowToPlayDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-emerald-900 border-emerald-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">How to Play Solitaire</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Objective */}
            <section>
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-emerald-400" />
                <h3 className="font-semibold text-emerald-300">Objective</h3>
              </div>
              <p className="text-emerald-100 text-sm leading-relaxed">
                Move all cards to the four foundation piles, building each suit from Ace to King.
              </p>
            </section>

            {/* Card Movement */}
            <section>
              <div className="flex items-center gap-2 mb-2">
                <MousePointer className="h-5 w-5 text-emerald-400" />
                <h3 className="font-semibold text-emerald-300">Moving Cards</h3>
              </div>
              <ul className="text-emerald-100 text-sm space-y-2 leading-relaxed">
                <li>• <strong>Tap</strong> a card to select it, then tap a valid destination</li>
                <li>• <strong>Double-tap</strong> a card to auto-move it to a foundation if possible</li>
                <li>• Cards in tableau must alternate colors (red/black) and descend in rank</li>
                <li>• Only Kings can be placed on empty tableau columns</li>
              </ul>
            </section>

            {/* Stock Pile */}
            <section>
              <div className="flex items-center gap-2 mb-2">
                <Layers className="h-5 w-5 text-emerald-400" />
                <h3 className="font-semibold text-emerald-300">Stock & Waste</h3>
              </div>
              <ul className="text-emerald-100 text-sm space-y-2 leading-relaxed">
                <li>• Tap the stock pile (top-left) to draw cards</li>
                <li>• Drawn cards go to the waste pile</li>
                <li>• When the stock is empty, tap to recycle the waste pile</li>
              </ul>
            </section>

            {/* Foundation */}
            <section>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-5 w-5 flex items-center justify-center text-emerald-400">♠</div>
                <h3 className="font-semibold text-emerald-300">Foundations</h3>
              </div>
              <ul className="text-emerald-100 text-sm space-y-2 leading-relaxed">
                <li>• Build up by suit from Ace to King</li>
                <li>• Each foundation holds one suit (♠ ♥ ♦ ♣)</li>
                <li>• Start with Aces, end with Kings</li>
              </ul>
            </section>

            {/* Tips */}
            <section>
              <div className="flex items-center gap-2 mb-2">
                <RotateCcw className="h-5 w-5 text-emerald-400" />
                <h3 className="font-semibold text-emerald-300">Tips</h3>
              </div>
              <ul className="text-emerald-100 text-sm space-y-2 leading-relaxed">
                <li>• Use the undo button to reverse moves</li>
                <li>• Prioritize revealing face-down cards</li>
                <li>• Don't rush to move cards to foundations</li>
              </ul>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

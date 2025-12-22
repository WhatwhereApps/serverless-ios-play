import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Layers, Target, MousePointer, RotateCcw } from 'lucide-react';
import { useLanguage } from '@/i18n';

interface HowToPlayDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const HowToPlayDialog = ({ open, onOpenChange }: HowToPlayDialogProps) => {
  const { t } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-emerald-900 border-emerald-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">{t.howToPlay}</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Objective */}
            <section>
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-emerald-400" />
                <h3 className="font-semibold text-emerald-300">{t.objective}</h3>
              </div>
              <p className="text-emerald-100 text-sm leading-relaxed">
                {t.objectiveText}
              </p>
            </section>

            {/* Card Movement */}
            <section>
              <div className="flex items-center gap-2 mb-2">
                <MousePointer className="h-5 w-5 text-emerald-400" />
                <h3 className="font-semibold text-emerald-300">{t.movingCards}</h3>
              </div>
              <ul className="text-emerald-100 text-sm space-y-2 leading-relaxed">
                <li>• <strong>Tap</strong> {t.movingCardsTap}</li>
                <li>• <strong>Double-tap</strong> {t.movingCardsDoubleTap}</li>
                <li>• {t.movingCardsAlternate}</li>
                <li>• {t.movingCardsKings}</li>
              </ul>
            </section>

            {/* Stock Pile */}
            <section>
              <div className="flex items-center gap-2 mb-2">
                <Layers className="h-5 w-5 text-emerald-400" />
                <h3 className="font-semibold text-emerald-300">{t.stockWaste}</h3>
              </div>
              <ul className="text-emerald-100 text-sm space-y-2 leading-relaxed">
                <li>• {t.stockWasteTap}</li>
                <li>• {t.stockWasteDrawn}</li>
                <li>• {t.stockWasteRecycle}</li>
              </ul>
            </section>

            {/* Foundation */}
            <section>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-5 w-5 flex items-center justify-center text-emerald-400">♠</div>
                <h3 className="font-semibold text-emerald-300">{t.foundations}</h3>
              </div>
              <ul className="text-emerald-100 text-sm space-y-2 leading-relaxed">
                <li>• {t.foundationsBuild}</li>
                <li>• {t.foundationsEach}</li>
                <li>• {t.foundationsStart}</li>
              </ul>
            </section>

            {/* Tips */}
            <section>
              <div className="flex items-center gap-2 mb-2">
                <RotateCcw className="h-5 w-5 text-emerald-400" />
                <h3 className="font-semibold text-emerald-300">{t.tips}</h3>
              </div>
              <ul className="text-emerald-100 text-sm space-y-2 leading-relaxed">
                <li>• {t.tipsUndo}</li>
                <li>• {t.tipsReveal}</li>
                <li>• {t.tipsDontRush}</li>
              </ul>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

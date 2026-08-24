import React from 'react';
import { X } from './icons/index.tsx';

interface ShortcutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShortcutModal({ isOpen, onClose }: ShortcutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-surface border border-border rounded-lg shadow-card max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="font-mono text-xs text-muted uppercase tracking-widest">
            keyboard shortcuts
          </p>

          <button
            onClick={onClose}
            className="text-muted hover:text-tx transition-colors flex items-center"
          >
            <X size={14} />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between py-2 border-b border-border">
            <span className="text-sm text-tx">Select Response</span>
            <span className="font-mono text-xs text-accent">[1] [2] [3] [4]</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-border">
            <span className="text-sm text-tx">Rate: Guessing</span>
            <span className="font-mono text-xs text-muted">[G]</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-border">
            <span className="text-sm text-tx">Rate: Fairly Sure</span>
            <span className="font-mono text-xs text-accent">[S]</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-border">
            <span className="text-sm text-tx">Rate: Confident</span>
            <span className="font-mono text-xs text-accent">[C]</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-tx">Submit Diagnosis</span>
            <span className="font-mono text-xs text-success">[Enter]</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-5 py-2 px-4 rounded font-sans text-sm font-semibold bg-accent text-bg hover:bg-accent-dim transition-colors"
        >
          close
        </button>
      </div>
    </div>
  );
}

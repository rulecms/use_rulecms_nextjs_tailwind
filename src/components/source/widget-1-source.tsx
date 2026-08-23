/**
 * Host-side source for Widget 1. Matches the RuleCMS text widget: same
 * classes, same copy. Tutorial text lives on the info icon beside the pane title.
 */
export function Widget1Source() {
  return (
    <div className="rounded-xl bg-parity-accent-soft px-4 py-3 text-parity-ink shadow-sm ring-1 ring-parity-accent/30">
      This is a text block. Click to edit and add your own content.
    </div>
  );
}

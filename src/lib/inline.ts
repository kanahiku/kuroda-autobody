/**
 * Minimal inline formatting for copy strings: HTML-escapes the text, then turns
 * `**bold**` into <strong>. Use with `set:html` so content docs can keep their emphasis.
 */
export function renderInline(text: string): string {
  const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return escaped.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-heading-full">$1</strong>');
}

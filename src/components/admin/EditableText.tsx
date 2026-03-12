import { useState, useRef, useEffect } from 'react';
import { CreditCard as Edit3 } from 'lucide-react';

interface Props {
  value: string;
  onChange: (val: string) => void;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

export default function EditableText({ value, onChange, className = '', multiline = false, placeholder = 'Klikněte pro úpravu...', as: Tag = 'span' }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current instanceof HTMLTextAreaElement) {
        inputRef.current.selectionStart = inputRef.current.value.length;
      }
    }
  }, [editing]);

  const commit = () => {
    setEditing(false);
    onChange(draft);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { setDraft(value); setEditing(false); }
    if (e.key === 'Enter' && !multiline) commit();
  };

  if (editing) {
    const sharedClass = `bg-black/30 border border-amber-400 text-inherit font-inherit outline-none w-full resize-none leading-inherit ${className}`;
    return multiline ? (
      <textarea
        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={onKey}
        className={sharedClass}
        rows={Math.max(3, draft.split('\n').length)}
        placeholder={placeholder}
        style={{ fontSize: 'inherit', fontWeight: 'inherit', letterSpacing: 'inherit', lineHeight: 'inherit' }}
      />
    ) : (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={onKey}
        className={sharedClass}
        placeholder={placeholder}
        style={{ fontSize: 'inherit', fontWeight: 'inherit', letterSpacing: 'inherit', lineHeight: 'inherit' }}
      />
    );
  }

  return (
    <Tag
      className={`group/editable relative inline-block cursor-pointer rounded-sm hover:ring-2 hover:ring-amber-400/50 hover:bg-amber-400/5 transition-all px-0.5 ${className}`}
      onClick={() => setEditing(true)}
      title="Klikněte pro úpravu"
    >
      {value || <span className="opacity-30 italic">{placeholder}</span>}
      <Edit3 className="absolute -top-2.5 -right-2.5 h-3.5 w-3.5 text-amber-400 opacity-0 group-hover/editable:opacity-100 transition-opacity bg-gray-950 rounded-full p-0.5" />
    </Tag>
  );
}

"use client";
import { useTranslation } from "@/hooks/useTranslation";

type TranslatedTextProps = {
  text: string;
  sourceLang?: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

export default function TranslatedText({ 
  text, 
  sourceLang = "tr", 
  className = "",
  as: Component = "span"
}: TranslatedTextProps) {
  const { translatedText, isLoading } = useTranslation(text, sourceLang);

  return (
    <Component className={className}>
      {isLoading ? (
        <span className="opacity-50">{text}</span>
      ) : (
        translatedText
      )}
    </Component>
  );
}


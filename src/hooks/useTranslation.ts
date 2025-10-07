"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function useTranslation(text: string, sourceLang: string = "tr") {
  const pathname = usePathname();
  const currentLocale = pathname?.split("/")[1] || "de";
  
  const [translatedText, setTranslatedText] = useState(text);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If current locale is same as source, no translation needed
    if (currentLocale === sourceLang) {
      setTranslatedText(text);
      return;
    }

    // Don't translate if text is empty
    if (!text || text.trim() === "") {
      return;
    }

    // Auto-translate
    const translateText = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text,
            targetLang: currentLocale,
            sourceLang
          })
        });

        if (response.ok) {
          const data = await response.json();
          setTranslatedText(data.translatedText);
        } else {
          // Fallback to original text
          setTranslatedText(text);
        }
      } catch (error) {
        console.error("Translation failed:", error);
        setTranslatedText(text);
      } finally {
        setIsLoading(false);
      }
    };

    translateText();
  }, [text, currentLocale, sourceLang]);

  return { translatedText, isLoading };
}


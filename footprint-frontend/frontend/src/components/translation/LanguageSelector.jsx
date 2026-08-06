import { useState } from "react";

const languages = [
  { code: "en", name: "English" },
  { code: "ta", name: "Tamil" },
  { code: "hi", name: "Hindi" },
  { code: "te", name: "Telugu" },
  { code: "kn", name: "Kannada" },
  { code: "ml", name: "Malayalam" },
  { code: "bn", name: "Bengali" },
  { code: "mr", name: "Marathi" },
  { code: "gu", name: "Gujarati" },
  { code: "pa", name: "Punjabi" },
  { code: "ur", name: "Urdu" },
  { code: "or", name: "Odia" },
  { code: "as", name: "Assamese" },
  { code: "ne", name: "Nepali" },
  { code: "ks", name: "Kashmiri" },
  { code: "sd", name: "Sindhi" },
  { code: "sa", name: "Sanskrit" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "es", name: "Spanish" },
  { code: "pt", name: "Portuguese" },
  { code: "it", name: "Italian" },
  { code: "nl", name: "Dutch" },
  { code: "ru", name: "Russian" },
  { code: "ar", name: "Arabic" },
  { code: "zh-CN", name: "Chinese" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "tr", name: "Turkish" },
];

export default function LanguageSelector() {
  const [selected, setSelected] = useState("English");

  const changeLanguage = (lang) => {
    setSelected(lang.name);

    const tryChange = () => {
      const select = document.querySelector(".goog-te-combo");

      if (select) {
        select.value = lang.code;
        select.dispatchEvent(new Event("change"));
      } else {
        setTimeout(tryChange, 500);
      }
    };

    tryChange();
  };

  return (
    <select
      value={selected}
      onChange={(e) => {
        const lang = languages.find((l) => l.name === e.target.value);
        if (lang) changeLanguage(lang);
      }}
      style={{
        padding: "8px 12px",
        borderRadius: "8px",
        border: "1px solid #d1d5db",
        cursor: "pointer",
        fontSize: "14px",
      }}
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.name}>
          {lang.name}
        </option>
      ))}
    </select>
  );
}

import Select from "react-select";

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
  const options = languages.map((lang) => ({
    value: lang.code,
    label: lang.name,
  }));

  const changeLanguage = (selectedOption) => {
    if (!selectedOption) return;

    const tryChange = () => {
      const select = document.querySelector(".goog-te-combo");

      if (select) {
        select.value = selectedOption.value;

        select.dispatchEvent(new Event("change", { bubbles: true }));
      } else {
        setTimeout(tryChange, 500);
      }
    };

    tryChange();
  };

  return (
    <div className="notranslate">
      <Select
        options={options}
        onChange={changeLanguage}
        placeholder="Search language..."
        isSearchable
        styles={{
          container: (base) => ({
            ...base,
            width: "220px",
          }),
        }}
      />
    </div>
  );
}

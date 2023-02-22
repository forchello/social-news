import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from 'locale/en/en.json';
import uk from 'locale/uk/uk.json';

const resources = {
    en: {
        translation: en
    },
    uk: {
        translation: uk
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "uk",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
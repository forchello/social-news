import {FC, useCallback, useState} from "react";
import {MenuItem, Select, SelectChangeEvent, SxProps, Theme} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useTheme} from "@mui/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const languages = [
    { code: 'en', name: 'English' },
    { code: 'uk', name: 'Ukrainian' }
];

const SelectLanguage:FC<{sx?: SxProps, iconColor?: string}> = ({sx, iconColor = 'white'}) => {
    const { i18n } = useTranslation();

    const [selectedLanguage, setSelectedLanguage] = useState<string>(i18n.language);
    const theme: Theme = useTheme();

    const handleLanguageChange = useCallback(
        (event: SelectChangeEvent) => {
            const lang = event.target.value;

            i18n.changeLanguage(lang)
                .then(() => {
                    setSelectedLanguage(lang);
                })
        },
        [i18n]
    );

    return (
        <Select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            sx={{
                color: 'white',
                maxHeight: 38,
                m: 2,
                '.MuiOutlinedInput-notchedOutline': { border: 0 },
                ...sx
            }}
            IconComponent={(props) => (
                <ExpandMoreIcon
                    {...props}
                    style={{color: iconColor }}
                />
            )}
        >

            {languages.map(language => (
                <MenuItem
                    key={language.code}
                    value={language.code}
                    sx={{
                        m: 1,
                        background: language.code === selectedLanguage ? theme.palette.secondary.main : '',
                        borderRadius: 2,
                        '&:hover': {
                            background: theme.palette.secondary.main,
                            color: language.code === selectedLanguage ? 'black' : 'white'
                        },
                        border: 'none',
                        outline: 'none',
                        boxShadow: 'none',
                    }}
                >
                    {language.name}
                </MenuItem>
            ))}
        </Select>
    )
}

export default SelectLanguage;
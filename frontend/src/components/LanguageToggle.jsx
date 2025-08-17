import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, changeLanguage } = useLanguage();

  const toggleLanguage = () => {
    changeLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 h-8"
      title={language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
    >
      <Globe className="h-4 w-4" />
      <span className="text-xs font-medium">
        {language === 'en' ? 'अ' : 'EN'}
      </span>
    </Button>
  );
};

export default LanguageToggle;
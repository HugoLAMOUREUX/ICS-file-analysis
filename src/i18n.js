import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: true,
    fallbackLng: "fr",
    resources: {
      fr: {
        translation: {
          instructions:
            "Sélectionnez ce que vous souhaitez et uploadez votre fichier ICS",
          startDate: "Date de début",
          endDate: "Date de fin",
          minOccurence: "Occurence minimale",
          minDuration: "Durée minimale",
          classifySubEventsBy: "Classer les sous évènements par",
          duration: "Durée",
          occurence: "Occurence",
          firstTab: "Classement par nombre d'heures décroissantes",
          secondTab: "Classement par occurence décroissante",
          thirdTab: "Classification et analyse",
          fourthTab: "Evolution sur le temps",
          search: "Rechercher",
          selectAFile: "Merci de sélectionner votre fichier ICS",
          underDevelopment: "En cours de développement",
          activity: "Activité",
          nbHours: "Nombre d'heures",
          nbOccurrence: "Occurences",
          nbHoursPerOcc: "Nombre d'heures par occurence en moyenne",
          including: "Dont",
          tperso: "Travail personnel",
          sortie: "Sorties",
          culturel: "Activités culturelles",
          obligation: "Obligations",
          transport: "Transports",
          association: "Associations",
          unknown: "Inconnu",
          nbHoursPerCategory: "Nombre d'heures par catégorie",
          nbOccurrencePerCategory: "Nombre d'occurences par catégorie",
          details: "Détails",
        },
      },
      en: {
        translation: {
          instructions: "Select what you want and upload your file",
          startDate: "Start date",
          endDate: "End date",
          minOccurence: "Minimal occurrence",
          minDuration: "Minimal duration",
          classifySubEventsBy: "Classify subEvents by",
          duration: "Duration",
          occurence: "Occurrence",
          firstTab: "Ranking by decreasing hours",
          secondTab: "Ranking by decreasing occurrences",
          thirdTab: "Classification and analysis",
          fourthTab: "Evolution over time",
          search: "Search",
          selectAFile: "Please select your ICS file",
          underDevelopment: "Under development",
          activity: "Activity",
          nbHours: "Number of hours",
          nbOccurrence: "Occurrences",
          nbHoursPerOcc: "Average number of hours per occurrence",
          including: "Including",
          tperso: "Personnal work",
          sortie: "Hanging out with friends",
          culturel: "Cultural activities",
          obligation: "Obligations",
          transport: "Transports",
          association: "Associations",
          unknown: "Unknown",
          nbHoursPerCategory: "Number of hours per category",
          nbOccurrencePerCategory: "Number of occurrence per category",
          details: "Details",
        },
      },
    },
  });

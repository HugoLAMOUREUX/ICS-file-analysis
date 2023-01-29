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
          getBack: "Revenir à la page d'accueil",
          infoTitle: "Comment utiliser cette application ?",
          goal: "Le but de l'application est de pouvoir tirer des informations de vos fichiers calendriers.",
          format:
            "Afin d'utiliser l'application à son plein potentiel, il faut que votre calendrier soit formaté au mieux pour que l'application puisse regrouper au mieux vos évènements calendriers. En effet, si vous mettez des noms différents pour chaque activité qui est en realité la même alors le logiciel les comptera différement même si ce sont les mêmes activités. Par exemple : Machine à laver et Laverie seront comptés séparement même s'ils représentent la même activité. Il faut donc que vous utilisiez au maximum les mêmes noms afin de mieux comprendre vos données.",
          format2:
            "Vous pouvez également utiliser des catégories afin de regrouper plusieurs évènements sous un seul évènement et obtenir ainsi l'affichage suivant : ",
          format3:
            "De base seulement \"Resto\" est affiché mais la présence d'une flèche indique qu'il y a des sous évènements pour cet évènement. On peut ainsi voir les détails en cliquant sur la flèche. Cela permets de mieux regrouper vos évènements ensemble même s'ils ont des noms très différents.",
          format4:
            "Pour ce faire rien de plus simple : On va nommer nos évènements de la manière suivante : ",
          format5:
            '"Resto - Chinois à volonté" si on veut mettre un sous évènement à Resto ou bien simplement "Resto" si on n\'a rien à préciser. On utilisera donc le format "Évènement général - description". S\'il n\'y a pas besoin de précisions alors on peut omettre le tiret et dans ce cas la soit aucune flèche n\'apparaîtra soit une flèche apparaîtra si il y a d\'autres évènements avec le même nom qui comportent un tiret.',
          settings:
            "Une fois que votre calendrier est bien formaté, il suffit de sélectionner si vous le souhaitez des dates de début ou de fin de la période dont vous voulez les statistiques. Vous pouvez aussi indiquer à partir de combien d'heures ou d'occurences un évènement doit s'afficher. De plus, vous pouvez triez les sous-évènements (ceux imbriqués dans une catégorie) soit par durée soit par occurence. Il ne vous reste plus qu'à uploader votre fichier calendrier et voir les résultats. Le troisième onglet Classification et analyse vous permettra aussi de voir votre répartitions par type d'activité comme le montre l'image ci dessous :",
          classifyUnknown:
            "La mention unknown signifie que l'algorithme n'a pas su classifier votre évènement. Dans ce cas la vous pouvez indiquer à quelle catégorie doit appartenir l'example de manière a ce que l'application ne fasse plus l'erreur une prochaine fois (bientôt disponible)",
          image1: "formatExample.PNG",
          image2: "classifyExample.PNG",
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
          getBack: "Come back to the home page",
          infoTitle: "How to use this application ?",
          goal: "The application's goal is to extract information from your calendar files.",
          format:
            "In order to use the application to its full potential, your calendar needs to be formatted particularly to regroup better the events. Indeed, if you put different names for each activity that are actually the same then the application will count them differently even if they are the same activities. For example: Washing machine and Laundry will be counted separately even if they represent the same activity. So you have to use the same names as much as possible to regroup your data better.",
          format2:
            "You can also use categories to group multiple events under a single event and get the following display : ",
          format3:
            'At the beginning only  "Resto" is displayed but an arrow indicates that there are sub events for this event. You can see the details by clicking on the arrow. This allows you to better group your events together even if they have very different names.',
          format4:
            "In order to do it, we'll simply name our event as follows : ",
          format5:
            '"Resto - Chinois à volonté" if we want to put a sub event in Resto or simply "Resto" if we have nothing to specify. We will therefore use the format "General event - description". If there is no need for clarification then we can omit the hyphen and in this case either no arrow will appear or an arrow will appear if there are other events with the same name that have a hyphen.',
          settings:
            "Once your calendar is well formatted, just select if you want the start or end dates of the period of which you want the statistics. You can also indicate from how many hours or occurrences an event should be displayed. In addition, you can sort sub-events (those nested in a category) either by duration or by occurrence. Then, all you have to do is to upload your calendar file and see the results. The third Classification and Analysis tab will also allow you to see the distribution by type of activity as shown in the image below :",
          classifyUnknown:
            "The unknown mention means that the algorithm did not know how to classify your event. In this case you can specify which category the example should belong to so that the application does not make the error again next time (available soon)",
          image1: "formatExampleEnglish.PNG",
          image2: "classifyExampleEnglish.PNG",
        },
      },
    },
  });

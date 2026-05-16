const questions = [
  {
    id: 1,
    text: {
      en: "What does a triangular road sign with a red border and a black exclamation mark in the center signify?",
      rw: "Ikirango cyo mu muhanda gifite ishusho ya mpandeshatu, umupaka utukura n'akamenyetso k'indangururamajwi yirabura hagati, gisobanura iki?",
      fr: "Que signifie un panneau routier triangulaire avec une bordure rouge et un point d'exclamation noir au centre ?"
    },
    options: [
      { id: 1, text: { en: "Stop ahead", rw: "Hagarara imbere", fr: "Arrêt à venir" } },
      { id: 2, text: { en: "Yield", rw: "Tanga inzira", fr: "Cédez le passage" } },
      { id: 3, text: { en: "Danger ahead", rw: "Hari akaga imbere", fr: "Danger à venir" } },
      { id: 4, text: { en: "No entry", rw: "Kwinjira birabujijwe", fr: "Accès interdit" } }
    ],
    correctOptionId: 3
  },
  {
    id: 2,
    text: {
      en: "When approaching a roundabout, who has the right of way?",
      rw: "Ugeze ku muhanda uzenguruka (rond-point), ni nde ufite uburenganzira bwo kubanza kugenda?",
      fr: "À l'approche d'un rond-point, qui a la priorité ?"
    },
    options: [
      { id: 1, text: { en: "Vehicles entering the roundabout", rw: "Ibinyabiziga binjira mu rond-point", fr: "Les véhicules entrant dans le rond-point" } },
      { id: 2, text: { en: "Vehicles already in the roundabout", rw: "Ibinyabiziga bisanzwe biri mu rond-point", fr: "Les véhicules déjà dans le rond-point" } },
      { id: 3, text: { en: "Vehicles from the left", rw: "Ibinyabiziga biva ibumoso", fr: "Les véhicules venant de gauche" } },
      { id: 4, text: { en: "Vehicles from the right", rw: "Ibinyabiziga biva iburyo", fr: "Les véhicules venant de droite" } }
    ],
    correctOptionId: 2
  },
  {
    id: 3,
    text: {
      en: "What is the maximum speed limit in a residential area in Rwanda, unless otherwise indicated?",
      rw: "Ni ubuhe umuvuduko ntarengwa wemewe mu gace katuwe mu Rwanda, keretse habaye ikindi kimenyetso?",
      fr: "Quelle est la limite de vitesse maximale dans une zone résidentielle au Rwanda, sauf indication contraire ?"
    },
    options: [
      { id: 1, text: { en: "40 km/h", rw: "40 km/h", fr: "40 km/h" } },
      { id: 2, text: { en: "50 km/h", rw: "50 km/h", fr: "50 km/h" } },
      { id: 3, text: { en: "60 km/h", rw: "60 km/h", fr: "60 km/h" } },
      { id: 4, text: { en: "80 km/h", rw: "80 km/h", fr: "80 km/h" } }
    ],
    correctOptionId: 1 // Residential areas are typically 40-50 km/h.
  },
  {
    id: 4,
    text: {
      en: "What does a solid white line on the road indicate?",
      rw: "Umuhanda ufite umurongo wera udacagaguye usobanura iki?",
      fr: "Que signifie une ligne blanche continue sur la route ?"
    },
    options: [
      { id: 1, text: { en: "Lane change permitted", rw: "Kwimura umuhanda byemewe", fr: "Changement de voie autorisé" } },
      { id: 2, text: { en: "No passing or lane changes", rw: "Kutarenza cyangwa guhindura umuhanda", fr: "Interdiction de dépasser ou de changer de voie" } },
      { id: 3, text: { en: "Parking area", rw: "Aho guparika", fr: "Zone de stationnement" } },
      { id: 4, text: { en: "Pedestrian crossing", rw: "Aho abanyamaguru bambukira", fr: "Passage piéton" } }
    ],
    correctOptionId: 2
  }
];

module.exports = { questions };
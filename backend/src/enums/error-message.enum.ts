export enum serverErrorMessage {
  INTERNAL_SERVER_ERROR = "Erreur interne du serveur.",
  BAD_REQUEST = "Requête invalide.",
}

export enum userErrorMessage {
  UNREGISTERED_USER = "Utilisateur non enregistré.",
  WRONG_PASSWORD = "Mot de passe non valide.",
  ALREADY_REGISTERED_EMAIL = "Adresse email déja utilisé.",
  BAD_EMAIL = "L'adresse email n'est pas valide. Ex : email@domain.com",
  EMPTY_EMAIL = "L'adresse email est obligatoire.",
  INVALID_TYPE_EMAIL = "Le type de l'email doit être de type string.",
  EMPTY_PASSWORD = "Le mot de passe est obligatoire.",
  INVALID_TYPE_PASSWORD = "Le type du mot de passe doit être de type string.",
  UNSECURED_PASSWORD = "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.",
  EMPTY_FIRSTNAME = "Le prénom est obligatoire.",
  INVALID_TYPE_FIRSTNAME = "Le type du prénom doit être de type string.",
  EMPTY_LASTNAME = "Le nom est obligatoire.",
  INVALID_TYPE_LASTNAME = "Le type du nom doit être de type string.",
}

export enum scooterErrorMessage {
  SCOOTER_NOT_FOUND = "Le scooter n'existe pas.",
  MODEL_UNIQUE = "Le modèle du scooter doit être unique.",
  EMPTY_IS_AVAILABLE = "La disponibilité est obligatoire.",
  EMPTY_MODEL = "Le modèle est obligatoire.",
  EMPTY_SCOOTER_MODEL = "Le modèle de scooter est obligatoire.",
  EMPTY_MAINTENANCE_GAP_MONTH = "Le mois de l'intervalle de maintenance est obligatoire.",
  EMPTY_MAINTENANCE_USAGE_DAY = "Le jour de l'utilisation de la maintenance est obligatoire.",
  NEGATIVE_MAINTENANCE_GAP_MONTH = "Le mois de l'intervalle de maintenance doit être un nombre positif.",
  NEGATIVE_MAINTENANCE_USAGE_DAY = "Le jour de l'utilisation de la maintenance doit être un nombre positif.",
  INVALID_TYPE_MAINTENANCE_GAP_MONTH = "Le type du mois de l'intervalle de maintenance doit être de type number.",
  INVALID_TYPE_MODEL = "Le type du modèle doit être de type string.",
  INVALID_TYPE_MAINTENANCE_USAGE_DAY = "Le type du jour de l'utilisation de la maintenance doit être de type number.",
  INVALID_TYPE_SCOOTER_MODEL = "Le type du modèle de scooter doit être de type string.",
  INVALID_TYPE_IS_AVAILABLE = "Le type de la disponibilité doit être de type boolean.",
}

export enum partErrorMessage {
  PART_NOT_FOUND = "La pièce n'existe pas.",
  PART_ALREADY_EXISTS = "Le nom de la pièce existe déjà pour ce modèle de scooter.",
  EMPTY_PART_NAME = "Le nom de la pièce est obligatoire.",
  EMPTY_QUANTITY = "La quantité est obligatoire.",
  EMPTY_THRESHOLD = "Le seuil est obligatoire.",
  NEGATIVE_QUANTITY = "La quantité doit être un nombre positif.",
  NEGATIVE_THRESHOLD = "Le seuil doit être un nombre positif.",
  INVALID_TYPE_QUANTITY = "Le type de la quantité doit être de type number.",
  INVALID_TYPE_THRESHOLD = "Le type du seuil doit être de type number.",
  INVALID_TYPE_PART_NAME = "Le type du nom de la pièce doit être de type string.",
}

export enum tokenErrorMessage {
  INVALID_SESSION_TOKEN = "Token invalide.",
}

export enum sequelizeErrorMessage {
  INVALID_UUID = "L'id n'est pas valide.",
  UNIQUE_CONSTRAINT_ERROR = "La contrainte d'unicité n'est pas respectée.",
}

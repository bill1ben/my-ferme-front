import { URL } from '../config.js';

export const MediaService = {
  async fetchMedia(medias) {
    try {
      const mediaRequests = medias.map(mediaUrl => fetch(`${URL}${mediaUrl}`))
      const responses = await Promise.all(mediaRequests)

      // Vérifier que chaque réponse est bien du JSON
      const mediaData = await Promise.all(
        responses.map(async response => {
          if (!response.ok)
            throw new Error(
              `Erreur lors de la récupération du média: ${response.status}`,
            )

          return await response.json()
        }),
      )

      return mediaData.sort((a, b) => a.position - b.position)
    } catch (error) {
      console.error('Erreur lors de la récupération des médias:', error)
      return []
    }
  }
};

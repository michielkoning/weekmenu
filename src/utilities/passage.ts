// import Passage from '@passageidentity/passage-node'

// const passage = new Passage({
//   appID: import.meta.env.VITE_PASSAGE_APP_ID,
//   apiKey: import.meta.env.VITE_PASSAGE_API_KEY
// })

// export const getAuthenticatedUserFromSession = async (req, res) => {
//   try {
//     const userID = await passage.authenticateRequest(req)
//     if (userID) {
//       return { isAuthorized: true, userID: userID }
//     }
//   } catch (error) {
//     // authentication failed
//     return { isAuthorized: false, userID: '' }
//   }
// }

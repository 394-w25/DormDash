export const getRequests = (
  data,
  { userFilter = (user) => true, requestFilter = (request) => true },
) =>
  Object.entries(data.users)
    .filter(([userID]) => userFilter(userID))
    .flatMap(([userId, userData]) =>
      Object.entries(userData.requests || {})
        .filter(([, requestData]) => requestFilter(requestData))
        .map(([requestId, request]) => ({
          ...request,
          photoURL: userData.photoURL,
          displayName: userData.displayName,
          email: userData.email,
          userId,
          requestId,
          tags: ((request.tags || "") + "").split(",").map((tag) => tag.trim()),
        })),
    );

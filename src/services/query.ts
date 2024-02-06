// abortcontroller would be nice to have, but maybe later:tm:
export const remoteQuery = <T>(
  url: string
): Promise<T> => 
  fetch(url).then((response) =>
      response.json()
    )

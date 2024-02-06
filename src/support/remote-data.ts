/**
 * RemoteData is helper that basically is somewhat like the upcoming <suspense> but in a functional way.
 * 
 * it is a helper type that represents the different states a remote request can be in.
 * NOT ASKED: the promise has not been called yet
 * ERROR: the promise has been called and rejected
 * LOADING: the promise has been called and is pending
 * SUCCESS: the promise has been called and resolved with a value
 * 
 * so data only exists when the status is SUCCESS, and it is not possible to access it otherwise.
 * altough this adds some complexity of things, but it's a tradeoff for better guarantees in the UI layer. 
 * 
 * ...and in this case might be acceptable as its "fun" :D
 */

import { useEffect, useState } from 'react'

type Success<T> = { status: 'SUCCESS'; data: T };
type NotAsked = { status: 'NOT_ASKED' };
// this is a simplified version of the RemoteData type without explicit error typing for now...
type Error = { status: 'ERROR' };
type Loading = { status: 'LOADING' };

export type RemoteData<T> = Success<T> | Error | Loading | NotAsked;

// helper function to fold over a RemoteData to handle the different states without needing to do a switch statement
export const fold =
  <A, T>(
    notAsked: () => A,
    onError: () => A,
    onLoading: () => A,
    onSuccess: (x: T) => A
  ) =>
  (x: RemoteData<T>) => {
    switch (x.status) {
      case 'NOT_ASKED':
        return notAsked()
      case 'ERROR':
        return onError()
      case 'LOADING':
        return onLoading()
      case 'SUCCESS':
        return onSuccess(x.data)
    }
  }

export const usePromise = <T>(x: () =>  Promise<T>): RemoteData<T> => {
  const [state, setState] = useState<RemoteData<T>>({ status: 'NOT_ASKED' })
  
  useEffect(() => {
    setState({ status: 'LOADING' })
    x()
      .then((data) => setState({ status: 'SUCCESS', data }))
      .catch(() => setState({ status: 'ERROR' }))
  }, [x])

  return state
}
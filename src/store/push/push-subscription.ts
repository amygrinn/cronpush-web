class UnsupportedError extends Error {
  constructor() {
    super('Push notifications are not supported')
  }
}

class NotRegisteredError extends Error {
  constructor() {
    super('Service worker is not registered')
  }
}

class NotPermittedError extends Error {
  constructor() {
    super('Push notifications not allowed by user')
  }
}

class CreationError extends Error {
  constructor() {
    super('Failed to create push subscription')
  }
}

class UnsubscriptionError extends Error {
  constructor() {
    super('Unsubscription failed')
  }
}

/**
 *
 * Gets an existing push subscription or creates a new one
 *
 * @param createIfNotExists If true, ask for permission for push notifications if it does not exist and create a subscription if it does not exist
 * @returns {Promise<PushSubscription | null>}
 * @throws {UnsupportedError}
 * @throws {NotRegisteredError}
 * @throws {NotPermittedError}
 * @throws {CreationError}
 */
export const getPushSubscription = async (
  vapidPublicKey: string,
  createIfNotExists: boolean
) => {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    throw new UnsupportedError()
  }

  const registration = await navigator.serviceWorker.getRegistration()

  if (!registration) {
    throw new NotRegisteredError()
  }

  let permitted = Notification.permission === 'granted'
  if (createIfNotExists && !permitted) {
    permitted = (await Notification.requestPermission()) === 'granted'
  }

  if (!permitted) {
    throw new NotPermittedError()
  }

  let subscription = await registration.pushManager.getSubscription()
  if (createIfNotExists && !subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: vapidPublicKey,
    })

    if (!subscription) {
      throw new CreationError()
    }
  }

  return subscription
}

export const removePushSubscription = async () => {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    throw new UnsupportedError()
  }

  const registration = await navigator.serviceWorker.getRegistration()

  if (!registration) {
    throw new NotRegisteredError()
  }

  if (Notification.permission !== 'granted') {
    throw new NotPermittedError()
  }

  let subscription = await registration.pushManager.getSubscription()

  if (subscription) {
    try {
      await subscription.unsubscribe()
    } catch (err) {
      throw new UnsubscriptionError()
    }
  }
}

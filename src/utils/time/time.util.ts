import moment from 'moment'

export const getUTCTime = (): Date => {
   return moment.utc().toDate()
}

export const getUTCExpiryTime = (): Date => {
   return moment.utc().add(1, 'minutes').toDate()
}

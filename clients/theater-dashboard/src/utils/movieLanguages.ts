import Iso6391 from 'iso-639-1'

export const movieLanguages = Iso6391.getAllCodes().map(code => Iso6391.getName(code))
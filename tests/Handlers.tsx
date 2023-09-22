import { setupServer } from 'msw/node'
import { rest } from 'msw'
import mockedData from './mock_data.json'

export const server = setupServer(
  // Describe the requests to mock.
  rest.get(
    'https://restcountries.com/v3.1/all?fields=name,flags,cca3,independent,population,area,capital,currency,language,region.json',
    (req, res, ctx) => {
      return res(ctx.json(mockedData))
    }
  ),
  rest.get(
    'https://restcountries.com/v3.1/all?fields=name,flags,:cca3,independent,population,area,capital,currency,language,region.json',
    (req, res, ctx) => {
      return res(ctx.json(req.params.cca3 == 'CAN'))
    }
  )
)

import React from 'react'
import PriceCard from './PriceCard'

describe('<PriceCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<PriceCard />)
  })
})
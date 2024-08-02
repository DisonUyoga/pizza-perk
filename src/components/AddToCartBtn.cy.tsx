import React from 'react'
import AddToCartBtn from './AddToCartBtn'

describe('<AddToCartBtn />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AddToCartBtn />)
  })
})
describe('Info Page', () => {
  it('loads info overview', () => {
    cy.visit('/info')
    cy.get('#info-overview-title').should('be.visible')
  })

  it('loads info pools page', () => {
    cy.visit('/info/pools')
    cy.get('#info-pools-title').should('be.visible')
  })

  // skip this test because it's not stable
  it.skip('loads single pool page', () => {
    cy.visit('/info/pool/0x58f876857a02d6762e0101bb5c46a8c1ed44dc16')
    cy.get('#info-pool-pair-title').should('be.visible')
  })

  it('loads info tokens page', () => {
    cy.visit('/info/tokens')
    cy.get('#info-tokens-title').should('be.visible')
  })

  // skip this test because it's not stable
  it.skip('loads single token page', () => {
    cy.visit('/info/token/0x40375C92d9FAf44d2f9db9Bd9ba41a3317a2404f')
    cy.get('#info-token-name-title', { timeout: 15000 }).should('be.visible')
  })
})

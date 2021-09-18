describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'akash',
      username: 'akash',
      password: 'asd'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    it('user can login', function () {
      cy.get('#username').type('akash')
      cy.get('#password').type('asd')
      cy.contains('login').click()
      cy.contains('akash logged in')
    })

    it('user fails to login', function () {
      cy.get('#username').type('akash123')
      cy.get('#password').type('asd12312')
      cy.contains('login').click()
      cy.contains('login failed')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('akash')
      cy.get('#password').type('asd')
      cy.contains('login').click()
    })

    it('A blog can be created', function() {
      cy.contains('Create').click()
      cy.get('#title').type('harry potter and the prisoner of azkaban')
      cy.get('#author').type('jk rowling')
      cy.get('#url').type('-')
      cy.contains('create').click()
      cy.contains('harry potter and the prisoner of azkaban')
    })

    it('Like', function() {
      cy.contains('Create').click()
      cy.get('#title').type('harry potter and the prisoner of azkaban')
      cy.get('#author').type('jk rowling')
      cy.get('#url').type('-')
      cy.contains('create').click()

      cy.get('.blogsContainer').contains('harry potter and the prisoner of azkaban')
        .parent()
        .contains('show/hide')
        .click()


      cy.get('.blogsContainer').contains('harry potter and the prisoner of azkaban')
        .parent()
        .parent()
        .contains('like')
        .click()

      cy.get('.blogsContainer').contains('harry potter and the prisoner of azkaban')
        .parent()
        .parent()
        .contains('1')
    })


    it('Delete', function() {
      cy.contains('Create').click()
      cy.get('#title').type('harry potter and the prisoner of azkaban')
      cy.get('#author').type('jk rowling')
      cy.get('#url').type('-')
      cy.contains('create').click()

      cy.get('.blogsContainer').contains('harry potter and the prisoner of azkaban')
        .parent()
        .contains('show/hide')
        .click()

      cy.get('.blogsContainer').contains('harry potter and the prisoner of azkaban')
        .parent()
        .parent()
        .contains('Delete')
        .click()

      cy.on('window:confirm', () => true)

      cy.get('.blogsContainer').should('not.contain', 'harry potter and the prisoner of azkaban')
    })



    it.only('sorted', function() {
      cy.contains('Create').click()
      cy.get('#title').type('harry potter and the prisoner of azkaban')
      cy.get('#author').type('jk rowling')
      cy.get('#url').type('-')
      cy.contains('create').click()

      cy.contains('Create').click()
      cy.get('#title').type('harry potter 4')
      cy.get('#author').type('jk rowling')
      cy.get('#url').type('-')
      cy.contains('create').click()

      cy.contains('Create').click()
      cy.get('#title').type('harry potter 5')
      cy.get('#author').type('jk rowling')
      cy.get('#url').type('-')
      cy.contains('create').click()

      const like = (str, n) => {
        for(let i = 0; i < n; i++){
          cy.get('.blogsContainer').contains(str)
            .parent()
            .parent()
            .contains('like')
            .click()

          cy.wait(500)
        }
      }

      cy.get('.blogsContainer').contains('harry potter and the prisoner of azkaban')
        .parent()
        .contains('show/hide')
        .click()

      cy.get('.blogsContainer').contains('harry potter 4')
        .parent()
        .contains('show/hide')
        .click()

      cy.get('.blogsContainer').contains('harry potter 5')
        .parent()
        .contains('show/hide')
        .click()

      like('harry potter and the prisoner of azkaban', 1)
      like('harry potter 4', 2)
      like('harry potter 5', 3)

      cy.get('.visible').then(blogs => {
        cy.wrap(blogs[0]).contains('1')
        cy.wrap(blogs[1]).contains('2')
        cy.wrap(blogs[2]).contains('3')
      })

    })


  })
})
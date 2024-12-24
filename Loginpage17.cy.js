/// <reference types="cypress"/>
 
describe('Login Feature',() => {
    it('Pengguna dapat login menggunakan data Valid',() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text','Login');
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin123');
        cy.intercept("GET","**/employees/action-summary").as("actionsummary");
        cy.intercept("GET","**/subunit").as("subunit");
        cy.intercept("GET","**/shortcuts").as("shortcuts");
        cy.intercept("GET","**/locations").as("locations");
        cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
        cy.wait("@actionsummary",{ timeout: 15000 }).then((intercept) => {
            var responseBody = intercept.response.body;
            expect(responseBody).to.have.property('data').that.is.an('array');
            expect(responseBody).to.have.property('meta');
            expect(intercept.response.statusCode).to.equal(200);

        cy.wait("@subunit").then((intercept) => {
            var responseBody = intercept.response.body;           
                expect(responseBody).to.have.property('data').that.is.an('array');          
                responseBody.data.forEach((response) => {
                  // Memastikan bahwa setiap item dalam array 'data' memiliki properti 'subunit'
                  expect(response).to.have.property('subunit');
                  expect(response.subunit).to.have.property('id');
                  expect(response.subunit).to.have.property('name');
                  
                  expect(response).to.have.property('count').that.is.a('number');
              
                // Memastikan bahwa meta berisi informasi yang valid
                expect(responseBody.meta).to.have.property('otherEmployeeCount');
                expect(responseBody.meta).to.have.property('unassignedEmployeeCount');
                expect(responseBody.meta).to.have.property('totalSubunitCount');
            
                  expect(intercept.response.statusCode).to.equal(200); 
                }); 

        cy.wait("@shortcuts").then((intercept) => {
            var responseBody = intercept.response.body;                
            expect(responseBody).to.have.property('data');              
            expect(responseBody.data).to.have.property('leave.assign_leave');
            expect(responseBody.data).to.have.property('leave.leave_list');
            expect(responseBody.data).to.have.property('leave.apply_leave');
            expect(responseBody.data).to.have.property('leave.my_leave');
            expect(responseBody.data).to.have.property('time.employee_timesheet');
            expect(responseBody.data).to.have.property('time.my_timesheet');                 
            expect(intercept.response.statusCode).to.equal(200);
             }); 
        
        cy.wait("@locations").then((intercept) => {
            var responseBody = intercept.response.body;           
            expect(responseBody).to.have.property('data').that.is.an('array');          
            responseBody.data.forEach((response) => {
                      // Memastikan bahwa setiap item dalam array 'data' memiliki properti 'subunit'
                      expect(response).to.have.property('location');
                      expect(response.location).to.have.property('id');
                      expect(response.location).to.have.property('name');
                      
                      expect(response).to.have.property('count').that.is.a('number');
                  
                    // Memastikan bahwa meta berisi informasi yang valid
                    expect(responseBody.meta).to.have.property('otherEmployeeCount');
                    expect(responseBody.meta).to.have.property('unassignedEmployeeCount');
                    expect(responseBody.meta).to.have.property('totalLocationCount');
                
                      expect(intercept.response.statusCode).to.equal(200); 
                    }); 
                })
        
            
        cy.get('[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]').should('have.text','Dashboard')
    })
  })
})

})

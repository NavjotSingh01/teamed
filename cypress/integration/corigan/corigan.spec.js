const faker = require("faker");

let primaryUserData = {
  first: faker.name.firstName(),
  last: faker.name.lastName(),
  phone: faker.phone.phoneNumber("##########"),
  email: faker.internet.email(),
  password: faker.internet.password(),
  ohip_num: faker.random.number(11111111111, 99999999999),
  ohip_vc: faker.random.word(2),
  doctor: faker.name.findName(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  postal_code: faker.address.zipCode("######"),
};

let secondUserData = {
  first: faker.name.firstName(),
  last: faker.name.lastName(),
  phone: faker.phone.phoneNumber("##########"),
  email: faker.internet.email(),
  password: faker.internet.password(),
  ohip_num: faker.random.number(11111111111, 99999999999),
  ohip_vc: faker.random.word(2),
  doctor: faker.name.findName(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  postal_code: faker.address.zipCode("######"),
};

let thirdUserData = {
  first: faker.name.firstName(),
  last: faker.name.lastName(),
  phone: faker.phone.phoneNumber("##########"),
  email: faker.internet.email(),
  password: faker.internet.password(),
  ohip_num: faker.random.number(11111111111, 99999999999),
  ohip_vc: faker.random.word(2),
  doctor: faker.name.findName(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  postal_code: faker.address.zipCode("######"),
};

describe("The Homepage", () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });
  it("Successfully loads", () => {
    cy.visit("http://localhost:3000");

    cy.get(".text-center").should("be.visible");
  });
  it("Can click on Register", () => {
    cy.get(".primary-btn").click();
    cy.get(".registration-page").should("be.visible");
  });
  it("Can register on site", () => {
    cy.get('input[name="first_name"]')
      .scrollIntoView()
      .type(primaryUserData.first);
    cy.get('input[name="last_name"]')
      .scrollIntoView()
      .type(primaryUserData.last);
    cy.get('input[name="phone"]').scrollIntoView().type(primaryUserData.phone);
    cy.get('input[name="email"]').scrollIntoView().type(primaryUserData.email);
    cy.get('input[name="password"]')
      .scrollIntoView()
      .type(primaryUserData.password);
    cy.get('input[name="repeatPassword"]')
      .scrollIntoView()
      .type(primaryUserData.password);
    cy.get('input[name="ohip_num"]')
      .scrollIntoView()
      .type(primaryUserData.ohip_num);
    cy.get('input[name="ohip_vc"]')
      .scrollIntoView()
      .type(primaryUserData.ohip_vc);
    cy.get('input[name="doctor"]')
      .scrollIntoView()
      .type(primaryUserData.doctor);
    cy.get('input[name="date_of_birth"]').scrollIntoView().type("19941126");
    cy.get('input[name="address"]')
      .scrollIntoView()
      .type(primaryUserData.address);
    cy.get('input[name="city"]').scrollIntoView().type(primaryUserData.city);
    cy.get('input[name="postal_code"]')
      .scrollIntoView()
      .type(primaryUserData.postal_code);
    cy.get("#gender-input").type("male{enter}{enter}");

    cy.get(".ReactModal__Content").scrollTo("bottom");

    cy.get(
      "body > div.ReactModalPortal > div > div > button:nth-child(3)"
    ).click();
    cy.wait(2000);

    cy.get(".login-page").should("be.visible");
  });

  it("Can login to site", () => {
    cy.get(
      "#root > div > section > div.container > div > div > form > div:nth-child(1) > input"
    ).type(primaryUserData.email);

    cy.get(
      "#root > div > section > div.container > div > div > form > div.form-label-group.password > input"
    ).type(primaryUserData.password);

    cy.get(
      "#root > div > section > div.container > div > div > form > div.fild-row > button"
    ).click();

    cy.wait(2000);

    cy.get(".who-visited").should("be.visible");
  });

  it("Can Book a Single Covid Test with No Symptoms", () => {
    cy.get(".visited-list:first-of-type").click();
    cy.wait(2000);
    cy.get(".covid-19-button").should("be.visible");
    cy.get(".covid-19-button").click();
    cy.get(".booking-loc-main").should("be.visible");
    cy.wait(5000);
    cy.get(
      "#root > div > section > div > div > div.col-md-12.col-lg-8.col-xl-7 > div > div:nth-child(1) > div"
    )
      .should("be.visible")
      .click();
    cy.get(
      "#root > div > section > div > div > div.col-md-12.col-lg-8.col-xl-7 > div > div > label"
    ).click();
    cy.get(".Footer_footer__nextPageLink__2Zq0d").click();
    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > div > button:nth-child(2)"
    ).click();
    cy.get("textarea").type(faker.lorem.sentences());
    cy.get(
      "#root > div > footer > div.container > div.Footer_footer__linksWrap__1dXAS > a"
    ).click();

    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > label:nth-child(4)"
    ).click();
    cy.get(
      "#root > div > footer > div.container > div.Footer_footer__linksWrap__1dXAS > a"
    ).click();
    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > label:nth-child(4)"
    ).click();
    cy.get(".Footer_footer__nextPageLink__2Zq0d").click();
    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > label:nth-child(4)"
    ).click();
    cy.get(".Footer_footer__nextPageLink__2Zq0d").click();
    cy.get(
      "#root > div > section > div > div > div.col-md-12.col-lg-8.col-xl-7 > div > div > div:nth-child(3) > a"
    )
      .scrollIntoView()
      .click();
    cy.get(".react-calendar__tile:not(:disabled)")
      .first()
      .click({ force: true });

    cy.get(".soonest-date button").first().click({ force: true });

    cy.get(".Footer_footer__nextPageLink__2Zq0d").scrollIntoView().click();
    cy.wait(3000);
  });

  it("Can add multiple dependants", () => {
    cy.visit("http://localhost:3000/patient-select");
    cy.get(".some-one-else").click();
    cy.get(".ReactModal__Content").should("be.visible");

    cy.get('input[name="first_name"]')
      .scrollIntoView()
      .type(secondUserData.first);
    cy.get('input[name="last_name"]')
      .scrollIntoView()
      .type(secondUserData.last);
    cy.get('input[name="ohip_num"]')
      .scrollIntoView()
      .type(secondUserData.ohip_num);
    cy.get('input[name="ohip_vc"]')
      .scrollIntoView()
      .type(secondUserData.ohip_vc);
    cy.get('input[name="doctor"]').scrollIntoView().type(secondUserData.doctor);
    cy.get('input[name="date_of_birth"]').scrollIntoView().type("19941126");
    cy.get('input[name="address"]')
      .scrollIntoView()
      .type(secondUserData.address);
    cy.get('input[name="city"]').scrollIntoView().type(secondUserData.city);
    cy.get("select").scrollIntoView().select("female");
    cy.get('input[name="postal_code"]')
      .scrollIntoView()
      .type(secondUserData.postal_code);

    cy.get("#submitbutton").scrollIntoView().click();
    cy.wait(500);
    cy.get("#successmessage").should("be.visible");

    cy.get('input[name="first_name"]')
      .scrollIntoView()
      .type(thirdUserData.first);
    cy.get('input[name="last_name"]').scrollIntoView().type(thirdUserData.last);
    cy.get('input[name="ohip_num"]')
      .scrollIntoView()
      .type(thirdUserData.ohip_num);
    cy.get('input[name="ohip_vc"]')
      .scrollIntoView()
      .type(thirdUserData.ohip_vc);
    cy.get('input[name="doctor"]').scrollIntoView().type(thirdUserData.doctor);
    cy.get('input[name="date_of_birth"]').scrollIntoView().type("19941126");
    cy.get('input[name="address"]')
      .scrollIntoView()
      .type(thirdUserData.address);
    cy.get('input[name="city"]').scrollIntoView().type(thirdUserData.city);
    cy.get('input[name="postal_code"]')
      .scrollIntoView()
      .type(thirdUserData.postal_code);

    cy.get("#submitbutton").scrollIntoView().click();
    cy.wait(500);
    cy.get("#successmessage").should("be.visible");

    cy.get("#close").scrollIntoView().click();
    cy.get(".visited-list").should("have.length", 4);
  });

  it("Should book appointment for only 2 people", () => {
    cy.get(".visited-list:first-of-type").click();
    cy.wait(2000);
    cy.get(".covid-19-button").should("be.visible");
    cy.get(".covid-19-button").click();
    cy.get(".booking-loc-main").should("be.visible");
    cy.wait(5000);
    cy.get(
      "#root > div > section > div > div > div.col-md-12.col-lg-8.col-xl-7 > div > div:nth-child(1) > div"
    )
      .should("be.visible")
      .click();
    cy.get(
      "#root > div > section > div > div > div.col-md-12.col-lg-8.col-xl-7 > div > div > label"
    ).click();
    cy.get(".Footer_footer__nextPageLink__2Zq0d").click();
    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > div > button:nth-child(2)"
    ).click();
    cy.get("textarea").type(faker.lorem.sentences());
    cy.get(
      "#root > div > footer > div.container > div.Footer_footer__linksWrap__1dXAS > a"
    ).click();

    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > label:nth-child(4)"
    ).click();
    cy.get(
      "#root > div > footer > div.container > div.Footer_footer__linksWrap__1dXAS > a"
    ).click();
    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > label:nth-child(4)"
    ).click();
    cy.get(".Footer_footer__nextPageLink__2Zq0d").click();
    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > label:nth-child(4)"
    ).click();
    cy.get(".Footer_footer__nextPageLink__2Zq0d").click();
    cy.get(".completed-questionnaire").should("be.visible");
    cy.get(
      "#root > div > section > div > div > div.col-md-12.col-lg-8.col-xl-7 > div > div > div:nth-child(2) > a"
    ).click();
    cy.get(
      "#root > div > div:nth-child(2) > section > div > div > div.col-lg-5.col-md-12.col-sm-12.col-12 > div > div:nth-child(1)"
    ).should("have.css", "opacity", "0.5");
    cy.get(
      "#root > div > div:nth-child(2) > section > div > div > div.col-lg-5.col-md-12.col-sm-12.col-12 > div > div:nth-child(2)"
    ).click();

    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > div > button:nth-child(2)"
    ).click();
    cy.get("textarea").type(faker.lorem.sentences());
    cy.get(".Footer_footer__nextPageLink__2Zq0d").click();
    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > label:nth-child(2)"
    ).click();
    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > input[type=text]:nth-child(3)"
    ).type("School is making me get it.");
    cy.get(".Footer_footer__nextPageLink__2Zq0d").click();
    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > label:nth-child(2)"
    ).click();
    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > div > input[type=text]:nth-child(1)"
    ).type("sarnia");
    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > div > input[type=text]:nth-child(2)"
    ).type("st clair secondary school");
    cy.get(".Footer_footer__nextPageLink__2Zq0d").click();
    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > label:nth-child(4)"
    ).click();
    cy.get(".Footer_footer__nextPageLink__2Zq0d").click();
    cy.get(
      "#root > div > section > div > div > div.col-md-12.col-lg-8.col-xl-7 > div > div > div:nth-child(3) > a"
    )
      .scrollIntoView()
      .click();
    cy.get(".react-calendar__tile:not(:disabled)")
      .first()
      .click({ force: true });

    cy.get(".soonest-date button").first().click({ force: true });

    cy.get(".Footer_footer__nextPageLink__2Zq0d").scrollIntoView().click();
    cy.wait(3000);
  });

  it("Should book appointment for 3 people", () => {
    cy.visit("http://localhost:3000/patient-select");
    cy.get(".visited-list:first-of-type").click();
    cy.wait(2000);
    cy.get(".covid-19-button").should("be.visible");
    cy.get(".covid-19-button").click();
    cy.get(".booking-loc-main").should("be.visible");
    cy.wait(5000);
    cy.get(
      "#root > div > section > div > div > div.col-md-12.col-lg-8.col-xl-7 > div > div:nth-child(1) > div"
    )
      .should("be.visible")
      .click();
    cy.get(
      "#root > div > section > div > div > div.col-md-12.col-lg-8.col-xl-7 > div > div > label"
    ).click();
    cy.get(".Footer_footer__nextPageLink__2Zq0d").click();
    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > div > button:nth-child(2)"
    ).click();
    cy.get("textarea").type(faker.lorem.sentences());
    cy.get(
      "#root > div > footer > div.container > div.Footer_footer__linksWrap__1dXAS > a"
    ).click();

    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > label:nth-child(4)"
    ).click();
    cy.get(
      "#root > div > footer > div.container > div.Footer_footer__linksWrap__1dXAS > a"
    ).click();
    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > label:nth-child(4)"
    ).click();
    cy.get(".Footer_footer__nextPageLink__2Zq0d").click();
    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > label:nth-child(4)"
    ).click();
    cy.get(".Footer_footer__nextPageLink__2Zq0d").click();
    cy.get(".completed-questionnaire").should("be.visible");
    cy.get(
      "#root > div > section > div > div > div.col-md-12.col-lg-8.col-xl-7 > div > div > div:nth-child(2) > a"
    ).click();
    cy.get(
      "#root > div > div:nth-child(2) > section > div > div > div.col-lg-5.col-md-12.col-sm-12.col-12 > div > div:nth-child(1)"
    ).should("have.css", "opacity", "0.5");
    cy.get(
      "#root > div > div:nth-child(2) > section > div > div > div.col-lg-5.col-md-12.col-sm-12.col-12 > div > div:nth-child(2)"
    ).click();

    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > div > button:nth-child(2)"
    ).click();
    cy.get("textarea").type(faker.lorem.sentences());
    cy.get(".Footer_footer__nextPageLink__2Zq0d").click();
    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > label:nth-child(2)"
    ).click();
    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > input[type=text]:nth-child(3)"
    ).type("School is making me get it.");
    cy.get(".Footer_footer__nextPageLink__2Zq0d").click();
    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > label:nth-child(2)"
    ).click();
    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > div > input[type=text]:nth-child(1)"
    ).type("sarnia");
    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > div > input[type=text]:nth-child(2)"
    ).type("st clair secondary school");
    cy.get(".Footer_footer__nextPageLink__2Zq0d").click();
    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > label:nth-child(4)"
    ).click();
    cy.get(".Footer_footer__nextPageLink__2Zq0d").click();
    cy.get(
      "#root > div > section > div > div > div.col-md-12.col-lg-8.col-xl-7 > div > div > div:nth-child(2) > a"
    )
      .scrollIntoView()
      .click();
    cy.get(
      "#root > div > div:nth-child(2) > section > div > div > div.col-lg-5.col-md-12.col-sm-12.col-12 > div > div:nth-child(2)"
    ).should("have.css", "opacity", "0.5");
    cy.get(
      "#root > div > div:nth-child(2) > section > div > div > div.col-lg-5.col-md-12.col-sm-12.col-12 > div > div:nth-child(3)"
    ).click();

    cy.get("textarea").type(
      "Feeling really unwell so I am providing details here."
    );

    cy.get(".Footer_footer__nextPageLink__2Zq0d").click();
    // Clicking Yes for required testing
    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > label:nth-child(2)"
    ).click();
    // Inputting in the text field
    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > input[type=text]:nth-child(3)"
    ).type("School is requiring me.");

    cy.get(".Footer_footer__nextPageLink__2Zq0d").click();
    // Clicking Yes for school
    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > label:nth-child(2)"
    ).click();
    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > div > input[type=text]:nth-child(1)"
    ).type("Toronto");
    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > div > input[type=text]:nth-child(2)"
    ).type("St Peters Catholic School");

    cy.get(".Footer_footer__nextPageLink__2Zq0d").click();

    // Clicking yes to being symptomatic
    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > label:nth-child(2)"
    ).click();
    cy.get(".Footer_footer__nextPageLink__2Zq0d").click();

    cy.get("label").click({ multiple: true });
    cy.get(".Footer_footer__nextPageLink__2Zq0d").click();
    // Clicking started 1-3 days ago
    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > label:nth-child(4)"
    ).click();

    cy.get(".Footer_footer__nextPageLink__2Zq0d").click();
    // Selecting Diabetes and Kidney Disease
    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > label:nth-child(8)"
    ).click();
    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > label:nth-child(10)"
    ).click();

    cy.get(".Footer_footer__nextPageLink__2Zq0d").click();

    cy.get(
      "#root > div > div.container > div > div:nth-child(2) > select"
    ).select("6");

    cy.get(".Footer_footer__nextPageLink__2Zq0d").click();
    cy.get(
      "#root > div > section > div > div > div.col-md-12.col-lg-8.col-xl-7 > div > div > div:nth-child(3) > a"
    )
      .scrollIntoView()
      .click();
    cy.get(".react-calendar__tile:not(:disabled)")
      .first()
      .click({ force: true });

    cy.get(".soonest-date button").first().click({ force: true });

    cy.get(".Footer_footer__nextPageLink__2Zq0d").scrollIntoView().click();
    cy.wait(3000);
  });
});

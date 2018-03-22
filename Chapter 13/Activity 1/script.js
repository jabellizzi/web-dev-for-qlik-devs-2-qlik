var config = {
  schema: schema,
  url: "ws://localhost:4848/app"
};

var session = enigma.create(config);

session.open().then(function(qlik) {
  qlik.openDoc('WBY Sales.qvf').then(function(app) {
    
  })
})


// PIE
function renderPie(model, elementId) {

}


// BAR
function renderBar(model, elementId) {

}


// LINE
function renderLine(model, elementId) {

}
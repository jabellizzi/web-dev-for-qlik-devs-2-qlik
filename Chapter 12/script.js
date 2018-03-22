var config = {
  schema: schema,
  url: "ws://localhost:4848/app"
};

var session = enigma.create(config);

session.open().then(function(qlik) {
  qlik.openDoc('WBY Sales.qvf').then(function(app) {
    var myDef = {
      qInfo: {
        qType: "CurrentSelections"
      },
      qSelectionObjectDef: {}
    };
    
    app.createSessionObject(myDef).then(function(model) {
      
    })
  })
})

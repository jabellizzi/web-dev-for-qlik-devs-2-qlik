var config = {
  schema: schema,
  url: "ws://localhost:4848/app"
};

var session = enigma.create(config);

session.open().then(function(qlik) {
  qlik.openDoc('WBY Sales.qvf').then(function(app) {
    var myDef = {
      qInfo: {
        qType: "myListObject"
      },
      qListObjectDef: {
        qDef: {
          qFieldDefs: ["ProductName"]
        },
        qInitialDataFetch: [
          {
            qTop: 0,
            qLeft: 0,
            qWidth: 1,
            qHeight: 50
          }
        ]
      }
    };

    app.createSessionObject(myDef).then(function(model) {
      model.getLayout().then(function(layout) {
        console.log(layout);
      })
    })
  })
})


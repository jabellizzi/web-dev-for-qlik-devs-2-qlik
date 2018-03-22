var config = {
  schema: schema,
  url: "ws://localhost:4848/app"
};

var session = enigma.create(config);

session.open().then(function(qlik) {
  console.log(qlik);

  qlik.openDoc('WBY Sales.qvf').then(function(app) {
    var listObjectDef = {
      qInfo: {
        qType: "myListObject"
      },
      qListObjectDef: {
        qDef: {
          qFieldDefs: ["Country"]
        },
        qInitialDataFetch: [
          {
            qTop: 0,
            qLeft: 0,
            qWidth: 1,
            qHeight: 100
          }
        ]
      }
    };

    app.createSessionObject(listObjectDef).then(function(model) {
      model.getLayout().then(function(layout) {
        console.log(layout);
      });

      model.selectListObjectValues(
        '/qListObjectDef',
        [3, 7],
        true
      ).then(function(response) {
        model.getLayout().then(function(layout) {
          console.log(layout);
        })
      })
    })
  })
})


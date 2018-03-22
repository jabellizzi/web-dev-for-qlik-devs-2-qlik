var config = {
  schema: schema,
  url: "ws://localhost:4848/app"
};

var session = enigma.create(config);

session.open().then(function(qlik) {
  qlik.openDoc('WBY Sales.qvf').then(function(app) {
    var myDef = {
      qInfo: {
        qType: "myCustomHyperCube"
      },
      qHyperCubeDef: {
        qDimensions: [
          {
            qDef: {
              qFieldDefs: ["Country"],
              qSortCriterias: [
                {
                  qSortByAscii: 1
                }
              ]
            }
          }
        ],
        qMeasures: [
          {
            qDef: {
              qDef: "=Sum(OrderLineAmount)",
            },
            qSortBy: {
              qSortByNumeric: -1
            }
          }
        ],
        qInterColumnSortOrder: [1, 0],
        qInitialDataFetch: [
          {
            qTop: 0,
            qLeft: 0,
            qWidth: 2,
            qHeight: 100
          }
        ]
      }
    };

    app.createSessionObject(myDef).then(function(model) {
      model.getLayout().then(function(layout) {
        console.log(layout.qHyperCube.qDataPages[0].qMatrix);
        
        model.applyPatches([
          {
            qOp: 'replace',
            qPath: '/qHyperCubeDef/qInterColumnSortOrder',
            qValue: JSON.stringify([0, 1])
          }
        ], false).then(function() {
          
        })
      });
    })
  })
})

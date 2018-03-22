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
      model.addListener('changed', function() {
        renderBar(model, 'chart1');
      });
      renderBar(model, 'chart1');
    })
  })
})


function renderBar(model, elementId) {
  model.getLayout().then(function(layout) {
    var amData = [];
    var qMatrix = layout.qHyperCube.qDataPages[0].qMatrix;
    for(var i = 0; i < qMatrix.length; i++) {
      amData.push({
        dim: qMatrix[i][0].qText,
        elemNumber: qMatrix[i][0].qElemNumber,
        exp: qMatrix[i][1].qText
      });
    }

    AmCharts.makeChart(elementId, {
      type: 'serial',
      dataProvider: amData,
      categoryField: 'dim',
      listeners: [{
        event: 'clickGraphItem',
        method: function(vis) {
          var elemNumber = vis.item.dataContext.elemNumber;
          model.selectHyperCubeValues('/qHyperCubeDef', 0, [elemNumber], true)
        }
      }],
      graphs: [{
        fillAlphas: 1,
        type: 'column',
        valueField: 'exp'
      }]
    });
  });
}
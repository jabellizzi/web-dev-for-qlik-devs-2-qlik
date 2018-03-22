var config = {
  schema: schema,
  url: "ws://localhost:4848/app"
};

var pieDef = {
  qInfo: {
    qType: "pieChart"
  },
  qHyperCubeDef: {
    qDimensions: [
      {
        qDef: {
          qFieldDefs: ["CategoryName"]
        }
      }
    ],
    qMeasures: [
      {
        qDef: {
          qDef: "=Sum(OrderLineAmount)",
        }
      }
    ],
    qInitialDataFetch: [
      {
        qTop: 0,
        qLeft: 0,
        qWidth: 2,
        qHeight: 50
      }
    ]
  }
};

var session = enigma.create(config);

session.open().then(function(qlik) {
  qlik.openDoc('WBY Sales.qvf').then(function(app) {
    app.createSessionObject(pieDef).then(function(model) {
      model.addListener('changed', function() {
        renderPie(model, 'pie');
      });
      renderPie(model, 'pie');
    })
  })
})


// PIE
function renderPie(model, elementId) {
  model.getLayout().then(function(layout) {
    var amData = [];
    var senseData = layout.qHyperCube.qDataPages[0].qMatrix;
    console.log(senseData);
    for(var i = 0; i < senseData.length; i++) {
      amData.push({
        dim: senseData[i][0].qText,
        elemNumber: senseData[i][0].qElemNumber,
        exp: senseData[i][1].qNum
      });
    }

    AmCharts.makeChart(elementId, {
      type: 'pie',
      valueAxes: [{
        axisAlpha: 1
      }],
      radius: '42%',
      innerRadius: '60%',
      dataProvider: amData,
      titleField: 'dim',
      valueField: 'exp',
      labelText: '[[dim]]'
    })
  })
}


// BAR
function renderBar(model, elementId) {

}


// LINE
function renderLine(model, elementId) {

}
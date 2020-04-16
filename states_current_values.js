(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "state",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "positive",
            alias: "magnitude",
            dataType: tableau.dataTypeEnum.integer
        }, {
            id: "positiveScore",
            alias: "title",
            dataType: tableau.dataTypeEnum.integer
        }, {
            id: "negativeScore",
            dataType: tableau.dataTypeEnum.integer
        }, {
            id: "negativeRegularScore",
            dataType: tableau.dataTypeEnum.integer
        }, {
            id: "commercialScore",
            dataType: tableau.dataTypeEnum.integer
        }, {
            id: "grade",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "score",
            dataType: tableau.dataTypeEnum.integer
        }, {
            id: "negative",
            dataType: tableau.dataTypeEnum.integer
        }, {
            id: "pending",
            dataType: tableau.dataTypeEnum.integer
        }, {
            id: "hospitalizedCurrently",
            dataType: tableau.dataTypeEnum.integer
        }, {
            id: "hospitalizedCumulative",
            dataType: tableau.dataTypeEnum.integer
        }, {
            id: "inIcuCurrently",
            dataType: tableau.dataTypeEnum.integer
        }, {
            id: "inIcuCumulative",
            dataType: tableau.dataTypeEnum.integer
        }, {
            id: "onVentilatorCurrently",
            dataType: tableau.dataTypeEnum.integer
        }, {
            id: "onVentilatorCumulative",
            dataType: tableau.dataTypeEnum.integer
        }, {
            id: "recovered",
            dataType: tableau.dataTypeEnum.integer
        }, {
            id: "lastUpdateEt",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "checkTimeEt",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "death",
            dataType: tableau.dataTypeEnum.integer
        }, {
            id: "hospitalized",
            dataType: tableau.dataTypeEnum.integer
        }, {
            id: "total",
            dataType: tableau.dataTypeEnum.integer
        }, {
            id: "totalTestResults",
            dataType: tableau.dataTypeEnum.integer
        }, {
            id: "posNeg",
            dataType: tableau.dataTypeEnum.integer
        }, {
            id: "fips",
            dataType: tableau.dataTypeEnum.integer
        }, {
            id: "dateModified",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "dateModified",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "dateChecked",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "notes",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "hash",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "states_current_values",
            alias: "States Current Values",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://covidtracking.com/api/v1/states/current.json", function(resp) {
            var feat = resp.features,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "state": feat[i].state,
                    "positive": feat[i].properties.positive,
                    "positiveScore": feat[i].properties.positiveScore,
                    "negativeScore":feat[i].properties.negativeScore
                    "negativeRegularScore":feat[i].properties.negativeRegularScore
                    "commercialScore":feat[i].properties.commercialScore
                    "grade":feat[i].properties.grade
                    "score":feat[i].properties.score
                    "negative":feat[i].properties.negative
                    "pending":feat[i].properties.pending
                    "hospitalizedCurrently":feat[i].properties.hospitalizedCurrently
                    "hospitalizedCumulative":feat[i].properties.hospitalizedCumulative
                    "inIcuCurrently":feat[i].properties.inIcuCurrently
                    "inIcuCumulative":feat[i].properties.inIcuCumulative
                    "onVentilatorCurrently":feat[i].properties.onVentilatorCurrently
                    "onVentilatorCumulative":feat[i].properties.onVentilatorCumulative
                    "recovered":feat[i].properties.recovered
                    "lastUpdateEt":feat[i].properties.lastUpdateEt
                    "checkTimeEt":feat[i].properties.checkTimeEt
                    "death":feat[i].properties.death
                    "hospitalized":feat[i].properties.hospitalized
                    "total":feat[i].properties.total
                    "totalTestResults":feat[i].properties.totalTestResults
                    "posNeg":feat[i].properties.posNeg
                    "fips":feat[i].properties.fips
                    "dateModified":feat[i].properties.dateModified
                    "dateChecked":feat[i].properties.dateChecked
                    "notes":feat[i].properties.notes
                    "hash":feat[i].properties.hash
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "States Current Values"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();

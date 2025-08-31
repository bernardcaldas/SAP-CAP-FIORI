sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'maintenance/sappmmaintenance/test/integration/FirstJourney',
		'maintenance/sappmmaintenance/test/integration/pages/OrdersList',
		'maintenance/sappmmaintenance/test/integration/pages/OrdersObjectPage'
    ],
    function(JourneyRunner, opaJourney, OrdersList, OrdersObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('maintenance/sappmmaintenance') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheOrdersList: OrdersList,
					onTheOrdersObjectPage: OrdersObjectPage
                }
            },
            opaJourney.run
        );
    }
);
sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'maintenance.sappmmaintenance',
            componentId: 'OrdersObjectPage',
            contextPath: '/Orders'
        },
        CustomPageDefinitions
    );
});
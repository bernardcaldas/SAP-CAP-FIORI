using sap.pm.portifolio.db.MaintenanceOrders from '../db/schema';

namespace sap.pm.demo;

@path: '/service/main'
service MaintenanceOrderService {

    @odata.draft.enabled
    entity Orders as projection on MaintenanceOrders;

    annotate Orders with @(
        UI: {
            HeaderInfo: {
                TypeName: 'Ordem de Manutenção',
                TypeNamePlural: 'Ordens de Manutenção',
                Title: { Value: Description },
                Description: { Value: OrderID }
            },
            SelectionFields: [
                OrderID,
                EquipmentID,
                Priority,
                Status
            ],
            LineItem: [
                { Value: OrderID, Label: 'Nº da Ordem' },
                { Value: Description, Label: 'Descrição' },
                { Value: EquipmentID, Label: 'Equipamento' },
                { Value: Priority, Label: 'Prioridade' },
                { Value: Status, Label: 'Status' },
                { Value: DueDate, Label: 'Data de Vencimento' }
            ],
            Facets: [
                {
                    $Type: 'UI.CollectionFacet',
                    Label: 'Informações Gerais',
                    ID: 'GeneralInfo',
                    Facets: [
                        { $Type: 'UI.ReferenceFacet', Target: '@UI.FieldGroup#General' }
                    ]
                }
            ],
            FieldGroup #General: {
                Data: [
                    { Value: OrderID },
                    { Value: Description },
                    { Value: EquipmentID },
                    { Value: Priority },
                    { Value: Status },
                    { Value: DueDate }
                ]
            }
        }
    );

    // Further annotations for individual fields for better UI representation
    annotate Orders with {
        OrderID     @title: 'Nº da Ordem';
        Description @title: 'Descrição';
        EquipmentID @title: 'Equipamento';
        Priority    @title: 'Prioridade';
        Status      @title: 'Status';
        DueDate     @title: 'Data de Vencimento';
    }

}

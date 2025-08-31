namespace sap.pm.portifolio.db;
using { cuid, managed } from '@sap/cds/common';

@title: 'Ordem de Manutenção'
entity MaintenanceOrders : cuid, managed {
    key OrderID       : String(10) @title: 'Nº da Ordem';
        Description   : String(100) @title: 'Descrição';
        EquipmentID   : String(20) @title: 'Nº do Equipamento'; // This will be an association later
        Priority      : Integer @title: 'Prioridade' enum {
                            URGENTE = 1;
                            ALTA = 2;
                            MEDIA = 3;
                            BAIXA = 4;
                        };
        Status        : String(10) @title: 'Status' enum {
                            CRIADA = 'CRIADA';
                            LIBERADA = 'LIBERADA';
                            CONCLUIDA = 'CONCLUIDA';
                            FECHADA = 'FECHADA';
                        };
        DueDate       : Date @title: 'Data de Vencimento';
    // Association to a future Equipment entity
    // equipment : Association to one Equipment;
}

/*
// Future Equipment entity for reference
entity Equipment : cuid {
    key EquipmentID : String(20) @title: 'Nº do Equipamento';
        Description : String(100) @title: 'Descrição do Equipamento';
        // ... other fields like location, manufacturer, etc.
}
*/
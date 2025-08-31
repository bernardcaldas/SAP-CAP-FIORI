const cds = require('@sap/cds');
const { v4: uuidv4 } = require('uuid');

module.exports = class MaintenanceOrderService extends cds.ApplicationService {
    init() {
        const {
            Orders
        } = this.entities;

        // Mock data to be inserted
        const mockOrders = [{
            OrderID: '4000001',
            Description: 'Verificar vazamento na bomba hidráulica principal',
            EquipmentID: 'EQ-1001',
            Priority: 1, // URGENTE
            Status: 'CRIADA',
            DueDate: new Date('2025-09-10')
        }, {
            OrderID: '4000002',
            Description: 'Trocar filtro de ar do compressor C-205',
            EquipmentID: 'EQ-2002',
            Priority: 2, // ALTA
            Status: 'LIBERADA',
            DueDate: new Date('2025-09-15')
        }, {
            OrderID: '4000003',
            Description: 'Inspeção de rotina no motor elétrico M-301',
            EquipmentID: 'EQ-3003',
            Priority: 3, // MEDIA
            Status: 'CRIADA',
            DueDate: new Date('2025-09-20')
        }, {
            OrderID: '4000004',
            Description: 'Lubrificação geral da esteira transportadora T-401',
            EquipmentID: 'EQ-4004',
            Priority: 3, // MEDIA
            Status: 'LIBERADA',
            DueDate: new Date('2025-09-25')
        }, {
            OrderID: '4000005',
            Description: 'Calibração do sensor de temperatura do forno F-501',
            EquipmentID: 'EQ-5005',
            Priority: 2, // ALTA
            Status: 'CRIADA',
            DueDate: new Date('2025-09-12')
        }, {
            OrderID: '4000006',
            Description: 'Reparo na válvula de controle do tanque T-601',
            EquipmentID: 'EQ-6006',
            Priority: 1, // URGENTE
            Status: 'LIBERADA',
            DueDate: new Date('2025-09-08')
        }, {
            OrderID: '4000007',
            Description: 'Manutenção preventiva no sistema de ventilação V-701',
            EquipmentID: 'EQ-7007',
            Priority: 4, // BAIXA
            Status: 'CRIADA',
            DueDate: new Date('2025-10-01')
        }, {
            OrderID: '4000008',
            Description: 'Troca de óleo da caixa de engrenagens G-801',
            EquipmentID: 'EQ-8008',
            Priority: 3, // MEDIA
            Status: 'CONCLUIDA',
            DueDate: new Date('2025-08-30')
        }, {
            OrderID: '4000009',
            Description: 'Análise de vibração no gerador G-901',
            EquipmentID: 'EQ-9009',
            Priority: 2, // ALTA
            Status: 'FECHADA',
            DueDate: new Date('2025-08-15')
        }, {
            OrderID: '4000010',
            Description: 'Limpeza e inspeção do painel elétrico P-1001',
            EquipmentID: 'EQ-1010',
            Priority: 4, // BAIXA
            Status: 'CONCLUIDA',
            DueDate: new Date('2025-08-20')
        }, ];

        // Handler to ensure mock data is present
        this.after('READ', 'Orders', async (results, req) => {
            if (results.length === 0) {
                console.log('SAP-PM-PORTIFOLIO: No orders found, creating mock data...');
                try {
                    // Assigning cuid aspect fields
                    const mockDataWithCuid = mockOrders.map(order => ({
                        ID: uuidv4(),
                        ...order
                    }));
                    await cds.transaction(req).run(INSERT.into(Orders).entries(mockDataWithCuid));
                    console.log('SAP-PM-PORTIFOLIO: Mock data created successfully.');
                    // Rerun the read to return the newly created data
                    return await cds.transaction(req).run(req.query);
                } catch (error) {
                    console.error('SAP-PM-PORTIFOLIO: Error creating mock data:', error);
                    req.error(500, 'Failed to create mock data');
                }
            }
        });

        // CREATE Operation Handler
        this.before('CREATE', 'Orders', (req) => {
            console.log('SAP-PM-PORTIFOLIO: >> Creating new order with data:', req.data);
            // Basic validation
            if (!req.data.Description) {
                req.error(400, 'A descrição da ordem é obrigatória.');
            }
            // Set default status if not provided
            if (!req.data.Status) {
                req.data.Status = 'CRIADA';
            }
        });

        // READ Operation Handler (for logging)
        this.on('READ', 'Orders', (req) => {
            console.log('SAP-PM-PORTIFOLIO: >> Reading orders with query:', req.query);
            return cds.run(req.query); // Let the default handler execute
        });

        // UPDATE Operation Handler
        this.on('UPDATE', 'Orders', (req) => {
            console.log('SAP-PM-PORTIFOLIO: >> Updating order:', req.data.ID, 'with data:', req.data);
            if (req.data.Status === 'FECHADA' && !req.data.completedAt) {
                // Example of business logic: set completion date when order is closed
                // This field would need to be added to schema.cds
                // req.data.completedAt = new Date().toISOString();
            }
            return cds.run(req.query); // Let the default handler execute
        });

        // DELETE Operation Handler
        this.on('DELETE', 'Orders', (req) => {
            console.log('SAP-PM-PORTIFOLIO: >> Deleting order:', req.data.ID);
            return cds.run(req.query); // Let the default handler execute
        });


        return super.init();
    }
}
module.exports = {
    routes: [
        { // Path defined with an URL parameter
            method: 'POST',
            path: '/tickets/bulk', 
            handler: 'ticket.createMultipleTickets',
        },
    ]
}
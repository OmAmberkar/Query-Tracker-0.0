import Ticket from '../models/ticket.model.js'

const ticketData = async (req,res) =>{
    const ticket = await Ticket.find();
    
}